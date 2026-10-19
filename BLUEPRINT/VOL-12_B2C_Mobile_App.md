# VOL-12: B2C Mobile App — Complete Specification
## Roof Ridge — Enterprise Software Blueprint

---

## 12.1 App Architecture

### 12.1.1 Technical Specifications

| Attribute | Value |
|-----------|-------|
| **Framework** | React Native (Expo managed workflow) |
| **App Name** | Roof Ridge — Property & Home |
| **Platforms** | iOS 14+ / Android 8+ |
| **State Management** | Zustand + React Query |
| **Navigation** | React Navigation 6 (Stack + Bottom Tabs) |
| **Maps** | Google Maps SDK (React Native Maps) |
| **Push Notifications** | Firebase Cloud Messaging (FCM) |
| **Storage** | AsyncStorage (local), MMKV (fast key-value) |
| **Offline Support** | React Query cache, service worker (PWA parity) |
| **Animations** | Reanimated 3 + Moti |
| **Deep Linking** | Universal Links (iOS) + App Links (Android) |
| **Analytics** | Firebase Analytics + Amplitude |

### 12.1.2 Navigation Structure

```
App Navigator (Root)
├── Auth Stack (not logged in)
│   ├── SplashScreen
│   ├── OnboardingScreen (first launch)
│   ├── LoginScreen
│   └── OTPScreen
│
└── Main Navigator (logged in)
    ├── Bottom Tab Navigator
    │   ├── HomeTab
    │   │   └── HomeScreen
    │   ├── SearchTab
    │   │   ├── SearchScreen
    │   │   ├── SearchResultsScreen
    │   │   └── PropertyDetailScreen
    │   ├── BookingsTab
    │   │   ├── BookingsListScreen
    │   │   ├── BookingDetailScreen
    │   │   └── LiveTrackingScreen
    │   └── ProfileTab
    │       ├── ProfileScreen
    │       ├── SavedPropertiesScreen
    │       ├── MyListingsScreen
    │       ├── WalletScreen
    │       ├── DocumentsScreen
    │       ├── NotificationsScreen
    │       └── SettingsScreen
    │
    ├── Modal Stack (overlay)
    │   ├── AuthModal
    │   ├── FilterModal
    │   ├── EnquiryModal
    │   └── BookingCreationFlow
    │
    └── Deep Link Handlers
        ├── /property/:slug → PropertyDetailScreen
        ├── /bookings/:id → BookingDetailScreen
        └── /r/:code → Referral landing
```

---

## 12.2 Splash & Onboarding

### 12.2.1 Splash Screen

- Centered logo on primary-600 background
- 2-second duration
- Animated logo: scale from 0.5 → 1.0 (spring animation)
- Simultaneously: Check auth state (token exists + valid)
- If authenticated: Navigate to HomeScreen
- If not: Navigate to OnboardingScreen (first launch) or LoginScreen

### 12.2.2 Onboarding (First Launch Only)

**3-slide carousel:**

```
Slide 1:
[Illustration: Properties]
Find Your Dream Home
45,000+ verified listings
across 35+ Indian cities

Slide 2:
[Illustration: Handyman]
Book Home Services
Plumber, electrician, painter
in under 60 minutes

Slide 3:
[Illustration: Material/Construction]
Build & Furnish
Source materials, hire contractors,
design interiors — all in one app

[Skip] [Next →] / [Get Started]
```

**Controls:**
- Swipe to advance
- Dot pagination (auto-highlights)
- "Skip" → LoginScreen
- "Get Started" (last slide) → LoginScreen
- Shown once only (flag stored in AsyncStorage: `onboarding_shown`)

---

## 12.3 Home Screen

### 12.3.1 Layout

```
┌──────────────────────────────────────────────────┐
│ 📍 Delhi     Good morning, Rahul 👋    [🔔] [🤵] │
│──────────────────────────────────────────────────│
│                                                  │
│ SEARCH BAR                                       │
│ 🔍 [Search property, service, material...]       │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ QUICK ACTIONS (Horizontal scroll)                │
│ [🏠 Buy] [🔑 Rent] [🔧 Service] [🧱 Material]  │
│ [📐 Construct] [⚖️ Legal] [🏦 Loan] [🛡 AMC]  │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ FEATURED PROPERTIES               [See All →]    │
│ ← [Card] [Card] [Card] →                        │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ SERVICES NEAR YOU                 [See All →]    │
│ [🔧 Plumber — 8 nearby]                         │
│ [⚡ Electrician — 5 nearby]                      │
│ [🎨 Painter — 3 nearby]                         │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ ACTIVE BOOKINGS (if any)          [View All →]   │
│ 🔄 Plumber — Today 2PM [Track Live →]           │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ PRICE ALERTS                                     │
│ 📉 3BHK Dwarka dropped ₹2L → [View Property]   │
│                                                  │
│──────────────────────────────────────────────────│
│                                                  │
│ NEARBY SERVICES (Map snippet)                    │
│ [Mini map with pins — full-page on tap]          │
│                                                  │
│──────────────────────────────────────────────────│
│ [🏠] [🔍] [📅] [👤]  ← Bottom Tab Bar          │
└──────────────────────────────────────────────────┘
```

**Personalization:**
- "Featured Properties" section filtered by user's preferred city + budget
- "Services Near You" uses device location (GPS)
- "Price Alerts" shows saved property price changes
- AI-recommended properties based on browsing history

**Location Detection:**
- First launch: "Allow location access" prompt
- If denied: Use city from profile
- Updates every app launch (not continuous tracking)
- Location stored locally, not tracked on server unless needed for booking

---

## 12.4 Search Screen

### 12.4.1 Search Screen — Default

```
┌──────────────────────────────────────────────────┐
│ [← Back]  🔍 [Search city, locality, project...]│
│──────────────────────────────────────────────────│
│ SEARCH TABS                                      │
│ [Buy] [Rent] [PG] [Commercial] [Services] [Materials]│
│──────────────────────────────────────────────────│
│ RECENT SEARCHES                                  │
│ 🕐 3BHK Delhi under 1Cr                         │
│ 🕐 Plumber near me                              │
│ [Clear All]                                     │
│──────────────────────────────────────────────────│
│ POPULAR SEARCHES                                 │
│ 🔥 2BHK Delhi           🔥 Plumber              │
│ 🔥 Flat Gurgaon         🔥 Interior Designer    │
│──────────────────────────────────────────────────│
│ POPULAR CITIES                                   │
│ [Delhi] [Mumbai] [Bangalore] [Hyderabad] [Pune]  │
└──────────────────────────────────────────────────┘
```

**Search Input Behavior:**
- Auto-focus on screen entry
- Debounced autocomplete: 300ms delay
- Minimum 2 characters before API call
- API: `GET /v1/properties/search/autocomplete?q={query}`
- Results: Localities, Cities, Projects, Partners

### 12.4.2 Search Results (Mobile)

```
┌──────────────────────────────────────────────────┐
│ [← Back] 347 Properties · Delhi    [🔽] [🔃]   │
│ [Active Filters: Sale · 3BHK] [✕ Clear]         │
│──────────────────────────────────────────────────│
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ [Photo — 180px]           [♡]              │  │
│ │ ₹85,00,000    ✅ Verified                  │  │
│ │ 3 BHK · 1,250 sqft                        │  │
│ │ 📍 Dwarka Sector 12, Delhi                 │  │
│ │ EMI from ₹42,500/mo                       │  │
│ │ [Enquire]  [📞 Call]                       │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ [Load More]                                      │
└──────────────────────────────────────────────────┘
```

**Filter Drawer (Bottom Sheet, 90% height):**
- All same filters as website
- "Apply Filters" button fixed at bottom

**Sort Bottom Sheet:**
- Sheet appears from bottom, 50% height
- Options: Most Relevant / Newest / Price ↑ / Price ↓ / Verified First

---

## 12.5 Property Detail Screen (Mobile)

### 12.5.1 Layout

```
┌──────────────────────────────────────────────────┐
│ [← Back]              [♡] [↗] [🚩]              │
│──────────────────────────────────────────────────│
│ [Full-width Photo Carousel — 220px]              │
│ ○ ○ ● ○ ○ (photo dots)                          │
│ 8 Photos | 1 Video | 360°                       │
│──────────────────────────────────────────────────│
│ ₹85,00,000                   ✅ VERIFIED        │
│ 3 BHK Flat · 1,250 sqft                         │
│ 📍 Dwarka Sector 12, New Delhi                   │
│──────────────────────────────────────────────────│
│ 🛏 3 · 🚿 2 · 🏗 4th/12 · ↗ East               │
│ Age: 1-5 Years · Semi-Furnished                 │
│──────────────────────────────────────────────────│
│ EMI from ₹42,500/mo                             │
│ [Check Loan Eligibility]                        │
│──────────────────────────────────────────────────│
│ ABOUT                                           │
│ [Expandable description — Show More]            │
│──────────────────────────────────────────────────│
│ AMENITIES                                       │
│ [✓ Parking] [✓ Lift] [✓ Security] [✓ Gym+3]   │
│──────────────────────────────────────────────────│
│ AI PRICE INSIGHT                                │
│ ₹78L — ₹92L · 87% Confidence                   │
│ 📈 +4.2% in last 6 months                       │
│──────────────────────────────────────────────────│
│ LOCATION                                        │
│ [Map Preview — tap to expand]                   │
│ Schools · Hospitals · Metro                     │
│──────────────────────────────────────────────────│
│ LISTED BY                                       │
│ [Avatar] ABC Properties ⭐4.5 (23) ✅          │
│ [View Profile] [Chat]                           │
│──────────────────────────────────────────────────│
│ SIMILAR PROPERTIES                              │
│ ← [Card] [Card] [Card] →                       │
│──────────────────────────────────────────────────│
│ [FAQs]                                          │
│──────────────────────────────────────────────────│
│ STICKY BOTTOM BAR:                              │
│ [📞 Call] [💬 WhatsApp] [✉️ Enquire] [♡ Save]  │
└──────────────────────────────────────────────────┘
```

**Photo Carousel:**
- Swipeable with spring physics
- Double-tap to save photo to gallery (with permission)
- Tap → Full-screen lightbox
- Lightbox: Pinch-to-zoom, swipe to close

**Sticky Bottom Bar (Critical):**
- Height: 64px
- Background: white + border-top
- Always visible (doesn't scroll away)
- "Call" button: Reveals masked number on first tap → Direct dial on second tap
- "Enquire" button: Opens bottom sheet enquiry form

---

## 12.6 Booking Flow (Mobile Native)

### 12.6.1 Service Category Selection

```
┌──────────────────────────────────────────────────┐
│ [← Back]   Home Services                        │
│──────────────────────────────────────────────────│
│                                                  │
│ [Plumbing]      [Electrical]    [Carpentry]      │
│ [Painting]      [Deep Clean]    [AC Service]     │
│ [Pest Control]  [Appliance]     [Construction]   │
│ [Waterproof]    [Security]      [Interiors]      │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ 🔴 LIVE: 8 professionals near you         │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**Booking Sheet (Bottom Sheet — multi-step):**

Step 1 — Describe Issue (50% height):
```
┌──────────────────────────────────────────────────┐
│ ▂▂▂▂▂ (drag handle)                             │
│ Book Plumber                                    │
│─────────────────────────────────────────────────│
│ What's the issue?                               │
│ [🚿 Tap Repair] [💧 Pipe Leak] [🚽 WC Repair]  │
│ [🔵 Drain Clean] [💦 Geyser] [+ Other]         │
│                                                 │
│ Add description (optional)                      │
│ [                                      ]        │
│                                                 │
│ [📷 Add photos]  (opens camera)                 │
│                                                 │
│ [ Next → ]                                      │
└──────────────────────────────────────────────────┘
```

Step 2 — Time Slot (75% height):
```
┌──────────────────────────────────────────────────┐
│ ▂▂▂▂▂                                           │
│ Choose Time                                     │
│─────────────────────────────────────────────────│
│ ⚡ ASAP (Arrives in ~45 min)   [SELECT]         │
│─────────────────────────────────────────────────│
│ Today, Jul 23                                   │
│ [2 PM] [4 PM] [6 PM]                           │
│ Tomorrow, Jul 24                               │
│ [9 AM] [11 AM] [2 PM] [4 PM]                   │
│                                                 │
│ [ Next → ]                                      │
└──────────────────────────────────────────────────┘
```

Step 3 — Address (90% height):
```
┌──────────────────────────────────────────────────┐
│ ▂▂▂▂▂                                           │
│ Service Address                                 │
│─────────────────────────────────────────────────│
│ 📍 Use Current Location                         │
│   [Your GPS address shown here]                │
│─────────────────────────────────────────────────│
│ OR SELECT SAVED ADDRESS                         │
│ [Home — Flat 401, Tower B, Green Park]         │
│ [Office — XYZ Tower, Connaught Place]          │
│ [+ Add New Address]                             │
│─────────────────────────────────────────────────│
│ Floor / Flat Number:                            │
│ [                              ]                │
│                                                 │
│ Landmark:                                       │
│ [Near blue gate]                                │
│                                                 │
│ [ Confirm Booking → ]                           │
└──────────────────────────────────────────────────┘
```

**Post-Booking Confirmation Screen:**
```
┌──────────────────────────────────────────────────┐
│                  ✅                              │
│          Booking Confirmed!                     │
│                                                  │
│    BK-2026-001234                               │
│    Plumbing — Tap Repair                        │
│    Today, 2:00 PM                               │
│    Flat 401, Green Park, Delhi                  │
│                                                  │
│    [Avatar] Ramesh Kumar                        │
│    ⭐ 4.8 · Arrives in ~45 min                  │
│                                                  │
│    [Track Live] [Call Ramesh] [Chat]            │
│                                                  │
│    [ Back to Home ]                             │
└──────────────────────────────────────────────────┘
```

---

## 12.7 Bookings Tab

### 12.7.1 Booking List

```
┌──────────────────────────────────────────────────┐
│ My Bookings                                      │
│ [Active] [Completed] [Cancelled]                 │
│──────────────────────────────────────────────────│
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ 🔄 IN PROGRESS                BK-001234   │  │
│ │ Plumbing — Tap Repair                      │  │
│ │ Today 2:00 PM · Flat 401, Green Park      │  │
│ │ Partner: Ramesh ⭐4.8                      │  │
│ │ [Track Live →]  [Call]  [Chat]             │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ ✅ COMPLETED              Jul 20           │  │
│ │ Drain Cleaning                             │  │
│ │ ₹650 Paid · Ramesh ⭐4.8                  │  │
│ │ [Rate] [Book Again] [Invoice]              │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## 12.8 Profile Tab

### 12.8.1 Profile Screen

```
┌──────────────────────────────────────────────────┐
│ My Profile                              [⚙️ Edit] │
│──────────────────────────────────────────────────│
│                                                  │
│     [Avatar 72px]                                │
│     Rahul Sharma                                 │
│     Delhi · Buyer                                │
│     📱 98765 43210                               │
│     KYC: ✅ Verified                             │
│     Profile: ██████████░ 85%                     │
│                                                  │
│──────────────────────────────────────────────────│
│ MENU ITEMS                                       │
│                                                  │
│ 🔖 Saved Properties               5 ›           │
│ 🏠 My Listings                    2 ›           │
│ 📋 My Enquiries                   3 ›           │
│ 🏦 Loan Applications              1 ›           │
│ 📄 Documents                      ›             │
│ 💰 Wallet & Rewards        ₹1,250 ›             │
│ 👥 Refer & Earn                   ›             │
│ 🛡 AMC Plans                      ›             │
│──────────────────────────────────────────────────│
│ 🔔 Notifications                  ›             │
│ 🔒 Privacy & Security             ›             │
│ ❓ Help & Support                 ›             │
│ ⭐ Rate the App                   ›             │
│──────────────────────────────────────────────────│
│ [ Logout ]                                       │
│ App Version: 2.1.0 (Build 234)                  │
└──────────────────────────────────────────────────┘
```

---

## 12.9 Deep Linking

### 12.9.1 Supported Deep Links

| URL | Destination Screen |
|-----|-------------------|
| `https://roofridge.in/property/{slug}/` | PropertyDetailScreen |
| `https://roofridge.in/bookings/{id}/` | BookingDetailScreen |
| `https://roofridge.in/dashboard/` | ProfileTab |
| `https://roofridge.in/r/{code}` | Referral processing + HomeScreen |
| `roofridge://booking/{id}` | BookingDetailScreen (native) |
| `roofridge://property/{slug}` | PropertyDetailScreen (native) |

**Notification Deep Links:**
- Booking status update → `BookingDetailScreen`
- Price alert → `PropertyDetailScreen`
- New matching listing → `SearchResultsScreen` (pre-filtered)

---

## 12.10 Push Notifications — Mobile App

### 12.10.1 FCM Integration

**Setup:**
1. App requests permission on first meaningful interaction (not at launch)
2. FCM token stored: `PATCH /v1/partners/fcm-token` (B2B) or `PATCH /v1/users/fcm-token` (B2C)
3. Token refreshed if expired (FCM auto-refresh hook)

**Foreground Handling:**
- In-app notification banner appears at top (44px height, 3s duration)
- Tap → Navigate to relevant screen

**Background Handling:**
- System notification tray
- Tap → App opens to deep link URL from notification data

**Notification Data Payload:**
```json
{
  "notification": {
    "title": "Booking Confirmed!",
    "body": "Ramesh Kumar will arrive by 2:00 PM"
  },
  "data": {
    "type": "booking_status",
    "booking_id": "BK-2026-001234",
    "deep_link": "roofridge://booking/BK-2026-001234"
  }
}
```

---

## 12.11 Offline Mode

### 12.11.1 Offline Behavior

| Screen | Offline Behavior |
|--------|-----------------|
| Home | Show cached data with "Offline — showing cached results" banner |
| Property Search | Show "No internet connection" with cached last results |
| Property Detail | Show cached if previously visited; "Outdated data" warning |
| Booking Flow | Block with "Internet required to book services" |
| Profile | Show cached profile data |
| Booking List | Show cached bookings with refresh button |

**React Query Cache:**
- Property search results: Cached 60s
- Property detail: Cached 300s
- Booking list: Cached 30s

**Connectivity Detection:**
- `@react-native-community/netinfo`
- Banner appears: "You're offline. Some features may not work."
- Auto-dismissed when connection restores

---

## 12.12 App Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| App launch time (cold) | <3 seconds | From tap to home screen |
| App launch time (warm) | <1 second | Background → foreground |
| Search results | <1.5 seconds | Query to first result |
| Property detail open | <1 second | Tap to screen rendered |
| Image load (first) | <2 seconds | Lazy loaded, skeleton shown |
| Animation FPS | 60 FPS | All transitions and scrolls |
| APK size (Android) | <50 MB | Play Store |
| IPA size (iOS) | <60 MB | App Store |

**Performance Techniques:**
- FlashList for all lists (vs FlatList — 10x faster)
- Image lazy loading with blur placeholder
- Hermes JS engine (bundled with Expo)
- Code splitting by route
- Animated values with Reanimated (runs on UI thread)

---

## 12.13 App Store Configuration

### 12.13.1 Google Play Store Listing

| Field | Value |
|-------|-------|
| App Name | Roof Ridge — Property & Home |
| Short Description | India's trusted platform for property, services & home solutions |
| Category | House & Home |
| Content Rating | Everyone |
| Keywords | property, real estate, home services, buy flat, rent house, plumber |
| Screenshots | 5 screens (home, search, listing, booking, profile) |
| Feature Graphic | 1024×500 px |

### 12.13.2 iOS App Store Listing

| Field | Value |
|-------|-------|
| App Name | Roof Ridge: Property & Services |
| Subtitle | Buy, Rent, Book, Build, Furnish |
| Primary Category | Lifestyle |
| Secondary Category | Utilities |
| Keywords | property,real estate,home services,buy flat,plumber,renovation |
| Age Rating | 4+ |

---

## 12.14 PWA (Progressive Web App) Specification

### 12.14.1 PWA Manifest

```json
{
  "name": "Roof Ridge — Property & Home",
  "short_name": "Roof Ridge",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#E85D04",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [
    { "src": "/screenshots/mobile-home.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" }
  ]
}
```

### 12.14.2 Service Worker Capabilities

| Feature | Behavior |
|---------|---------|
| App Shell Caching | Core HTML/CSS/JS cached on first load |
| Page Caching | Last 10 visited pages cached |
| Image Caching | Last 50 property images cached |
| Background Sync | Enquiry forms submitted when back online |
| Push Notifications | Same as native app via FCM |
| Offline Page | Custom "No internet" page when no cache |

---

*Continue to VOL-13 — AI Engine & Recommendation System*
