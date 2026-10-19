# VOL-14: Notification System — All Channels
## Roof Ridge — Enterprise Software Blueprint

---

## 14.1 Notification Architecture

### 14.1.1 System Overview

```
Business Event (booking created, KYC approved, lead assigned, etc.)
        │
        ▼
Event Bus (EventEmitter2 / BullMQ Event Queue)
        │
        ▼
Notification Orchestrator (Node.js Service)
        │
        ├─── Channel: SMS ─────→ SMS Gateway (MSG91 / Twilio)
        ├─── Channel: WhatsApp ─→ WhatsApp Business API (360dialog / Gupshup)
        ├─── Channel: Email ───→ SendGrid / AWS SES
        ├─── Channel: Push ────→ Firebase Cloud Messaging (FCM)
        └─── Channel: In-App ──→ PostgreSQL + WebSocket
```

### 14.1.2 Notification Queue (BullMQ)

**Queues:**
| Queue | Concurrency | Priority | Retry |
|-------|-------------|----------|-------|
| `notification.sms` | 10 | High | 3 times, 2m intervals |
| `notification.whatsapp` | 10 | High | 3 times, 5m intervals |
| `notification.email` | 20 | Medium | 5 times, 10m intervals |
| `notification.push` | 50 | High | 3 times, 1m intervals |
| `notification.bulk` | 5 | Low | 2 times, 30m intervals |

**Failed Notification Handling:**
- After max retries: Move to Dead Letter Queue (DLQ)
- DLQ reviewed daily by admin (auto-report)
- Critical notifications (booking, payment): Alert on-call via PagerDuty

---

## 14.2 SMS Notifications

### 14.2.1 Gateway Configuration

**Primary:** MSG91 (India — best delivery rate)  
**Fallback:** Twilio (if MSG91 delivery fails > 5%)  
**Sender ID:** `RFRDIG` (Roof Ridge Digital, 6-character DLT registered)

**DLT Registration (TRAI Compliance):**
- All SMS templates pre-registered on DLT portal
- Principal Entity ID registered
- Template IDs stored in database per template

### 14.2.2 Complete SMS Template Library

| Template ID | Event | Message | Type |
|-------------|-------|---------|------|
| `SMS_OTP` | OTP Send | `Your Roof Ridge OTP is {otp}. Valid for 5 minutes. DO NOT share. -RFRDIG` | Transactional |
| `SMS_WELCOME` | New User | `Welcome to Roof Ridge, {name}! Explore 45,000+ verified properties & home services. App: {link} -RFRDIG` | Transactional |
| `SMS_BOOKING_CONF` | Booking Confirmed | `Hi {name}, your {category} booking is confirmed! ID: {booking_id}. Date: {date}. Partner: {partner_name} will contact you. Track: {link} -RFRDIG` | Transactional |
| `SMS_PARTNER_ASSIGNED` | Partner Assigned | `Good news! {partner_name} has been assigned for your {category} service. Arriving at {time}. Contact: {masked_mobile}. Track: {link} -RFRDIG` | Transactional |
| `SMS_BOOKING_COMPLETED` | Booking Completed | `Your {category} service is complete! Bill: Rs.{amount}. Rate your experience: {link} -RFRDIG` | Transactional |
| `SMS_BOOKING_CANCELLED` | Booking Cancelled | `Your booking {booking_id} has been cancelled. Refund of Rs.{amount} will be processed in 3-5 days. Help: {support_number} -RFRDIG` | Transactional |
| `SMS_PAYMENT_SUCCESS` | Payment Success | `Payment of Rs.{amount} received for {purpose}. Receipt: {link} -RFRDIG` | Transactional |
| `SMS_REFUND_INITIATED` | Refund Initiated | `Refund of Rs.{amount} initiated. It will credit to your {method} in 3-5 business days. Query: {support} -RFRDIG` | Transactional |
| `SMS_KYC_SUBMITTED` | KYC Submitted | `Hi {name}, your KYC documents are under review. You'll be notified within 4 hours. -RFRDIG` | Transactional |
| `SMS_KYC_APPROVED` | KYC Approved | `Great news {name}! Your identity is verified. You can now list properties and access all features. -RFRDIG` | Transactional |
| `SMS_KYC_REJECTED` | KYC Rejected | `Hi {name}, KYC verification failed: {reason}. Please re-upload at {link} or call {support}. -RFRDIG` | Transactional |
| `SMS_LISTING_LIVE` | Listing Approved | `Your property listing is now LIVE! View & manage at {link}. Get more enquiries with Boost. -RFRDIG` | Transactional |
| `SMS_LISTING_REJECTED` | Listing Rejected | `Your listing was not approved. Reason: {reason}. Please update and resubmit at {link}. -RFRDIG` | Transactional |
| `SMS_ENQUIRY_RECEIVED` | New Enquiry (Partner) | `New enquiry received! {name} interested in {property}. View details: {link}. Respond quickly for better conversion! -RFRDIG` | Transactional |
| `SMS_LEAD_ASSIGNED` | Lead Assigned (B2B) | `New HOT lead assigned! {name} looking for {category} in {city}. Budget: Rs.{budget}. View & call: {link} -RFRDIG` | Transactional |
| `SMS_LOAN_UPDATE` | Loan Status Update | `Loan Application {app_id} update: {status}. {action_required_text}. Details: {link} -RFRDIG` | Transactional |
| `SMS_AMC_REMINDER` | AMC Renewal (30d) | `Hi {name}, your {plan_name} AMC expires on {date}. Renew now to continue priority service: {link} -RFRDIG` | Transactional |
| `SMS_PRICE_DROP` | Price Alert | `{property_title} price dropped by {pct}% to Rs.{new_price}! Don't miss this deal: {link} -RFRDIG` | Transactional |
| `SMS_ORDER_DISPATCHED` | Material Dispatched | `Your order {order_id} has been dispatched! Est. delivery: {date}. Track: {link} -RFRDIG` | Transactional |
| `SMS_PROMO_GENERIC` | Marketing Campaign | `{body} Opt out reply STOP. -RFRDIG` | Promotional |
| `SMS_PARTNER_PAYOUT` | Payout Processed | `Rs.{amount} transferred to your bank account ending {last4}. Statement: {link}. -RFRDIG` | Transactional |

**SMS Delivery Rules:**
- Transactional: Send 24x7
- Promotional: Send 9AM–8PM only (TRAI DND compliance)
- DND scrubbing: MSG91 handles automatically for promotional

---

## 14.3 WhatsApp Notifications

### 14.3.1 Gateway Configuration

**Gateway:** 360dialog (Meta Business Solution Partner)  
**Phone Number:** +91 98765 XXXXX (dedicated WhatsApp Business number)  
**Opt-in:** User must explicitly opt-in during registration  
**Opt-out:** Any message saying "Stop" auto-opts out

### 14.3.2 WhatsApp Template Library

**Format:** All templates pre-approved by Meta

#### Template: `booking_confirmed`
```
Hello {{1}} 👋

Your *{{2}}* booking is confirmed!

📋 Booking ID: *{{3}}*
📅 Date & Time: *{{4}}*
📍 Address: {{5}}

Your professional *{{6}}* will arrive at {{4}}.
```
*Buttons:*
- [Track Live] → `https://roofridge.in/bookings/{{3}}/track/`
- [Call Partner] → `tel:{{7}}`

---

#### Template: `partner_en_route`
```
🚗 *Your professional is on the way!*

{{1}} is {{2}} km away and will arrive in approximately *{{3}} minutes*.

You can track them live on the map.
```
*Buttons:*
- [Track on Map] → `https://roofridge.in/bookings/{{4}}/track/`

---

#### Template: `booking_completed_review`
```
Hi {{1}} ✅

Your *{{2}}* service is complete!

*Bill Amount: ₹{{3}}*

How was your experience? Your feedback helps {{4}} get better work.
```
*Buttons:*
- [Rate Experience ⭐] → `https://roofridge.in/bookings/{{5}}/review/`
- [Book Again 🔁] → `https://roofridge.in/services/{{6}}/`

---

#### Template: `new_listing_live`
```
🎉 *Your Property is Now Live!*

Property: {{1}}
Location: {{2}}
Price: ₹{{3}}

Your listing is now visible to thousands of buyers!

Tip: Boost your listing for 10x more enquiries.
```
*Buttons:*
- [View Listing 👁] → `https://roofridge.in/property/{{4}}/`
- [Boost Listing 🚀] → `https://roofridge.in/dashboard/listings/{{5}}/boost/`

---

#### Template: `loan_pre_approved`
```
🎊 *Congratulations {{1}}!*

Your home loan pre-approval is ready!

*Bank:* {{2}}
*Amount:* Up to ₹{{3}}
*Rate:* {{4}}% p.a.

This is a non-binding pre-approval. Final approval subject to bank's verification.
```
*Buttons:*
- [View Details →] → `https://roofridge.in/dashboard/loans/{{5}}/`

---

#### Template: `amc_renewal_reminder`
```
⏰ *AMC Renewal Reminder*

Hi {{1}}, your *{{2}}* plan expires on *{{3}}*.

After expiry, you'll miss:
✅ Priority service booking
✅ Discounted rates
✅ Free emergency visit

Renew before it expires!
```
*Buttons:*
- [Renew Now 🔄] → `https://roofridge.in/amc/renew/{{4}}/`
- [View Plan Details] → `https://roofridge.in/amc/{{5}}/`

---

#### Template: `hot_lead_assigned` (B2B Partner)
```
🔴 *HOT Lead Alert!*

New lead just assigned to you:

👤 Name: {{1}}
📱 Mobile: {{2}} (reveal in app)
🏠 Looking for: {{3}} in {{4}}
💰 Budget: ₹{{5}}
⏰ Received: {{6}}

*Respond within 30 minutes for best conversion!*
```
*Buttons:*
- [View Lead →] → `https://partner.roofridge.in/leads/{{7}}/`
- [Call Now 📞] → `tel:{{8}}`

---

### 14.3.3 Interactive WhatsApp Flows

**Post-Service Flow (triggered when user messages after booking):**

```
User: "Where is my plumber?"
Bot: 
  Your plumber Ramesh is currently EN ROUTE.
  Estimated arrival: ~8 minutes
  
  [Track Live Map] [Call Ramesh]

User: "Call Ramesh"  
Bot: 📞 Connecting you...
  Ramesh's number: +91 98765 43210
```

**Booking via WhatsApp:**
```
User: "Book plumber"
Bot: Sure! Which city are you in?
User: "Delhi"
Bot: What time would you like? 
  [Today 2 PM] [Today 4 PM] [Tomorrow]
User: "Today 4 PM"
Bot: Please confirm your address.
User: "Flat 401, Tower B, Green Park"
Bot: ✅ Booking confirmed! 
  [View Booking] [Cancel]
```

---

## 14.4 Email Notifications

### 14.4.1 Gateway Configuration

**Primary:** SendGrid (transactional)  
**Bulk/Marketing:** SendGrid Marketing Campaigns  
**From Name:** Roof Ridge  
**From Email:** `hello@roofridge.in`  
**Reply-To:** `support@roofridge.in`

**Email Authentication:**
- SPF record configured
- DKIM signing: `roofridge.in._domainkey`
- DMARC policy: `p=quarantine; pct=100`
- BIMI (Brand Indicators for Message Identification): Logo shown in Gmail

### 14.4.2 Email Template Library

**Design System for Emails:**
- Max width: 600px
- Font: Arial (web-safe fallback)
- Colors: Primary #E85D04, Background #FAFAFA
- All images have `alt` text (accessibility)
- Unsubscribe link (mandatory) in all emails

#### Email: Welcome
```
Subject: Welcome to Roof Ridge, {name}! 🏠

[HEADER: Logo + Orange banner]

Hi {name},

Welcome aboard! You've just joined India's most trusted property & home 
services platform.

[CTA BOX]
Start Exploring Properties → 
Find Home Services →
Check Loan Eligibility →

[STATS BAR: 45,000+ Properties | 35+ Cities | 10,000+ Service Partners]

[FOOTER: Links | Unsubscribe | Address]
```

#### Email: Booking Confirmation
```
Subject: Booking Confirmed! 📋 #{booking_id}

[Booking details in a clean table]
Service: {category}
Booking ID: {booking_id}
Date: {date}
Address: {address}

Your Professional:
[Partner photo] {partner_name} | ⭐ {rating} | {phone_masked}

[Green CTA Button: Track Live →]

Cancellation Policy: Cancel before 2 hours free of charge.
```

#### Email: Invoice / Receipt
```
Subject: Payment Receipt — ₹{amount} | #{transaction_id}

[INVOICE STYLE EMAIL]

Date: {date}
Invoice #: INV-{id}

Billed To: {user_name}

Line Items:
{service}: ₹{base_amount}
GST (18%): ₹{gst}
Total: ₹{total}

Payment Method: UPI / Card ending {last4}
Transaction ID: {razorpay_id}

[Download Invoice PDF]
```

#### Email: Property Enquiry Acknowledgment
```
Subject: We received your enquiry for {property_title} 

Hi {name},

Thank you for your interest in:
[Property Card with photo]
{property_title}
{city} | ₹{price}

What happens next?
1. The property partner will contact you within 30 minutes
2. If not contacted, you can call directly: {masked_number}
3. You can also chat with RidgeBot for immediate help

[Button: View Property →]
[Button: Explore Similar Properties →]
```

#### Email: KYC Status Emails

**Approved:**
```
Subject: Identity Verified ✅ — Welcome to the full Roof Ridge experience!

Great news, {name}!
Your KYC verification is complete. You can now:
✅ List your properties
✅ Apply for home loans
✅ Access all platform features
```

**Rejected:**
```
Subject: Action Required — Re-upload KYC Documents

Hi {name},
Your KYC could not be verified.

Reason: {reason}

Please re-upload your documents:
[Upload New Documents →]

If you need help, contact: support@roofridge.in
```

#### Email: Lead Nurturing Sequence (Automated — 7-day sequence)

| Day | Subject | Content |
|-----|---------|---------|
| 0 | Welcome! Your property matches are ready | 3 recommended properties based on search |
| 2 | Did you miss these? | 3 more properties, different localities |
| 4 | Price dropped on a property you viewed | If any saved property price dropped |
| 7 | Your dream home awaits 🏠 | Re-engagement + loan eligibility teaser |

---

## 14.5 Push Notifications

### 14.5.1 FCM Configuration

**Server Integration:** Firebase Admin SDK (Node.js)  
**Topics:** `city_delhi`, `city_mumbai`, etc. (for city-level mass sends)  
**Token Storage:** `users.fcm_token`, refreshed on each app launch

### 14.5.2 Push Notification Templates

| Event | Title | Body | Image | Action |
|-------|-------|------|-------|--------|
| Booking confirmed | "Booking Confirmed! 🎉" | "{partner} confirmed for {date}" | Partner photo | booking_detail |
| Partner en route | "On the way! 🚗" | "{partner} is 1.5km away" | Map thumbnail | live_tracking |
| Booking completed | "Service Complete! ⭐" | "Rate your {service} experience" | — | review_screen |
| New matching listing | "New match in {city}! 🏠" | "3BHK Dwarka — ₹85L. Matches your search!" | Property photo | property_detail |
| Price drop alert | "Price Dropped! 📉" | "{property} down ₹2L → ₹83L" | Property photo | property_detail |
| New enquiry (B2B) | "New Enquiry! 📱" | "{name} interested in {property}" | — | enquiry_detail |
| Hot lead (B2B) | "🔴 HOT Lead!" | "{category} lead in {city}" | — | lead_detail |
| AMC renewal | "AMC Renewal Due ⏰" | "Your plumbing AMC expires in 7 days" | — | amc_screen |
| Loan status update | "Loan Update 🏦" | "{bank}: {status}" | Bank logo | loan_detail |
| Wallet credited | "Wallet Credited! 💰" | "₹{amount} added. Balance: ₹{balance}" | — | wallet_screen |

**Rich Push (with image):**
- Image size: 512×256px WebP
- Shown on Android (natively) + iOS (when expanded)
- Image URL passed as `imageUrl` in FCM data payload

---

## 14.6 In-App Notifications

### 14.6.1 Notification Centre (Bell Icon)

```
┌──────────────────────────────────────────────────┐
│ Notifications                    [Mark All Read] │
│──────────────────────────────────────────────────│
│ [All] [Unread (5)] [Bookings] [Properties] [Offers]│
│──────────────────────────────────────────────────│
│ 🔵 NEW | 2 min ago                              │
│ [Partner Photo] Ramesh is on his way!           │
│ Your plumber is 1.2km away                      │
│──────────────────────────────────────────────────│
│ 🔵 NEW | 1 hr ago                               │
│ [Property Thumb] Price drop alert! 📉            │
│ 3BHK Dwarka dropped to ₹83L                     │
│──────────────────────────────────────────────────│
│ ✓ READ | Yesterday                              │
│ [Bank Logo] Your HDFC loan is under review      │
└──────────────────────────────────────────────────┘
```

**API:** `GET /v1/users/notifications?page=1&limit=20`  
**Unread Count:** Shown in bell icon badge (red dot)  
**Real-time Updates:** WebSocket event `notification:new` refreshes unread count

---

## 14.7 Notification Delivery Rules

### 14.7.1 User Preference Matrix

| Notification Type | Default | Configurable |
|-------------------|---------|--------------|
| Booking transactional (confirmation, status) | SMS + Push | No (mandatory) |
| Payment transactional | SMS + Email | No (mandatory) |
| OTP | SMS | No (mandatory) |
| Property enquiry | Push + Email | Yes |
| Price alerts | Push + Email | Yes |
| New matching listings | Push | Yes |
| AMC renewal | SMS + Push + Email | Yes |
| Marketing/Promotional | None | Yes |
| Platform updates | Push | Yes |

### 14.7.2 Quiet Hours

- Default: No push/SMS notifications 10PM–7AM
- User-configurable in settings
- Emergency notifications (booking issues, OTP) bypass quiet hours

### 14.7.3 Deduplication

- Same notification type + same entity: Max 1 per 10 minutes
- Price alerts: Max 2 per property per day
- Lead alerts: No dedup (every lead is unique)

---

## 14.8 Notification Analytics

### 14.8.1 Tracked Metrics per Notification

| Metric | Description |
|--------|-------------|
| `sent` | Notification dispatched to gateway |
| `delivered` | Gateway confirms delivery (DLR) |
| `opened` | User tapped notification (push) |
| `clicked_cta` | CTA button tapped |
| `converted` | Booking/purchase within 30 min |
| `dismissed` | Swiped away (push) |
| `unsubscribed` | User turned off this type |
| `bounced` | Email bounced (invalid email) |

### 14.8.2 A/B Testing Notifications

- Admin can create 2 variants of a notification template
- 50/50 split by user ID hash
- Track: Open rate, conversion rate
- Winning variant auto-selected after statistical significance

---

## 14.9 SMS & WhatsApp Compliance

### 14.9.1 TRAI Compliance (India)

- **DLT Registration:** All commercial SMS registered on TRAI DLT portal
- **Promotional SMS:** Only 9AM–9PM
- **DND Scrubbing:** Promotional SMS skip DND numbers
- **Transactional SMS:** Sent 24x7, no DND restriction
- **Service Implicit:** OTP, booking, payment = transactional
- **PECR Header:** All SMS include PE ID in header

### 14.9.2 WhatsApp Policy Compliance

- **Opt-in:** Explicit checkbox during registration
- **Opt-out:** "Stop" keyword auto-processes via webhook
- **Template-only:** Only pre-approved Meta templates for outbound
- **Session Messages:** Free-form within 24 hours of user-initiated conversation
- **No spam:** Max 2 promotional WhatsApp messages per user per week

---

*Continue to VOL-15 — Analytics & Reporting System*
