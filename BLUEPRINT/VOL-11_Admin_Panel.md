# VOL-11: Admin Panel — Complete Specification
## Roof Ridge — Enterprise Software Blueprint

---

## 11.1 Admin Panel Architecture

### 11.1.1 Overview

| Attribute | Value |
|-----------|-------|
| **Technology** | Next.js 14 (App Router), separate deployment |
| **URL** | `https://admin.roofridge.in/` |
| **Auth** | Email + Password + TOTP (Google Authenticator) |
| **Access** | Whitelist of admin user emails only |
| **Roles** | super_admin, operations, finance, support, marketing, data_analyst |

### 11.1.2 Role-Based Access Control (RBAC) Matrix

| Module | super_admin | operations | finance | support | marketing | data_analyst |
|--------|------------|------------|---------|---------|-----------|--------------|
| Dashboard | Full | Full | Read | Read | Read | Read |
| Users | Full | Read+Suspend | Read | Read+Update | Read | Read |
| Partners | Full | Full | Read | Read | Read | Read |
| Properties | Full | Full | — | Read | — | Read |
| Bookings | Full | Full | Read | Full | — | Read |
| Payments | Full | Read | Full | Read | — | Read |
| Leads/CRM | Full | Full | — | Full | Read | Read |
| Marketing | Full | — | — | — | Full | Read |
| CMS | Full | — | — | — | Full | — |
| Analytics | Full | Read | Read | — | Read | Full |
| Settings | Full | — | — | — | — | — |
| Admin Users | Full | — | — | — | — | — |
| Notifications | Full | — | — | — | Full | — |
| Grievances | Full | Full | — | Full | — | — |
| Audit Logs | Full | Read | Read | — | — | — |

---

## 11.2 Admin Login

### 11.2.1 Login Screen

**URL:** `https://admin.roofridge.in/login`

```
┌──────────────────────────────────────────────────────────────┐
│                 [Roof Ridge Admin Logo]                      │
│                 Admin Control Panel                          │
│──────────────────────────────────────────────────────────── │
│                                                              │
│  Work Email *                                               │
│  [                                          ]               │
│                                                              │
│  Password *                                                 │
│  [                                     🙈]                 │
│                                                              │
│  [ Login to Admin Panel ]                                   │
│                                                              │
│  [Forgot Password]                                          │
│                                                              │
│  🔒 This panel is restricted to authorized Roof Ridge       │
│  employees only. All access is logged.                      │
└──────────────────────────────────────────────────────────────┘
```

**Step 2 — TOTP Verification (if 2FA enabled):**
```
┌──────────────────────────────────────────────────────────────┐
│  Two-Factor Authentication                                   │
│  Enter the 6-digit code from your authenticator app         │
│                                                              │
│  [_] [_] [_] [_] [_] [_]                                   │
│                                                              │
│  [ Verify ]                                                 │
│                                                              │
│  [Use backup code instead]                                  │
└──────────────────────────────────────────────────────────────┘
```

**Security:**
- IP whitelisting (office IP + VPN required)
- Max 5 failed attempts → 30 minute lockout
- Session: 8-hour TTL, re-auth required after inactivity >2 hours
- All logins logged with IP, user-agent, timestamp
- Anomaly detection: Login from new IP → Email alert to super_admin

---

## 11.3 Admin Dashboard (Home)

**URL:** `https://admin.roofridge.in/dashboard`

```
Desktop Layout:
┌────────────────────────────────────────────────────────────────────┐
│ [🏠 Roof Ridge Admin]  Dashboard  Users  Partners  Properties  ... │
│ Welcome, Admin Name | Role: Operations | [🔔 12] [📋 Audit] [↩ Logout]│
│──────────────────────────────────────────────────────────────────── │
│                                                                      │
│  REAL-TIME KPIs (Auto-refresh every 30s)                            │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬────────┐ │
│  │ Online   │ New      │ Pending  │ Active   │ Today    │Pending │ │
│  │ Users    │ Users    │ Listings │ Bookings │ Revenue  │Reviews │ │
│  │ 🟢 234   │ ↑ 45     │ ⚠️ 34    │ 87       │₹1,42,500 │ 18     │ │
│  └──────────┴──────────┴──────────┴──────────┴──────────┴────────┘ │
│                                                                      │
│  ┌───────────────────────────────┐  ┌──────────────────────────┐   │
│  │  REVENUE TREND                │  │ ACTION REQUIRED ⚠️        │   │
│  │  [Line chart — 30 days]       │  │ 34 listings pending review│   │
│  │  MTD: ₹42.5L | MoM: +14.2%  │  │ 8 KYC pending approval   │   │
│  └───────────────────────────────┘  │ 3 grievances > 48 hrs   │   │
│                                      │ [→ Resolve All]          │   │
│  ┌───────────────────────────────┐  └──────────────────────────┘   │
│  │  LEAD FUNNEL (This Week)      │                                   │
│  │  [Funnel chart]               │  ┌──────────────────────────┐   │
│  │  Captured: 1,234              │  │ BOOKING HEATMAP           │   │
│  │  Assigned: 987 (80%)          │  │ [Heat map by city]        │   │
│  │  Contacted: 712 (72%)         │  └──────────────────────────┘   │
│  │  Converted: 89 (12.5%)        │                                   │
│  └───────────────────────────────┘                                   │
│                                                                      │
│  ┌──────────────────┐  ┌───────────────────┐  ┌─────────────────┐  │
│  │  CITY PERFORMANCE│  │ TOP PARTNERS      │  │ SYSTEM HEALTH   │  │
│  │  Delhi: ₹18.5L   │  │ ABC Properties    │  │ API: 🟢         │  │
│  │  Mumbai: ₹12.3L  │  │ XYZ Interiors     │  │ DB: 🟢          │  │
│  │  Bangalore: ₹9L  │  │ Ramesh Plumbing   │  │ ES: 🟢          │  │
│  └──────────────────┘  └───────────────────┘  │ WhatsApp: 🟡    │  │
│                                                 │ SMS: 🟢         │  │
│                                                 └─────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

**System Health Colors:**
- 🟢 Healthy (error rate <1%)
- 🟡 Degraded (error rate 1-5%)
- 🔴 Down / Critical (error rate >5% or unreachable)

---

## 11.4 User Management Module

**URL:** `/admin/users/`

### 11.4.1 User List View

```
┌──────────────────────────────────────────────────────────────────────┐
│ Users                                              [Export CSV] [+]  │
│──────────────────────────────────────────────────────────────────── │
│ [Search: name/mobile/email      ] [Filter ▾] [Status ▾] [City ▾]    │
│──────────────────────────────────────────────────────────────────── │
│ ID       | Name       | Mobile      | City  | KYC     | Status | Actions │
│ usr_001  | Rahul S.   | 98765*****  | Delhi | ✅Verf  | Active | [View]  │
│ usr_002  | Priya M.   | 91234*****  | Mumbai| ⏳Subm  | Active | [View]  │
│ usr_003  | Ankit R.   | 90987*****  | Pune  | ❌Rej   | Suspend| [View]  │
│──────────────────────────────────────────────────────────────────── │
│ Total: 1,23,456 | Showing 1-20 of 1,23,456 | Page 1 of 6,173       │
└──────────────────────────────────────────────────────────────────────┘
```

**Filter Options:**
- KYC Status: All / Pending / Submitted / Verified / Rejected
- Account Status: All / Active / Suspended / Deleted
- City
- Registration Date Range
- User Type: Buyer / Seller / Investor / All

**Sorting:**
- Registration Date (default: Newest)
- Name (A-Z)
- Last Active
- Wallet Balance

---

### 11.4.2 User Detail View

**URL:** `/admin/users/{user-id}/`

```
┌───────────────────────────────────────────────────────────────────┐
│ [← Users] User Detail — Rahul Sharma                             │
│ Status: 🟢 Active   KYC: ✅ Verified   Account ID: usr_abc123    │
│─────────────────────────────────────────────────────────────────  │
│ PROFILE INFO              │  ACCOUNT STATS                        │
│ Mobile: 98765 43210       │  Registered: Jul 1, 2025             │
│ Email: rahul@example.com  │  Last Login: Today, 2:30 PM          │
│ City: Delhi               │  Total Sessions: 234                 │
│ DOB: May 15, 1990         │  Wallet Balance: ₹1,250              │
│ User Type: Buyer          │  Referrals: 3                        │
│─────────────────────────────────────────────────────────────────  │
│ TABS: [KYC] [Listings] [Bookings] [Enquiries] [Payments] [Loans] │
│       [Notifications] [Activity Log] [Audit Trail]               │
│─────────────────────────────────────────────────────────────────  │
│ [KYC TAB]                                                        │
│ Aadhaar Front: [View Image] ✅ Auto-verified                     │
│ PAN: [View Image] ✅ Manually verified by admin_001              │
│ Aadhaar Number: XXXX XXXX 1234                                   │
│ PAN Number: ABCDE****F                                           │
│─────────────────────────────────────────────────────────────────  │
│ ADMIN ACTIONS                                                    │
│ [✅ Approve KYC] [❌ Reject KYC] [⚠️ Suspend Account]           │
│ [💬 Send Notification] [💰 Add Wallet Credit]                   │
│ [📋 View Audit Trail]  [🔒 Force Logout All Sessions]           │
└───────────────────────────────────────────────────────────────────┘
```

**KYC Approval Action:**
```
┌──────────────────────────────────────────────────────────┐
│  Approve KYC                                             │
│  User: Rahul Sharma                                      │
│                                                          │
│  Documents verified:                                     │
│  [✓] Aadhaar matches declared name                      │
│  [✓] PAN matches declared name                          │
│  [✓] Face on Aadhaar matches profile photo              │
│                                                          │
│  Notes (optional):                                       │
│  [                                              ]        │
│                                                          │
│  [ ✅ Approve & Notify User ] [Cancel]                  │
└──────────────────────────────────────────────────────────┘
```

**KYC Rejection Action:**
```
┌──────────────────────────────────────────────────────────┐
│  Reject KYC                                              │
│                                                          │
│  Rejection Reason *                                      │
│  (•) Document is blurry/unreadable                      │
│  ( ) Document expired                                   │
│  ( ) Name mismatch between documents                   │
│  ( ) Possible duplicate account                        │
│  ( ) Suspected forgery                                 │
│  ( ) Other                                             │
│                                                          │
│  User-facing message *                                   │
│  [Your KYC could not be verified. Please re-upload     ]│
│  [clear photos of your Aadhaar card (front and back).  ]│
│                                                          │
│  [ ❌ Reject & Notify User ] [Cancel]                   │
└──────────────────────────────────────────────────────────┘
```

---

## 11.5 Partner Management Module

**URL:** `/admin/partners/`

### 11.5.1 Partner List

Same structure as users list but with additional columns:
- Partner Type (dealer/service/vendor/...)
- RERA Number (for dealers)
- Active Listings Count
- Rating
- Subscription Tier
- Verification Status

### 11.5.2 Partner Approval Queue

**URL:** `/admin/partners/approvals/`

```
┌───────────────────────────────────────────────────────────────────┐
│ Partner Approval Queue (12 pending)                               │
│─────────────────────────────────────────────────────────────────  │
│ [Filter: All Types ▾] [Sort: Oldest First ▾]                     │
│─────────────────────────────────────────────────────────────────  │
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐  │
│ │ ABC Properties Pvt Ltd — Property Dealer                    │  │
│ │ Applied: Jul 20, 2026 · Delhi · 8 years exp.                │  │
│ │ RERA: RERA/DL/GRP/2022/52                                  │  │
│ │ Docs: [✅ Aadhaar] [✅ PAN] [✅ RERA Cert] [⚠️ GST Missing] │  │
│ │                                                             │  │
│ │ [View Full Application] [✅ Approve] [❌ Reject] [Request Info]│  │
│ └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

**RERA Verification:**
- Button: "Verify on RERA Portal" → Opens RERA state portal in new tab
- Auto-scrape (if feasible): Admin configures state RERA portal URLs
- Manual: Admin visually verifies and checks checkbox

**Approve Partner:**
- Partner status: `pending_review` → `active`
- Welcome email + SMS sent
- B2B App access granted
- Analytics: Partner onboarding tracked

**Reject Partner:**
- Rejection reason required (from dropdown + notes field)
- Rejection email with reason and reapplication instructions
- Cooldown: Cannot reapply for 7 days

---

## 11.6 Property Moderation Module

**URL:** `/admin/properties/`

### 11.6.1 Moderation Queue

```
┌───────────────────────────────────────────────────────────────────┐
│ Property Moderation Queue (34 pending)                            │
│ [Filter ▾] [City ▾] [Type ▾]   [Auto-assign to me] [Bulk Action]│
│─────────────────────────────────────────────────────────────────  │
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐  │
│ │ prop_xyz789 · 3BHK Flat · Dwarka · Delhi       Waiting: 4.5h│  │
│ │ Posted by: Rahul Sharma (KYC ✅) — Type: Individual Owner   │  │
│ │ Price: ₹85L · 8 photos · RERA: ✅                          │  │
│ │ AI Flags: None                                              │  │
│ │                                                             │  │
│ │ [Quick Review ▸] [Approve] [Reject] [Request Reupload]     │  │
│ └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

**Quick Review Panel:**
```
┌────────────────────────────────────────────────────────────────────┐
│ Review: 3BHK Flat — Dwarka Sector 12                              │
│──────────────────────────────────────────────────────────────────  │
│ [Photo 1] [Photo 2] [Photo 3] [Photo 4] ← → (swipe)              │
│──────────────────────────────────────────────────────────────────  │
│ Title: Spacious 3 BHK in Dwarka Sector 12                        │
│ Description: [Full text with AI analysis highlights]              │
│ Price: ₹85,00,000 (₹6,800/sqft) — AI: ✅ Within market range     │
│ RERA: RERA/DL/GRP/OTHERS/2022/52 — Status: ✅ Verified           │
│ KYC: ✅ Verified — Previous listings: 2 (both good standing)      │
│──────────────────────────────────────────────────────────────────  │
│ CHECKLIST                                                         │
│ [✓] Photos are clear and relevant                                │
│ [✓] Price is realistic (no extreme outliers)                     │
│ [✓] Description is not misleading                               │
│ [✓] No phone numbers visible in photos                          │
│ [✓] RERA verified                                               │
│ [✓] No competitor platform URLs in description                  │
│──────────────────────────────────────────────────────────────────  │
│ Notes for record:                                                 │
│ [                                                        ]        │
│──────────────────────────────────────────────────────────────────  │
│         [✅ Approve & Publish]   [❌ Reject]   [📝 Request Edits] │
└────────────────────────────────────────────────────────────────────┘
```

**Bulk Actions:**
- Select multiple → Approve All / Reject All / Assign to Moderator

**Auto-Assignment:**
- Round-robin among online moderators (tracked in Redis)
- Manual assignment possible from listing detail

---

## 11.7 Booking Management Module

**URL:** `/admin/bookings/`

### 11.7.1 Booking List

**Filters:**
- Status: All / Pending / Assigned / In Progress / Completed / Cancelled
- Category: Plumbing / Electrical / ...
- City
- Date Range
- Partner Assigned: Yes / No

**Real-time Updates:** Active booking rows update status without page refresh (WebSocket)

### 11.7.2 Booking Detail — Admin View

Additional fields vs user view:
- Partner assignment history (if re-assigned)
- Admin notes field
- Manual partner re-assignment
- Force status change (with mandatory reason)
- Internal ticket link
- Financial breakdown (amount collected, platform fee, payout due)

**Force Status Change:**
```
⚠️ Force Status Override
You are about to force-change status to: Completed
This will trigger: Payout to partner, rating request to user

Reason (mandatory): [                                   ]

[ ✅ Confirm Force Change ] [Cancel]
```

---

## 11.8 CRM & Lead Management Module

**URL:** `/admin/crm/`

### 11.8.1 Lead Dashboard

```
┌───────────────────────────────────────────────────────────────────┐
│ CRM — Lead Dashboard                                              │
│─────────────────────────────────────────────────────────────────  │
│ Today's Summary:                                                  │
│ New Leads: 156 | Assigned: 120 | Pending Assignment: 36          │
│ Overdue Follow-ups: 12 | Hot Leads Uncontacted >4hr: 8           │
│─────────────────────────────────────────────────────────────────  │
│ LEAD FUNNEL OVERVIEW                                              │
│ [Funnel chart: Received → Assigned → Contacted → Converted]      │
│─────────────────────────────────────────────────────────────────  │
│ PENDING ASSIGNMENT (36 leads)                                     │
│ [Auto-Assign All to Partners] [Manual Assign ▾]                  │
│─────────────────────────────────────────────────────────────────  │
│ LEAD TABLE (All | New | Hot | Overdue)                           │
│ ID | Score | Name | Category | City | Source | Status | Assign   │
└───────────────────────────────────────────────────────────────────┘
```

### 11.8.2 Lead Routing Engine — Admin Configuration

**URL:** `/admin/crm/routing-rules/`

```
ROUTING RULES (Admin-configurable):

Rule 1: Auto-assign property leads in Delhi to premium dealers first
  → If lead.city = "Delhi" AND lead.category = "property_buy"
  → Assign to: Partners with subscription = "Gold" in Delhi, sorted by rating DESC
  → If no Gold partner available in 5 min: Assign Silver partners
  → If no Silver partner in 10 min: Assign Free partners
  → If no assignment in 30 min: Notify admin

Rule 2: Hot lead priority
  → If lead.ai_score >= 80
  → SMS admin + assigned partner immediately
  → 15-minute callback SLA enforced

Rule 3: Service professional leads
  → Assign to nearest available partner (by GPS/pincode)
  → Max radius: 5km
  → If none in 5km: Expand to 10km
```

**Admin-editable fields:**
- Rule name
- Trigger conditions (dropdown + value)
- Assignment priority (subscription tier order)
- Fallback behavior
- SLA time (minutes)
- Alert conditions

---

## 11.9 Financial Management Module

**URL:** `/admin/finance/`

### 11.9.1 Financial Dashboard

```
┌───────────────────────────────────────────────────────────────────┐
│ Finance Dashboard                                                 │
│ [Today] [This Week] [This Month] [Custom Range]                  │
│─────────────────────────────────────────────────────────────────  │
│ GROSS REVENUE:  ₹42,50,000 (+14.2% MoM)                         │
│ REFUNDS:        ₹1,20,000                                         │
│ NET REVENUE:    ₹41,30,000                                        │
│ PLATFORM FEES:  ₹8,26,000 (20% of service revenue)              │
│─────────────────────────────────────────────────────────────────  │
│ PAYOUTS DUE                                                       │
│ Partners (next batch Aug 5): ₹18,45,000                          │
│ [Process Payouts] [Export Payout Sheet]                          │
│─────────────────────────────────────────────────────────────────  │
│ PENDING REFUNDS (8)                                               │
│ [Process All] [Review Individually]                              │
│─────────────────────────────────────────────────────────────────  │
│ PAYMENT RECONCILIATION                                            │
│ Razorpay Settlements: ✅ Reconciled (Jul 22)                     │
│ Unreconciled: 3 transactions                                      │
│ [View Discrepancies]                                             │
└───────────────────────────────────────────────────────────────────┘
```

### 11.9.2 Refund Processing

**URL:** `/admin/finance/refunds/`

| Field | Type | Required |
|-------|------|---------|
| Booking/Order ID | Text | ✅ |
| Refund Reason | Select (admin-managed list) | ✅ |
| Refund Amount | Number (max: paid amount) | ✅ |
| Refund Method | Radio: Original Payment / Wallet | ✅ |
| Admin Notes (internal) | Textarea | ✅ |
| User-facing Message | Textarea | ✅ |

**Process:**
1. Admin initiates refund
2. If via original payment: Razorpay API refund call
3. If via wallet: Credit to wallet
4. Notification to user
5. Audit log entry

### 11.9.3 Partner Payouts

**Schedule:** Auto-triggered on 5th of every month

**Manual Trigger:**
- Only super_admin and finance role
- Generates payout batch
- Downloads NEFT/IMPS payout file (bank format)
- Uploads to bank portal or triggers API (RazorpayX mass payout)
- Marks payouts as `processing` → `completed` on webhook

**Payout Hold:**
- Can hold payout for specific partner (e.g., fraud investigation)
- Reason required
- Automated email to partner with hold notice

---

## 11.10 Content Management System (CMS)

**URL:** `/admin/cms/`

### 11.10.1 CMS Structure

```
CMS Modules:
├── Homepage
│   ├── Hero Section (text, buttons, background)
│   ├── Service Cards (enable/disable/reorder/edit)
│   ├── Partner Logos (add/remove/reorder)
│   ├── Testimonials (add/edit/delete/reorder)
│   ├── Stats (floor values, labels)
│   └── App Download Section
│
├── City/Locality Pages
│   ├── City descriptions
│   ├── Featured localities
│   └── FAQs per city
│
├── Blog
│   ├── Articles (WYSIWYG editor)
│   ├── Categories
│   ├── Authors
│   └── Tags
│
├── Service Pages
│   ├── Category descriptions
│   ├── Sub-service list + pricing
│   └── FAQs per service
│
├── Legal Pages
│   ├── Terms & Conditions
│   ├── Privacy Policy
│   ├── Cookie Policy
│   └── Grievance Policy
│
├── Email Templates
│   ├── Welcome Email
│   ├── Booking Confirmation
│   └── ...
│
└── Notification Templates
    ├── SMS templates
    ├── WhatsApp templates
    └── Push notification templates
```

### 11.10.2 Blog Management

**URL:** `/admin/cms/blog/`

```
┌───────────────────────────────────────────────────────────────────┐
│ Blog Articles                                    [+ New Article]  │
│─────────────────────────────────────────────────────────────────  │
│ [All] [Published] [Draft] [Scheduled] [Archived]                 │
│─────────────────────────────────────────────────────────────────  │
│ Title                    | Author | Status | Views | Actions     │
│ Top 5 Areas in Delhi...  | Priya  | Live   | 4,234 | Edit/Delete │
│ How to Get Home Loan...  | Admin  | Draft  | —     | Edit/Delete │
└───────────────────────────────────────────────────────────────────┘
```

**Article Editor:**
- WYSIWYG editor (TipTap or Quill)
- SEO fields: Meta title, Meta desc, Slug, OG Image
- Featured image upload (auto-compressed to WebP)
- Category + Tags
- Author selection
- Schedule publish (date/time)
- Preview before publish
- Structured data: Article schema auto-generated

---

## 11.11 Notification Campaign Management

**URL:** `/admin/marketing/campaigns/`

### 11.11.1 Create Campaign

```
┌───────────────────────────────────────────────────────────────────┐
│ Create Notification Campaign                                      │
│─────────────────────────────────────────────────────────────────  │
│ Campaign Name: [                              ]                   │
│─────────────────────────────────────────────────────────────────  │
│ TARGET AUDIENCE                                                   │
│ (•) All Users                                                    │
│ ( ) Segment:                                                     │
│     Cities: [Delhi, Mumbai ×]                                    │
│     User Type: [Buyer ×]                                         │
│     Registered After: [2026-01-01]                               │
│     Has Active Booking: [Yes ▾]                                  │
│     Estimated reach: 12,456 users                               │
│                                                                   │
│ CHANNELS                                                         │
│ [✓] Push Notification  [✓] SMS  [ ] Email  [ ] WhatsApp         │
│─────────────────────────────────────────────────────────────────  │
│ CONTENT                                                           │
│ Title: [                                              ] (60 chars)│
│ Body: [                                               ] (160 chars)│
│ Image URL: [                                          ] (optional)│
│ Action URL: [https://roofridge.in/...                ]           │
│ Template: [Select saved template ▾] OR write custom              │
│─────────────────────────────────────────────────────────────────  │
│ SCHEDULE                                                          │
│ (•) Send Now                                                     │
│ ( ) Schedule for: [Date] [Time]                                  │
│─────────────────────────────────────────────────────────────────  │
│ PREVIEW: [Send Test to myself]                                   │
│                                                                   │
│ [ Create Campaign ] [Save as Draft]                              │
└───────────────────────────────────────────────────────────────────┘
```

### 11.11.2 Campaign Performance Report

```
Campaign: "Monsoon Sale — Home Services"
Sent: Jul 20, 2026 · 10:00 AM

Delivery Summary:
  Push Sent: 45,000  | Delivered: 43,200 (96%)  | Opened: 12,960 (30%)
  SMS Sent:  30,000  | Delivered: 29,100 (97%)  | Clicked: 2,619 (9%)

Conversions (7-day window):
  Bookings from push: 234
  Bookings from SMS: 89
  Total campaign revenue attributed: ₹3,45,600
  ROI: 234x (cost ₹1,476 → revenue ₹3,45,600)
```

---

## 11.12 Grievance Management

**URL:** `/admin/grievances/`

### 11.12.1 Grievance List

```
┌───────────────────────────────────────────────────────────────────┐
│ Grievances                                                        │
│ SLA: Acknowledge 2hrs | Resolve 48hrs | IRDAI/RERA cases: 30days │
│─────────────────────────────────────────────────────────────────  │
│ [All] [Open] [In Progress] [Escalated] [Resolved] [SLA Breach]   │
│─────────────────────────────────────────────────────────────────  │
│ GR-001 | Booking Issue   | Rahul S. | Open  | 4hrs ago | ⚠️3SLA │
│ GR-002 | Refund Pending  | Priya M. | Prog  | 2days ago| 🔴SLA  │
│─────────────────────────────────────────────────────────────────  │
│ [Export for IRDAI/Consumer Court compliance report]               │
└───────────────────────────────────────────────────────────────────┘
```

**Grievance Detail:**
- Full user complaint text
- Attachment viewer
- Resolution timeline tracker
- Assign to support agent
- Escalation to manager
- Resolution notes (visible to user)
- Outcome: Resolved / Refunded / No Action / Escalated to IRDAI
- Mandatory resolution within 48 hours (SLA)

---

## 11.13 Analytics & Reports Module

**URL:** `/admin/analytics/`

### 11.13.1 Reports Available

| Report | Frequency | Format |
|--------|-----------|--------|
| Daily Active Users | Daily | Chart + CSV |
| Revenue Breakdown | Daily/Monthly | Chart + CSV |
| Booking Performance | Weekly | Chart + CSV |
| Lead Conversion Funnel | Weekly | Funnel chart |
| Partner Performance | Monthly | Table + CSV |
| City-wise Traffic | Weekly | Map + CSV |
| Cohort Retention | Monthly | Heatmap |
| Search Keywords | Daily | Table |
| Notification Delivery | Per Campaign | Table |
| Error Rate by API | Real-time | Chart |

### 11.13.2 Custom Report Builder

```
┌───────────────────────────────────────────────────────────────────┐
│ Custom Report Builder                                             │
│─────────────────────────────────────────────────────────────────  │
│ Metrics: [Revenue ×] [Bookings ×] [New Users ×] [+ Add]         │
│ Dimensions: [City ▾] [+ Add dimension]                           │
│ Date Range: [Last 30 days ▾]                                     │
│ Group By: [Day ▾]                                                │
│ Filters: [+ Add Filter]                                          │
│                                                                   │
│ [ Generate Report ] [Schedule (Daily/Weekly)] [Export CSV/Excel] │
│─────────────────────────────────────────────────────────────────  │
│ [Chart Preview] ← renders inline after generation               │
└───────────────────────────────────────────────────────────────────┘
```

---

## 11.14 Audit Log Viewer

**URL:** `/admin/audit-logs/`

```
┌───────────────────────────────────────────────────────────────────┐
│ Audit Log                                                         │
│ [Filter: Admin User ▾] [Action Type ▾] [Date Range] [Search]    │
│─────────────────────────────────────────────────────────────────  │
│ Timestamp          | User        | Action              | Target  │
│ Jul 23 14:30:12   | admin_priya  | KYC_APPROVED       | usr_001 │
│ Jul 23 14:25:44   | admin_rahul  | LISTING_REJECTED   | prop_002│
│ Jul 23 14:20:01   | admin_priya  | REFUND_PROCESSED   | pay_003 │
│─────────────────────────────────────────────────────────────────  │
│ Click any row to see full JSON payload of the action.            │
│ [Export Audit Log CSV] (max 10,000 rows)                         │
└───────────────────────────────────────────────────────────────────┘
```

**Row Detail (on click):**
```json
{
  "timestamp": "2026-07-23T14:30:12.543Z",
  "admin_id": "admin_priya",
  "admin_email": "priya@roofridge.in",
  "action": "KYC_APPROVED",
  "resource_type": "user",
  "resource_id": "usr_abc123",
  "ip_address": "103.21.x.x",
  "user_agent": "Mozilla/5.0 (Macintosh)...",
  "payload": {
    "before": { "kyc_status": "submitted" },
    "after": { "kyc_status": "verified" },
    "notes": "Documents verified. Aadhaar and PAN match."
  }
}
```

---

## 11.15 Admin User Management

**URL:** `/admin/settings/users/` (super_admin only)

### 11.15.1 Create Admin User

| Field | Required | Validation |
|-------|----------|------------|
| Full Name | ✅ | |
| Work Email | ✅ | Must be @roofridge.in domain |
| Role | ✅ | Enum |
| Department | ✅ | Engineering/Operations/Finance/Support/Marketing |
| Phone | ✅ | |
| Two-Factor Auth | ✅ | Required: Must set up TOTP in first login |

**Permissions:**
- Role-based by default
- Custom overrides: Grant/revoke specific module access per user
- IP Restriction: Optionally restrict to specific IP ranges

### 11.15.2 Admin Activity Monitoring

- Each admin's last login, session duration, actions per day
- Flag if an admin accesses PII fields unusually often
- Monthly report of admin activity auto-emailed to super_admin

---

## 11.16 Platform Settings

**URL:** `/admin/settings/`

| Setting | Type | Description |
|---------|------|-------------|
| Platform Name | Text | Displayed everywhere |
| Support Phone | Text | Shown in footer, help pages |
| Support Email | Email | Help emails |
| WhatsApp Support Number | Text | |
| Default City | Select | For unlocated users |
| Serviceable Cities | Multi-select | Turns services on/off per city |
| Lead Expiry (hours) | Number | Leads expire and released after N hours |
| OTP Expiry (minutes) | Number | Default: 5 |
| Session Duration (minutes) | Number | Default: 900 (15 hours) |
| Max Login Attempts | Number | Default: 5 |
| Platform Fee % (Services) | Number | Default: 20 |
| Referral Reward Amount | Number | Default: ₹500 |
| KYC Auto-Approve | Toggle | DANGEROUS: Enable with care |
| Maintenance Mode | Toggle | Shows maintenance page to users |
| Maintenance Message | Textarea | Shown during maintenance |
| Sitemap Auto-Generate | Toggle | Weekly |
| New Listing Moderation | Toggle | ON: Manual review, OFF: Auto-publish |

---

*Continue to VOL-12 — B2C Mobile App*
