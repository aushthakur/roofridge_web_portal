# VOL-08: Services, Materials & Marketplace
## Roof Ridge — Enterprise Software Blueprint

---

## 8.1 On-Demand Services Module

### 8.1.1 Service Categories

| Category | Sub-Services | Avg. Session Duration | Avg. Price |
|----------|-------------|----------------------|------------|
| Plumbing | Pipe leak repair, tap replacement, WC repair, drain cleaning | 1-2 hrs | ₹400–₹1,500 |
| Electrical | Wiring, MCB replacement, fan fitting, AC installation | 1-3 hrs | ₹300–₹2,000 |
| Carpentry | Furniture repair, wardrobe fitting, door alignment | 1-4 hrs | ₹500–₹3,000 |
| Painting | Room painting, full home, touch-up | 4-20 hrs | ₹8–₹18/sqft |
| POP & Flooring | False ceiling, tile flooring, waterproofing | 2-20 hrs | ₹80–₹150/sqft |
| Pest Control | Cockroach, termite, bed bugs, mosquito | 1-3 hrs | ₹600–₹3,500 |
| Deep Cleaning | Full home, bathroom, kitchen, sofa/carpet | 3-6 hrs | ₹1,500–₹8,000 |
| AC Service | Service/repair, gas refill, installation | 1-2 hrs | ₹400–₹2,500 |
| Appliance Repair | Fridge, washing machine, geyser, microwave | 1-2 hrs | ₹300–₹2,000 |
| Home Sanitization | Full home sanitization | 2-4 hrs | ₹999–₹3,999 |

### 8.1.2 Service Category Page

**URL:** `/services/{category}/` e.g., `/services/plumber/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Services > Plumbing                         │
│─────────────────────────────────────────────────────────────── │
│ H1: Plumber Service in Delhi — Book in 60 Seconds             │
│─────────────────────────────────────────────────────────────── │
│ [Book Now — Guaranteed in 4 Hours] ← Primary CTA             │
│─────────────────────────────────────────────────────────────── │
│ Sub-Services Grid:                                             │
│ [🔧 Tap Repair ₹199] [🚿 Geyser Repair ₹399]                │
│ [🚽 WC Repair ₹299] [🔵 Pipe Leak ₹299]                     │
│ [🧹 Drain Cleaning ₹399] [💧 Tank Cleaning ₹599]             │
│─────────────────────────────────────────────────────────────── │
│ HOW IT WORKS                                                    │
│ 1. Describe issue  2. Choose time  3. Expert arrives  4. Pay  │
│─────────────────────────────────────────────────────────────── │
│ AVAILABLE PROFESSIONALS NEAR YOU                               │
│ [Map showing nearby plumbers with ratings]                     │
│ [List: Ramesh (⭐ 4.8, 5 jobs today), Available — 800m away]  │
│─────────────────────────────────────────────────────────────── │
│ PRICING GUIDE                                                   │
│ Table: Service | Price Range | Duration                        │
│─────────────────────────────────────────────────────────────── │
│ WHAT'S INCLUDED                                                 │
│ ✅ Verified professional ✅ Insurance covered ✅ Re-do guarantee│
│─────────────────────────────────────────────────────────────── │
│ CUSTOMER REVIEWS (recent, from verified bookings)              │
│ [Review cards]                                                 │
│─────────────────────────────────────────────────────────────── │
│ COMPARE PACKAGES                                               │
│ [One-time] vs [AMC Annual Plan ₹499/yr]                       │
│─────────────────────────────────────────────────────────────── │
│ FAQs (8+ with FAQ schema)                                      │
└─────────────────────────────────────────────────────────────────┘
```

### 8.1.3 Service Booking Flow

**Step 1: Service Selection**

```
┌──────────────────────────────────────────────────────────────┐
│  Book a Plumber                                              │
│                                                              │
│  What do you need?                                           │
│  [Tap Repair] [Pipe Leak] [Drain Cleaning] [Other...]       │
│                                                              │
│  Describe your issue (optional)                             │
│  [                                                   ]      │
│                                                              │
│  Upload Photos (optional)                                   │
│  [📷 Add Photos]                                            │
│                                                              │
│  [ Next → ]                                                 │
└──────────────────────────────────────────────────────────────┘
```

**Step 2: Time Slot Selection**

```
┌──────────────────────────────────────────────────────────────┐
│  Choose a Time                                               │
│                                                              │
│  Today, Jul 23             Tomorrow, Jul 24                 │
│  [✓ 2:00 PM] [4:00 PM]    [9:00 AM] [11:00 AM] [2:00 PM]  │
│  [6:00 PM]                                                  │
│                                                              │
│  Or: [ ASAP — Earliest Available (60-90 min ETA) ]         │
│                                                              │
│  [ Next → ]                                                 │
└──────────────────────────────────────────────────────────────┘
```

**Slot Availability:**
- Slots: Every 2 hours, 8AM–8PM
- Real-time availability checked from partner calendars
- "ASAP" shows estimated arrival time
- Blocked slots greyed out (click shows "Select another time")

**Step 3: Address**

```
┌──────────────────────────────────────────────────────────────┐
│  Service Address                                             │
│                                                              │
│  [Saved Addresses if logged in]                             │
│  ○ Home — Flat 401, Tower B, Green Park                    │
│  ○ Office — 3rd Floor, XYZ Tower, Connaught Place          │
│                                                              │
│  + Add New Address                                          │
│  [Address Input with Map picker]                            │
│  [Pincode] [City (auto)]                                    │
│  [Landmark]                                                 │
│  [Floor/Flat Number]                                        │
│                                                              │
│  [ Next → ]                                                 │
└──────────────────────────────────────────────────────────────┘
```

**Step 4: Review & Confirm**

```
┌──────────────────────────────────────────────────────────────┐
│  Order Summary                                               │
│                                                              │
│  Service: Plumbing — Tap Repair                             │
│  Date: Today, 2:00 PM                                       │
│  Address: Flat 401, Tower B, Green Park                     │
│                                                              │
│  Pricing                                                    │
│  Visit charges: ₹199 (waived if you book)                  │
│  Service charges: At actuals after inspection               │
│  Payment: Pay after service                                 │
│                                                              │
│  Coupon Code: [          ] [Apply]                          │
│                                                              │
│  [ Confirm Booking ]                                        │
│                                                              │
│  Cancellation: Free up to 2 hrs before appointment          │
└──────────────────────────────────────────────────────────────┘
```

**Post-Booking Screen:**

```
┌──────────────────────────────────────────────────────────────┐
│                  ✅ Booking Confirmed!                        │
│                                                              │
│  Booking ID: BK-2026-001234                                  │
│  Plumbing — Tap Repair                                      │
│  Today, 2:00 PM                                             │
│                                                              │
│  Your professional: Ramesh Kumar ⭐ 4.8                      │
│  Contact: [Show Number] [WhatsApp]                          │
│                                                              │
│  [Track Live] [View Booking Details]                        │
│                                                              │
│  📱 Download app for real-time updates                       │
└──────────────────────────────────────────────────────────────┘
```

---

### 8.1.4 Live Tracking Page

**URL:** `/bookings/{booking-id}/track/`

```
┌──────────────────────────────────────────────────────────────┐
│  Live Tracking — BK-2026-001234                             │
│                                                              │
│  Status: PROFESSIONAL EN ROUTE          🟢 Live             │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  [Google Maps]                       │    │
│  │                                                     │    │
│  │    [🔧 Professional Location — Moving]              │    │
│  │         ↓ (real-time GPS dot)                       │    │
│  │                                                     │    │
│  │    [📍 Your Location]                               │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Ramesh Kumar is 1.2 km away — ETA: ~8 minutes              │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  BOOKING PROGRESS                                           │
│  ✅ Booking Confirmed — 1:45 PM                             │
│  ✅ Professional Assigned — 1:48 PM                         │
│  ✅ Accepted by Partner — 1:52 PM                          │
│  🔄 En Route — 1:55 PM (Current)                           │
│  ⏳ Arrived / In Progress                                   │
│  ⏳ Completed                                               │
│                                                              │
│  [📞 Call Ramesh] [💬 Chat with Ramesh]                    │
│  [📋 View Booking Details] [🚫 Cancel]                     │
└──────────────────────────────────────────────────────────────┘
```

**Real-time Updates:**
- WebSocket connection (Socket.IO)
- Partner app sends GPS every 30 seconds during `en_route`
- Status updates pushed instantly via socket event `booking:status_update`
- Map auto-centers on partner location

---

### 8.1.5 Post-Service Rating

**Trigger:** 30 minutes after booking marked `completed`  
**Channel:** Push notification + in-app banner on next open

```
┌──────────────────────────────────────────────────────────────┐
│  How was your experience?                                    │
│  Plumbing Service — Ramesh Kumar                            │
│                                                              │
│  Overall Rating                                             │
│  ★ ★ ★ ★ ★ (tap stars)                                    │
│                                                              │
│  What went well? (optional)                                 │
│  [✓] On time  [✓] Clean work  [ ] Polite  [ ] Affordable   │
│                                                              │
│  Write a Review (optional)                                  │
│  [                                                   ]      │
│  Max 500 chars                                             │
│                                                              │
│  Upload Photos (optional)                                   │
│  [📷 Add Before/After Photos]                               │
│                                                              │
│  [ Submit Rating ]                  [Skip for Now]         │
└──────────────────────────────────────────────────────────────┘
```

**API:** `POST /v1/bookings/:id/review`

**Post-Review:**
- Partner's rating is updated (rolling average)
- Review visible on partner profile page
- "Book Again" and "Add to AMC" prompts shown

---

## 8.2 Construction & Renovation Services Module

### 8.2.1 Category Pages

**URL:** `/services/construction/` → Sub-categories:
- `/services/builders/`
- `/services/civil-contractors/`
- `/services/architects/`
- `/services/interior-designers/`
- `/services/mistri-labour/`

### 8.2.2 Service Provider Profile Page

**URL:** `/partners/{partner-slug}/`

```
┌─────────────────────────────────────────────────────────────────┐
│ [Portfolio Hero Photo / Slideshow]                             │
│─────────────────────────────────────────────────────────────── │
│ [Avatar] ABC Interiors Pvt Ltd          ✅ Verified Partner    │
│          Interior Designer             ⭐ 4.8 (120 reviews)   │
│          New Delhi, Gurgaon             💼 12 years exp.       │
│─────────────────────────────────────────────────────────────── │
│ [Get Quote] [Call Now] [WhatsApp] [Save / ♡]                  │
│─────────────────────────────────────────────────────────────── │
│ SERVICES OFFERED                                               │
│ Interior Design | Modular Kitchen | Furniture | Lighting       │
│─────────────────────────────────────────────────────────────── │
│ PORTFOLIO                                                       │
│ [Filter: All | Residential | Commercial | Kitchens]           │
│ [Before/After Photo Grid]                                      │
│─────────────────────────────────────────────────────────────── │
│ STATS & HIGHLIGHTS                                             │
│ 350+ Projects | 98% Client Satisfaction | ₹2L–₹50L Range     │
│─────────────────────────────────────────────────────────────── │
│ SERVICE PACKAGES                                               │
│ [Basic ₹799/sqft] [Standard ₹1,299/sqft] [Premium ₹1,999/sqft]│
│─────────────────────────────────────────────────────────────── │
│ REVIEWS (120 reviews, 4.8⭐)                                   │
│ [Star distribution bar chart]                                  │
│ [Review Cards with photos]                                     │
│─────────────────────────────────────────────────────────────── │
│ AVAILABILITY CALENDAR                                          │
│ [Calendar showing available dates for consultation]            │
│─────────────────────────────────────────────────────────────── │
│ SIMILAR PROFESSIONALS                                          │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2.3 Get Quote Flow

```
Step 1 → Step 2 → Step 3 → Submit
```

**Step 1: Project Details**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Project Type | Select | ✅ | Full Home/Kitchen/Bathroom/Single Room/Commercial |
| Work Type | Select | ✅ | Interior Design/Civil/Electrical/Plumbing/All |
| Property Size | Number | ✅ | Area in sqft |
| Number of Rooms | Number | ❌ | 1-50 |
| Location | Autocomplete | ✅ | City + Locality |
| Budget Range | Dual slider | ✅ | ₹50K–₹1Cr+ |
| Timeline | Select | ✅ | ASAP / 1 Month / 3 Months / 6 Months |
| Project Description | Textarea | ✅ | Min 20 chars, max 2000 chars |
| Reference Images | File upload | ❌ | Max 10 images, 10MB each |

**Step 2: Contact Details**
- Auto-filled if logged in
- Name, Mobile, Email, Preferred contact time

**Step 3: Confirmation**
- Quote request submitted
- "You'll receive quotes from up to 5 matched professionals within 2 hours"
- Lead created: `POST /v1/leads/capture` (source: construction_quote)
- Each matched partner notified via B2B App push notification

**Quote Management (for User):**
- User gets push/email when quotes arrive
- Compare quotes side by side
- Accept/decline individual quotes
- Chat with shortlisted partners
- Book preferred partner

---

### 8.2.4 Construction Progress Tracker

**URL:** `/bookings/{booking-id}/progress/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Construction Progress                   BK-2026-C001           │
│ Full Home Renovation — ABC Interiors                           │
│─────────────────────────────────────────────────────────────── │
│                                                                 │
│  PROGRESS TIMELINE                                             │
│                                                                 │
│  ✅ Week 1: Site Survey & Measurement — Completed (Jul 1)      │
│     [3 photos uploaded by partner]                             │
│                                                                 │
│  ✅ Week 2-3: Demolition & Civil Work — Completed (Jul 15)     │
│     [5 before/after photos]                                    │
│     Partner Note: "Civil work done. Tiles delivered."         │
│                                                                 │
│  🔄 Week 4-5: Flooring & Tiling — In Progress (Jul 23)        │
│     [2 photos — in progress]                                   │
│     Progress: 60%  [█████████░░░░░░]                          │
│                                                                 │
│  ⏳ Week 6-7: Painting                                          │
│  ⏳ Week 8: Furniture & Fittings                               │
│  ⏳ Week 9: Final Handover & Walkthrough                       │
│                                                                 │
│  Estimated Completion: Aug 20, 2026                            │
│                                                                 │
│  [📞 Call Partner] [💬 Chat]                                   │
│  [🚩 Raise Issue] [📋 Payment Status]                         │
└─────────────────────────────────────────────────────────────────┘
```

**Partner-Side Update (B2B App):**
- Tap milestone → Upload progress photos + text update
- Customer sees update immediately via push notification
- Customer can add reaction (✅ Looks good / ⚠️ Issue / ❓ Question)

---

## 8.3 Building Material Marketplace

### 8.3.1 Category Structure

**URL:** `/materials/`

```
Material Categories:
├── Cement & Concrete
│   ├── OPC Cement
│   ├── PPC Cement
│   └── Ready-Mix Concrete
├── Steel & Metal
│   ├── TMT Bars
│   ├── MS Pipes
│   └── GI Sheets
├── Bricks & Blocks
│   ├── Red Bricks
│   ├── AAC Blocks
│   └── Fly Ash Bricks
├── Sand & Aggregates
├── Tiles & Flooring
│   ├── Ceramic Tiles
│   ├── Vitrified Tiles
│   └── Marble & Granite
├── Paints
│   ├── Interior Paints
│   ├── Exterior Paints
│   └── Primers & Putty
├── Plumbing
│   ├── CPVC/PVC Pipes
│   ├── Fittings
│   └── Sanitary Ware
└── Electrical
    ├── Wires & Cables
    ├── Switches & Sockets
    └── MCBs & Panels
```

### 8.3.2 Material Category Page

**URL:** `/materials/cement/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Materials > Cement                          │
│─────────────────────────────────────────────────────────────── │
│ H1: Buy Cement Online — Best Prices from Verified Vendors      │
│─────────────────────────────────────────────────────────────── │
│ [Filter Panel]              [Sort: Relevance ▾]               │
│                                                                 │
│ ┌────────────────────┐  ┌────────────────────┐               │
│ │  [Product Card]    │  │  [Product Card]    │               │
│ │  ACC OPC Cement    │  │  UltraTech PPC     │               │
│ │  ₹310/bag (50kg)  │  │  ₹295/bag (50kg)  │               │
│ │  Min: 10 bags      │  │  Min: 10 bags      │               │
│ │  3 vendors compare │  │  4 vendors compare │               │
│ │  ⭐ 4.7 (89 reviews)│  │  ⭐ 4.8 (134 rev) │               │
│ │  [Add to Cart]     │  │  [Compare ▾]      │               │
│ └────────────────────┘  └────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

**Filters:**
- Brand (checkboxes)
- Price per unit (slider)
- Grade/Type
- Availability (In Stock / All)
- Vendor Rating
- Delivery Time
- City (delivery available)

### 8.3.3 Product Detail Page

**URL:** `/materials/cement/ultratech-ppc-cement-50kg/`

```
┌─────────────────────────────────────────────────────────────────┐
│ [Product Images Gallery]                                        │
│─────────────────────────────────────────────────────────────── │
│ UltraTech PPC Cement — 50kg Bag            ⭐ 4.8 (134 reviews)│
│─────────────────────────────────────────────────────────────── │
│ COMPARE PRICES ACROSS VENDORS                                  │
│ Vendor | Price/Bag | Min Qty | Delivery | Rating | CTA        │
│ ABC Cement | ₹295 | 10 bags | 2-3 days | ⭐4.8 | [Add Cart]   │
│ XYZ Dealers | ₹305 | 5 bags | 1-2 days | ⭐4.6 | [Add Cart]   │
│ PQR Builders | ₹285 | 50 bags | 3-5 days | ⭐4.5 | [Add Cart]  │
│─────────────────────────────────────────────────────────────── │
│ BULK PRICING (from lowest-price vendor)                        │
│ 10-49 bags: ₹295/bag | 50-99: ₹280/bag | 100+: ₹265/bag      │
│─────────────────────────────────────────────────────────────── │
│ SPECIFICATIONS                                                  │
│ Type: PPC | Grade: 43 | Setting Time: 30 min | Standards: BIS  │
│─────────────────────────────────────────────────────────────── │
│ REVIEWS & RATINGS                                              │
│ [Review breakdown + review cards]                              │
│─────────────────────────────────────────────────────────────── │
│ SIMILAR PRODUCTS                                               │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3.4 Cart & Checkout

**Cart Page: `/materials/cart/`**

```
┌─────────────────────────────────────────────────────────────────┐
│ Your Cart (3 items from 2 vendors)                             │
│                                                                 │
│ FROM: ABC Cement Store                                         │
│ [UltraTech PPC — 50 bags × ₹295]                  ₹14,750    │
│ [ACC OPC — 20 bags × ₹310]                         ₹6,200    │
│                                                                 │
│ FROM: XYZ Building Materials                                   │
│ [Steel TMT Fe500 — 1 tonne]                       ₹52,000    │
│                                                                 │
│ ─────────────────────────────────────                          │
│                                                                 │
│ DELIVERY ADDRESS                                               │
│ [ Select or Add Delivery Address ]                             │
│                                                                 │
│ DELIVERY SCHEDULE                                              │
│ ABC Cement: [Select Date] [Select Slot]                        │
│ XYZ Building: [Select Date] [Select Slot]                      │
│                                                                 │
│ COUPON CODE                                                    │
│ [           ] [Apply]                                          │
│                                                                 │
│ ORDER SUMMARY                                                  │
│ Subtotal:        ₹72,950                                       │
│ Delivery:        ₹1,200                                        │
│ GST (18%):       ₹13,131                                       │
│ Coupon Discount: -₹730                                         │
│ ─────────────────────────────────────────                      │
│ Total:           ₹86,551                                       │
│                                                                 │
│ [ Proceed to Payment ]                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Cart State Management:**
- Stored in Redux/Zustand + localStorage (guest)
- Synced to server on login
- Cart persists for 7 days

**Cart Item Operations:**
| Action | API |
|--------|-----|
| Add item | `POST /v1/cart/items` |
| Update quantity | `PATCH /v1/cart/items/:id` |
| Remove item | `DELETE /v1/cart/items/:id` |
| Apply coupon | `POST /v1/cart/coupon` |
| Get cart summary | `GET /v1/cart` |

### 8.3.5 Order Tracking

**URL:** `/orders/{order-id}/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Order: ORD-2026-001234                                          │
│ UltraTech Cement — 50 bags                    ₹14,750          │
│─────────────────────────────────────────────────────────────── │
│                                                                 │
│ DELIVERY STATUS                                                │
│                                                                 │
│ ✅ Order Confirmed — Jul 20, 2:30 PM                           │
│ ✅ Prepared — Jul 21, 10:00 AM                                 │
│ ✅ Dispatched — Jul 21, 3:00 PM (Driver: Suresh, 9876XXXXXX)  │
│ 🔄 In Transit — Est. delivery: Jul 23 (Today) by 5 PM         │
│ ⏳ Delivered                                                    │
│                                                                 │
│ [Track on Map] [Call Driver]                                   │
│                                                                 │
│ DELIVERY DETAILS                                               │
│ To: Flat 401, Tower B, Green Park, Delhi                      │
│─────────────────────────────────────────────────────────────── │
│ Need help?  [Contact Vendor] [Raise Issue]                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8.4 Interior Design & Furnishing Module

**URL:** `/services/interiors/`

### 8.4.1 Package Catalog

```
┌─────────────────────────────────────────────────────────────────┐
│ Interior Design Packages                                        │
│                                                                 │
│ [Essential ₹799/sqft] [Classic ₹1,299/sqft] [Elite ₹1,999/sqft]│
│                                                                 │
│ ─────────────────────────────────────────────                  │
│                                                                 │
│ Browse by Room:                                                 │
│ [🍳 Modular Kitchen] [🛋 Living Room] [🛏 Bedroom]            │
│ [🚿 Bathroom] [🪑 Full Home] [🏢 Office]                      │
│                                                                 │
│ Before / After Gallery                                         │
│ [Masonry grid of before/after transformations]                 │
│                                                                 │
│ EMI Options Available on packages above ₹50,000               │
│ Starting from ₹2,999/month                                     │
└─────────────────────────────────────────────────────────────────┘
```

### 8.4.2 Design Consultation Booking

- Select consultation type: Online / In-Home
- Select available slot (calendar)
- Describe project + upload floor plan / inspiration images
- Confirm booking
- Consultation is free (₹999 fully refundable if you book a package)

### 8.4.3 Modular Kitchen Configurator

```
Interactive Kitchen Planner:
1. Select kitchen shape: L-Shape / U-Shape / Straight / Island / Parallel
2. Select cabinet finish (image selector with 50+ options)
3. Select countertop material (Granite / Quartz / Laminate)
4. Select hardware style
5. Add accessories: Chimney, Hob, Oven, Dishwasher
6. Real-time 3D preview renders (Three.js)
7. Price updates in real-time
8. "Save Design" / "Get This Quote"
```

---

## 8.5 AMC & Subscription Plans

**URL:** `/amc/`

### 8.5.1 Plans Comparison Page

```
┌─────────────────────────────────────────────────────────────────┐
│ Annual Maintenance Contracts (AMC)                             │
│ Peace of Mind, Year-Round                                      │
│─────────────────────────────────────────────────────────────── │
│                                                                 │
│ SINGLE SERVICE AMC                                             │
│ ┌──────────┬──────────┬──────────┬──────────┐                │
│ │Plumbing  │Electrical│Pest Ctrl │AC Service │                │
│ │₹499/yr   │₹499/yr   │₹799/yr   │₹999/yr    │                │
│ │2 visits/yr│2 visits  │2 treatments│2 services│                │
│ │[Buy Now] │[Buy Now] │[Buy Now] │[Buy Now]  │                │
│ └──────────┴──────────┴──────────┴──────────┘                │
│                                                                 │
│ COMPREHENSIVE AMC PACKS                                        │
│ [Home Care Starter ₹1,499/yr — Plumbing + Electrical]         │
│ [Home Care Plus ₹2,499/yr — 6 services included]              │
│ [Home Care Complete ₹3,999/yr — All services, priority]       │
│                                                                 │
│ WHY AMC?                                                       │
│ ✅ Guaranteed service slots  ✅ No surprise charges            │
│ ✅ Priority over walk-in     ✅ Service history log            │
│ ✅ Free emergency visit/yr   ✅ Dedicated support              │
└─────────────────────────────────────────────────────────────────┘
```

### 8.5.2 AMC Subscription Lifecycle

```
Purchase → Active → Renewal Reminder (30 days before) 
→ Renewal Reminder (7 days) → Renewal Reminder (1 day)
→ Expired (if not renewed) → Grace Period (7 days)
→ Cancelled
```

**Scheduled Service Visits:**
- After purchase: User selects preferred months/schedule
- 48-hour reminder push notification before each visit
- Partner assigned 24 hours before visit
- Visit tracked same as regular booking

**Emergency Visit:**
- AMC subscribers get 1 free emergency visit/year
- "Emergency Service" button in AMC dashboard section
- Marked as `amc_emergency` type
- Priority partner assignment

---

## 8.6 API Specifications — Services & Materials

### POST /v1/bookings
*(See VOL-04 for full spec)*

### GET /v1/services/categories

**Response:**
```json
{
  "data": {
    "categories": [
      {
        "id": "cat_plumbing",
        "name": "Plumbing",
        "slug": "plumber",
        "icon_url": "https://cdn.roofridge.in/icons/plumbing.svg",
        "is_serviceable_in_city": true,
        "avg_response_time_mins": 45,
        "starting_price": 199
      }
    ]
  }
}
```

### GET /v1/services/:category/professionals

**Query:** `?city=Delhi&lat=28.5921&lng=77.0669&radius=5`

**Response:**
```json
{
  "data": {
    "professionals": [
      {
        "id": "partner_abc123",
        "name": "Ramesh Kumar",
        "photo_url": "...",
        "rating": 4.8,
        "reviews_count": 234,
        "distance_km": 0.8,
        "eta_minutes": 12,
        "is_available": true,
        "jobs_today": 3,
        "skills": ["tap_repair", "pipe_leak", "geyser"],
        "is_verified": true
      }
    ],
    "total_available": 8
  }
}
```

### GET /v1/services/:category/slots

**Query:** `?partner_id=...&date=2026-07-23&city=Delhi`

**Response:**
```json
{
  "data": {
    "slots": [
      { "time": "14:00", "available": true, "label": "2:00 PM" },
      { "time": "16:00", "available": true, "label": "4:00 PM" },
      { "time": "18:00", "available": false, "label": "6:00 PM — Fully Booked" }
    ],
    "asap_eta_minutes": 45
  }
}
```

### GET /v1/materials/products

**Query:** `?category=cement&city=Delhi&min_price=200&max_price=400&sort=price_asc&page=1`

### GET /v1/materials/cart

**Auth:** Required

**Response:**
```json
{
  "data": {
    "items": [
      {
        "id": "cart_item_123",
        "product_id": "prod_abc",
        "product_name": "UltraTech PPC Cement",
        "vendor_id": "partner_xyz",
        "vendor_name": "ABC Cement Store",
        "quantity": 50,
        "unit": "bag",
        "unit_price": 295,
        "total_price": 14750,
        "stock_available": 200
      }
    ],
    "summary": {
      "subtotal": 14750,
      "gst": 2655,
      "delivery_fee": 500,
      "total": 17905
    }
  }
}
```

---

## 8.7 Notifications — Services & Materials

| Event | SMS | Email | WhatsApp | Push |
|-------|-----|-------|----------|------|
| Booking Created | ✅ "BK confirmed. Partner will be assigned shortly" | ✅ Full details | ✅ "Booking ID: BK-001234" | ✅ |
| Partner Assigned | ✅ "Ramesh assigned. He'll arrive at 2 PM" | ❌ | ✅ Partner contact shared | ✅ |
| Partner En Route | ❌ | ❌ | ❌ | ✅ "Your plumber is on the way!" |
| Booking Completed | ✅ | ✅ Invoice | ✅ | ✅ "Rate your experience" |
| Booking Cancelled | ✅ | ✅ | ✅ | ✅ |
| AMC Renewal Reminder | ✅ (7, 3, 1 days) | ✅ | ✅ | ✅ |
| Order Dispatched | ✅ | ✅ | ✅ "Your cement order is on its way!" | ✅ |
| Order Delivered | ✅ | ✅ | ✅ | ✅ |
| Quote Received | ❌ | ✅ | ✅ | ✅ "You received a quote from ABC Interiors" |

---

*Continue to VOL-09 — Loans, Insurance & Legal Services*
