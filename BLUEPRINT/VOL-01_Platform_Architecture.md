# VOL-01: Platform Overview & System Architecture
## Roof Ridge — Enterprise Software Blueprint

---

## 1.1 Executive Summary

Roof Ridge is a full-stack real estate and home services super-app designed to be India's most comprehensive property ecosystem. Unlike single-domain competitors, Roof Ridge consolidates property transactions, construction management, building materials procurement, on-demand home services, interior design, legal documentation, home loans, insurance, and annual maintenance contracts into one cohesive, AI-powered platform.

### Business Model

| Revenue Stream | Description | Pricing |
|----------------|-------------|---------|
| Listing Boost Fees | Dealers pay to feature/boost listings | ₹999–₹9,999/listing/month |
| Partner Subscription | Monthly SaaS fee for B2B partners | ₹999–₹15,000/month |
| Lead Monetization | Qualified lead packages | ₹50–₹500/lead |
| Transaction Commission | % on service bookings, material orders | 5–15% |
| Loan Referral DSA | Per-approved loan commission | ₹2,000–₹25,000/loan |
| Insurance Commission | % of first year premium | 10–20% |
| Valuation Reports | Paid downloadable AI reports | ₹499–₹2,499 |
| Legal Service Fees | Documentation flat fees | ₹999–₹4,999/case |
| AMC Subscription | Annual maintenance plans | ₹499–₹2,999/year |
| Co-branded Marketing | Partner advertising, banners | Custom |

---

## 1.2 System Architecture Overview

### 1.2.1 High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                   │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Website   │  │  B2C App    │  │  B2B App    │  │ Admin Panel │ │
│  │  (Next.js   │  │   (React    │  │   (React    │  │  (React +   │ │
│  │  PWA-ready) │  │   Native)   │  │   Native)   │  │  Next.js)   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
└─────────┼────────────────┼────────────────┼────────────────┼─────────┘
          │                │                │                │
          ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CDN LAYER (AWS CloudFront)                       │
│              Static Assets  |  Edge Caching  |  DDoS Protection      │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (AWS API Gateway)                      │
│    Rate Limiting  |  Auth Middleware  |  Request Routing  |  Logging │
└──────┬──────────────────┬────────────────────┬─────────────────────┘
       │                  │                    │
       ▼                  ▼                    ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────────────┐
│  Core API    │  │  AI Service  │  │   Notification Service        │
│  (Node.js /  │  │  (Python /   │  │   (Node.js + Bull Queue)     │
│  Express)    │  │  FastAPI)    │  │   SMS | Email | WA | Push    │
└──────┬───────┘  └──────┬───────┘  └──────────────────────────────┘
       │                  │
       ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                      │
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │ PostgreSQL  │  │  MongoDB    │  │   Redis     │  │  Elastic  │  │
│  │ (Primary   │  │ (Documents, │  │  (Cache,    │  │  Search   │  │
│  │  RDB)      │  │  Analytics) │  │  Sessions,  │  │  (Full    │  │
│  │            │  │            │  │  Rate Limit)│  │  Text)    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘
       │                  │
       ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                                │
│                                                                       │
│  AWS S3 (File Storage) | Firebase (Real-time) | RabbitMQ (Queues)   │
│  AWS SQS | AWS SNS | CloudWatch | ECS Fargate | RDS | ElastiCache   │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2.2 Microservices Decomposition

| Service Name | Responsibility | Tech | Port |
|--------------|---------------|------|------|
| `auth-service` | OTP, JWT, sessions | Node.js | 3001 |
| `user-service` | User profiles, KYC | Node.js | 3002 |
| `property-service` | Listings, search | Node.js | 3003 |
| `lead-service` | CRM, lead routing | Node.js | 3004 |
| `booking-service` | Service bookings | Node.js | 3005 |
| `material-service` | Marketplace, orders | Node.js | 3006 |
| `loan-service` | Loan applications | Node.js | 3007 |
| `insurance-service` | Insurance policies | Node.js | 3008 |
| `legal-service` | Documentation | Node.js | 3009 |
| `amc-service` | Subscriptions | Node.js | 3010 |
| `partner-service` | B2B partner mgmt | Node.js | 3011 |
| `payment-service` | Payments, escrow | Node.js | 3012 |
| `notification-service` | SMS/Email/WA/Push | Node.js | 3013 |
| `cms-service` | Content management | Node.js | 3014 |
| `ai-service` | Valuation, matching | Python | 8001 |
| `analytics-service` | Events, reporting | Node.js | 3015 |
| `admin-bff` | Admin-specific BFF | Node.js | 3016 |
| `search-service` | Elasticsearch proxy | Node.js | 3017 |
| `file-service` | Upload, OCR, CDN | Node.js | 3018 |
| `chat-service` | Real-time chat | Node.js + WS | 3019 |

---

## 1.3 Technology Stack (Final)

### Frontend

| Component | Technology | Version | Rationale |
|-----------|-----------|---------|-----------|
| Website | Next.js | 14.x | SSR/SSG for SEO, PWA support |
| B2C Mobile App | React Native | 0.74.x | Cross-platform (iOS + Android) |
| B2B Mobile App | React Native | 0.74.x | Shared codebase with B2C |
| Admin Panel | Next.js (App Router) | 14.x | SPA-like with server actions |
| State Management | Zustand + React Query | Latest | Lightweight, server-state |
| Styling | Tailwind CSS + Custom DS | 3.x | Rapid, consistent styling |
| Charts | Recharts + D3.js | Latest | Rich data visualization |
| Maps | Google Maps JS SDK | Latest | Property geolocation |
| Form Handling | React Hook Form + Zod | Latest | Validation & performance |
| Animation | Framer Motion | Latest | Premium micro-animations |
| Rich Text | Tiptap (ProseMirror) | Latest | CMS WYSIWYG editor |

### Backend

| Component | Technology | Version | Rationale |
|-----------|-----------|---------|-----------|
| API Framework | Express.js / Fastify | Latest | Performance-critical APIs |
| API Language | TypeScript | 5.x | Type safety, DX |
| Auth | Passport.js + JWT | Latest | Flexible auth strategies |
| Validation | Joi / Zod | Latest | Request validation |
| ORM | Prisma | 5.x | PostgreSQL type-safe ORM |
| Queue | BullMQ + Redis | Latest | Job processing |
| WebSockets | Socket.IO | 4.x | Real-time features |
| AI / ML | FastAPI + Python | 3.11 | Valuation, matching models |
| ML Libraries | Scikit-learn, TensorFlow | Latest | Model training |
| Search | Elasticsearch | 8.x | Full-text property search |
| Cache | Redis | 7.x | Session, rate limit, cache |

### Database

| Database | Usage | Instance |
|----------|-------|----------|
| PostgreSQL 16 | Primary relational data | AWS RDS Multi-AZ |
| MongoDB 7 | Documents, analytics events | AWS DocumentDB |
| Redis 7 | Cache, sessions, queues | AWS ElastiCache |
| Elasticsearch 8 | Property search, full-text | AWS OpenSearch |

### External Services

| Service | Purpose | Provider |
|---------|---------|---------|
| SMS OTP | Authentication | MSG91 / Fast2SMS |
| WhatsApp | Messaging, OTP | Meta WhatsApp Cloud API |
| Email | Transactional/Marketing | AWS SES + SendGrid |
| Push Notifications | Mobile app alerts | Firebase FCM |
| Web Push | Browser notifications | Web Push (VAPID) |
| Payment Gateway | Payments | Razorpay |
| Escrow | Secure transactions | Escrowpay / Razorpay |
| KYC / eSign | Document verification | Digio |
| OCR | Document text extraction | Google Vision API |
| Maps | Location services | Google Maps API |
| Maps (India) | Alternative maps | MapMyIndia |
| CDN | Static assets | AWS CloudFront |
| File Storage | Media uploads | AWS S3 |
| Real-time DB | Live updates | Firebase Firestore |
| Analytics | User behaviour | GA4 + Firebase |
| Heatmaps | UX insights | Microsoft Clarity |
| Error Tracking | Bug monitoring | Sentry |
| Uptime Monitoring | Health checks | Datadog / UptimeRobot |

---

## 1.4 Environment Strategy

| Environment | Purpose | Domain |
|-------------|---------|--------|
| `development` | Local dev | localhost |
| `staging` | QA, UAT | staging.roofridge.in |
| `preview` | PR previews | preview-{id}.roofridge.in |
| `production` | Live platform | roofridge.in |

### Environment Variables Structure (`.env.example`)

```env
# Application
NODE_ENV=production
APP_PORT=3000
APP_SECRET=<secret>
FRONTEND_URL=https://roofridge.in

# Database
DATABASE_URL=postgresql://user:pass@host:5432/roofridge
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/roofridge
REDIS_URL=redis://user:pass@host:6379

# Elasticsearch
ELASTICSEARCH_URL=https://search.roofridge.in
ELASTICSEARCH_API_KEY=<key>

# AWS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_S3_BUCKET=roofridge-media
AWS_CLOUDFRONT_URL=https://cdn.roofridge.in

# Firebase
FIREBASE_PROJECT_ID=roofridge-prod
FIREBASE_SERVICE_ACCOUNT_KEY=<json>

# Auth
JWT_ACCESS_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=30d

# OTP / SMS
MSG91_API_KEY=<key>
MSG91_SENDER_ID=RFRDIG
MSG91_TEMPLATE_OTP=<template_id>
MSG91_TEMPLATE_BOOKING=<template_id>

# WhatsApp (Meta)
META_WHATSAPP_TOKEN=<token>
META_WHATSAPP_PHONE_ID=<id>
META_WHATSAPP_VERIFY_TOKEN=<verify_token>

# Email (AWS SES)
AWS_SES_FROM_EMAIL=noreply@roofridge.in
AWS_SES_REGION=ap-south-1

# Payment
RAZORPAY_KEY_ID=<key>
RAZORPAY_KEY_SECRET=<secret>
RAZORPAY_WEBHOOK_SECRET=<secret>

# KYC / eSign
DIGIO_CLIENT_ID=<id>
DIGIO_CLIENT_SECRET=<secret>
DIGIO_ENVIRONMENT=production

# Maps
GOOGLE_MAPS_API_KEY=<key>
MAPMYINDIA_API_KEY=<key>

# AI Service
AI_SERVICE_URL=https://ai.roofridge.in
AI_SERVICE_API_KEY=<key>

# Rate Limiting
RATE_LIMIT_OTP_PER_HOUR=3
RATE_LIMIT_API_PER_MINUTE=60
RATE_LIMIT_SEARCH_PER_MINUTE=30

# Encryption
ENCRYPTION_KEY=<aes-256-key>
ENCRYPTION_IV=<iv>

# CIBIL / Credit
CIBIL_API_KEY=<key>
CIBIL_API_URL=https://api.cibil.com

# Analytics
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=<secret>

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
DATADOG_API_KEY=<key>
```

---

## 1.5 API Gateway Configuration

### 1.5.1 Gateway Responsibilities
- **Authentication**: Validate JWT on all protected routes
- **Rate Limiting**: Per-IP, per-user, per-endpoint limits
- **Request Routing**: Route to correct microservice
- **Request/Response Logging**: All requests logged to CloudWatch
- **CORS**: Configured per environment
- **Compression**: gzip/brotli on all responses
- **SSL Termination**: TLS 1.3 termination at gateway

### 1.5.2 Base URL Structure

```
Production:  https://api.roofridge.in/v1/
Staging:     https://api-staging.roofridge.in/v1/
Development: http://localhost:3000/v1/
```

### 1.5.3 Standard API Response Envelope

```json
// Success Response
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "timestamp": "2026-07-23T14:35:04+05:30",
  "requestId": "req_abc123xyz"
}

// Error Response
{
  "success": false,
  "statusCode": 422,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "mobile",
        "message": "Mobile number must be 10 digits",
        "code": "INVALID_FORMAT"
      }
    ]
  },
  "timestamp": "2026-07-23T14:35:04+05:30",
  "requestId": "req_abc123xyz"
}
```

### 1.5.4 Standard HTTP Status Codes

| Code | When Used |
|------|-----------|
| `200` | Success — GET, PUT, PATCH |
| `201` | Created — POST |
| `204` | No Content — DELETE |
| `400` | Bad Request — malformed syntax |
| `401` | Unauthorized — missing/invalid auth |
| `403` | Forbidden — insufficient permissions |
| `404` | Not Found — resource doesn't exist |
| `409` | Conflict — duplicate resource |
| `422` | Unprocessable Entity — validation error |
| `429` | Too Many Requests — rate limit exceeded |
| `500` | Internal Server Error |
| `502` | Bad Gateway — upstream failure |
| `503` | Service Unavailable — maintenance |

---

## 1.6 Authentication Architecture

### 1.6.1 Token Strategy

```
┌──────────────────────────────────────────────┐
│              Auth Flow                        │
│                                              │
│  User sends OTP → Verify → Issue Tokens     │
│                                              │
│  Access Token (JWT)    → 15 minutes TTL      │
│  Refresh Token (JWT)   → 30 days TTL         │
│  Refresh Token stored  → Redis + DB          │
│                                              │
│  On Access Token Expiry:                    │
│    POST /auth/refresh with Refresh Token     │
│    → New Access Token issued                 │
│                                              │
│  On Refresh Token Expiry:                   │
│    Full re-authentication required           │
└──────────────────────────────────────────────┘
```

### 1.6.2 JWT Payload Structure

```json
// Access Token Payload
{
  "sub": "usr_abc123",
  "role": "buyer",
  "partner_type": null,
  "mobile": "+919876543210",
  "kyc_verified": true,
  "city": "Delhi",
  "iat": 1753267504,
  "exp": 1753268404,
  "jti": "jwt_unique_id"
}

// Admin Access Token Payload
{
  "sub": "adm_xyz789",
  "role": "admin",
  "admin_role": "operations",
  "permissions": ["property.moderate", "booking.manage"],
  "iat": 1753267504,
  "exp": 1753268404,
  "jti": "jwt_unique_id"
}
```

---

## 1.7 Data Flow Diagrams

### 1.7.1 Property Search Data Flow

```
User Types Search Query
        │
        ▼
  Next.js Client
  (Debounce 300ms)
        │
        ▼
  GET /v1/properties/search
  ?q=3bhk+delhi&city=delhi
  &type=flat&min=5000000
        │
        ▼
  API Gateway
  (Rate limit, Auth optional)
        │
        ▼
  search-service
        │
        ├──► Elasticsearch Query
        │    (Full-text + Geo)
        │
        ├──► Redis Cache Check
        │    (Cache key: query hash)
        │
        ▼
  Results Aggregated
        │
        ├──► Personalization (if auth)
        │    ai-service → re-rank results
        │
        ▼
  Response Assembled
  (properties + meta + filters)
        │
        ▼
  analytics-service
  (Log search event)
        │
        ▼
  User sees results
  (< 200ms target)
```

### 1.7.2 Lead Capture & Routing Flow

```
User Submits Quick Finder
        │
        ▼
POST /v1/leads/capture
{mobile, intent, city, budget}
        │
        ▼
  lead-service
        │
        ├──► Save to DB (leads table)
        │    Status: NEW
        │
        ├──► AI Lead Scoring
        │    Score: Hot/Warm/Cold
        │
        ├──► Routing Engine
        │    Match by: city + category
        │    Assign to: staff / partner
        │
        ├──► Notify Assigned Staff
        │    WebSocket + Push Notif.
        │
        ├──► WhatsApp Auto-Reply
        │    to User: "We'll call you soon"
        │
        ▼
  Lead visible in Admin CRM
  Real-time in staff dashboard
```

---

## 1.8 Caching Strategy

| Data Type | Cache Layer | TTL | Invalidation |
|-----------|-------------|-----|--------------|
| Property search results | Redis | 60s | On listing change |
| Property detail | Redis | 300s | On listing edit |
| City/locality list | Redis | 3600s | On admin update |
| User session | Redis | 1800s | On logout |
| Partner plans | Redis | 86400s | On admin update |
| Homepage CMS content | Redis | 3600s | On CMS publish |
| Calculator rates | Redis | 86400s | On admin update |
| Lead scores | Redis | 300s | On re-score |
| FAQ content | Redis | 86400s | On admin update |
| Blog posts | CDN (CloudFront) | 300s | On publish |
| Static assets | CDN | 365d | On deploy |

---

## 1.9 Queue Architecture (BullMQ)

| Queue Name | Workers | Purpose | Retry Policy |
|------------|---------|---------|--------------|
| `notification.sms` | 5 | Send SMS via MSG91 | 3 retries, exp. backoff |
| `notification.email` | 5 | Send emails via SES | 3 retries, exp. backoff |
| `notification.whatsapp` | 5 | Send WA messages | 3 retries, 5min delay |
| `notification.push` | 10 | Firebase FCM push | 2 retries |
| `lead.score` | 3 | AI lead scoring | 2 retries |
| `lead.route` | 3 | Lead assignment | 3 retries |
| `file.ocr` | 3 | Document OCR | 2 retries |
| `file.compress` | 5 | Image compression | 1 retry |
| `payment.webhook` | 5 | Process payments | 5 retries |
| `report.generate` | 2 | Generate CSV/PDF | 1 retry |
| `ai.valuation` | 2 | Compute valuation | 2 retries |
| `search.index` | 3 | Elasticsearch sync | 3 retries |
| `audit.log` | 5 | Write audit logs | 1 retry |

---

## 1.10 Cron Jobs Schedule

| Job Name | Schedule | Description |
|----------|----------|-------------|
| `daily-lead-followup-reminder` | `0 9 * * *` | Remind staff of pending leads |
| `amc-renewal-reminder` | `0 10 * * *` | Remind users 7/3/1 days before expiry |
| `loan-application-stale-check` | `0 11 * * *` | Flag applications > 7 days inactive |
| `listing-expiry-reminder` | `0 8 * * *` | Alert owners 7 days before listing expires |
| `property-price-trend-update` | `0 2 * * *` | Re-run AI price trend models |
| `sitemap-generate` | `0 3 * * *` | Regenerate XML sitemap |
| `partner-payout-process` | `0 0 1 * *` | Monthly commission payout |
| `complaint-sla-check` | `*/30 * * * *` | Check overdue complaints every 30 min |
| `booking-sla-check` | `*/15 * * * *` | Check delayed bookings every 15 min |
| `analytics-daily-rollup` | `0 1 * * *` | Aggregate yesterday's analytics |
| `featured-listing-refresh` | `0 */6 * * *` | Refresh homepage featured listings |
| `lead-score-batch` | `*/5 * * * *` | Batch re-score cold leads |
| `db-backup` | `0 4 * * *` | Trigger RDS snapshot |
| `redis-cleanup` | `0 5 * * *` | Clear expired Redis keys |
| `search-index-sync` | `*/10 * * * *` | Sync ES with DB changes |

---

## 1.11 Event-Driven Architecture

### Domain Events

```typescript
// Event Types
enum DomainEvents {
  // User Events
  USER_REGISTERED = 'user.registered',
  USER_KYC_COMPLETED = 'user.kyc.completed',
  USER_DELETED = 'user.deleted',

  // Property Events
  PROPERTY_CREATED = 'property.created',
  PROPERTY_APPROVED = 'property.approved',
  PROPERTY_REJECTED = 'property.rejected',
  PROPERTY_VIEWED = 'property.viewed',
  PROPERTY_ENQUIRY = 'property.enquiry',
  PROPERTY_SOLD = 'property.sold',

  // Lead Events
  LEAD_CREATED = 'lead.created',
  LEAD_ASSIGNED = 'lead.assigned',
  LEAD_STATUS_CHANGED = 'lead.status.changed',
  LEAD_CONVERTED = 'lead.converted',
  LEAD_LOST = 'lead.lost',

  // Booking Events
  BOOKING_CREATED = 'booking.created',
  BOOKING_ASSIGNED = 'booking.assigned',
  BOOKING_ACCEPTED = 'booking.accepted',
  BOOKING_STARTED = 'booking.started',
  BOOKING_COMPLETED = 'booking.completed',
  BOOKING_CANCELLED = 'booking.cancelled',
  BOOKING_RATED = 'booking.rated',

  // Payment Events
  PAYMENT_INITIATED = 'payment.initiated',
  PAYMENT_SUCCESS = 'payment.success',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_REFUNDED = 'payment.refunded',

  // Partner Events
  PARTNER_APPLIED = 'partner.applied',
  PARTNER_APPROVED = 'partner.approved',
  PARTNER_REJECTED = 'partner.rejected',
  PARTNER_SUSPENDED = 'partner.suspended',

  // Subscription Events
  SUBSCRIPTION_STARTED = 'subscription.started',
  SUBSCRIPTION_RENEWED = 'subscription.renewed',
  SUBSCRIPTION_EXPIRED = 'subscription.expired',

  // Loan Events
  LOAN_APPLICATION_SUBMITTED = 'loan.application.submitted',
  LOAN_APPROVED = 'loan.approved',
  LOAN_DISBURSED = 'loan.disbursed',

  // Complaint Events
  COMPLAINT_RAISED = 'complaint.raised',
  COMPLAINT_RESOLVED = 'complaint.resolved',
  COMPLAINT_ESCALATED = 'complaint.escalated',
}
```

### Event Consumers

| Event | Consumers |
|-------|-----------|
| `user.registered` | notification-service (welcome SMS+email), analytics-service |
| `property.approved` | notification-service (owner alert), search-service (index), analytics-service |
| `lead.created` | lead-service (score+route), notification-service (staff alert), analytics-service |
| `booking.created` | notification-service (user+partner), payment-service |
| `booking.completed` | notification-service (review prompt), analytics-service, payment-service (commission) |
| `payment.success` | booking-service (confirm), partner-service (log earnings), notification-service |
| `complaint.escalated` | notification-service (manager alert), analytics-service |

---

*Continue to VOL-02 — Design System & UI Standards*
