# VOL-06: Authentication, User Management & My Property Hub
## Roof Ridge — Enterprise Software Blueprint

---

## 6.1 Authentication Flow — Complete Specification

### 6.1.1 Entry Points for Authentication

Authentication can be triggered from:
1. Navigation header "Login" button
2. "Post Property Free" button (guest)
3. "Save Property" action (guest)
4. "Enquire" / "Call Agent" action (guest)
5. Any protected route redirect
6. Quick Finder after entering mobile
7. Booking flow as guest
8. Checkout as guest
9. B2C App launch (if not logged in)

### 6.1.2 Authentication Modal

**Trigger:** Any auth entry point  
**Component:** `AuthModal` (Modal, md size)  
**Shared:** Used on Website AND embedded in B2C App

```
┌───────────────────────────────────────────────────────┐
│  [X Close]                                            │
│                                                       │
│  [🏠 Roof Ridge Logo]                                 │
│                                                       │
│  Login / Create Account                              │
│  India's #1 Property Platform                        │
│                                                       │
│  Enter your mobile number to continue                │
│                                                       │
│  +91 [  Mobile Number (10 digits)  ]                 │
│                                                       │
│  [ Send OTP ]                                        │
│                                                       │
│  — OR —                                               │
│                                                       │
│  [💬 Continue with WhatsApp OTP]                     │
│                                                       │
│  By continuing, you agree to our                     │
│  Terms & Conditions and Privacy Policy               │
│                                                       │
│  Already a partner? Login to B2B App →               │
└───────────────────────────────────────────────────────┘
```

**Step 1 — Mobile Entry:**

| Element | Specification |
|---------|--------------|
| Mobile Input | Type="tel", inputMode="numeric", placeholder="Mobile Number" |
| Country Code | "+91" fixed prefix (non-editable) |
| Auto-focus | Yes, on modal open |
| Validation | Real-time: 10 digits, starts with 6/7/8/9 |
| Error | Below input: "Please enter a valid 10-digit mobile number" |
| Send OTP Button | Disabled until valid mobile entered |
| Send OTP Loading | Spinner, "Sending OTP..." |
| Send OTP Success | Transition to Step 2 (OTP entry) |
| Send OTP Error | Toast: "Could not send OTP. Please try again." |
| API | `POST /v1/auth/otp/send` |

**WhatsApp OTP Button:**
- Visible When: Always (as alternative)
- Click: Same API with `channel: "whatsapp"`
- Different messaging: "We'll send OTP via WhatsApp"

---

**Step 2 — OTP Verification:**

```
┌───────────────────────────────────────────────────────┐
│  [← Back]                                             │
│                                                       │
│  Enter OTP                                           │
│  Sent to +91 987*****10                               │
│                                                       │
│  [_] [_] [_] [_] [_] [_]  (6 OTP boxes)             │
│                                                       │
│  Expires in 04:47                                    │
│                                                       │
│  Didn't receive OTP? Resend in 00:30                 │
│                                                       │
│  [ Verify OTP ]                                      │
│                                                       │
│  [📋 Paste OTP] (mobile only)                        │
└───────────────────────────────────────────────────────┘
```

| Element | Specification |
|---------|--------------|
| OTP Boxes | 6 individual inputs, auto-advance |
| Input Type | type="number", inputMode="numeric" |
| Auto-paste | Enabled — reads from SMS on Android (SMS Retriever API) |
| Countdown | 5:00 minutes, updates every second |
| Resend After | 30 seconds (then link becomes active) |
| Resend Button | Disabled (30s) → Active → Disabled again on resend |
| Verify Button | Disabled until 6 digits entered |
| Verify Loading | "Verifying..." with spinner |
| Wrong OTP | All boxes go red, shake animation, error message below |
| Max Attempts | After 3 wrong: "Too many attempts. Request new OTP." |
| API | `POST /v1/auth/otp/verify` |

**OTP Box Behavior:**
- Focus auto-advances to next box on digit entry
- Backspace returns focus to previous box
- Paste: distributes digits across boxes automatically
- All boxes: 56×64px desktop, 44×52px mobile

---

**Step 3 — New User Profile Completion:**
*(Only for first-time users — skipped for returning users)*

```
┌───────────────────────────────────────────────────────┐
│  Welcome to Roof Ridge! 🎉                            │
│  Just a few more details                             │
│                                                       │
│  Full Name *                                         │
│  [                              ]                    │
│                                                       │
│  Your City *                                         │
│  [  City Dropdown / Search     ]                     │
│                                                       │
│  You're here to... (optional)                        │
│  [🏠 Buy] [🔑 Rent] [🏗 Build] [💰 Sell]           │
│                                                       │
│  [ Continue to Roof Ridge → ]                        │
└───────────────────────────────────────────────────────┘
```

| Field | Required | Validation |
|-------|----------|------------|
| Full Name | ✅ | 2-100 chars, letters + spaces |
| City | ✅ | Must select from list |
| Intent | ❌ | Saves as user_type preference |

**Continue Button:**
- API: `PATCH /v1/users/profile` + `PATCH /v1/users/preferences`
- Success: Close modal, show welcome toast, redirect or continue previous action
- Analytics: `event('user_registered', { city, intent })`
- Notification: Welcome SMS + Email fired via event

---

### 6.1.3 Post-Login Behavior

| Trigger | Post-Login Redirect |
|---------|-------------------|
| Post Property button | `/post-property/` |
| Save Property | Save action completes, toast shown |
| Enquire | Enquiry form pre-fills, submits |
| Protected route | Return to intended route |
| Direct login | My Property Hub |

---

## 6.2 KYC Verification Flow

### 6.2.1 When KYC is Required

| Action | KYC Required |
|--------|-------------|
| Listing a property (sell/rent) | Mandatory before publishing |
| Applying for home loan | Mandatory |
| Legal service booking | Mandatory |
| Material order > ₹50,000 | Mandatory |
| Becoming a B2B partner | Mandatory |
| Cash withdrawal from wallet | Mandatory |

### 6.2.2 KYC Flow Screen

**URL:** `/verify-identity/`  
**Also embedded in:** Post Property flow (Step 4), Loan application

```
┌──────────────────────────────────────────────────────────────┐
│  Verify Your Identity                                        │
│  Required to publish your property listing                   │
│                                                              │
│  Why we verify?                                              │
│  ✅ Prevents fraud and fake listings                         │
│  ✅ Builds trust with potential buyers                       │
│  ✅ Required by platform policy                              │
│                                                              │
│  Step 1: Choose ID Type                                      │
│  (•) Aadhaar Card   ( ) PAN Card   ( ) Both                 │
│                                                              │
│  Step 2: Upload Documents                                    │
│                                                              │
│  Aadhaar Front *                                            │
│  [📷 Take Photo] [📁 Upload File]                           │
│  [Preview if uploaded]                                       │
│                                                              │
│  Aadhaar Back *                                             │
│  [📷 Take Photo] [📁 Upload File]                           │
│                                                              │
│  Aadhaar Number                                             │
│  [XXXX  XXXX  1234] (last 4 visible)                       │
│                                                              │
│  PAN Card (optional)                                        │
│  [📷 Take Photo] [📁 Upload File]                           │
│                                                              │
│  PAN Number                                                 │
│  [ABCDE 1234 F]                                             │
│                                                              │
│  [ Submit for Verification ]                                │
│                                                              │
│  ⚠️ Your documents are encrypted and securely stored.       │
│  We never share them without your consent.                  │
│                                                              │
│  [ DPDP Privacy Notice ] [ Our Privacy Policy ]            │
└──────────────────────────────────────────────────────────────┘
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| ID Type | Radio | ✅ | Must select |
| Aadhaar Front | File | Conditional | JPEG/PNG/PDF, max 5MB |
| Aadhaar Back | File | Conditional | JPEG/PNG/PDF, max 5MB |
| Aadhaar Number | Text | Conditional | 12 digits (format: XXXX XXXX XXXX) |
| PAN Card | File | Conditional | JPEG/PNG/PDF, max 5MB |
| PAN Number | Text | Conditional | Regex: `[A-Z]{5}[0-9]{4}[A-Z]{1}` |

**Aadhaar Number Input:**
- inputMode="numeric"
- Auto-formats to XXXX XXXX XXXX on input
- Only last 4 digits shown in UI (first 8 masked as XXXX)
- Backend stores full encrypted number

**PAN Number Input:**
- Auto-uppercase
- Regex pattern: `[A-Z]{5}[0-9]{4}[A-Z]{1}`
- Validates as user types

**Upload File:**
- Mobile: Camera capture is first option (HTML accept="image/*;capture=camera")
- Web: Drag & drop zone + file browser
- Preview: Shows thumbnail after upload
- Progress bar during upload
- Replace: Click thumbnail to re-upload

**Submit Button:**
- Loading: "Submitting..."
- Success: "Documents submitted. Verification takes 2-4 hours." (Toast)
- Error handling:
  - Network error: "Upload failed. Check connection and retry."
  - File too large: "File exceeds 5MB limit."
  - Invalid format: "Please upload JPEG, PNG, or PDF only."

**Post Submission:**
- Status: `kyc_status = 'submitted'`
- Admin notification queued
- User can continue other activities
- Banner shows: "KYC Under Review — Your listing will go live once verified"

---

## 6.3 My Property Hub (User Dashboard)

### 6.3.1 Overview

| Attribute | Value |
|-----------|-------|
| **URL** | `/dashboard/` |
| **Auth** | Required |
| **Purpose** | Central user dashboard for all activities |
| **Mobile** | Full app-like bottom navigation |

### 6.3.2 Dashboard Layout

```
Desktop:
┌──────────────────────────────────────────────────────────────────────┐
│ [Navigation Header]                                                  │
│──────────────────────────────────────────────────────────────────────│
│                                                                      │
│ ┌──────────────────┐  ┌──────────────────────────────────────────┐  │
│ │  SIDEBAR NAV     │  │  MAIN CONTENT AREA                       │  │
│ │                  │  │                                          │  │
│ │  [Avatar]        │  │  Good morning, Rahul! 👋                │  │
│ │  Rahul Sharma    │  │                                          │  │
│ │  Delhi | Buyer   │  │  ┌────────┬────────┬────────┬────────┐  │  │
│ │  KYC: ✅         │  │  │ Saved  │Active  │Enquir- │Wallet  │  │  │
│ │                  │  │  │ Props  │Booking │ ies    │Balance │  │  │
│ │  ─────────────── │  │  │  5     │  1     │  3     │₹500    │  │  │
│ │  🏠 Dashboard    │  │  └────────┴────────┴────────┴────────┘  │  │
│ │  🔖 Saved Props  │  │                                          │  │
│ │  📋 My Listings  │  │  MY ACTIVE ITEMS                        │  │
│ │  📅 Bookings     │  │  [Booking Card — Plumber, Today 2PM]    │  │
│ │  🏦 Loan Apps    │  │  [Enquiry Card — 3BHK Dwarka]          │  │
│ │  📄 Documents    │  │  [Loan App — HDFC: Under Review]        │  │
│ │  🎁 Wallet       │  │                                          │  │
│ │  👥 Referrals    │  │  UPCOMING REMINDERS                     │  │
│ │  ⚙️ Settings     │  │  📅 EMI Due: ₹42,500 on Aug 1           │  │
│ │                  │  │  🔧 AC Service: Due Aug 15 (AMC)        │  │
│ └──────────────────┘  │  📋 Listing Expires: Aug 30             │  │
│                       │                                          │  │
│                       │  PRICE ALERTS                           │  │
│                       │  [3BHK Dwarka — ₹82L (-3.5%) 💹]      │  │
│                       └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

**Mobile Navigation (Bottom Tab Bar):**
```
┌────────────────────────────────────────────────────────┐
│ [🏠 Home] [🔍 Search] [📅 Bookings] [👤 Profile]      │
└────────────────────────────────────────────────────────┘
```

### 6.3.3 Dashboard Sub-Pages

#### My Saved Properties

**URL:** `/dashboard/saved/`

```
┌──────────────────────────────────────────────────────────────┐
│ Saved Properties (5)                      [ Search saved... ] │
│ [Sort: Date Saved ▾] [Filter by City ▾]                      │
│                                                              │
│ [Property Card] [Property Card] [Property Card]             │
│ [Property Card] [Property Card]                              │
│                                                              │
│ [Property Price Alert: 3BHK Dwarka dropped ₹2L]            │
└──────────────────────────────────────────────────────────────┘
```

**Property Card (saved context):**
- Shows days since saved: "Saved 3 days ago"
- Price change indicator (if price changed since saved): "📉 Price dropped ₹2L"
- Remove from saved (✕ icon)
- Share button
- "Create Alert" — notify if price changes

**Empty State:** "No saved properties yet. Browse and heart properties you like!"

---

#### My Listings

**URL:** `/dashboard/listings/`

```
┌──────────────────────────────────────────────────────────────┐
│ My Listings                           [ + Add New Listing ]  │
│                                                              │
│ Status: [All] [Live] [Pending] [Draft] [Expired] [Sold]    │
│                                                              │
│ [Listing Card — with status badge]                          │
│ "3 BHK Dwarka" | Status: LIVE | 45 views | 3 enquiries     │
│ [Edit] [Pause] [Mark Sold] [Boost →] [Delete]              │
│                                                              │
│ [Listing Card — Draft]                                      │
│ "2 BHK Rohini" | Status: DRAFT | 60% complete              │
│ [Continue Editing] [Delete]                                 │
└──────────────────────────────────────────────────────────────┘
```

**Listing Card Actions:**
| Button | Visible When | Action |
|--------|-------------|--------|
| Edit | Any non-expired status | Navigate to edit form |
| Pause | Live | Pause listing (status: paused) |
| Resume | Paused | Resume listing (status: live) |
| Mark Sold/Rented | Live, Paused | Mark as sold/rented |
| Boost | Live | Open boost/feature purchase modal |
| Delete | Draft, Rejected | Soft delete |
| View | Any | View public listing page |

**"Boost" Modal:**
```
┌────────────────────────────────────────────────────────┐
│  Boost Your Listing 🚀                                 │
│                                                        │
│  Get 10x more visibility with a Boosted Listing       │
│                                                        │
│  [Basic Boost]          [Premium Boost]               │
│  7 days — ₹999          30 days — ₹2,999              │
│  Top of search results  Featured badge + Priority     │
│  5x more views          10x more views                │
│                                                        │
│  [ Boost for 7 Days — ₹999 ]                         │
└────────────────────────────────────────────────────────┘
```

---

#### My Bookings

**URL:** `/dashboard/bookings/`

**Booking Card:**
```
┌────────────────────────────────────────────────────────┐
│ Plumbing Service                    BK-2026-001234     │
│ Kitchen pipe leak repair            Status: IN PROGRESS │
│ Today, 2:00 PM - 4:00 PM            💰 ₹850            │
│ 📍 Flat 401, Tower B, Green Park                       │
│                                                        │
│ Partner: Ramesh Plumbing (⭐ 4.8)                      │
│ [Track Live] [Call Partner] [Chat] [Cancel]           │
└────────────────────────────────────────────────────────┘
```

**Status Badges:**
| Status | Color | Icon |
|--------|-------|------|
| Pending | Yellow | 🕐 |
| Assigned | Blue | 👤 |
| En Route | Orange | 🚗 |
| In Progress | Purple | 🔧 |
| Completed | Green | ✅ |
| Cancelled | Red | ❌ |

**"Track Live" Button:**
- Only visible when status is: Assigned, En Route, In Progress
- Opens real-time tracking page with partner GPS location on map
- WebSocket connection for live updates

**Post-Completion:**
- "Rate Your Experience" prompt (appears if not rated)
- "Book Again" button
- "Add to AMC" button (if service can be AMC-ized)
- Receipt download

---

#### Document Vault

**URL:** `/dashboard/documents/`

```
┌──────────────────────────────────────────────────────────────┐
│ My Documents                          [ + Upload Document ] │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ 🔒 End-to-end encrypted document storage                │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                              │
│ KYC Documents                                               │
│ [📄 Aadhaar Front — Verified ✅]  [📄 PAN — Verified ✅]  │
│                                                              │
│ Property Documents                                          │
│ [ + Add ] [📄 Sale Deed — 3BHK Dwarka.pdf]                 │
│           [📄 Property Registration.pdf]                    │
│                                                              │
│ Loan Documents                                              │
│ [ + Add ] [📄 HDFC Sanction Letter.pdf]                    │
│           [📄 EMI Schedule.pdf]                             │
│                                                              │
│ Insurance Policies                                          │
│ [ + Add ]  (Empty State)                                    │
│                                                              │
│ Rent Agreements                                             │
│ [ + Add ] [📄 Rent Agreement — Green Park.pdf (eSigned)]   │
└──────────────────────────────────────────────────────────────┘
```

**Upload Document Modal:**
- Category select: KYC/Property/Loan/Insurance/Rent Agreement/Other
- File upload (PDF, JPEG, PNG, max 20MB)
- Document name field (optional, auto-fills from filename)
- Notes field
- API: `POST /v1/users/documents`
- Storage: S3, user-specific folder, private ACL

**Document Card:**
- Filename + date uploaded
- Document type badge
- Verified badge (if admin-verified KYC doc)
- Preview (opens PDF viewer or image lightbox)
- Download button
- Delete button (with confirmation)
- Share link (temporary pre-signed S3 URL, 1 hour expiry)

---

#### Wallet & Referrals

**URL:** `/dashboard/wallet/`

```
┌──────────────────────────────────────────────────────────────┐
│ My Wallet                                                    │
│                                                              │
│  ┌────────────────────────────────────────────┐             │
│  │  Available Balance                          │             │
│  │  ₹ 1,250.00                                │             │
│  │  [Withdraw to Bank] [Use for Booking]       │             │
│  └────────────────────────────────────────────┘             │
│                                                              │
│ Transactions                                                 │
│ [All] [Earned] [Spent] [Pending]                            │
│                                                              │
│ Jul 20 | Referral Reward — Priya Mehta booked | +₹500      │
│ Jul 15 | Cashback — Plumbing Booking | +₹250              │
│ Jul 10 | Used in Booking BK-001234 | -₹500                │
│                                                              │
│ ─────────────────────────────────────────────               │
│                                                              │
│ Refer & Earn                                                 │
│  Your referral code: RAHUL2026                              │
│  [📋 Copy] [📤 Share on WhatsApp]                          │
│                                                              │
│  Earn ₹500 for every friend who completes their             │
│  first booking using your code!                             │
│                                                              │
│  Referred (3): Priya, Ankit, Sonal                         │
│  Earned So Far: ₹1,500                                      │
└──────────────────────────────────────────────────────────────┘
```

---

#### Loan Applications

**URL:** `/dashboard/loans/`

**Application Card:**
```
┌────────────────────────────────────────────────────────────┐
│ Home Loan Application                  LA-2026-00234       │
│ HDFC Bank | ₹50,00,000 requested      Status: UNDER REVIEW │
│ Applied: Jul 20, 2026                                      │
│ Property: 3 BHK, Dwarka Sector 12                         │
│                                                            │
│ [View Details] [Upload Document] [Contact HDFC] [Withdraw] │
└────────────────────────────────────────────────────────────┘
```

**Status Timeline:**
```
Draft → Submitted → Under Review → Documents Pending → Pre-Approved → Approved → Disbursed
```

---

#### Notification Preferences

**URL:** `/dashboard/settings/notifications/`

```
┌────────────────────────────────────────────────────────────┐
│ Notification Preferences                                   │
│                                                            │
│ Booking Updates                                            │
│   SMS  [ON ●]     Email [ON ●]    Push [ON ●]  WA [ON ●] │
│                                                            │
│ Price Drop Alerts                                          │
│   SMS  [OFF ○]    Email [ON ●]    Push [ON ●]  WA [ON ●] │
│                                                            │
│ New Matching Listings                                      │
│   SMS  [OFF ○]    Email [ON ●]    Push [ON ●]  WA [OFF ○]│
│                                                            │
│ Payment Reminders                                          │
│   SMS  [ON ●]     Email [ON ●]    Push [ON ●]  WA [ON ●] │
│                                                            │
│ AMC Renewal                                               │
│   SMS  [ON ●]     Email [ON ●]    Push [ON ●]  WA [ON ●] │
│                                                            │
│ Promotional Offers                                         │
│   SMS  [OFF ○]    Email [OFF ○]   Push [OFF ○] WA [OFF ○]│
│                                                            │
│ [ Save Preferences ]                                       │
└────────────────────────────────────────────────────────────┘
```

**Toggle Behavior:**
- Each toggle: Immediate update (no save required per toggle, batch on "Save")
- Analytics: `event('notification_preference_change', { type, channel, value })`
- API: `PATCH /v1/users/notification-preferences`

---

## 6.4 User Profile Settings

**URL:** `/dashboard/settings/profile/`

### Form Fields

| Field | Type | Placeholder | Validation | Required |
|-------|------|-------------|------------|---------|
| Full Name | Text | "Enter your full name" | 2-100 chars, letters+spaces | ✅ |
| Mobile | Display (read-only) | — | Displayed, not editable (change mobile = new OTP flow) | — |
| Email | Email | "your@email.com" | Valid email | ❌ |
| Date of Birth | Date | "DD/MM/YYYY" | Must be 18+ years | ❌ |
| Gender | Select | "Select gender" | Enum | ❌ |
| City | Autocomplete | "Your city" | Must select from list | ✅ |
| Locality | Autocomplete | "Preferred area" | — | ❌ |
| Address | Textarea | "Home address" | Max 500 chars | ❌ |
| I'm Looking To | Multi-select chips | — | buyer/seller/renter/investor | ❌ |
| Budget Range | Dual slider | — | Min < Max | ❌ |
| Profile Photo | File upload | — | JPEG/PNG, max 5MB, min 200×200px | ❌ |

**Change Mobile Number Flow:**
1. Click "Change Mobile"
2. Enter new mobile number
3. OTP sent to NEW number
4. Verify OTP
5. Mobile updated
6. Audit log created

**"Save Changes" Button:**
- API: `PATCH /v1/users/profile`
- Loading: Spinner
- Success: Toast "Profile updated successfully"
- Error: Inline field errors or general toast

### Delete Account Flow

**Link:** "Delete My Account" (red link, footer of settings page)

**Confirmation Modal:**
```
⚠️ Delete Your Account?

This will permanently delete:
• Your profile and preferences
• Saved properties and searches
• All chat history

This will NOT immediately delete:
• Active bookings (will complete)
• Wallet balance (will be refunded)
• Legal/financial applications (transferred)

You can download your data before deleting.

[Download My Data]    [Cancel]    [Yes, Delete My Account]
```

**Process:**
1. User confirms deletion
2. Account marked as `deleted_at = NOW()`
3. All sessions invalidated
4. Data anonymized per DPDP Act within 30 days
5. Confirmation email sent
6. 30-day grace period: account recoverable via support

---

## 6.5 API: User Module

### GET /v1/users/profile/stats
**Auth:** Required

**Response:**
```json
{
  "data": {
    "saved_properties": 5,
    "active_enquiries": 3,
    "active_bookings": 1,
    "loan_applications": 2,
    "wallet_balance": 1250.00,
    "referrals_count": 3,
    "kyc_status": "verified",
    "profile_completion_pct": 85
  }
}
```

### GET /v1/users/saved-properties
**Auth:** Required  
**Query:** `?page=1&limit=12&city=Delhi&sort=date_saved`

### POST /v1/users/price-alert
**Auth:** Required  
**Purpose:** Set price alert for a property

**Request:**
```json
{
  "listing_id": "prop_xyz789",
  "alert_type": "price_drop",
  "threshold_pct": 5
}
```

### GET /v1/users/notifications
**Auth:** Required  
**Query:** `?page=1&limit=20&unread=true`

**Response:**
```json
{
  "data": {
    "notifications": [
      {
        "id": "notif_abc123",
        "type": "price_drop_alert",
        "title": "Price Drop Alert",
        "body": "3 BHK Dwarka price dropped by ₹2L",
        "is_read": false,
        "created_at": "2026-07-23T10:00:00Z",
        "action_url": "/property/3-bhk-flat-dwarka-12345/"
      }
    ],
    "unread_count": 5
  }
}
```

### PATCH /v1/users/notifications/:id/read
**Auth:** Required

### PATCH /v1/users/notifications/read-all
**Auth:** Required

### GET /v1/users/referral-stats
**Auth:** Required

**Response:**
```json
{
  "data": {
    "referral_code": "RAHUL2026",
    "referral_link": "https://roofridge.in/r/RAHUL2026",
    "total_referred": 3,
    "qualified_referrals": 2,
    "total_earned": 1000.00,
    "pending_rewards": 500.00,
    "referral_details": [
      {
        "name": "Priya",
        "joined_at": "2026-07-10",
        "status": "rewarded",
        "reward": 500.00
      }
    ]
  }
}
```

---

## 6.6 Analytics Events — Auth & User Module

| Event | When Fired | Properties |
|-------|-----------|-----------|
| `auth_modal_open` | Modal opens | `{ trigger_source }` |
| `otp_send_attempt` | OTP send button clicked | `{ channel, source }` |
| `otp_send_success` | OTP sent successfully | `{ channel }` |
| `otp_verify_attempt` | Verify button clicked | `{}` |
| `otp_verify_success` | OTP verified | `{ is_new_user }` |
| `otp_verify_failure` | Wrong OTP | `{ attempt_number }` |
| `user_registered` | New user profile created | `{ city, intent, source }` |
| `user_login` | Existing user logged in | `{ source }` |
| `kyc_started` | KYC flow initiated | `{}` |
| `kyc_submitted` | Documents submitted | `{ doc_types }` |
| `profile_updated` | Profile saved | `{ fields_updated }` |
| `notification_preference_change` | Toggle changed | `{ type, channel, value }` |
| `account_delete_initiated` | Delete flow started | `{}` |
| `property_saved` | Property heart-clicked | `{ listing_id, source }` |
| `property_unsaved` | Property un-saved | `{ listing_id }` |

---

## 6.7 Audit Logs — Auth & User Module

| Action | Triggered By | Logged Fields |
|--------|-------------|--------------|
| User Registration | System | user_id, mobile, city, source |
| User Login | User | user_id, ip, device_type |
| Failed Login Attempt | System | mobile, ip, failure_reason |
| Profile Updated | User | user_id, changed_fields |
| KYC Submitted | User | user_id, doc_types |
| KYC Approved | Admin | admin_id, user_id |
| KYC Rejected | Admin | admin_id, user_id, reason |
| Mobile Changed | User | user_id, old_mobile, new_mobile |
| Account Suspended | Admin | admin_id, user_id, reason |
| Account Deleted | User/Admin | user_id, deleted_by, reason |
| Session Invalidated | System | user_id, reason |

---

*Continue to VOL-07 — Property Module (Advanced)*
