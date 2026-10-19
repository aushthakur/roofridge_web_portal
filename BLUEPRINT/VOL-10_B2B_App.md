# VOL-10: B2B App — Partner Flows (Complete)
## Roof Ridge — Enterprise Software Blueprint

---

## 10.1 B2B App Architecture

### 10.1.1 App Overview

| Attribute | Value |
|-----------|-------|
| **Platform** | React Native (iOS + Android) |
| **App Name** | Roof Ridge Partner |
| **Target Users** | Property Dealers, Builders, Service Professionals, Material Vendors, Legal Partners, Loan DSAs |
| **Primary Purpose** | Lead management, job tracking, inventory management, earnings |

### 10.1.2 Navigation Structure

```
Bottom Tab Bar (5 tabs):
┌─────────────────────────────────────────────────────────────┐
│ [🏠 Home] [📋 Leads] [📅 Jobs] [💰 Earnings] [👤 Profile] │
└─────────────────────────────────────────────────────────────┘
```

---

## 10.2 Partner Registration & Onboarding

### 10.2.1 Registration Flow

**Screen 1: Welcome & Category Selection**
```
┌──────────────────────────────────────────────────────────┐
│            [Roof Ridge Partner Logo]                     │
│                                                          │
│  Welcome to Roof Ridge Partner                          │
│  Join 10,000+ partners earning with us                  │
│                                                          │
│  What type of partner are you?                          │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ 🏠 Property Dealer│  │ 🏗 Builder /     │             │
│  │    / Broker      │  │   Developer      │             │
│  └──────────────────┘  └──────────────────┘             │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ 📐 Architect /   │  │ 🔧 Service       │             │
│  │  Interior Design │  │   Professional   │             │
│  └──────────────────┘  └──────────────────┘             │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ 🧱 Material      │  │ ⚖️ Legal         │             │
│  │    Vendor        │  │   Partner        │             │
│  └──────────────────┘  └──────────────────┘             │
│  ┌──────────────────┐                                   │
│  │ 🏦 Loan / Insur. │                                   │
│  │    DSA           │                                   │
│  └──────────────────┘                                   │
└──────────────────────────────────────────────────────────┘
```

**Screen 2: Mobile OTP Verification**
(Same as B2C auth — shared module)

**Screen 3: Basic Profile**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name / Company Name | Text | ✅ | 2-200 chars |
| Brand Name | Text | ❌ | 2-100 chars |
| Mobile | Auto-filled | — | From OTP |
| Email | Email | ✅ | Valid format |
| Service Cities | Multi-select | ✅ | Min 1 city |
| Service Localities | Multi-select | ❌ | |
| Years of Experience | Number | ✅ | 0-50 |

**Screen 4: Category-Specific Details**

**For Property Dealer/Broker:**
| Field | Required | Notes |
|-------|----------|-------|
| RERA Registration Number | ✅ | Format validated per state |
| Areas of Operation | ✅ | Localities + property types |
| Number of Active Listings | ❌ | Self-reported |
| Specialization | ❌ | Residential/Commercial/Both |

**For Service Professional:**
| Field | Required | Notes |
|-------|----------|-------|
| Skill Categories | ✅ | Multi-select from service list |
| Service Radius | ✅ | 1-50 km |
| Tool/Equipment ownership | ❌ | |
| Certifications | ❌ | Upload files |

**For Material Vendor:**
| Field | Required | Notes |
|-------|----------|-------|
| GST Number | ✅ | 15-char GSTIN format |
| Product Categories | ✅ | Multi-select |
| Delivery Cities | ✅ | |
| Minimum Order Value | ✅ | |
| Warehouse Location | ❌ | |

**Screen 5: Document Upload (KYC)**

Required for all partners:
- Aadhaar (front + back)
- PAN Card

Category-specific:
- Property Dealer: RERA Certificate
- Builder: Builder Registration Certificate
- Material Vendor: GST Certificate + Trade License
- Service Professional: Skill Certificate + Police Verification (if available)

**Screen 6: Bank Account Details**

```
┌──────────────────────────────────────────────────────────┐
│  Bank Account for Payouts                                │
│                                                          │
│  Account Holder Name *                                  │
│  [                              ]                        │
│                                                          │
│  Account Number *                                       │
│  [                              ]                        │
│                                                          │
│  Confirm Account Number *                               │
│  [                              ]                        │
│                                                          │
│  IFSC Code *                                            │
│  [        ] [Verify IFSC →]                             │
│                                                          │
│  Bank Name: Auto-filled after IFSC verification         │
│  Branch:    Auto-filled                                  │
│                                                          │
│  🔒 Your bank details are encrypted and secure.         │
│                                                          │
│  [ Submit Application ]                                 │
└──────────────────────────────────────────────────────────┘
```

**IFSC Verification:**
- API: `GET /v1/banks/ifsc/{ifsc_code}` (uses RazorpayX IFSC API)
- Returns: Bank name, branch, city
- Success: Auto-fills bank name and branch

**Bank Account:**
- Stored AES-256 encrypted in DB
- Never returned in plain text in any API response
- Only last 4 digits shown in UI after save

**Submit Application:**
- Status: `pending_review`
- Admin notified
- Partner sees: "Application submitted. We'll review within 24-48 hours."
- Approval: `POST /v1/admin/partners/:id/approve` from Admin Panel

---

## 10.3 B2B Dashboard (Home Tab)

```
┌──────────────────────────────────────────────────────────┐
│  Good morning, Ramesh! 👋               [🔔 3] [⚙️]    │
│  Plumber · Delhi                                         │
│─────────────────────────────────────────────────────────│
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │ New      │ Today's  │ This     │Pending   │          │
│  │ Leads    │ Jobs     │ Month ₹  │Follow-up │          │
│  │   5      │   2      │ ₹8,450   │   3      │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
│─────────────────────────────────────────────────────────│
│  UPCOMING JOBS                                           │
│                                                          │
│  🔧 Plumbing — Tap Repair                               │
│  Today 2:00 PM · Dwarka Sector 12                       │
│  Priya Mehta (987*****10)                               │
│  [En Route] [Call] [Chat]                               │
│                                                          │
│  🔧 Drain Cleaning                                      │
│  Today 5:00 PM · Rohini                                 │
│  [Accept/Decline] (if not yet accepted)                 │
│─────────────────────────────────────────────────────────│
│  NEW LEADS (3)                                          │
│  ┌────────────────────────────────────────────┐         │
│  │ 🔴 HOT | Plumbing | Dwarka | Today        │         │
│  │ "Kitchen pipe leak — URGENT"               │         │
│  │ [View] [Call] [Accept]                     │         │
│  └────────────────────────────────────────────┘         │
│─────────────────────────────────────────────────────────│
│  QUICK ACTIONS                                          │
│  [Update Availability] [Add Listing] [Share Profile]   │
└──────────────────────────────────────────────────────────┘
```

**KPI Cards:**
- Tap card: Navigate to full list (leads/jobs/earnings/followups)
- Real-time data (pulled on app foreground)

---

## 10.4 Lead Management (Partner CRM) — B2B Tab

### 10.4.1 Lead Inbox

```
┌──────────────────────────────────────────────────────────┐
│  [← Back]    Leads                  [Filter ▾] [Sort ▾] │
│─────────────────────────────────────────────────────────│
│  [All] [New] [Contacted] [Site Visit] [Converted] [Lost]│
│─────────────────────────────────────────────────────────│
│                                                          │
│  ┌───────────────────────────────────────────────┐      │
│  │ 🔴 HOT     NEW                                │      │
│  │ Priya Mehta                                   │      │
│  │ Property Buyer · 3BHK · Delhi · ₹80L-1Cr     │      │
│  │ Source: Homepage Quick Finder                 │      │
│  │ Received: 2 hours ago                         │      │
│  │                                               │      │
│  │ [View Details] [Call Now] [WhatsApp]          │      │
│  └───────────────────────────────────────────────┘      │
│                                                          │
│  ┌───────────────────────────────────────────────┐      │
│  │ 🟡 WARM    CONTACTED                          │      │
│  │ Rahul Sharma                                  │      │
│  │ Property Buyer · 2BHK · Dwarka · ₹50L-70L   │      │
│  │ Last contacted: Yesterday 3 PM               │      │
│  │ ⏰ Follow-up due: Today 5 PM                 │      │
│  │                                               │      │
│  │ [View Details] [Log Activity] [Set Reminder] │      │
│  └───────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

**Lead Temperature Badges:**
- 🔴 HOT: AI score 70+, contacted within last 24hr, urgent requirement
- 🟡 WARM: AI score 40-69, interested but no urgency
- 🔵 COLD: AI score <40, casual inquiry

**Filter Options:**
- Temperature: Hot/Warm/Cold
- Status: New/Contacted/Site Visit/Quote Sent/Negotiation/Converted/Lost
- Date: Today/This Week/This Month/Custom
- Source: All/Homepage/Property Enquiry/Referral/...
- City

**Sort Options:**
- Newest First (default)
- Lead Score (Highest First)
- Follow-up Due (Soonest)

---

### 10.4.2 Lead Detail Screen

```
┌──────────────────────────────────────────────────────────┐
│  [← Leads]     Lead Detail                              │
│─────────────────────────────────────────────────────────│
│                                                          │
│  Priya Mehta                    🔴 HOT  Score: 85/100   │
│  📱 987*****10                                           │
│  ✉️ priya@example.com                                   │
│                                                          │
│  REQUIREMENT                                            │
│  Type: Buy Property                                     │
│  Configuration: 3 BHK                                  │
│  Budget: ₹80L - ₹1Cr                                   │
│  Preferred: Dwarka, Delhi                               │
│  Source: Property Enquiry — Listing #12345             │
│  Received: Jul 23, 2:30 PM                             │
│                                                          │
│  STATUS PIPELINE                                        │
│  [New] → [Contacted] → [Site Visit] → [Negotiation] → [Converted]│
│  ↑ Current: NEW                                         │
│  [Update Status]                                        │
│                                                          │
│  ACTIONS                                                │
│  [📞 Call]  [💬 WhatsApp]  [📧 Email]                  │
│  [📅 Set Follow-up]  [📝 Add Note]                     │
│  [🏠 Share Listings]                                    │
│                                                          │
│  ACTIVITY TIMELINE                                      │
│  Jul 23, 2:30 PM — Lead Received (System)              │
│  Jul 23, 3:00 PM — "Called, no answer" (You)          │
│  Jul 23, 3:15 PM — WhatsApp sent (You)                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Reveal Contact:**
- Mobile shown masked by default: `987*****10`
- Tap "Reveal" or "Call": Full number revealed
- API: `POST /v1/leads/:id/reveal-contact`
- This action is logged and deducted from lead credits (subscription-based)

**Log Activity:**
```
Activity Type: [ Call ▾]
Duration: [5 min]
Notes: [Called, interested in Dwarka properties. Will visit Sunday.]
Next Action: [Schedule Follow-up ▾]
Date: [Jul 25, 10:00 AM]
[ Save Activity ]
```

**Share Listings:**
- Opens listing selector (own listings matching budget + location)
- Selected listings compiled into shareable WhatsApp message
- "Shared 3 listings via WhatsApp" logged as activity

---

### 10.4.3 Status Update Flow

**Update Pipeline Modal:**
```
┌──────────────────────────────────────────────────────┐
│  Update Lead Status                                  │
│                                                      │
│  Current: NEW → Change to:                          │
│                                                      │
│  (•) Contacted                                      │
│  ( ) Site Visit Scheduled                          │
│  ( ) Quote Sent                                    │
│  ( ) Negotiation                                   │
│  ( ) Converted ✅                                   │
│  ( ) Lost ❌                                        │
│                                                      │
│  [If Converted] Sale Value: ₹[        ]             │
│  [If Lost] Reason: [ Didn't like location ▾ ]       │
│                                                      │
│  Notes (required for Converted/Lost):               │
│  [                                        ]         │
│                                                      │
│  [ Update Status ]                                  │
└──────────────────────────────────────────────────────┘
```

---

## 10.5 Listing / Inventory Management (For Dealers & Builders)

### 10.5.1 My Listings Screen

```
┌──────────────────────────────────────────────────────────┐
│  My Listings (45)                        [+ Add Listing] │
│─────────────────────────────────────────────────────────│
│  [Live(32)] [Pending(5)] [Paused(3)] [Expired(5)]       │
│─────────────────────────────────────────────────────────│
│  ┌───────────────────────────────────────────────┐      │
│  │ [Thumb] 3BHK, Dwarka Sector 12 · ₹85L        │      │
│  │         🟢 LIVE · 234 views · 12 enquiries   │      │
│  │                                               │      │
│  │ [Edit] [Pause] [Boost] [Share] [More ···]    │      │
│  └───────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

**Bulk Upload (Dealers/Builders):**
- "Bulk Upload" option opens file picker
- Accept: XLSX, CSV
- Template download: "Download Template"
- Upload: Validates rows, shows error summary
- Maximum 500 rows per upload
- API: `POST /v1/partners/listings/bulk-upload`

**Upload Template Columns:**
| Column | Required | Format |
|--------|----------|--------|
| listing_type | ✅ | sale/rent |
| property_type | ✅ | flat/villa/plot/... |
| city | ✅ | Text |
| locality | ✅ | Text |
| bhk_type | ✅ | 1BHK/2BHK/3BHK/... |
| bedrooms | ✅ | Number |
| super_built_up_area | ✅ | Number (sqft) |
| price | ✅ | Number (INR) |
| title | ✅ | Text max 200 chars |
| description | ❌ | Text |
| rera_number | Conditional | |
| amenities | ❌ | Comma-separated |

---

## 10.6 Job Management (Service Professionals)

### 10.6.1 Incoming Booking Notification

**Push Notification:**
```
🔔 New Booking Request!
Plumbing — Tap Repair
Today 2:00 PM · Dwarka Sector 12
₹199 base | Accept in 15 min or it auto-routes to another partner
[Accept] [Decline]
```

**Booking Detail Screen:**
```
┌──────────────────────────────────────────────────────────┐
│  New Booking Request                    ⏱️ 14:32 left   │
│─────────────────────────────────────────────────────────│
│  BK-2026-001234                                         │
│  Plumbing — Tap Repair                                  │
│                                                          │
│  📅 Today, 2:00 PM – 4:00 PM                            │
│  📍 Dwarka Sector 12 (2.3 km from you)                  │
│  [View on Map]                                           │
│                                                          │
│  Customer Note: "Kitchen tap is dripping constantly"    │
│  [📷 View Photo]                                        │
│                                                          │
│  💰 Base: ₹199 (Actual charges confirmed on-site)        │
│  💼 Your commission: 80% of total collected             │
│                                                          │
│  ────────────────────────────────────────               │
│                                                          │
│  [ ✅ Accept Booking ]    [ ❌ Decline ]                 │
│                                                          │
│  ⚠️ Declining frequently may affect your ranking         │
└──────────────────────────────────────────────────────────┘
```

**Auto-routing Timer:**
- 15 minutes to accept/decline
- Countdown timer visible
- After 15 min: Booking routes to next available partner
- 3 consecutive declines: Warning notification
- 5 declines in 7 days: Temporary ranking penalty

### 10.6.2 Active Job Management

**Job Status Screen:**
```
┌──────────────────────────────────────────────────────────┐
│  Active Job — BK-2026-001234                            │
│─────────────────────────────────────────────────────────│
│  Plumbing — Tap Repair                                  │
│  Priya Mehta · 987*****10                               │
│  Dwarka Sector 12, Flat 401                             │
│  [Navigate]                                             │
│─────────────────────────────────────────────────────────│
│  STATUS                                                 │
│  Current: ✅ ACCEPTED                                   │
│                                                          │
│  [ → Mark: EN ROUTE ]                                  │
│  (tap when you leave for the job)                       │
│─────────────────────────────────────────────────────────│
│  AFTER ARRIVAL                                          │
│  [ → Mark: IN PROGRESS ]                               │
│  [ 📷 Upload Before Photo ]                             │
│─────────────────────────────────────────────────────────│
│  AFTER COMPLETION                                       │
│  [ → Mark: COMPLETED ]                                 │
│  [ 📷 Upload After Photo ]                              │
│  [ Enter Final Amount: ₹ ]                             │
│  [ Add Completion Notes ]                               │
│  [ Request Customer Sign-off ]                          │
└──────────────────────────────────────────────────────────┘
```

**Mark Complete Flow:**
1. Upload at least 1 "after" photo
2. Enter final amount (must be ≥ quoted amount; if higher: show warning)
3. Add completion notes
4. Optional: Request customer OTP sign-off (adds trust)
5. Confirm: `PATCH /v1/bookings/:id/status` → `completed`

**Customer Sign-off:**
- Partner taps "Request Sign-off"
- System sends 4-digit OTP to customer mobile
- Customer shares OTP verbally
- Partner enters OTP in app
- Booking marked as signed-off
- Higher priority for commission payment

---

## 10.7 Availability Calendar (Service Professionals)

```
┌──────────────────────────────────────────────────────────┐
│  My Availability                                         │
│─────────────────────────────────────────────────────────│
│  [← Jul 2026]    [Today]    [Aug 2026 →]               │
│                                                          │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun                      │
│   21   22   23   24   25   26   27                      │
│  [2J] [1J] [—] [1J] [—] [OFF][OFF]                     │
│   28   29   30   31                                     │
│                                                          │
│  Legend: [—] Available  [#J] # Jobs  [OFF] Not Available│
│─────────────────────────────────────────────────────────│
│  Today, Jul 23                                          │
│  8:00 AM — 2:00 PM: Available                          │
│  2:00 PM — 4:00 PM: BK-001234 (Tap Repair)            │
│  4:00 PM — 6:00 PM: Available                          │
│  6:00 PM — 8:00 PM: Available                          │
│─────────────────────────────────────────────────────────│
│  Set day as unavailable:                                │
│  [Mark Tomorrow as Off] [Mark This Weekend as Off]     │
│                                                          │
│  Working Hours:                                         │
│  Mon-Sat: 8:00 AM — 8:00 PM [Edit]                    │
│  Sunday: OFF [Edit]                                     │
└──────────────────────────────────────────────────────────┘
```

---

## 10.8 Earnings & Commission Tracker

### 10.8.1 Earnings Screen

```
┌──────────────────────────────────────────────────────────┐
│  Earnings                                                │
│─────────────────────────────────────────────────────────│
│  This Month (July 2026)                                 │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Gross Earnings:         ₹12,350               │    │
│  │  Platform Fee (20%):    -₹2,470               │    │
│  │  Net Earnings:           ₹9,880               │    │
│  │  Next Payout Date:       Aug 5, 2026          │    │
│  └────────────────────────────────────────────────┘    │
│─────────────────────────────────────────────────────────│
│  BREAKDOWN BY JOB                                       │
│  [Date] [Job] [Amount] [Fee] [Net]                      │
│  Jul 23 | Tap Repair | ₹850 | ₹170 | ₹680              │
│  Jul 22 | Pipe Leak | ₹1,200 | ₹240 | ₹960             │
│─────────────────────────────────────────────────────────│
│  PAYOUT HISTORY                                         │
│  Jul 5: ₹8,450 → HDFC ****4321 [View Statement]        │
│  Jun 5: ₹6,200 → HDFC ****4321 [View Statement]        │
│─────────────────────────────────────────────────────────│
│  [Download GST Invoice]  [Export to Excel]              │
└──────────────────────────────────────────────────────────┘
```

**Commission Rates:**
- Service Professionals: 80% of collected (20% platform fee)
- Property Dealers: Subscription-based (leads purchased) OR commission on closed deals
- Material Vendors: 5-12% commission per order
- Loan DSAs: Per-disbursed-loan commission (defined per bank)

---

## 10.9 Marketing & Growth Tools

### 10.9.1 Auto-Share Listings

```
┌──────────────────────────────────────────────────────────┐
│  Share Your Listings                                     │
│─────────────────────────────────────────────────────────│
│  Select listings to share:                              │
│  [✓] 3BHK Dwarka — ₹85L                               │
│  [✓] 2BHK Rohini — ₹55L                               │
│  [ ] 4BHK Janakpuri — ₹1.2Cr                          │
│─────────────────────────────────────────────────────────│
│  Share via:                                             │
│  [💬 WhatsApp] [📘 Facebook] [📸 Instagram] [📋 Copy]  │
│─────────────────────────────────────────────────────────│
│  [Auto-generate flyer] (Canva-style template)          │
│  [Download as image for stories]                        │
└──────────────────────────────────────────────────────────┘
```

**WhatsApp Share Message Format:**
```
🏠 *Property for Sale in Dwarka Sector 12, Delhi*

📐 3 BHK | 1,250 sq.ft | East Facing
💰 ₹85,00,000 (₹6,800/sq.ft)
✅ Verified | EMI from ₹42,500/month

👉 View Details: https://roofridge.in/property/3-bhk-flat-dwarka-12345/

📞 Contact Me: Ramesh (ABC Properties)
🎯 Trusted Roof Ridge Partner | ⭐ 4.8 Rating

_Roof Ridge — India's Trusted Property Platform_
```

---

### 10.9.2 Marketing Creatives (Co-branded)

- Template gallery (admin-managed)
- Partner name + photo + logo auto-inserted
- Text customization
- Download as PNG/PDF
- Aspect ratios: Story (9:16), Post (1:1), Banner (16:9)

---

## 10.10 B2B Subscription Plans Management

### 10.10.1 Plan View

```
┌──────────────────────────────────────────────────────────┐
│  Your Plan: FREE                                         │
│  [Upgrade to Silver — ₹999/month]                       │
│─────────────────────────────────────────────────────────│
│  FREE vs SILVER vs GOLD                                 │
│  ─────────────────────────────────                      │
│  Listings: 5 | 25 | Unlimited                          │
│  Leads/month: 10 | 50 | Unlimited                      │
│  Search Ranking: Standard | Priority | Top              │
│  Lead Credits: 10 | 50 | Unlimited                     │
│  Support: Basic | Standard | Dedicated                 │
│─────────────────────────────────────────────────────────│
│  [Upgrade Now — Free 14-day trial for Silver]           │
└──────────────────────────────────────────────────────────┘
```

---

## 10.11 B2B Analytics & Performance Reports

### 10.11.1 Analytics Screen

```
┌──────────────────────────────────────────────────────────┐
│  Performance Analytics                                   │
│  [This Week] [This Month] [Last 3 Months] [Custom]      │
│─────────────────────────────────────────────────────────│
│  LISTING PERFORMANCE                                    │
│  [Bar chart: Views per listing]                         │
│  Total Views: 1,234 | Enquiries: 45 | Conv Rate: 3.6%  │
│─────────────────────────────────────────────────────────│
│  LEAD PERFORMANCE                                       │
│  [Funnel: Received 50 → Contacted 42 → Visit 18 → Conv 6]│
│  Conversion Rate: 12%                                   │
│─────────────────────────────────────────────────────────│
│  EARNINGS TREND                                         │
│  [Line chart: Daily/weekly earnings]                    │
│─────────────────────────────────────────────────────────│
│  [Export to Excel] [Export to PDF]                      │
└──────────────────────────────────────────────────────────┘
```

---

## 10.12 Partner Support & Grievance

**B2B App Support Screen:**
```
┌──────────────────────────────────────────────────────────┐
│  Partner Support                                         │
│─────────────────────────────────────────────────────────│
│  📞 Dedicated Partner Helpline                          │
│  Mon-Sat, 9 AM – 8 PM                                   │
│  [Call Now]                                             │
│                                                          │
│  💬 WhatsApp Support                                    │
│  [Chat on WhatsApp]                                     │
│                                                          │
│  📋 Raise Ticket                                        │
│  Issue Type: [Lead Issue ▾]                             │
│  Description: [                                ]        │
│  Related Booking/Lead ID: [                    ]        │
│  [Submit Ticket]                                        │
│                                                          │
│  📚 Knowledge Base                                      │
│  [View FAQs & Guides]                                   │
│                                                          │
│  MY TICKETS (Open: 1, Resolved: 5)                      │
│  TKT-001: Lead Contact Issue — Open                     │
└──────────────────────────────────────────────────────────┘
```

---

## 10.13 B2B App API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/partners/dashboard/stats` | GET | Dashboard KPIs |
| `/v1/partners/leads` | GET | Lead inbox |
| `/v1/partners/leads/:id` | GET | Lead detail |
| `/v1/partners/leads/:id/status` | PATCH | Update lead status |
| `/v1/partners/leads/:id/activity` | POST | Log activity |
| `/v1/partners/leads/:id/reveal-contact` | POST | Reveal contact (deduct credit) |
| `/v1/partners/listings` | GET, POST | Manage listings |
| `/v1/partners/listings/bulk-upload` | POST | Bulk listing upload |
| `/v1/partners/listings/:id` | GET, PATCH, DELETE | Single listing |
| `/v1/partners/bookings` | GET | Booking inbox |
| `/v1/partners/bookings/:id/accept` | POST | Accept booking |
| `/v1/partners/bookings/:id/decline` | POST | Decline booking |
| `/v1/partners/bookings/:id/status` | PATCH | Update job status |
| `/v1/partners/availability` | GET, PATCH | Manage availability |
| `/v1/partners/earnings` | GET | Earnings summary |
| `/v1/partners/earnings/history` | GET | Payout history |
| `/v1/partners/orders` | GET | Material orders (vendors) |
| `/v1/partners/orders/:id/status` | PATCH | Update order status |
| `/v1/partners/analytics` | GET | Performance metrics |
| `/v1/partners/subscription` | GET | Subscription details |
| `/v1/partners/subscription/upgrade` | POST | Upgrade plan |
| `/v1/partners/marketing/templates` | GET | Co-branded templates |
| `/v1/partners/profile` | GET, PATCH | Partner profile |
| `/v1/partners/bank-account` | PATCH | Update bank details |
| `/v1/partners/fcm-token` | PATCH | Update push token |

---

*Continue to VOL-11 — Admin Panel: Complete Specification*
