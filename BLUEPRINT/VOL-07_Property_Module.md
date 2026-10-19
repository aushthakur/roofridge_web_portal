# VOL-07: Property Module — Advanced Specifications
## Roof Ridge — Enterprise Software Blueprint

---

## 7.1 AI Property Valuation Tool

### 7.1.1 Overview

| Attribute | Value |
|-----------|-------|
| **URL** | `/tools/property-valuation/` |
| **Purpose** | AI-estimated market value of a property |
| **Free Tier** | Estimated range only |
| **Paid Tier** | Full valuation report (₹499–₹2,499) |
| **API** | `POST /v1/ai/valuation` |

### 7.1.2 Valuation Request Form

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Property Valuation Tool                                     │
│  Get an accurate estimate based on market data                 │
│                                                                 │
│  Property Type *                                               │
│  [ Flat ▾ ] [ Villa ] [ Plot ] [ Commercial ]                 │
│                                                                 │
│  City *           Locality *                                   │
│  [ Delhi ▾ ]      [ Search locality... ]                       │
│                                                                 │
│  Super Built-up Area *                Carpet Area              │
│  [          ] sqft ▾                  [          ] sqft ▾      │
│                                                                 │
│  BHK Type *         Floor Number        Age of Property *      │
│  [3 BHK ▾]          [4        ]         [1-5 Years ▾]         │
│                                                                 │
│  Facing             Furnishing          Amenities              │
│  [East ▾]           [Semi ▾]            [✓ Parking] [✓ Lift]  │
│                                                                 │
│  Additional Details (optional)                                 │
│  [                                                    ]        │
│                                                                 │
│  [ Get Free Estimate ]                                         │
│                                                                 │
│  🔒 Your data is secure. We never share it without consent.    │
└─────────────────────────────────────────────────────────────────┘
```

**Field Validations:**

| Field | Required | Validation |
|-------|----------|------------|
| Property Type | ✅ | Enum |
| City | ✅ | Must select |
| Locality | ✅ | Must select from list |
| Super Built-up Area | ✅ | 100–100,000 sqft |
| BHK Type | ✅ (residential) | Enum |
| Age of Property | ✅ | Enum |

### 7.1.3 Valuation Results Display

```
┌─────────────────────────────────────────────────────────────────┐
│  Your Property Valuation Estimate                               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │        ESTIMATED MARKET VALUE                             │ │
│  │                                                           │ │
│  │        ₹78,00,000 — ₹92,00,000                          │ │
│  │                                                           │ │
│  │        Confidence: ██████████░  87%                      │ │
│  │        Based on 234 comparable sales                     │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Key Factors Affecting Value                                    │
│  ✅ Locality Premium (+8%)     ✅ Metro Proximity (+5%)        │
│  ✅ Floor Premium (+3%)        ⚠️ Age Discount (-4%)           │
│                                                                 │
│  Price Trend — Dwarka Sector 12                                │
│  [Line Chart — 24 months history]                             │
│  📈 +4.2% in last 6 months | 📈 +11.5% in last 2 years       │
│                                                                 │
│  Comparable Sales Nearby                                       │
│  • 3BHK, 1,180 sqft — ₹82L (Jul 2026)                        │
│  • 3BHK, 1,320 sqft — ₹88L (Jun 2026)                        │
│  • 3BHK, 1,200 sqft — ₹85L (May 2026)                        │
│                                                                 │
│  ─────────────────────────────────────────────                 │
│                                                                 │
│  Want a detailed Valuation Report?                             │
│  Includes: 20-page PDF, RERA verification, legal check,        │
│  rental yield analysis, 5-year projection                      │
│                                                                 │
│  [Download Valuation Report — ₹999 →]                         │
│                                                                 │
│  [Check Loan Eligibility for this Property]                    │
│  [List This Property for Sale/Rent]                            │
└─────────────────────────────────────────────────────────────────┘
```

### 7.1.4 Paid Valuation Report Flow

1. Click "Download Valuation Report — ₹999"
2. Login modal (if guest)
3. Payment confirmation (Razorpay)
4. Report generation queued (`ai.valuation` queue)
5. Email notification: "Your report is ready"
6. Report available in Dashboard > Documents
7. Admin can set price from: `Admin > AI Configuration > Valuation Report Price`

**Report Contents (PDF):**
- Executive summary
- Market comparison (5 comparable sales)
- Price trend analysis (24-month chart)
- Locality demand score
- RERA verification status
- Rental yield estimate
- 5-year price projection
- Key risk factors
- Legal check summary
- Nearby infrastructure impact
- Recommended listing price

---

## 7.2 Advanced Search & Geo-Search

### 7.2.1 Draw-on-Map Search

**Activation:** "Draw Area" button in map view

**Flow:**
1. User clicks "Draw Area"
2. Map enters drawing mode (cursor changes)
3. User clicks to create polygon points
4. Minimum 3 points to create valid polygon
5. Click first point to close polygon
6. "Search in this area" button appears
7. Click: Fetch properties within polygon bounds

**API:** `POST /v1/properties/search/geo`
```json
{
  "search_type": "polygon",
  "polygon_coordinates": [
    [28.5921, 77.0669],
    [28.6021, 77.0769],
    [28.5921, 77.0869],
    [28.5821, 77.0769]
  ],
  "type": "sale",
  "filters": {}
}
```

### 7.2.2 Nearby Search (Circular Radius)

**Activation:** "Near Me" button / location permission

```
GET /v1/properties/search?lat=28.5921&lng=77.0669&radius=3&unit=km
```

**UI:** Shows circle overlay on map with radius label

---

## 7.3 City & Locality Landing Pages (SEO Critical)

### 7.3.1 City Property Page

**URL:** `/{city}/property/` e.g., `/delhi/property/`

**Page Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Delhi > Properties                          │
│─────────────────────────────────────────────────────────────── │
│ H1: Properties for Sale in Delhi — 45,000+ Listings            │
│─────────────────────────────────────────────────────────────── │
│ Primary CTA: [Search Delhi Properties] [Post Property Free]    │
│─────────────────────────────────────────────────────────────── │
│ Quick Stats: 45,000 listings | 2,800 dealers | ₹45L avg price  │
│─────────────────────────────────────────────────────────────── │
│ Popular Areas in Delhi (cards):                                │
│ [Dwarka] [Rohini] [Janakpuri] [Lajpat Nagar] [Greater Noida] │
│─────────────────────────────────────────────────────────────── │
│ Property Type Filter + Recent Listings                         │
│─────────────────────────────────────────────────────────────── │
│ Price Trends in Delhi                                          │
│ [Bar chart: avg price by locality, last 12 months]            │
│─────────────────────────────────────────────────────────────── │
│ Top Builders in Delhi (logo strip)                             │
│─────────────────────────────────────────────────────────────── │
│ Delhi Property EMI Calculator                                  │
│─────────────────────────────────────────────────────────────── │
│ Delhi Buyer's Guide                                            │
│─────────────────────────────────────────────────────────────── │
│ Related Searches in Delhi (internal links)                     │
│─────────────────────────────────────────────────────────────── │
│ Delhi FAQs (8+ Q&As with FAQ schema)                          │
│─────────────────────────────────────────────────────────────── │
│ Related Blog Articles (3 articles)                             │
└─────────────────────────────────────────────────────────────────┘
```

**SEO Requirements:**
- H1: "Properties for Sale in {City} — {Count}+ Listings"
- Meta title: "Buy Properties in {City} | {Count}+ Verified Listings | Roof Ridge"
- Meta desc: "Explore {Count}+ verified properties for sale in {City}. BHK flats, villas, plots. Compare prices, check loan eligibility. Zero brokerage."
- Schema: BreadcrumbList, RealEstateListing aggregate, FAQPage
- Canonical: Exact URL, no trailing duplicates
- Internal links: All locality pages, all property type pages for this city

**Dynamic Content (CMS-managed, no code release):**
- City description text
- Featured areas (selectable from admin)
- FAQs
- Buyer's guide content

---

### 7.3.2 Locality Property Page

**URL:** `/{city}/{locality}/property/` e.g., `/delhi/dwarka/property/`

**Additional Components vs City Page:**
- Locality boundary on Google Maps (polygon)
- Walk score / transit score
- Nearby landmarks
- "Properties in adjacent localities" section

---

## 7.4 New Projects Pages

**URL:** `/new-projects/{city}/` e.g., `/new-projects/delhi/`  
**Detail URL:** `/project/{project-slug}/`

### 7.4.1 Project Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│ [Builder Logo] [Project Name]                    [RERA badge]   │
│─────────────────────────────────────────────────────────────── │
│ [Project Image Gallery / Render Gallery]                       │
│ [Video Tour] [Floor Plans]                                      │
│─────────────────────────────────────────────────────────────── │
│ 2/3/4 BHK Apartments | 1,200–2,500 sqft | ₹95L–₹2.5Cr        │
│ 📍 Sector 45, Gurgaon | Possession: Dec 2027                   │
│ ✅ RERA Registered                                              │
│─────────────────────────────────────────────────────────────── │
│ UNIT SELECTOR                                                   │
│ [2 BHK] [3 BHK] [4 BHK]                                       │
│                                                                 │
│ Unit Type | Area | Price | Availability | CTA                  │
│ 2BHK Type A | 1,200 sqft | ₹95L | Available | [Enquire]       │
│ 2BHK Type B | 1,350 sqft | ₹1.05Cr | Limited | [Enquire]      │
│─────────────────────────────────────────────────────────────── │
│ PROJECT HIGHLIGHTS                                              │
│ [Amenities Grid]                                               │
│─────────────────────────────────────────────────────────────── │
│ LOCATION MAP                                                    │
│ [Map with connectivity: Metro, Schools, Hospitals]             │
│─────────────────────────────────────────────────────────────── │
│ BUILDER PROFILE                                                 │
│ [Builder Logo] | 25 years exp | 50 projects delivered          │
│─────────────────────────────────────────────────────────────── │
│ CONSTRUCTION PROGRESS                                          │
│ [Timeline with photos]                                         │
│ Foundation: ✅ Dec 2025                                         │
│ Structure Floor 1-5: ✅ Mar 2026                               │
│ Plumbing: 🔄 In Progress                                       │
│ Possession: ⏳ Dec 2027                                         │
│─────────────────────────────────────────────────────────────── │
│ EMI CALCULATOR (pre-filled with project pricing)               │
│─────────────────────────────────────────────────────────────── │
│ REVIEWS FROM RESIDENTS (if older project)                      │
│─────────────────────────────────────────────────────────────── │
│ FAQs                                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7.5 PG / Co-Living Pages

**URL:** `/pg/{city}/` e.g., `/pg/bangalore/`  
**Detail URL:** `/pg/{slug}/`

### PG Listing Fields (Additional)

| Field | Options |
|-------|---------|
| Room Type | Single/Double/Triple/Dormitory |
| Gender Preference | Male Only/Female Only/Both |
| Meals Included | Yes/No, Breakfast/Lunch/Dinner |
| Utilities | WiFi/Laundry/Housekeeping included? |
| Rules | No Smoking/No Guests/No Pets |
| Minimum Stay | 1 Month/3 Months/6 Months |

---

## 7.6 Property Enquiry & Callback System

### 7.6.1 Enquiry Modal (Triggered from listing page)

```
┌───────────────────────────────────────────────────────┐
│  Request Information                                  │
│  3 BHK Flat, Dwarka Sector 12                        │
│                                                       │
│  Full Name *                                         │
│  [                              ]                    │
│                                                       │
│  Mobile *                                            │
│  [+91  9876543210               ]                    │
│                                                       │
│  Email                                               │
│  [                              ]                    │
│                                                       │
│  I'm interested in:                                  │
│  (•) Buying this property                            │
│  ( ) Scheduling a site visit                         │
│  ( ) Getting more information                        │
│  ( ) Loan assistance for this property               │
│                                                       │
│  Preferred Contact Time                              │
│  [Morning ▾]                                         │
│                                                       │
│  Message (optional)                                   │
│  [                                                ]  │
│                                                       │
│  [ Send Enquiry ]                                    │
│                                                       │
│  By submitting, you agree to be contacted.           │
└───────────────────────────────────────────────────────┘
```

**Submit Process:**
1. Validate fields
2. If authenticated: use user profile data, pre-fill
3. If guest: use entered data
4. `POST /v1/properties/:id/enquiries`
5. `POST /v1/leads/capture` (source: `property_enquiry`)
6. SMS confirmation to user: "Enquiry sent! Agent will contact within 30 min"
7. WhatsApp notification to agent
8. Push notification to agent (B2B App)
9. Lead visible in Admin CRM

---

## 7.7 Property Admin Moderation — Complete Flow

### 7.7.1 Moderation Queue API

```
GET /v1/admin/properties/moderation?status=pending_review&city=Delhi&page=1&limit=20
```

**Response includes for each listing:**
- All listing details
- Owner/dealer KYC status
- Previous listing history (if repeat poster)
- AI fraud score
- Flagged elements (if any)

### 7.7.2 Moderation Actions

| Action | Status Change | Notification to Owner |
|--------|--------------|----------------------|
| Approve | `pending_review` → `live` | "Your listing is now live!" (SMS + push) |
| Reject | `pending_review` → `rejected` | "Listing rejected: [reason]" + guidance |
| Request Edit | No change | "Please update: [specific note]" |
| Flag as Fraud | `pending_review` → `flagged` | Internal only |
| Force Delete | Any → `deleted` | Admin-drafted message |

### 7.7.3 Auto-Moderation Rules

Listings auto-reject if:
- Phone numbers visible in photos (OCR detection)
- WhatsApp/Telegram numbers in description (regex detection)
- RERA number format invalid for the state
- Duplicate listing detected (same address within 30 days)
- Price flagged as anomaly (AI: >50% deviation from locality average)

Auto-flagged for manual review if:
- New user with KYC but high-value listing (>₹5Cr)
- Multiple listings from same IP within 1 hour
- Description contains competitor platform names

---

## 7.8 Property Search — Elasticsearch Index Specification

### Index Name: `property_listings`

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "listing_slug": { "type": "keyword" },
      "listing_type": { "type": "keyword" },
      "property_type": { "type": "keyword" },
      "city": { "type": "keyword" },
      "city_lowercase": { "type": "keyword", "normalizer": "lowercase" },
      "locality": { "type": "keyword" },
      "locality_lowercase": { "type": "keyword", "normalizer": "lowercase" },
      "state": { "type": "keyword" },
      "pincode": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "english" },
      "description": { "type": "text", "analyzer": "english" },
      "price": { "type": "long" },
      "price_per_sqft": { "type": "float" },
      "bhk_type": { "type": "keyword" },
      "bedrooms": { "type": "integer" },
      "super_built_up_area": { "type": "float" },
      "carpet_area": { "type": "float" },
      "furnishing_status": { "type": "keyword" },
      "age_of_property": { "type": "keyword" },
      "facing": { "type": "keyword" },
      "amenities": { "type": "keyword" },
      "is_verified": { "type": "boolean" },
      "is_featured": { "type": "boolean" },
      "is_boosted": { "type": "boolean" },
      "status": { "type": "keyword" },
      "rera_verified": { "type": "boolean" },
      "geo_location": { "type": "geo_point" },
      "view_count": { "type": "integer" },
      "save_count": { "type": "integer" },
      "enquiry_count": { "type": "integer" },
      "ai_price_confidence": { "type": "float" },
      "partner_rating": { "type": "float" },
      "partner_subscription_tier": { "type": "keyword" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" },
      "boost_expires_at": { "type": "date" }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "english": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "english_stop", "english_stemmer"]
        }
      }
    }
  }
}
```

### Search Query Template

```json
{
  "query": {
    "bool": {
      "must": [
        { "term": { "status": "live" } }
      ],
      "filter": [
        { "term": { "listing_type": "sale" } },
        { "term": { "city_lowercase": "delhi" } },
        { "range": { "price": { "gte": 5000000, "lte": 15000000 } } },
        { "terms": { "bhk_type": ["3BHK", "4BHK"] } }
      ],
      "should": [
        { "term": { "is_boosted": true, "boost": 3.0 } },
        { "term": { "is_featured": true, "boost": 2.0 } },
        { "term": { "is_verified": true, "boost": 1.5 } }
      ]
    }
  },
  "sort": [
    { "_score": { "order": "desc" } },
    { "is_boosted": { "order": "desc" } },
    { "created_at": { "order": "desc" } }
  ],
  "from": 0,
  "size": 20,
  "aggs": {
    "bhk_count": {
      "terms": { "field": "bhk_type" }
    },
    "price_stats": {
      "stats": { "field": "price" }
    },
    "localities": {
      "terms": { "field": "locality", "size": 10 }
    },
    "property_types": {
      "terms": { "field": "property_type" }
    }
  }
}
```

---

## 7.9 Save Search & Price Alerts

### 7.9.1 Save Search Flow

1. User performs search with filters
2. "Save this Search" button appears in results header
3. Auth required
4. Modal: "Name this search" + notification frequency (Daily/Weekly)
5. Save: `POST /v1/users/saved-searches`

**Saved Search Object:**
```json
{
  "name": "3BHK Delhi Under 1Cr",
  "filters": {
    "city": "Delhi",
    "type": "sale",
    "bhk_type": ["3BHK"],
    "max_price": 10000000
  },
  "notification_frequency": "daily",
  "channels": ["push", "email"]
}
```

### 7.9.2 Alert Trigger (Cron: Daily 8AM)

1. For each active saved search:
2. Run Elasticsearch query
3. Compare with last-sent results
4. If new listings found: send notification
5. If price drops on saved properties: send price alert

---

## 7.10 Virtual Tour & 360° Integration

### Supported Formats:
1. **External URL** — Matterport, Cupix, etc.
2. **YouTube 360°** — Embedded video player
3. **Image 360°** — HTML5 Pannellum viewer (self-hosted)
4. **AR Preview** — "View in Your Space" (mobile only, requires camera permission)

### AR Preview Flow (Mobile):
1. Open property listing on mobile
2. Tap "View in AR" button
3. Camera permission prompt
4. Point camera at flat floor surface
5. AR furniture/room overlay appears
6. Drag to reposition
7. Tap items to see dimensions/specs

**Tech:** WebXR API (progressive enhancement — shows only if device supports it)

---

## 7.11 Property Reporting Flow (Fraud/Spam)

**Entry Point:** "🚩 Report" icon on listing page

```
┌──────────────────────────────────────────────────────┐
│  Report this Listing                                 │
│                                                      │
│  Why are you reporting this?                         │
│  (•) Incorrect information / Misleading              │
│  ( ) Property already sold/rented                   │
│  ( ) Duplicate listing                              │
│  ( ) Suspected fraud                                │
│  ( ) Inappropriate content                          │
│  ( ) Other                                          │
│                                                      │
│  Additional details (optional)                      │
│  [                                           ]      │
│                                                      │
│  [ Submit Report ]                                  │
└──────────────────────────────────────────────────────┘
```

**Process:**
1. Save to `listing_reports` table
2. If same listing gets 3+ reports: auto-flag for admin review
3. If same listing gets 5+ reports: auto-pause listing
4. Admin notified of new report
5. Reporter receives: "Thank you. We'll investigate within 2 business days."

---

## 7.12 Performance Considerations — Property Module

| Scenario | Strategy |
|----------|---------|
| Search result speed | Elasticsearch + Redis cache (60s) |
| Property detail page | Redis cache (300s), ISR on Next.js |
| Gallery images | AWS CloudFront CDN, WebP, lazy load |
| Map loads | Dynamic import, loaded only on user scroll |
| AI valuation | Queue-based, not blocking (result within 5s) |
| Similar properties | Pre-computed nightly, stored in Redis |
| Autocomplete | Elasticsearch completion suggester (<50ms) |
| City/locality pages | SSG (static generation) + ISR (hourly refresh) |

---

*Continue to VOL-08 — Services, Materials & Marketplace*
