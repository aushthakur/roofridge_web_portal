# VOL-05: Website — All Pages (Public)
## Roof Ridge — Enterprise Software Blueprint

---

## PAGE-01: Homepage

### 01.1 Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Primary landing page — property discovery, service booking, lead capture |
| **URL** | `https://roofridge.in/` |
| **User Roles** | Guest, Buyer, Seller, Owner, Tenant (all roles) |
| **Navigation Source** | Direct, Search Engines, Social Media, Email, Ads |
| **Auth Required** | No (works for all) |
| **SEO** | Canonical: `/`, Meta title 50-60 chars, OG image, Schema: Organization |
| **Caching** | CDN edge-cached 60s; CMS sections 3600s |

### 01.2 Navigation Header (Sticky)

**Component ID:** `NavHeader`  
**Behavior:** Sticks to top on scroll, background becomes opaque after 50px scroll with shadow

#### Desktop Header Layout

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ [🏠 ROOF RIDGE]  Buy  Rent  Sell  Construction  Materials  Services  More▾   │
│              [📍 Delhi ▾]                    [Post Property Free] [Login]      │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Components:**

| Component | Description | State |
|-----------|-------------|-------|
| Logo | SVG, links to `/` | Always visible |
| Nav Links | Buy, Rent, Sell, Construction & Interiors, Materials, Home Services, More | Desktop only |
| "More" Dropdown | Loans & Insurance, Blog, About, Contact, Careers | Hover-triggered |
| City Selector | Auto-detected, dropdown with search | Always visible |
| Post Property Free | Primary orange CTA button | Always visible |
| Login | Ghost button, opens login modal | Guest only |
| My Account | Avatar + name dropdown | Authenticated |

**City Selector Dropdown:**
- Auto-detect via browser geolocation (prompt on first visit)
- Search input (debounced 300ms)
- Popular cities: Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad
- Recently visited cities (stored in localStorage)

**"Post Property Free" Button:**
- Visible When: Always
- Hidden When: Never
- Hover: Darken 8%, shadow increase
- Active: scale(0.97)
- Click: If guest → open login modal with redirect to post-property flow. If authenticated → navigate to `/post-property/`
- API: None (navigation)
- Analytics: `event('nav_cta_click', { cta: 'post_property_free', location: 'header' })`

**Mobile Header:**
```
┌──────────────────────────────────────────────────────────┐
│ [🏠] Roof Ridge            [📍 Delhi] [☰]              │
└──────────────────────────────────────────────────────────┘
```

**Mobile Hamburger Drawer:**
- Slides in from right (300ms ease-out)
- Contains: All nav links, City selector, Post Property, Login/Account
- Close: X button or overlay tap
- Width: 85% of screen width, max 360px

**Mobile Sticky Bottom Bar:**
```
┌──────────────────────────────────────────────────────────┐
│ [🏠 Post Property]              [💬 WhatsApp Us]        │
└──────────────────────────────────────────────────────────┘
```
- Fixed at bottom, z-index: 1000
- Height: 56px
- Gradient background: primary-500 → primary-600
- WhatsApp button opens `https://wa.me/91{PHONE}?text=Hi, I'm interested in...`

---

### 01.3 Hero Section

**Component ID:** `HeroSection`

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Buy, Sell, Rent, Build & Furnish                               │
│  — All on One Platform.                                          │
│                                                                  │
│  Verified listings. Instant loans. Trusted service               │
│  professionals. Zero brokerage hassle.                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Buy] [Rent] [Commercial] [PG/Co-living]                │   │
│  │ [📍 City] [🔍 Locality] [₹ Budget ▾] [🏠 Type ▾]      │   │
│  │                          [ Search Properties → ]        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [ Post Property Free ]  (secondary outline button)             │
│                                                                  │
│  ┌──────────┬──────────┬──────────┬──────────┐                │
│  │ 45,000+  │ 2,800+   │ 35+      │ 12,000+  │                │
│  │Properties│ Dealers  │ Cities   │ Bookings │                │
│  └──────────┴──────────┴──────────┴──────────┘                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Background:**
- Gradient mesh background: primary-50 to white
- Subtle animated particles (floating dots, low-opacity)
- High-quality hero image on right side (desktop) — family/house imagery

**Search Bar Tabs:**
- Active tab: white background, primary-500 bottom border, bold text
- Inactive tab: transparent, neutral-500 text
- Tab change: smooth 200ms transition

**Search Inputs:**
| Input | Type | Placeholder | Behavior |
|-------|------|-------------|---------|
| City | Dropdown+Search | "Select City" | Auto-detect or manual, required |
| Locality | Autocomplete | "Locality, Society..." | Elasticsearch autocomplete, API: `GET /v1/properties/search/autocomplete?q=&type=locality` |
| Budget | Range Select | "Any Budget" | Dropdown: Under 20L, 20L-50L, 50L-1Cr, 1Cr-2Cr, 2Cr+; Or "Set Range" opens slider modal |
| Property Type | Multi-select Dropdown | "Any Type" | Flat, Villa, Plot, Builder Floor, etc. |

**Search Button:**
- Label: "Search Properties"
- Visible: Always
- Disabled When: City not selected
- Loading State: Spinner while navigating
- Click: Navigate to `/[city]/property/?type=[tab]&...filters`
- Analytics: `event('hero_search', { city, type, budget_range, property_type })`

**Animated Stats Bar:**
- Numbers count up on page load (react-countup, 2000ms duration)
- Data fetched from: `GET /v1/stats/platform` (cached 3600s)
- Admin can set floor values (minimum displayed value)
- Floor value stored in CMS settings
- On mobile: 2×2 grid instead of horizontal

---

### 01.4 Quick Finder Widget

**Component ID:** `QuickFinderWidget`  
**Purpose:** Pre-login soft lead capture

**Step 1 — Intent Selection:**
```
┌──────────────────────────────────────────────────────────┐
│         What are you looking for today?                  │
│                                                          │
│  [🏠 Buy Property]    [🔑 Rent Property]               │
│  [🔧 Book Service]    [🧱 Buy Materials]                │
│  [📐 Construction]    [🏦 Get Loan]                     │
└──────────────────────────────────────────────────────────┘
```

**Step 2 — Details (dynamic based on intent):**

For "Buy Property":
- City dropdown (required)
- Budget slider (min/max)

For "Book Service":
- City dropdown (required)
- Service category dropdown

**Step 3 — Contact:**
```
┌──────────────────────────────────────────────────────────┐
│  Enter your mobile number to see matches                 │
│  [📱  Mobile Number        ]                            │
│  [ Show Me Matches → ]                                  │
│  By proceeding, you agree to our Terms & Privacy Policy │
└──────────────────────────────────────────────────────────┘
```

**"Show Me Matches" Button:**
- Disabled: If mobile not entered or invalid
- Loading: 300ms delay to show spinner while API call
- API Called: `POST /v1/leads/capture`
- Success: Shows 3-5 match cards inline
- Error: Toast "Something went wrong, please try again"
- Analytics: `event('quick_finder_submit', { intent, city, category })`
- Notification Triggered: WhatsApp acknowledgment to user mobile

**Results Display (after submit):**
```
┌──────────────────────────────────────────────────────────┐
│  We found 45 matches for you!                           │
│                                                          │
│  [Property Card 1]  [Property Card 2]  [Property Card 3]│
│                                                          │
│  [ View All 45 Results → ]                             │
│                                                          │
│  Our expert will also call you within 30 minutes.       │
└──────────────────────────────────────────────────────────┘
```

**Validation:**
| Field | Rule | Error Message |
|-------|------|--------------|
| Mobile | 10 digits, valid Indian number | "Please enter a valid 10-digit mobile number" |
| City | Required | "Please select a city" |

---

### 01.5 Core Services Grid

**Component ID:** `CoreServicesGrid`

8 service cards in a responsive grid:
- Desktop: 4 columns × 2 rows
- Tablet: 3 columns × 3 rows
- Mobile: 2 columns × 4 rows

**Each Service Card:**
```
┌───────────────────────┐
│      [Icon 48px]      │
│                       │
│   Property: Buy       │
│   Verified listings,  │
│   zero brokerage      │
│                       │
│   [ Explore → ]       │
└───────────────────────┘
```

**Card Hover Animation:**
- translateY(-4px), shadow-xl
- Icon scales to 1.1x
- "Explore" button reveals from bottom with slight slide

**Cards:**
| # | Icon | Title | Subtitle | CTA URL |
|---|------|-------|----------|---------|
| 1 | `buildings` | Property: Buy, Rent, Sell | Verified listings, zero brokerage | `/[city]/property/` |
| 2 | `hard-hat` | Construction & Renovation | Builders, architects, contractors | `/services/construction/` |
| 3 | `bricks` | Building Materials | Cement, steel, tiles at best prices | `/materials/` |
| 4 | `wrench` | On-Demand Services | Plumber, electrician in 60 min | `/services/on-demand/` |
| 5 | `couch` | Furnishing & Interiors | Modular kitchens, full-home packages | `/services/interiors/` |
| 6 | `file-text` | Legal & Documentation | Sale deed, registration, mutation | `/services/legal/` |
| 7 | `bank` | Loans & Insurance | Home loan from 8.5% p.a. | `/loans/` |
| 8 | `calendar-check` | AMC & Subscriptions | Annual maintenance plans | `/amc/` |

**CMS Control:** Admin can enable/disable/reorder cards without code release

---

### 01.6 Featured Properties Carousel

**Component ID:** `FeaturedPropertiesCarousel`

```
┌──────────────────────────────────────────────────────────────────┐
│  Featured Properties                        [All Properties →]   │
│  [Delhi ▾] [Mumbai] [Bangalore] [Hyderabad]                    │
│                                                                  │
│  ← [Card 1] [Card 2] [Card 3] [Card 4] →                       │
│                                                                  │
│               • • • • (pagination dots)                         │
└──────────────────────────────────────────────────────────────────┘
```

**Card Visible Count:**
- Mobile: 1.2 cards (peek)
- Tablet: 2.2 cards
- Desktop: 3 cards

**Auto-scroll:** Every 5 seconds (pauses on hover/touch)

**City Filter Pills:**
- 5 most popular cities + "All"
- Active city: primary-500 background
- Click: Fetches featured listings for that city

**API:** `GET /v1/properties/featured?city={city}&limit=12`

**Each Property Card:**
```
┌────────────────────────────────────┐
│ [Photo — 200px height]             │
│ ✅ VERIFIED    [♡] [↗]            │
├────────────────────────────────────┤
│ ₹85,00,000                        │
│ 3 BHK Flat · 1,250 sq.ft          │
│ 📍 Dwarka Sector 12, Delhi         │
├────────────────────────────────────┤
│ 🛏 3  🚿 2  🅿 Parking           │
├────────────────────────────────────┤
│ EMI ₹42,500/mo  [Enquire Now →]  │
└────────────────────────────────────┘
```

**Save Button (♡):**
- Default: outline heart, neutral-400
- Hover: fill heart, primary-500
- Saved: fill heart, error-500
- Guest click: Opens login modal with "Save properties after login"
- Auth click: `POST /v1/properties/:id/save`
- Unsave: `DELETE /v1/properties/:id/save`
- Loading: Pulse animation
- Success: Heart fills with scale animation (150ms spring)
- Error: Toast "Failed to save, please try again"
- Analytics: `event('property_save', { listing_id, source: 'homepage_featured' })`

**"Enquire Now" Button:**
- Guest click: Opens quick enquiry modal (name + mobile)
- Auth click: Opens enquiry form pre-filled with user data
- Loading State: Spinner
- Success: Toast "Enquiry sent! We'll get back to you shortly"
- API: `POST /v1/properties/:id/enquiries`

**Loading State:** 3 skeleton cards with pulse animation

---

### 01.7 Partner Logos Strip

**Component ID:** `PartnerLogosStrip`

```
┌──────────────────────────────────────────────────────────────────┐
│              Our Trusted Partners                                │
│  [HDFC] [SBI] [ICICI] [Kotak] [L&T] [Godrej] [ACC] [Ultratech] │
│  ← Auto-scrolling, infinite loop →                             │
└──────────────────────────────────────────────────────────────────┘
```

- 30+ partner logos, auto-scroll (40px/sec), pause on hover
- 2 rows on mobile, 1 row on desktop
- Each logo: grayscale, hover → full color (200ms)
- Click: Navigate to partner page `/partners/{partner-name}/`
- CMS-managed: Admin adds/removes/reorders logos from Admin Panel
- API: `GET /v1/cms/partners?type=logo_strip` (cached 3600s)

---

### 01.8 Embedded EMI Calculator

**Component ID:** `EMICalculator`

```
┌─────────────────────────────────────────────────────────────────┐
│     Estimate Your Home Loan EMI                                 │
│                                                                 │
│  Property Value: ₹85,00,000    [—————●——————]  (5L - 5Cr)    │
│  Down Payment: ₹17,00,000      [———●—————————]  (10% - 50%)   │
│  Interest Rate: 8.5% p.a.      [——●——————————]  (7% - 15%)    │
│  Tenure: 20 years              [————————●————]  (5 - 30 yrs)   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Monthly EMI   Total Interest   Total Payable            │  │
│  │  ₹52,884       ₹69,92,096      ₹1,27,52,096             │  │
│  │                                                           │  │
│  │  [Donut Chart: 49% Principal, 51% Interest]              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [ View Amortization Table ▾ ]                                 │
│                                                                 │
│  [ Check Loan Eligibility ]   [ Apply for Loan → ]            │
└─────────────────────────────────────────────────────────────────┘
```

**Calculator Behavior:**
- All values update in real-time (no API call — pure JS calculation)
- Formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
- Sliders: Touch-drag on mobile (44px touch target)
- Values formatted as: ₹42.5L, ₹1.25Cr (Indian number system)
- Chart: Recharts doughnut, animates on value change

**Sliders:**
| Slider | Min | Max | Default | Step |
|--------|-----|-----|---------|------|
| Property Value | ₹5L | ₹5Cr | ₹50L | ₹1L |
| Down Payment | 10% | 50% | 20% | 5% |
| Interest Rate | 7% | 15% | 8.5% | 0.1% |
| Tenure | 5 years | 30 years | 20 years | 1 year |

**Amortization Table (Collapsed by default):**
- Columns: Year, EMI Paid, Principal Paid, Interest Paid, Balance
- Max 10 rows initially, "Show All" toggle
- Mobile: Horizontal scroll with sticky first column

**"Check Loan Eligibility" Button:**
- Guest: Opens modal with income + employment form
- Authenticated: Pre-fills user data
- API: `POST /v1/loans/eligibility/check`

**"Apply for Loan" Button:**
- Navigates to `/loans/home-loan/apply/` with pre-filled EMI values

**Analytics:**
```javascript
event('emi_calculator_interaction', {
  property_value: 8500000,
  down_payment: 1700000,
  interest_rate: 8.5,
  tenure_years: 20,
  calculated_emi: 52884
});
```

---

### 01.9 Why Choose Roof Ridge (USP Section)

**Component ID:** `USPSection`

6 USP cards in 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile):

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | `seal-check` | Verified Listings Only | Mandatory KYC on every dealer & owner |
| 2 | `squares-four` | One Platform, Every Need | Property, construction, materials, services, legal, loans |
| 3 | `robot` | AI-Powered Valuation | Accurate price trends using comparable sales data |
| 4 | `shield-check` | Escrow-Protected Payments | Zero fraud guarantee on all transactions |
| 5 | `lightning` | Instant Loan Pre-Approval | Check eligibility on every listing |
| 6 | `star` | Verified Professionals | Rated and background-checked service partners |

**Animation:** Cards fade in with stagger (100ms each) on scroll into view (Intersection Observer)

---

### 01.10 How It Works

**Component ID:** `HowItWorksSection`

4-step horizontal timeline (desktop), vertical accordion (mobile):

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | `search` | Search or Post | Find a property/service or list yours in minutes |
| 2 | `handshake` | Get Matched | Compare offers from verified dealers, banks and service partners |
| 3 | `shield` | Transact Safely | KYC + escrow-backed payments, digital documentation |
| 4 | `check-circle` | Move In / Get It Done | Track delivery, construction progress or service completion live |

**Animation:** Steps appear sequentially (300ms each) on scroll

---

### 01.11 Customer Testimonials

**Component ID:** `TestimonialsCarousel`

```
┌─────────────────────────────────────────────────────────────────┐
│  What Our Customers Say                                         │
│                                                                 │
│  ← [Testimonial Card] →                                        │
│                                                                 │
│  [Avatar] [Name]    ⭐⭐⭐⭐⭐                                │
│  Rahul Sharma, Delhi (Property Buyer)                          │
│  "Found my dream home in just 2 weeks! The verified             │
│   listings and quick loan approval made the process smooth."    │
│                                                                 │
│              • • • (dots)                                      │
└─────────────────────────────────────────────────────────────────┘
```

- Auto-scroll every 4 seconds
- Swipeable on mobile (touch gestures)
- 5-8 testimonials shown (CMS managed)
- Star ratings shown as filled stars
- Category badge (Property/Service/Material)
- Optional: Google Reviews widget embed (toggled from Admin)
- API: `GET /v1/cms/testimonials` (cached 3600s)

---

### 01.12 Live Activity Counter

**Component ID:** `LiveActivityCounter`

```
┌─────────────────────────────────────────────────────────────────┐
│  🔴 Live                                                        │
│  34 properties listed today  |  156 service bookings this week  │
│  98,432 happy customers                                         │
└─────────────────────────────────────────────────────────────────┘
```

- Red pulsing dot (CSS animation) for "live" feel
- Numbers fetched from `GET /v1/stats/activity` (refreshes every 60s)
- Admin sets floor values (displayed minimum)
- Counts use Indian number formatting (1L, 10L, 1Cr)

---

### 01.13 Featured Blog / City Guides

**Component ID:** `BlogPreviewSection`

3 blog cards in row (desktop), 1 card (mobile, horizontally scrollable):

Each card:
- Thumbnail (16:9, WebP, lazy loaded)
- Category badge
- Title
- Read time
- "Read More" link

**API:** `GET /v1/cms/blog?featured=true&limit=3` (cached 300s)

---

### 01.14 App Download Banner

**Component ID:** `AppDownloadBanner`

```
┌─────────────────────────────────────────────────────────────────┐
│  Download the Roof Ridge App                                    │
│  The complete property & home services platform in your pocket  │
│                                                                 │
│  [App Preview Mockup]   [▼ Google Play]   [▼ App Store]      │
└─────────────────────────────────────────────────────────────────┘
```

- Shown only on desktop/tablet (not on mobile since they're already on mobile)
- App preview: rotating screenshots mockup animation
- Download buttons: Open respective store links

---

### 01.15 Footer

**Component ID:** `PageFooter`

**Desktop: 5-column grid**

```
┌─────────────────────────────────────────────────────────────────┐
│ Roof Ridge            Property      Services      Quick Links   │
│ 🏠                                                              │
│ India's most         Buy           Construction  Loans &        │
│ comprehensive        Rent          Materials     Insurance      │
│ property platform.   Commercial    Interiors     Legal          │
│                      PG/Co-living  On-Demand     Blog           │
│ 📘 📷 📺 🐦         New Projects  Furnishing    Careers        │
│                                    AMC           Contact        │
│                                                                 │
│ Contact Us                                                      │
│ 📍 1234 Building, City                                         │
│ 📞 +91 98765 43210                                             │
│ ✉️ hello@roofridge.in                                          │
│ 💬 WhatsApp                                                     │
│─────────────────────────────────────────────────────────────────│
│ © 2026 Roof Ridge | Privacy Policy | Terms | Grievance | Sitemap│
│ [RERA] [SSL Secured] [MahaRERA] [ISO 9001]                    │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile Footer:** Accordion sections (collapsed by default)

**Social Links:** Facebook, Instagram, YouTube, Twitter/X, LinkedIn
- Each: Opens in new tab, analytics event `footer_social_click`

---

### 01.16 Page-Level Specifications

| Attribute | Value |
|-----------|-------|
| **Loading States** | Hero search: instant; Property cards: skeleton; Calculator: instant |
| **Performance Target** | LCP < 2.5s, FID < 100ms, CLS < 0.1 (Core Web Vitals) |
| **Analytics Events** | `page_view`, `hero_search`, `quick_finder_submit`, `cta_click`, `property_save` |
| **SEO** | Title: "Buy, Sell & Rent Properties Verified — Roof Ridge \| India's #1 Property Platform" |
| **Security** | HSTS, CSP headers, no user-generated content rendered without sanitization |
| **Offline Behavior** | Service worker shows cached homepage; search requires connectivity |

---

## PAGE-02: Property Search Results

### 02.1 Overview

| Attribute | Value |
|-----------|-------|
| **URL Pattern** | `/{city}/property/`, `/{city}/{locality}/property/` |
| **Example URLs** | `/delhi/property/`, `/delhi/dwarka/property/` |
| **Purpose** | Display filtered property search results |
| **User Roles** | All roles |
| **Auth Required** | No (saves require auth) |

### 02.2 Layout

```
Desktop:
┌────────────────────────────────────────────────────────────────┐
│  [Navigation Header]                                           │
│─────────────────────────────────────────────────────────────── │
│  [Search Bar with pre-filled filters]                         │
│─────────────────────────────────────────────────────────────── │
│  Breadcrumb: Home > Delhi > Properties for Sale               │
│─────────────────────────────────────────────────────────────── │
│  ┌──────────────────┐  ┌───────────────────────────────────┐  │
│  │  FILTERS PANEL   │  │  RESULTS (sorted)                 │  │
│  │  (240px fixed)   │  │  347 Properties | [Sort ▾]        │  │
│  │                  │  │  [Map View] [List View]           │  │
│  │  Property Type   │  │                                   │  │
│  │  [Flat] [Villa]  │  │  [Card 1] [Card 2] [Card 3]      │  │
│  │  [Plot] [PG]...  │  │  [Card 4] [Card 5] [Card 6]      │  │
│  │                  │  │  [Card 7] [Card 8] [Card 9]      │  │
│  │  Budget          │  │                                   │  │
│  │  [Price Slider]  │  │  [Pagination: 1 2 3 ... 18]      │  │
│  │                  │  │                                   │  │
│  │  BHK             │  └───────────────────────────────────┘  │
│  │  [1][2][3][4][4+]│                                         │
│  │                  │                                         │
│  │  Furnishing      │                                         │
│  │  [Fully] [Semi]  │                                         │
│  │  [Unfurnished]   │                                         │
│  │                  │                                         │
│  │  Amenities       │                                         │
│  │  [✓] Parking     │                                         │
│  │  [ ] Gym         │                                         │
│  │  [ ] Lift        │                                         │
│  │  ...             │                                         │
│  │                  │                                         │
│  │  [ Apply Filters]│                                         │
│  │  [Clear All]     │                                         │
│  └──────────────────┘                                         │
└────────────────────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────────────────────┐
│ [← Back] 347 Properties Delhi   │
│ [🔽 Filter] [🔃 Sort] [🗺 Map] │
├──────────────────────────────────┤
│ [Property Card — Full Width]    │
│ [Property Card — Full Width]    │
│ ...                             │
│ [Load More]                     │
└──────────────────────────────────┘
```

**Filter Drawer (Mobile):**
- Bottom drawer, 90% screen height
- Swipe to close
- "Apply Filters" button fixed at bottom

### 02.3 Filter Panel

**All Filter Components:**

#### Property Type (Chip/Toggle)
```
[Flat] [Villa] [Plot] [Builder Floor] [Penthouse] [Studio] [Commercial]
```
- Multi-select
- Selected: primary-500 background, white text
- Unselected: outline, neutral-700 text

#### Budget (Range Slider)
- Min/Max dual-handle slider
- Inputs for typing exact values
- Quick presets: "Under 50L", "50L-1Cr", "1Cr-2Cr", "2Cr+"
- Format: Indian number system (₹42.5L, ₹1.25Cr)

#### BHK (Chip/Toggle)
```
[1 RK] [1 BHK] [2 BHK] [3 BHK] [4 BHK] [4+ BHK]
```
Multi-select

#### Area (Range Slider)
- Min: 100 sqft, Max: 10000 sqft
- Unit toggle: sqft / sqmt

#### Age of Property (Chips)
```
[New/Under Construction] [<1 Year] [1-5 Years] [5-10 Years] [10+ Years]
```

#### Furnishing Status (Chips)
```
[Fully Furnished] [Semi Furnished] [Unfurnished]
```

#### Amenities (Checkboxes)
```
[✓] Parking  [✓] Lift  [ ] Gym  [ ] Swimming Pool
[ ] Power Backup  [ ] Clubhouse  [ ] Security  [ ] Garden
[ ] Children's Play Area  [ ] Tennis Court  [ ] Indoor Games
```
Show 6, "Show More" expands to full list

#### Availability (Radio)
```
(•) Immediate  ( ) Within 6 months  ( ) Any
```

#### Verified Only (Toggle)
```
[○] Show only verified listings
```

#### "Apply Filters" Button
- Sticky at bottom of filter panel
- Shows count: "Apply (347 results)"
- Loading: Re-fetches results
- Analytics: `event('search_filter_apply', { filters_used })`

#### "Clear All" Link
- Resets all filters to default
- Updates URL

### 02.4 Results Header

```
┌─────────────────────────────────────────────────────────────────┐
│ 347 Properties for Sale in Delhi              [Sort: Relevant ▾]│
│ [🗺 Map View] [📋 List View]                                   │
│ Active: [Delhi × ] [Sale × ] [3BHK × ] [₹50L-1Cr × ]         │
└─────────────────────────────────────────────────────────────────┘
```

**Sort Options:**
- Most Relevant (default)
- Newest First
- Price: Low to High
- Price: High to Low
- Area: Low to High
- Verified First

**View Toggle:**
- List View: 3-column grid (desktop), 1 column (mobile)
- Map View: Full-width Google Maps with listing pins

### 02.5 Map View

**Map Component:**
- Google Maps JS SDK
- Clustered pins (property count per cluster)
- Click pin: Mini property card popup
- Drag/Zoom: Refreshes results for visible area
- "Search this area" button appears on drag

**Listing Pins:**
- Circle with price: "₹85L"
- Hover: Expands to show photo, BHK, area
- Featured: Orange/gold color
- Verified: Green checkmark

### 02.6 Pagination

- Page navigation: 1, 2, 3, ... prev/next buttons
- Results per page: 20 (fixed)
- SEO: rel="next" and rel="prev" links
- URL: `?page=2` in query string
- Infinite scroll option on mobile ("Load More" button, not auto-scroll)

### 02.7 Empty State

```
┌─────────────────────────────────┐
│       🏚                        │
│  No Properties Found            │
│  Try adjusting your filters     │
│  or searching a different area  │
│                                 │
│  [Clear Filters]               │
└─────────────────────────────────┘
```

### 02.8 APIs

| Action | API |
|--------|-----|
| Load results | `GET /v1/properties/search?city=delhi&type=sale&...` |
| Load more | `GET /v1/properties/search?...&page=2` |
| Save property | `POST /v1/properties/:id/save` |
| Track view | `POST /v1/analytics/events` (batched) |

---

## PAGE-03: Property Detail Page

### 03.1 Overview

| Attribute | Value |
|-----------|-------|
| **URL Pattern** | `/property/{slug}/` |
| **Example** | `/property/3-bhk-flat-dwarka-sector-12-12345/` |
| **Purpose** | Full property listing details, enquiry, loan tools |
| **Schema** | RealEstateListing, BreadcrumbList, FAQPage |

### 03.2 Full Layout

```
Desktop:
┌────────────────────────────────────────────────────────────────┐
│ [Navigation Header]                                            │
│─────────────────────────────────────────────────────────────── │
│ Breadcrumb: Home > Delhi > Dwarka Sector 12 > Properties      │
│─────────────────────────────────────────────────────────────── │
│                                                                │
│ ┌─────────────────────────────────────┐ ┌──────────────────┐  │
│ │  [Gallery — Full Width Images]      │ │  ENQUIRY CARD    │  │
│ │  [Photo 1 Large]                    │ │  ₹85,00,000      │  │
│ │  [Ph2][Ph3][Ph4][Ph5] (thumbnails) │ │  ₹6,800/sqft     │  │
│ │  [🎬 Video] [🔄 360° Tour]          │ │  ✅ Verified      │  │
│ │─────────────────────────────────────│ │                  │  │
│ │  ₹85,00,000  ✅ VERIFIED             │ │  [Name Input]    │  │
│ │  3 BHK Flat · 1,250 sq.ft           │ │  [Mobile Input]  │  │
│ │  📍 Dwarka Sector 12, New Delhi      │ │  [Message]       │  │
│ │  [♡ Save] [↗ Share] [🚩 Report]    │ │  [Request Visit] │  │
│ │─────────────────────────────────────│ │                  │  │
│ │  KEY DETAILS                        │ │  —— OR ——        │  │
│ │  Bedrooms: 3 | Bathrooms: 2         │ │  [📞 Call Agent] │  │
│ │  Carpet Area: 980 sqft              │ │  [💬 WhatsApp]   │  │
│ │  Floor: 4th / 12th                  │ │                  │  │
│ │  Age: 1-5 Years                     │ │  LISTED BY       │  │
│ │  Facing: East                       │ │  [Avatar]        │  │
│ │  Furnishing: Semi                   │ │  ABC Properties  │  │
│ │─────────────────────────────────────│ │  ⭐ 4.5 (23)     │  │
│ │  EMI CALCULATOR (embedded)          │ │  ✅ Verified      │  │
│ │  [Sliders + Output]                 │ │  8 yrs exp.      │  │
│ │─────────────────────────────────────│ │  45 listings     │  │
│ │  LOCATION MAP                       │ │                  │  │
│ │  [Google Maps Embed]                │ └──────────────────┘  │
│ │  Schools | Hospitals | Metro        │                        │
│ │─────────────────────────────────────│                        │
│ │  AI PRICE INSIGHT                   │                        │
│ │  Est. Value: ₹80L - ₹92L           │                        │
│ │  Price Trend: +4.2% (6 months)     │                        │
│ │  [Price Trend Chart]                │                        │
│ │─────────────────────────────────────│                        │
│ │  SIMILAR PROPERTIES                 │                        │
│ │  [Carousel of 6 similar listings]   │                        │
│ │─────────────────────────────────────│                        │
│ │  AMENITIES                          │                        │
│ │  [✓] Parking [✓] Lift [✓] Security │                        │
│ │─────────────────────────────────────│                        │
│ │  RERA & LEGAL                       │                        │
│ │  RERA: RERA/DL/GRP/2022/52         │                        │
│ │  [Verify on RERA Portal ↗]          │                        │
│ │─────────────────────────────────────│                        │
│ │  FAQs (min. 8 Q&As)                │                        │
│ │  [Accordion]                        │                        │
│ └─────────────────────────────────────┘                        │
└────────────────────────────────────────────────────────────────┘
```

### 03.3 Photo Gallery Component

**Gallery Behavior:**
- Main image: Full width, 400px height (desktop)
- Thumbnail strip: 80×60px, horizontal scroll
- Click thumbnail: Swap main image (100ms crossfade)
- Click main image: Opens fullscreen lightbox
- Keyboard: Arrow keys to navigate in lightbox
- Touch: Swipe to navigate on mobile
- "View All Photos" button: Opens fullscreen gallery grid

**Lightbox:**
- Black background overlay (rgba 0,0,0,0.95)
- Image centered, object-fit contain
- Prev/Next arrows (left/right)
- Swipe on mobile
- ESC key closes
- Photo counter: "3 / 12"
- Download button (if enabled)
- Share button

**Video Play Button:**
- Visible if `video_url` exists
- Click: Opens in modal player (YouTube embed or native HTML5)

**360° Tour Button:**
- Visible if `virtual_tour_url` exists
- Click: Opens in modal iframe

### 03.4 Enquiry Card (Right Sidebar — Desktop)

**Sticky behavior:** Sticks to viewport on scroll (offset: 80px from top)

**Enquiry Form:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | ✅ | 2-100 chars |
| Mobile | Tel | ✅ | 10-digit Indian number |
| Email | Email | ❌ | Valid email format |
| Message | Textarea | ❌ | Max 500 chars |
| Preferred Time | Select | ❌ | Morning/Afternoon/Evening/Weekend |

**"Request Site Visit" Button:**
- Primary CTA, large, full width
- Visible: Always
- Disabled: If mobile not entered
- Loading: Spinner, "Sending..."
- Success: "✓ Request Sent! Agent will contact you shortly"
- Error: "Request failed. Try WhatsApp instead."
- API: `POST /v1/properties/:id/enquiries`
- Lead Created: `POST /v1/leads/capture` (source: property_enquiry)
- Notification: SMS to user + WhatsApp to agent

**"Call Agent" Button:**
- Shows masked number (987*****10) by default
- Click: Reveals full number (requires login)
  - Guest: Login modal
  - Authenticated: Reveals number, analytics event
- Analytics: `event('agent_call_click', { listing_id, is_authenticated })`
- Lead Activity: Logged as `call` type

**"WhatsApp" Button:**
- Opens WhatsApp with pre-drafted message:
  `"Hi! I'm interested in the property at [locality]. Can we discuss?"`
- Always visible
- Opens in new tab: `https://wa.me/{agent_whatsapp}?text=...`

**Listed By Card:**
- Partner avatar (40px circle)
- Partner name and company
- Star rating and review count
- Verified badge (if verified)
- "View All Listings" link
- Experience years badge
- Click: Navigate to partner page

### 03.5 Mobile-Specific Behavior

**Sticky Bottom Bar (Mobile):**
```
┌────────────────────────────────────────────────────────┐
│ [📞 Call]  [💬 WhatsApp]  [✉️ Enquire]  [♡ Save]    │
└────────────────────────────────────────────────────────┘
```
- Fixed at bottom, above system nav bar
- Enquire opens a bottom sheet with the form

---

## PAGE-04: Post Property Flow

### 04.1 Overview

| Attribute | Value |
|-----------|-------|
| **URL** | `/post-property/` |
| **Auth Required** | Yes (login required, KYC required for publishing) |
| **Purpose** | 5-step guided form for listing a property |

### 04.2 Step-by-Step Flow

**Progress Indicator:**
```
Step 1 ——●—— Step 2 ——○—— Step 3 ——○—— Step 4 ——○
[Property Type] [Details] [Photos] [KYC] [Preview]
```

**Step 1: Property Type & Listing Intent**

| Field | Type | Options |
|-------|------|---------|
| Intent | Radio | Sell, Rent |
| Property Type | Cards | Flat, Villa, Plot, Builder Floor, Studio, Commercial |
| City | Autocomplete | All cities |

**Step 2: Property Details**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Locality | Autocomplete | ✅ | Min 3 chars |
| Sub-locality / Society | Text | ❌ | Max 200 chars |
| Address | Textarea | ❌ | Max 500 chars |
| Pin Code | Number | ✅ | 6 digits |
| Mark on Map | Google Maps | ❌ | Drag pin to exact location |
| BHK Type | Chips | ✅ (residential) | |
| Bedrooms | Number | ✅ (residential) | 1-20 |
| Bathrooms | Number | ✅ | 1-10 |
| Balconies | Number | ❌ | 0-10 |
| Super Built-up Area | Number | ✅ | Min 1 |
| Area Unit | Radio | ✅ | sqft / sqmt |
| Total Floors | Number | ❌ | 1-200 |
| Floor Number | Number | ❌ | -3 to 200 (negative for basement) |
| Age of Property | Select | ✅ | New/Under Construction/1-5yrs/5-10yrs/10+yrs |
| Possession Date | Date | Conditional | Required if "Under Construction" |
| Facing | Select | ❌ | North/South/East/West/+ diagonals |
| Furnishing Status | Chips | ✅ (rental) | Fully/Semi/Unfurnished |
| Price / Monthly Rent | Number | ✅ | Min ₹10,000 |
| Price Negotiable | Toggle | ❌ | Default off |
| Maintenance Charges | Number | ❌ | |
| Security Deposit | Number | ✅ (rental) | |
| Brokerage | Select | ❌ | Zero/1 month/2 months/Negotiable |
| RERA Number | Text | Conditional | Required if Builder/New Project |
| Amenities | Checkboxes | ❌ | Multiple select |
| Highlights | Text Tags | ❌ | Max 5 tags |
| Title | Text | ✅ | 20-200 chars |
| Description | Textarea | ❌ | Max 3000 chars |

**Step 3: Photo & Video Upload**

- Primary area: Drag & drop zone or "Click to upload"
- Mobile: Camera capture is first option
- Minimum: 5 photos recommended (warning if fewer)
- Maximum: 20 photos
- Progress bar per file upload
- Reorder photos via drag-and-drop
- Star one as "Primary" (used as thumbnail)
- Video URL input (YouTube/Vimeo link)
- 360° tour URL input

**Step 4: KYC Verification**
- If user already KYC-verified: Show "✅ Your identity is already verified" → Skip
- If not verified: Show KYC upload form (Aadhaar + PAN)

**Step 5: Preview & Submit**
- Full preview of listing as it will appear publicly
- Edit button to go back to any step
- Confirm & Submit button
- Terms checkbox (required)

**Draft Saving:**
- Auto-saved every 30 seconds to `localStorage` and server
- "Save & Continue Later" link
- Saved drafts appear in "My Listings > Drafts"

---

*Continue to VOL-06 — Authentication & User Management*
