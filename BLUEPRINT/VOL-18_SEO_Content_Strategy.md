# VOL-18: SEO Architecture & Content Strategy
## Roof Ridge — Enterprise Software Blueprint

---

## 18.1 SEO Strategy Overview

### 18.1.1 Target Keywords Pyramid

```
Tier 1 (Transactional — Highest Intent):
  "buy flat in Delhi"
  "3 BHK for sale in Gurgaon"
  "rent 2 BHK in Bangalore"
  "plumber near me"
  "home loan interest rates 2026"
  
Tier 2 (Informational + Transactional):
  "properties for sale in Delhi under 1 crore"
  "flats for rent in Koramangala Bangalore"
  "best interior designers in Mumbai"
  
Tier 3 (Informational):
  "how to get home loan in India"
  "property registration process India"
  "vastu shastra for homes"
  
Tier 4 (Long-tail):
  "3 bhk flat for sale in dwarka sector 12 delhi"
  "ready to move flats in electronic city bangalore"
```

### 18.1.2 SEO Target Pages

**Programmatically generated (scale = 10,000+ pages):**

| Page Type | URL Template | Count |
|-----------|-------------|-------|
| City property | `/{city}/property/` | 50+ |
| City+type | `/{city}/flats-for-sale/` | 300+ |
| City+locality | `/{city}/{locality}/property/` | 2,000+ |
| City+locality+BHK | `/{city}/{locality}/3-bhk-flats-for-sale/` | 10,000+ |
| City+PG | `/{city}/pg-accommodation/` | 50+ |
| Service+city | `/services/plumber/{city}/` | 500+ |
| Material+city | `/materials/cement/{city}/` | 300+ |
| Partner profile | `/partners/{partner-slug}/` | 10,000+ |
| New project | `/project/{project-slug}/` | 1,000+ |
| Locality guide | `/area-guide/{city}/{locality}/` | 2,000+ |
| Blog article | `/blog/{category}/{slug}/` | 500+ |

---

## 18.2 URL Architecture

### 18.2.1 URL Design Principles

- **Clean URLs:** No `.php`, `.html`, no `?id=` for content pages
- **Lowercase:** All URLs lowercase
- **Hyphens:** Words separated by hyphens, not underscores
- **City in URL:** City always comes first for location-specific pages
- **Canonical:** Every page has a self-referencing canonical tag
- **Trailing slash consistency:** All pages end WITHOUT trailing slash (redirect enforced)

### 18.2.2 URL Patterns & Canonical Handling

```
Property Search:
  /delhi/property/                          → Canonical (main)
  /delhi/property/?bhk=3BHK                → Canonical → /delhi/property/3-bhk-flats-for-sale/
  /delhi/property/?page=2                  → Canonical = self, rel=prev/next

Property Listings:
  /property/{slug}/                         → Canonical (unique per listing)

Duplicate Prevention:
  /Delhi/property/     → 301 → /delhi/property/
  /delhi/property      → 301 → /delhi/property/
  www.roofridge.in     → 301 → roofridge.in
  http://roofridge.in  → 301 → https://roofridge.in
```

---

## 18.3 Technical SEO Specification

### 18.3.1 HTML Head Tags (Per Page Type)

#### Homepage

```html
<title>Buy, Sell & Rent Properties in India | Verified Listings | Roof Ridge</title>
<meta name="description" content="India's most trusted property platform. 45,000+ verified listings across 35 cities. Buy, sell, rent properties. Book home services. Get loans. Zero brokerage.">
<meta name="keywords" content="buy property India, rent flat, property for sale, home loan, interior design, home services">
<link rel="canonical" href="https://roofridge.in/">
<meta property="og:title" content="Roof Ridge — India's Property & Home Platform">
<meta property="og:description" content="45,000+ verified listings. Book services instantly.">
<meta property="og:image" content="https://cdn.roofridge.in/og/homepage.jpg">
<meta property="og:url" content="https://roofridge.in/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Roof Ridge — Property & Home">
<meta name="twitter:image" content="https://cdn.roofridge.in/og/homepage.jpg">
```

#### City Property Page

```html
<title>Properties for Sale in Delhi | {Count}+ Verified Listings | Roof Ridge</title>
<meta name="description" content="Explore {count}+ verified properties for sale in Delhi. 2 BHK, 3 BHK flats, villas, plots, commercial spaces. Compare prices, check loan eligibility. Zero brokerage.">
<link rel="canonical" href="https://roofridge.in/delhi/property/">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://roofridge.in/"},
    {"@type": "ListItem", "position": 2, "name": "Delhi", "item": "https://roofridge.in/delhi/"},
    {"@type": "ListItem", "position": 3, "name": "Properties for Sale", "item": "https://roofridge.in/delhi/property/"}
  ]
}
</script>
```

#### Property Detail Page

```html
<title>{BHK} Flat for Sale in {Locality}, {City} | ₹{Price} | Roof Ridge</title>
<meta name="description" content="{BHK} {property_type} for {type} in {locality}, {city}. {area} sqft, {furnishing}. Asking price ₹{price}. EMI from ₹{emi}/month. {is_verified?'Verified listing.':''} Enquire now!">
<link rel="canonical" href="https://roofridge.in/property/{slug}/">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "{title}",
  "description": "{description_truncated}",
  "url": "https://roofridge.in/property/{slug}/",
  "image": ["{photo_url_1}", "{photo_url_2}"],
  "price": "{price}",
  "priceCurrency": "INR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{address}",
    "addressLocality": "{locality}",
    "addressRegion": "{city}",
    "postalCode": "{pincode}",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{lat}",
    "longitude": "{lng}"
  },
  "numberOfRooms": "{bedrooms}",
  "floorSize": { "@type": "QuantitativeValue", "value": "{area}", "unitCode": "FTK" },
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "RealEstateAgent", "name": "{partner_name}" }
  }
}
</script>
```

#### Service Page

```html
<title>Plumber Service in Delhi — Book in 60 Seconds | Roof Ridge</title>
<meta name="description" content="Book verified plumbers in Delhi instantly. Tap repair, pipe leak, drain cleaning & more. Available 24/7. Starting ₹199. Doorstep service guaranteed in 4 hours.">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plumbing Service in Delhi",
  "provider": { "@type": "Organization", "name": "Roof Ridge" },
  "areaServed": { "@type": "City", "name": "Delhi" },
  "offers": {
    "@type": "Offer",
    "price": "199",
    "priceCurrency": "INR",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "199", "unitText": "visit" }
  }
}
</script>
```

#### Blog Article

```html
<title>{Article Title} | Roof Ridge Blog</title>
<meta name="description" content="{meta_description}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "image": "{featured_image_url}",
  "author": { "@type": "Person", "name": "{author_name}" },
  "publisher": {
    "@type": "Organization",
    "name": "Roof Ridge",
    "logo": { "@type": "ImageObject", "url": "https://roofridge.in/logo.png" }
  },
  "datePublished": "{published_at}",
  "dateModified": "{updated_at}"
}
</script>
```

---

## 18.4 Internal Linking Architecture

### 18.4.1 Internal Link Map

```
Homepage:
  → City pages (Delhi, Mumbai, Bangalore, etc.)
  → Service category pages
  → Material category pages
  → Loan landing page
  → Blog (featured articles)
  → About, Contact

City Pages (e.g., /delhi/property/):
  → City-BHK pages (2BHK, 3BHK, etc.)
  → Locality pages within city
  → New projects in city
  → Services in city
  → Area guides for city
  → Blog articles mentioning city

Locality Pages:
  → Adjacent locality pages
  → City page
  → All listings in that locality (paginated)
  → Area guide

Property Detail:
  → Similar properties (AI)
  → More from this dealer
  → Locality page
  → City page
  → Loan eligibility tool
  → EMI calculator

Service Category:
  → Sub-service pages
  → AMC plans
  → City-specific service pages
  → Blog: "How to fix X"

Blog Article:
  → Relevant property pages
  → Relevant service pages
  → Related articles (3-5)
  → Tools (EMI Calculator, Valuation)
```

### 18.4.2 Breadcrumbs (All Pages)

```
Homepage > {City} > Properties > {Locality} > {Property Title}
Homepage > Services > {Category} > {Sub-category}
Homepage > Blog > {Category} > {Article Title}
```

---

## 18.5 Sitemap Architecture

### 18.5.1 Sitemap Index

**URL:** `https://roofridge.in/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://roofridge.in/sitemap-static.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://roofridge.in/sitemap-properties-delhi.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://roofridge.in/sitemap-properties-mumbai.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
  <!-- ... one per city ... -->
  <sitemap>
    <loc>https://roofridge.in/sitemap-services.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://roofridge.in/sitemap-blog.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://roofridge.in/sitemap-partners.xml</loc>
    <lastmod>2026-07-23</lastmod>
  </sitemap>
</sitemapindex>
```

### 18.5.2 Property Listing Sitemap Entry

```xml
<url>
  <loc>https://roofridge.in/property/3-bhk-flat-dwarka-sector-12-12345/</loc>
  <lastmod>2026-07-20</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
  <image:image>
    <image:loc>https://cdn.roofridge.in/properties/12345/photo_1.webp</image:loc>
    <image:title>3 BHK Flat in Dwarka Sector 12, Delhi</image:title>
  </image:image>
</url>
```

### 18.5.3 Sitemap Generation

**Trigger:** Nightly cron job (2 AM) regenerates all sitemaps  
**Incremental:** New live listing → Added to city sitemap immediately  
**Removed listing:** Removed from sitemap within 24 hours  
**Submission:** Auto-submitted to Google via Indexing API

**Google Indexing API Integration:**
```javascript
// Auto-ping Google when new listing goes live
async function pingGoogleIndexingApi(listingUrl: string) {
  await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      url: `https://roofridge.in/property/${slug}/`,
      type: 'URL_UPDATED'
    })
  });
}
```

---

## 18.6 Core Web Vitals Targets & Optimizations

### 18.6.1 CWV Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | <2.5s | Measured at 75th percentile |
| FID (First Input Delay) | <100ms | Replaced by INP in 2024 |
| INP (Interaction to Next Paint) | <200ms | |
| CLS (Cumulative Layout Shift) | <0.1 | |
| TTFB (Time to First Byte) | <600ms | |
| FCP (First Contentful Paint) | <1.8s | |

### 18.6.2 Optimization Techniques

**Images:**
- All images served as WebP (60% smaller than JPEG)
- srcset for responsive images (`400w`, `800w`, `1200w`)
- lazy loading: `loading="lazy"` on all below-fold images
- Hero image: Eagerly loaded (no lazy)
- `<img width="" height="">` set to prevent CLS
- CloudFront CDN with 1-year cache headers

**JavaScript:**
- Code splitting per route (dynamic imports)
- Critical JS inlined
- Non-critical JS deferred
- Third-party scripts loaded async (Maps, Analytics)
- Bundle analyzer run with every release

**CSS:**
- Critical CSS inlined in `<head>` (above fold only)
- Rest of CSS: `<link rel="preload" as="style">`
- No unused CSS in production (PurgeCSS)

**Fonts:**
- Google Fonts: Hosted locally (GDPR + performance)
- `font-display: swap` for all web fonts
- Preconnect: `<link rel="preconnect" href="https://fonts.gstatic.com">`

**Server-Side:**
- SSG for static pages (city, locality, blog, service pages)
- ISR for semi-dynamic (city pages refresh hourly)
- SSR for dynamic (search results, dashboard)
- TTFB reduced via CloudFront edge caching for SSG pages

---

## 18.7 Content Strategy

### 18.7.1 Blog Content Calendar

**Monthly targets:**
- 20 educational articles (homebuyer guides, service guides)
- 8 city-specific market reports
- 4 "Top 10" or "Best of" posts (link bait)
- 2 legal/documentation guides
- 2 loan/finance guides

**Blog Categories:**
| Category | SEO Intent | Example Topics |
|----------|-----------|---------------|
| Homebuyer Guides | Informational + Transactional | "First-time homebuyer checklist India 2026" |
| Property Market Reports | Informational | "Delhi property prices Q2 2026 report" |
| Legal & Documentation | Informational | "How to register property in Delhi: Step-by-step" |
| Home Services | Informational | "When to call a plumber vs DIY fix" |
| Loans & Finance | Informational | "Home loan vs NRI loan: Key differences" |
| Interior & Design | Inspirational | "10 modular kitchen designs under ₹5 lakh" |
| Construction | Informational | "AAC blocks vs red bricks: Cost & quality comparison" |
| City Guides | Informational + Local | "Best areas to live in Delhi for families" |

### 18.7.2 Content Template: City Area Guide

**URL:** `/area-guide/delhi/dwarka/`

```markdown
# Dwarka, Delhi: Complete Area Guide 2026

[Hero image of Dwarka skyline]

## Overview
[200-word introduction to Dwarka]

## Property Prices in Dwarka (July 2026)
[Table: BHK Type | Area | Price Range | ₹/sqft]
[Source: Roof Ridge data, 3-month avg]

## Price Trend
[Line chart: 24-month price history]

## Available Properties
[3 featured property cards]
[View all {count} properties in Dwarka →]

## Why Choose Dwarka?
- Near metro (Blue + Green Line)
- Excellent schools
- DDA housing authority

## Connectivity
[Interactive map showing metro, bus, roads]
Metro: Dwarka Sector 10, 11, 12, 13, 21 (Blue Line)

## Schools & Colleges
[List with distance]

## Hospitals
[List with distance]

## Shopping & Entertainment
[List]

## Pros & Cons
[Balanced perspective]

## Expert View
[Quote from local partner about the locality]

## FAQs
Q: What is the average price per sqft in Dwarka?
A: The average price in Dwarka ranges from ₹5,800-₹8,500/sqft...

[8+ FAQs with schema markup]

## Nearby Areas
[Links to adjacent locality guides]
```

---

## 18.8 Schema Markup Summary

| Page Type | Schema Types Used |
|-----------|-----------------|
| Homepage | Organization, WebSite, SearchAction |
| City Property | BreadcrumbList, FAQPage, ItemList |
| Property Detail | RealEstateListing, BreadcrumbList |
| Service Page | Service, LocalBusiness, FAQPage |
| Partner Profile | LocalBusiness, AggregateRating, Review |
| Blog Article | Article, BreadcrumbList |
| FAQ Page | FAQPage |
| Tool Pages (EMI) | WebApplication |
| Area Guide | Place, FAQPage |

---

## 18.9 SEO Monitoring & Reporting

### 18.9.1 Tools & Integration

| Tool | Purpose | Access |
|------|---------|--------|
| Google Search Console | Indexation, impressions, keywords | Marketing + Tech |
| Google Analytics 4 | Organic sessions, landing pages | Marketing |
| SEMrush | Keyword tracking, competitor analysis | Marketing |
| Ahrefs | Backlink analysis | Marketing |
| PostHog | Heatmaps, session recordings | Marketing + Product |
| Screaming Frog | Crawl audits (monthly) | Tech |
| PageSpeed Insights | CWV monitoring | Tech |

### 18.9.2 Weekly SEO Report

Auto-generated every Monday:
1. Organic sessions vs prior week (GA4)
2. Impressions + CTR from Search Console
3. Top 10 gaining/losing keywords
4. Newly indexed pages count
5. 404 error pages (from Search Console)
6. CWV status (pass/fail per page type)
7. New backlinks acquired (SEMrush)

---

*Continue to VOL-19 — Payments, Billing & Finance Flows*
