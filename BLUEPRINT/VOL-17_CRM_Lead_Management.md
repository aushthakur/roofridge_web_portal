# VOL-17: CRM System & Lead Management
## Roof Ridge — Enterprise Software Blueprint

---

## 17.1 CRM Architecture

### 17.1.1 Overview

The Roof Ridge CRM is a built-in (not third-party) lead management system tightly integrated with the platform. Unlike off-the-shelf CRMs, it is domain-aware and automatically creates leads from every platform touchpoint.

**Lead Sources (Automatic):**
| Source Code | Trigger |
|------------|---------|
| `homepage_quick_finder` | Homepage widget submission |
| `property_enquiry` | Enquiry form on listing page |
| `property_call_reveal` | Agent number revealed |
| `property_whatsapp` | WhatsApp button clicked (with mobile provided) |
| `booking_creation` | Service booking created |
| `loan_eligibility_check` | Loan eligibility form submitted |
| `construction_quote` | "Get Quote" for construction submitted |
| `loan_application` | Home loan application started |
| `emi_calculator_lead` | EMI calculator CTA clicked |
| `referral` | Referred user clicked and submitted |
| `chatbot` | RidgeBot conversation captures contact |
| `inbound_call` | Manual entry by phone support agent |
| `import_bulk` | CSV import by admin |
| `landing_page` | Marketing landing page form |
| `ad_webhook` | Facebook/Google Ads lead form webhook |

---

## 17.2 Lead Data Model

### 17.2.1 Complete Lead Schema

```typescript
interface Lead {
  id: string;                    // UUID
  lead_number: string;           // L-2026-XXXXXX
  
  // Contact
  name: string;
  mobile: string;                // Normalized E.164
  email?: string;
  
  // Source & Attribution
  source: LeadSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page_url?: string;
  referrer_url?: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  platform: 'web' | 'ios' | 'android';
  
  // Intent
  category: LeadCategory;        // property_buy|property_rent|service|material|loan|construction
  sub_category?: string;         // 3BHK|plumber|cement|home_loan|...
  city: string;
  locality?: string;
  budget_min?: number;
  budget_max?: number;
  timeline?: 'asap' | '1_month' | '3_months' | '6_months' | 'not_decided';
  requirement_notes?: string;
  related_listing_id?: string;   // If enquiry from a specific listing
  
  // AI Scoring
  ai_score: number;              // 0-100
  ai_classification: 'hot' | 'warm' | 'cold';
  
  // Assignment
  assigned_partner_id?: string;
  assigned_at?: DateTime;
  assignment_type: 'auto' | 'manual' | 'unassigned';
  
  // Status Pipeline
  status: LeadStatus;
  status_history: LeadStatusHistory[];
  
  // User linkage
  user_id?: string;              // If registered user
  mobile_verified: boolean;
  
  // Deduplication
  is_duplicate: boolean;
  duplicate_of?: string;         // Lead ID of original
  
  // System
  created_at: DateTime;
  updated_at: DateTime;
  expires_at?: DateTime;         // After N hours uncontacted
  
  // Internal
  notes: LeadNote[];
  activities: LeadActivity[];
  tags: string[];
  is_archived: boolean;
}

enum LeadStatus {
  new = 'new',
  assigned = 'assigned',
  contacted = 'contacted',
  site_visit_scheduled = 'site_visit_scheduled',
  quote_sent = 'quote_sent',
  negotiation = 'negotiation',
  converted = 'converted',
  lost = 'lost',
  not_interested = 'not_interested',
  unqualified = 'unqualified',
  expired = 'expired'
}
```

---

## 17.3 Lead Routing Engine — Detailed Specification

### 17.3.1 Routing Algorithm

```python
class LeadRouter:
    def route_lead(self, lead: Lead) -> Optional[Partner]:
        """
        Returns the best partner to assign this lead to.
        Returns None if no suitable partner found.
        """
        # Step 1: Get candidate partners
        candidates = self.get_eligible_partners(lead)
        
        if not candidates:
            # No eligible partners → Queue for manual assignment
            self.queue_for_manual(lead)
            return None
        
        # Step 2: Score and rank candidates
        scored = [(p, self.score_partner(p, lead)) for p in candidates]
        scored.sort(key=lambda x: x[1], reverse=True)
        
        # Step 3: Check capacity
        for partner, score in scored:
            if self.partner_has_capacity(partner, lead):
                return partner
        
        # Step 4: All full capacity → expand radius or lower tier
        return self.fallback_routing(lead)
    
    def get_eligible_partners(self, lead: Lead) -> List[Partner]:
        """Filter partners by basic eligibility"""
        return db.query("""
            SELECT p.* FROM partners p
            WHERE p.status = 'active'
            AND p.category_matches(:category)
            AND :city = ANY(p.service_cities)
            AND p.subscription_expires_at > NOW()
            AND p.is_paused = false
            ORDER BY p.subscription_tier DESC, p.rating DESC
        """, category=lead.category, city=lead.city)
    
    def score_partner(self, partner: Partner, lead: Lead) -> float:
        """
        Compute partner assignment score (0-100)
        """
        score = 0.0
        
        # Subscription tier (max 30 points)
        tier_scores = {'gold': 30, 'silver': 20, 'free': 10}
        score += tier_scores.get(partner.subscription_tier, 0)
        
        # Rating (max 25 points)
        score += (partner.rating / 5.0) * 25
        
        # Response rate (max 20 points)  
        score += partner.lead_response_rate_30d * 20
        
        # Locality match (10 points)
        if lead.locality and lead.locality in partner.service_localities:
            score += 10
        
        # Active leads count penalty (-5 per active lead over 10)
        over_limit = max(0, partner.active_leads_count - 10)
        score -= over_limit * 5
        
        # Recent activity bonus (5 points if active in last 2 hours)
        if partner.last_active_at > now() - timedelta(hours=2):
            score += 5
        
        # Budget match (10 points if lead budget matches partner typical deals)
        if lead.budget_min and partner.avg_deal_value:
            if abs(lead.budget_min - partner.avg_deal_value) / partner.avg_deal_value < 0.3:
                score += 10
        
        return score
```

### 17.3.2 Routing Rules (Admin-Configurable)

**Rule Format:**
```json
{
  "rule_id": "rule_001",
  "name": "Gold Partner Priority for High-Value Delhi Leads",
  "priority": 1,
  "conditions": {
    "lead.city": { "eq": "Delhi" },
    "lead.category": { "in": ["property_buy", "property_rent"] },
    "lead.budget_max": { "gte": 10000000 }
  },
  "actions": {
    "assignment_pool": "gold_partners_only",
    "fallback_after_minutes": 10,
    "fallback_pool": "silver_partners",
    "sla_minutes": 15,
    "notify_admin_if_unassigned_after_minutes": 30
  }
}
```

---

## 17.4 Lead Activity Tracking

### 17.4.1 Activity Types

| Type | Created By | Description |
|------|-----------|-------------|
| `lead_created` | System | Lead entered CRM |
| `lead_assigned` | System | Auto-assigned to partner |
| `lead_reassigned` | Admin | Manually re-assigned |
| `call_made` | Partner | Partner logged a call |
| `call_received` | Partner | Incoming call logged |
| `whatsapp_sent` | Partner | WhatsApp message sent |
| `email_sent` | Partner | Email sent |
| `site_visit_scheduled` | Partner | Site visit date set |
| `site_visit_completed` | Partner | Site visit done |
| `site_visit_cancelled` | Partner | Visit cancelled with reason |
| `quote_sent` | Partner | Quote/proposal sent |
| `follow_up_set` | Partner | Reminder set |
| `follow_up_due` | System | Follow-up reminder fired |
| `status_changed` | Partner/Admin | Pipeline status updated |
| `note_added` | Partner/Admin | Text note added |
| `converted` | Partner | Marked as converted |
| `lost` | Partner | Marked as lost with reason |
| `document_shared` | Partner | Document sent to lead |
| `listing_shared` | Partner | Property listing shared |
| `contact_revealed` | Partner | Lead number revealed (deduct credit) |

### 17.4.2 Follow-Up System

**Automatic Follow-Up Reminders:**

| Trigger | Reminder After |
|---------|--------------|
| Lead created but not contacted | 4 hours |
| Lead contacted but no response | 24 hours |
| Site visit scheduled | 2 hours before visit |
| Site visit completed but no status update | 24 hours |
| Quote sent but no update | 72 hours |
| Lead in negotiation stage | 5 days |
| Hot lead uncontacted | 1 hour (urgent) |

**Follow-Up Push Notification to Partner:**
```
⏰ Follow-up reminder
Rahul Sharma (Property Buy, Delhi ₹80L-1Cr)
has been waiting since 4 hours. Don't lose this lead!
[View Lead → ] [Call Now →]
```

**Overdue Follow-Up Escalation:**
- 24 hours overdue: Alert to admin
- 48 hours overdue: Lead may be re-assigned
- 72 hours overdue: Lead classified as expired, auto-returned to pool

---

## 17.5 Lead Conversion Tracking

### 17.5.1 Conversion Event

When a partner marks a lead as converted:

```typescript
interface ConversionRecord {
  lead_id: string;
  converted_at: DateTime;
  conversion_type: 'property_sale' | 'property_rent' | 'service_booked' | 'loan_disbursed' | 'material_order';
  deal_value?: number;        // Actual transaction value
  booking_id?: string;        // If service booking created
  property_id?: string;       // If property transacted
  loan_amount?: number;       // If loan
  commission_due?: number;    // Platform commission (if applicable)
  verified: boolean;          // Admin-verified vs partner-reported
}
```

### 17.5.2 Conversion Verification

| Category | How Verified |
|----------|-------------|
| Service booking | Auto-verified (booking created in system) |
| Property sale | Unverified (partner reports) — can attach sale agreement |
| Loan disbursed | Verified via bank partner webhook |
| Material order | Auto-verified (order in system) |

---

## 17.6 Admin CRM Controls

### 17.6.1 Lead Dashboard (Admin)

**URL:** `/admin/crm/`

```
┌───────────────────────────────────────────────────────────────────┐
│ CRM Overview — Today                                              │
│──────────────────────────────────────────────────────────────── │
│ New Leads: 312 | Assigned: 287 (92%) | Contacted: 198 (69%)     │
│ HOT (>70): 42  | WARM: 156           | COLD: 114                │
│ Converted Today: 34 | Lost Today: 18                            │
│ Avg AI Score: 58 | Avg Response Time: 18 minutes               │
│──────────────────────────────────────────────────────────────── │
│ UNASSIGNED LEADS (25) — Require Attention                        │
│ [Auto-Assign All] [Assign Selected] [Filter ▾]                  │
│──────────────────────────────────────────────────────────────── │
│ LEAD SOURCES (Today)                                            │
│ Homepage: 87 (28%) | Property Enquiry: 145 (46%) | Ads: 52 (17%)│
│──────────────────────────────────────────────────────────────── │
│ CONVERSION FUNNEL                                               │
│ [Created 312] → [Assigned 287] → [Contacted 198]               │
│              → [Visit 67] → [Quote 43] → [Converted 34]        │
│ Overall Conversion: 10.9%                                       │
└───────────────────────────────────────────────────────────────────┘
```

### 17.6.2 Admin Lead Detail Controls

Additional controls visible to admin (vs partner view):
- Full (unmasked) contact details always
- Assignment history (list of all partners assigned)
- Re-assign to any partner (override automatic routing)
- Merge leads (if duplicate detected)
- Blacklist mobile (if spam)
- AI score breakdown (visible explainability)
- Source attribution chain (UTM → page → CTA)

---

## 17.7 Lead Quality Monitoring

### 17.7.1 Spam & Fake Lead Detection

**Automatic Filters:**
- Mobile in DND block list + submitted for promotional source → Skip notification
- Invalid mobile format → Reject
- Same mobile submitting >3 leads in 24 hours → Flag as spam
- Bot pattern (form submitted in <2 seconds) → Honeypot triggered
- VPN/proxy IP (high risk) → Low priority assignment

**Honeypot Field:**
- Hidden field in all forms: `<input type="text" name="company" style="display:none">`
- If filled by bot → Lead auto-classified as spam, not entered in CRM

### 17.7.2 Partner Quality Metrics

**Tracked per partner (30-day rolling):**

| Metric | Formula | Target |
|--------|---------|--------|
| Lead Response Rate | Leads contacted / leads received | >80% |
| Average Response Time | Minutes from assignment to first contact | <30 min |
| Conversion Rate | Converted / Total leads | >8% |
| Lead Rejection Rate | Declined / received | <20% |
| Customer Satisfaction | Avg booking rating | >4.0 |
| Complaint Rate | Complaints / leads | <2% |

**Consequences of Poor Metrics:**
- Response Rate < 60% for 2 weeks → Warning notification
- Response Rate < 50% for 4 weeks → Lead credits paused
- Conversion Rate < 3% for 2 months → Review required
- Complaint Rate > 5% → Immediate review, possible suspension

---

## 17.8 Bulk Lead Import & Export

### 17.8.1 Import

**Admin only:** `/admin/crm/import/`

**Accepted Format:** XLSX/CSV

**Required Columns:**
| Column | Required | Validation |
|--------|----------|------------|
| name | ✅ | |
| mobile | ✅ | 10-digit Indian number |
| category | ✅ | Enum |
| city | ✅ | |
| source | ✅ | Must be `import_bulk` |

**Optional Columns:** email, budget_min, budget_max, timeline, requirement_notes, assign_to_partner_id

**Process:**
1. Upload CSV (max 10,000 rows)
2. Validation run: Show errors by row
3. Preview: First 10 rows
4. Confirm import
5. Background processing
6. Import report: X imported, Y failed (with reasons)

### 17.8.2 Export

| Export Type | Admin | Operations | Finance | Partner |
|-------------|-------|------------|---------|---------|
| All leads | ✅ | ✅ | ❌ | Own leads only |
| With PII | ✅ | ✅ | ❌ | ❌ |
| Anonymized | ✅ | ✅ | ✅ | ❌ |
| Financial summary | ✅ | ❌ | ✅ | ❌ |

**Export includes:** All lead fields, activity count, conversion status

---

## 17.9 CRM APIs

### POST /v1/leads/capture
*(Full spec in VOL-04)*

### GET /v1/admin/crm/leads

**Auth:** Admin (operations+)

**Query Params:**
```
status      — Filter by status
category    — Filter by category
city        — Filter by city
partner_id  — Filter by assigned partner
ai_class    — hot|warm|cold
source      — Filter by source
date_from   — Created after
date_to     — Created before
sort        — newest|oldest|score_desc|score_asc
page, limit
```

### PATCH /v1/admin/crm/leads/:id/assign

**Request:**
```json
{
  "partner_id": "partner_abc123",
  "reason": "Manual assignment — partner specializes in this budget range",
  "notify_partner": true
}
```

### PATCH /v1/admin/crm/leads/:id/status

**Request:**
```json
{
  "status": "converted",
  "deal_value": 8500000,
  "notes": "Booking confirmed. Commission applicable.",
  "related_booking_id": "booking_abc123"
}
```

### GET /v1/admin/crm/reports/funnel

**Response:**
```json
{
  "period": "2026-07",
  "funnel": {
    "created": 3124,
    "assigned": 2876,
    "contacted": 2100,
    "site_visit": 650,
    "quote_sent": 420,
    "negotiation": 280,
    "converted": 312,
    "lost": 890
  },
  "conversion_rate": 9.99,
  "avg_days_to_convert": 12.4,
  "top_sources": [
    { "source": "property_enquiry", "count": 1245, "conversion_rate": 11.2 },
    { "source": "homepage_quick_finder", "count": 892, "conversion_rate": 8.1 }
  ]
}
```

### GET /v1/admin/crm/partner-performance

**Response:**
```json
{
  "partners": [
    {
      "partner_id": "partner_abc",
      "name": "ABC Properties",
      "leads_received": 45,
      "response_rate": 91.1,
      "avg_response_mins": 18.4,
      "converted": 6,
      "conversion_rate": 13.3,
      "avg_rating": 4.7,
      "ranking": 1
    }
  ]
}
```

---

## 17.10 Customer Relationship Automation

### 17.10.1 Automated Nurturing Sequences

**For uncovered leads (not assigned or not contacted):**

| Delay | Channel | Message |
|-------|---------|---------|
| T+0 | WhatsApp | "Hi {name}, thank you for your interest! Our experts will contact you shortly." |
| T+30 min | SMS | "Hi {name}, we matched 15+ properties for you in {city}: {link}" |
| T+2 hours | Push (if app) | "New listings in {city} matching your requirement!" |
| T+24 hours | Email | Full property recommendations email |
| T+3 days | WhatsApp | "Have you found what you're looking for? Our experts are here to help." |

**Unsubscribe Mechanism:**
- SMS: Reply "STOP"
- WhatsApp: Reply "STOP"
- Email: Unsubscribe link in every email

### 17.10.2 Win-Back Sequences

**Trigger:** Lead marked as lost OR not contacted in 30 days

| Delay | Channel | Message |
|-------|---------|---------|
| T+7 days | Email | "Still looking for {category} in {city}? Prices have moved!" |
| T+14 days | WhatsApp | "Hi {name}, we have new {bhk} options in {city} within your budget." |
| T+30 days | SMS | "Find your perfect home: 45,000+ verified listings. {link}" |

---

*Continue to VOL-18 — SEO Architecture & Content Strategy*
