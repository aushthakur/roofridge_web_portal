# VOL-15: Analytics & Reporting System
## Roof Ridge — Enterprise Software Blueprint

---

## 15.1 Analytics Architecture

### 15.1.1 Overview

```
User Events (Web/App) → Analytics SDK → Event Collector API
                                              │
                          ┌───────────────────┴───────────────────┐
                          │                                       │
               MongoDB (raw events)              ClickHouse (OLAP warehouse)
                          │                                       │
               Firebase Analytics            Metabase (BI dashboards)
                          │                                       │
               Amplitude (product analytics)  Custom Admin Reports
```

### 15.1.2 Technology Stack

| Tool | Purpose |
|------|---------|
| **Firebase Analytics** | Mobile app events (B2C + B2B) |
| **Google Analytics 4** | Website events |
| **Amplitude** | Product analytics, funnels, retention |
| **ClickHouse** | OLAP warehouse for fast aggregations |
| **Metabase** | Internal BI dashboards for business teams |
| **Grafana** | Technical/infra metrics |
| **Sentry** | Error tracking |
| **PostHog** | Feature flags + heatmaps + session replay |
| **MongoDB** | Raw event store (30-day retention) |

---

## 15.2 Event Tracking Specification

### 15.2.1 Event Schema (Universal)

```typescript
interface AnalyticsEvent {
  event_name: string;          // snake_case
  timestamp: ISO8601;          // UTC
  session_id: string;          // Anonymous session UUID
  user_id?: string;            // null for guests
  device_id: string;           // Unique device identifier
  platform: 'web' | 'ios' | 'android' | 'b2b_ios' | 'b2b_android';
  app_version: string;         // "2.1.0"
  os_version?: string;         // "iOS 17.4" or "Android 13"
  country: string;             // "IN"
  city?: string;               // Auto-detected
  locality?: string;           // User-selected
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  page_url?: string;           // Web only
  properties: Record<string, any>; // Event-specific properties
}
```

### 15.2.2 Complete Event Catalogue

#### Authentication Events

| Event | When | Properties |
|-------|------|-----------|
| `auth_otp_requested` | OTP send button clicked | `{ channel, source, purpose }` |
| `auth_otp_verified` | OTP verified successfully | `{ is_new_user, source }` |
| `auth_otp_failed` | Wrong OTP entered | `{ attempt_number }` |
| `auth_modal_opened` | Auth modal triggered | `{ trigger, source_page }` |
| `auth_logout` | User logged out | `{ session_duration_mins }` |
| `user_registered` | New user completes registration | `{ city, intent, source }` |
| `profile_completed` | Profile completion % > 80% | `{ fields_added }` |
| `kyc_started` | KYC flow initiated | `{ source }` |
| `kyc_submitted` | Documents submitted | `{ doc_types }` |
| `kyc_approved` | KYC verified (admin action) | `{ days_taken }` |

#### Property Search Events

| Event | When | Properties |
|-------|------|-----------|
| `search_performed` | Search submitted | `{ query, city, type, bhk, min_price, max_price, results_count }` |
| `search_autocomplete_selected` | Autocomplete suggestion tapped | `{ selected_type, selected_value, position }` |
| `search_filter_applied` | Filter applied | `{ filter_type, filter_value, results_count_before, results_count_after }` |
| `search_filter_cleared` | All filters cleared | `{ filters_were_active }` |
| `search_sort_changed` | Sort option changed | `{ sort_from, sort_to }` |
| `search_view_toggled` | Map/List view toggled | `{ from, to }` |
| `search_no_results` | Empty results page shown | `{ city, type, active_filters }` |
| `search_saved` | Search saved | `{ search_name, city, type }` |

#### Property Listing Events

| Event | When | Properties |
|-------|------|-----------|
| `listing_viewed` | Property detail page opened | `{ listing_id, city, bhk, price, source, position_in_list }` |
| `listing_photo_viewed` | Photo tapped/scrolled | `{ listing_id, photo_index }` |
| `listing_video_played` | Video play button tapped | `{ listing_id }` |
| `listing_tour_opened` | 360° tour opened | `{ listing_id }` |
| `listing_saved` | Heart/save button tapped | `{ listing_id, source }` |
| `listing_unsaved` | Save removed | `{ listing_id }` |
| `listing_shared` | Share button tapped | `{ listing_id, share_method }` |
| `listing_reported` | Report submitted | `{ listing_id, reason }` |
| `listing_contact_revealed` | Agent number revealed | `{ listing_id, user_type }` |
| `listing_enquiry_submitted` | Enquiry form submitted | `{ listing_id, intent }` |
| `listing_whatsapp_clicked` | WhatsApp agent clicked | `{ listing_id }` |
| `listing_loan_check_clicked` | "Check Loan" CTA clicked | `{ listing_id, property_price }` |
| `listing_created` | New listing submitted | `{ city, bhk, price, listing_type }` |
| `listing_published` | Listing goes live | `{ listing_id, time_to_publish_hrs }` |

#### Booking Events

| Event | When | Properties |
|-------|------|-----------|
| `booking_flow_started` | Category/service selected | `{ category, source }` |
| `booking_slot_selected` | Time slot chosen | `{ category, slot_type, days_ahead }` |
| `booking_address_confirmed` | Address step completed | `{ city, address_type }` |
| `booking_created` | Booking submitted | `{ booking_id, category, slot, amount }` |
| `booking_cancelled` | Booking cancelled | `{ booking_id, reason, time_before_slot_hrs }` |
| `booking_completed` | Marked completed | `{ booking_id, category, final_amount }` |
| `booking_review_submitted` | Rating submitted | `{ booking_id, rating, has_text, has_photos }` |
| `tracking_page_viewed` | Live tracking opened | `{ booking_id }` |

#### Payment Events

| Event | When | Properties |
|-------|------|-----------|
| `payment_initiated` | Payment flow started | `{ payment_type, amount }` |
| `payment_method_selected` | UPI/Card/Wallet chosen | `{ method }` |
| `payment_completed` | Payment successful | `{ payment_id, amount, method, gateway }` |
| `payment_failed` | Payment failed | `{ error_code, amount }` |
| `coupon_applied` | Coupon applied | `{ coupon_code, discount_amount }` |
| `coupon_invalid` | Invalid coupon | `{ coupon_code }` |
| `refund_requested` | User requests refund | `{ booking_id, reason }` |

#### Loan & Insurance Events

| Event | When | Properties |
|-------|------|-----------|
| `loan_eligibility_checked` | Eligibility form submitted | `{ income, city, property_value, employment_type }` |
| `loan_emi_calculated` | EMI calculator used | `{ property_value, down_payment, rate, tenure, emi }` |
| `loan_application_started` | Application flow started | `{ product_id, bank }` |
| `loan_application_submitted` | Full application submitted | `{ application_id, amount, bank }` |
| `insurance_quote_requested` | Quote form submitted | `{ insurance_type, property_value }` |

#### Material/Marketplace Events

| Event | When | Properties |
|-------|------|-----------|
| `product_viewed` | Product page opened | `{ product_id, category, brand }` |
| `cart_item_added` | Product added to cart | `{ product_id, quantity, price }` |
| `cart_item_removed` | Product removed | `{ product_id }` |
| `checkout_started` | Proceed to payment | `{ cart_value, item_count }` |
| `order_placed` | Order confirmed | `{ order_id, total_value, vendor_count }` |

#### B2B Partner Events

| Event | When | Properties |
|-------|------|-----------|
| `partner_registered` | Registration completed | `{ partner_type, city }` |
| `partner_approved` | Admin approval | `{ partner_type, days_to_approve }` |
| `lead_viewed` | Lead detail opened | `{ lead_id, lead_score }` |
| `lead_contact_revealed` | Contact number revealed | `{ lead_id, credits_remaining }` |
| `lead_status_updated` | Pipeline status changed | `{ lead_id, from_status, to_status }` |
| `lead_converted` | Marked as converted | `{ lead_id, deal_value }` |
| `booking_accepted` | Partner accepts booking | `{ booking_id, category }` |
| `booking_declined` | Partner declines | `{ booking_id, reason }` |
| `listing_created_b2b` | Partner adds listing | `{ listing_type, city }` |
| `earnings_viewed` | Earnings screen opened | `{ month, total_earnings }` |

---

## 15.3 Key Metrics & KPIs

### 15.3.1 User Acquisition Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| MAU | Monthly Active Users | 5L+ by Year 2 |
| DAU/MAU Ratio | Daily stickiness | >25% |
| New User Registration | Count per day | 500+ |
| Organic vs Paid Split | Channel breakdown | 60/40 |
| CAC (Cost per Acquisition) | Paid channel spend / new users | <₹150 |
| LTV | 24-month predicted revenue per user | >₹2,500 |
| LTV:CAC Ratio | | >10:1 |

### 15.3.2 Engagement Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Session Duration (avg) | Mins per session | >4 min |
| Pages/Screens per Session | | >6 |
| Property Views per Session | | >3 |
| Search-to-Enquiry Rate | Enquiries / Unique searchers | >8% |
| Enquiry-to-Lead Rate | Qualified leads / enquiries | >60% |
| Booking Repeat Rate | Users with 2+ bookings in 90 days | >30% |
| D1/D7/D30 Retention | % returning after 1/7/30 days | 40% / 25% / 15% |

### 15.3.3 Revenue Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| GMV (Gross Merchandise Value) | Total transaction value | ₹10Cr+/month by Year 2 |
| Net Revenue | Platform take rate applied | ₹1Cr+/month by Year 2 |
| ARPU (Monthly) | Revenue / MAU | ₹20+ |
| Subscription Revenue | MRR from B2B plans | ₹25L+/month |
| Commission Revenue | % of bookings/orders | 60% of total revenue |
| Advertising Revenue | Promoted listings + CPL | 20% of total |
| Lead Pack Revenue | B2B lead purchases | 20% of total |

### 15.3.4 Marketplace Health Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Supply/Demand Ratio | Properties / Active Buyers | >2:1 |
| Listing Approval Rate | Approved / Submitted | >85% |
| Avg Time to Approval | Hours from submission to live | <8 hours |
| Booking Fulfillment Rate | Completed / Created | >92% |
| Partner Response Rate | Leads responded within 30min | >80% |
| Service Rating Average | Avg star rating (services) | >4.3/5 |
| Lead Conversion Rate | Converted / Assigned leads | >8% |
| Churn Rate (B2B) | Partners churning monthly | <5% |

---

## 15.4 Analytics Dashboards

### 15.4.1 Executive Dashboard

**URL:** `/admin/analytics/executive/`  
**Audience:** CEO, Co-founders, VP  
**Refresh:** Real-time (critical KPIs), Daily (trends)

```
┌────────────────────────────────────────────────────────────────────┐
│ Executive Dashboard                          Jul 2026 | MTD ▾     │
│──────────────────────────────────────────────────────────────────── │
│ ┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐   │
│ │ MAU     │ Revenue │ Bookings│ Listings│ Leads   │ NPS     │   │
│ │ 1.2L    │ ₹42.5L  │ 4,532   │ 45,234  │ 12,456  │ 67      │   │
│ │ +18% MoM│ +14% MoM│ +22%MoM │ +8% MoM │ +31%MoM │ +3 pts  │   │
│ └─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘   │
│──────────────────────────────────────────────────────────────────── │
│ Revenue Trend (12 months)          | City Performance              │
│ [Area chart — monthly revenue]     | [Treemap: Revenue by city]   │
│                                    │                               │
│ Booking Funnel                     | Retention Cohort              │
│ [Funnel: Created→Assigned→Done]    | [30-day cohort heatmap]      │
└────────────────────────────────────────────────────────────────────┘
```

### 15.4.2 Operations Dashboard

**URL:** `/admin/analytics/operations/`  
**Audience:** VP Operations, City Managers, Operations team

**Key Charts:**
- Booking completion rate by city (daily)
- Partner response time distribution
- SLA breaches (bookings not assigned within 15 min)
- Lead assignment rate by hour-of-day
- Active partner count by city (real-time)

### 15.4.3 Marketing Dashboard

**URL:** `/admin/analytics/marketing/`  
**Audience:** Marketing team, CMO

**Key Charts:**
- Acquisition by channel (Organic/Google Ads/Meta/Email/Referral)
- CAC by channel over time
- Campaign ROI comparison
- City-wise new user acquisition
- Keyword rankings (SEO — fetched via Search Console API)
- Social media performance (linked to Meta/Instagram API)

### 15.4.4 Product Analytics Dashboard

**URL:** External Amplitude dashboard (embedded via iframe)

**Key Funnels:**
- Registration funnel (download → open → OTP → profile → first action)
- Booking funnel (search → service → time → address → confirm → complete)
- Listing funnel (start → details → photos → kyc → submit → live)
- Loan funnel (eligibility → application → docs → approval)

**User Flows (Sankey diagrams):**
- Post-registration first actions
- Post-search actions
- Drop-off points in booking flow

---

## 15.5 Reporting System

### 15.5.1 Automated Reports (Email)

| Report | Recipients | Frequency | Time |
|--------|-----------|-----------|------|
| Daily Summary | All department heads | Daily | 9:00 AM |
| Weekly Business Review | Leadership team | Monday | 8:00 AM |
| Monthly P&L Report | Finance + CEO | 1st of month | 10:00 AM |
| Partner Performance | Operations team | Monday | 9:00 AM |
| SLA Breach Report | Operations | Daily | 8:00 AM |
| AI Model Performance | Tech team | Weekly | Tuesday 9 AM |
| Grievance Status | Support + Legal | Daily | 9:00 AM |

### 15.5.2 Daily Summary Report Content

```
Roof Ridge Daily Report — Jul 23, 2026

KEY NUMBERS:
─────────────────────────────────────
New Users:           247    (+12% vs yesterday)
Active Listings:   45,234    (net +23 today)
Bookings Created:     189    (+8% vs yesterday)
Bookings Completed:   172    (91% completion)
Revenue Today:    ₹1,45,230   (+14% vs yesterday)
New Leads:            312    (+22% vs yesterday)

ISSUES:
─────────────────────────────────────
⚠️ 4 SLA breaches (bookings unassigned >15 min)
⚠️ WhatsApp gateway degraded 2:00 PM - 3:30 PM
✅ All other systems healthy

TOP CITIES TODAY:
─────────────────────────────────────
1. Delhi: ₹62,100 (42.8%)
2. Mumbai: ₹38,400 (26.4%)
3. Bangalore: ₹21,600 (14.9%)

ACTION REQUIRED:
─────────────────────────────────────
• 34 listings pending moderation
• 8 KYC submissions awaiting review
• 2 grievances overdue (>48hrs)
```

---

## 15.6 Cohort Analysis

### 15.6.1 User Retention Cohort

**Weekly cohort tracking:**
- All users who registered in a given week = one cohort
- Track: % returning in Week 1, 2, 3, 4, 8, 12
- Breakdown by: Source (organic/paid), City, Platform (web/app)
- Target: Week 4 retention >15%

**Cohort Actions Taken:**
- If Week 1 retention <40%: Review onboarding, push notification setup
- If Week 4 retention <15%: Improve personalized content, add re-engagement campaigns

### 15.6.2 Revenue Cohort

- Which registration month cohort generates most LTV
- Breakdown by first action type (search / book / list)
- Used for: Acquisition channel optimization

---

## 15.7 A/B Testing Infrastructure

### 15.7.1 Feature Flag Management (PostHog)

**Use Cases:**
- Test new homepage designs
- Test different CTA button text/colors
- Test new onboarding flows
- Test AI recommendation placement
- Test push notification timing

**Configuration:**
- Flags stored in PostHog + synced to app on launch
- Rollout: 0% → 10% → 50% → 100%
- Kill switch: instant toggle to 0%

**Test Example:**
```
Test: "homepage_hero_cta_text"
Variants:
  A: "Search Properties" (control, 50%)
  B: "Find Your Dream Home" (test, 50%)
Goal metric: hero_search event (primary)
Secondary: lead_capture event
Duration: 14 days minimum
Required sample: 10,000 users/variant
```

---

## 15.8 SEO Analytics

### 15.8.1 SEO Tracking

**Tools:** Google Search Console + SEMrush + Internal tracking

**Tracked Metrics:**
| Metric | Tool |
|--------|------|
| Organic search impressions | Search Console |
| Organic click-through rate | Search Console |
| Average position | Search Console |
| Organic sessions | GA4 |
| Landing page performance | GA4 |
| Keyword rankings (top 100) | SEMrush |
| Backlinks count | SEMrush |
| Core Web Vitals (CWV) | Search Console |
| Page indexation status | Search Console |

**Automated Alerts:**
- CWV drops below threshold → Auto ticket to frontend team
- Top 10 ranking keyword drops to >15 → Alert to SEO team
- Sitemap indexation drops >5% → Alert to tech team

### 15.8.2 SEO Performance Report

**Weekly automated report includes:**
- Top 10 organic landing pages by sessions
- New keywords entering top 10
- Keywords that dropped positions
- Core Web Vitals status per page
- Top 5 city pages performance

---

## 15.9 Data Retention & Privacy

### 15.9.1 Data Retention Periods

| Data Type | Retention | Justification |
|-----------|----------|--------------|
| Raw analytics events | 30 days (MongoDB) | Short-term debugging |
| Aggregated metrics | 5 years (ClickHouse) | Business reporting |
| User behavioral data | 3 years | LTV analysis |
| Financial records | 7 years | Tax/legal compliance |
| KYC documents | 5 years post-relationship | PMLA compliance |
| Audit logs | 5 years | Regulatory |
| Booking records | 5 years | Consumer protection |
| Chat messages | 1 year | Support |

### 15.9.2 DPDP Act Compliance in Analytics

- **No PII in analytics events:** User ID only (not name/mobile)
- **Anonymization:** After 3 years, user_id hashed irreversibly
- **Right to Erasure:** `DELETE /v1/users/:id` → Clears all analytics events with that user_id
- **Data localization:** All analytics data stored in AWS ap-south-1 (Mumbai)
- **Consent:** Analytics tracked only after consent given at registration

---

*Continue to VOL-16 — Infrastructure, DevOps & Security*
