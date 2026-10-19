# VOL-04: Backend Architecture & API Specification
## Roof Ridge — Enterprise Software Blueprint

---

## 4.1 Backend Folder Structure

```
roof-ridge-api/
├── src/
│   ├── config/
│   │   ├── database.ts          # PostgreSQL + MongoDB connections
│   │   ├── redis.ts             # Redis client
│   │   ├── elasticsearch.ts     # Elasticsearch client
│   │   ├── firebase.ts          # Firebase admin SDK
│   │   ├── queue.ts             # BullMQ setup
│   │   └── env.ts               # Environment validation (Zod)
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── admin-auth.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── cors.middleware.ts
│   │   ├── logging.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── audit.middleware.ts  # Auto audit log generation
│   │   └── permission.middleware.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.dto.ts
│   │   │   └── auth.events.ts
│   │   │
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.dto.ts
│   │   │   └── user.events.ts
│   │   │
│   │   ├── properties/
│   │   │   ├── property.controller.ts
│   │   │   ├── property.service.ts
│   │   │   ├── property.repository.ts
│   │   │   ├── property.search.service.ts   # Elasticsearch integration
│   │   │   ├── property.routes.ts
│   │   │   ├── property.dto.ts
│   │   │   └── property.events.ts
│   │   │
│   │   ├── leads/
│   │   ├── bookings/
│   │   ├── materials/
│   │   ├── loans/
│   │   ├── insurance/
│   │   ├── legal/
│   │   ├── amc/
│   │   ├── partners/
│   │   ├── payments/
│   │   ├── notifications/
│   │   ├── cms/
│   │   ├── analytics/
│   │   ├── admin/
│   │   ├── ai/
│   │   ├── files/
│   │   ├── chat/
│   │   └── webhooks/
│   │
│   ├── shared/
│   │   ├── types/              # Shared TypeScript types
│   │   ├── utils/              # Helper functions
│   │   │   ├── crypto.util.ts  # AES-256 encryption/decryption
│   │   │   ├── otp.util.ts     # OTP generation
│   │   │   ├── slug.util.ts    # URL slug generation
│   │   │   ├── phone.util.ts   # Phone number normalization
│   │   │   ├── currency.util.ts
│   │   │   ├── pagination.util.ts
│   │   │   └── date.util.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── phone.validator.ts
│   │   │   ├── pan.validator.ts
│   │   │   ├── aadhaar.validator.ts
│   │   │   ├── gstin.validator.ts
│   │   │   └── rera.validator.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── error-codes.ts
│   │   │   ├── status-codes.ts
│   │   │   └── enums.ts
│   │   │
│   │   └── decorators/
│   │       ├── auth.decorator.ts
│   │       ├── permission.decorator.ts
│   │       └── audit.decorator.ts
│   │
│   ├── events/
│   │   ├── event-bus.ts        # EventEmitter2 setup
│   │   └── handlers/           # Domain event handlers
│   │
│   ├── jobs/                   # BullMQ job processors
│   │   ├── notification.job.ts
│   │   ├── lead-score.job.ts
│   │   ├── file-ocr.job.ts
│   │   ├── report-generate.job.ts
│   │   └── search-index.job.ts
│   │
│   ├── cron/                   # Cron job definitions
│   │   ├── lead-followup.cron.ts
│   │   ├── amc-renewal.cron.ts
│   │   ├── sitemap.cron.ts
│   │   └── ...
│   │
│   ├── websocket/
│   │   ├── socket.server.ts    # Socket.IO setup
│   │   ├── booking.socket.ts   # Real-time booking updates
│   │   ├── chat.socket.ts      # Real-time chat
│   │   └── lead.socket.ts      # Real-time lead notifications
│   │
│   └── app.ts                  # Express app entry point
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/                    # Dev/deploy utility scripts
├── docs/                       # OpenAPI/Swagger docs
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---

## 4.2 Domain-Driven Design Principles

### Service Layer Pattern

```typescript
// Every module follows this pattern:

// 1. Controller — HTTP request/response only
class PropertyController {
  async searchProperties(req: Request, res: Response) {
    const dto = await validateDto(PropertySearchDto, req.query);
    const result = await this.propertyService.search(dto, req.user);
    return res.json(successResponse(result));
  }
}

// 2. Service — Business logic
class PropertyService {
  async search(dto: PropertySearchDto, user?: User) {
    // Business logic: check permissions, apply business rules
    const results = await this.propertyRepository.search(dto);
    if (user) {
      results = await this.personalizationService.rerank(results, user);
    }
    await this.analyticsService.trackSearch(dto, user);
    return results;
  }
}

// 3. Repository — Database access only
class PropertyRepository {
  async search(dto: PropertySearchDto) {
    return await this.elasticsearch.search(buildSearchQuery(dto));
  }
}
```

---

## 4.3 Authentication APIs

### POST /v1/auth/otp/send

**Purpose:** Send OTP to mobile number for login/registration  
**Auth:** None  
**Rate Limit:** 3 per mobile per hour

**Request:**
```json
{
  "mobile": "9876543210",
  "purpose": "login",
  "channel": "sms"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| mobile | string | ✅ | 10 digits, Indian mobile number |
| purpose | enum | ✅ | login \| register \| kyc |
| channel | enum | ❌ | sms (default) \| whatsapp |

**Backend Process:**
1. Normalize mobile number (strip +91, country code)
2. Check rate limit: max 3 OTPs per mobile per hour in Redis
3. If rate limit hit: return `429` with retry-after header
4. Generate 6-digit OTP (cryptographically random)
5. Hash OTP with bcrypt (cost=10)
6. Save to `otp_requests` with 5-minute expiry
7. Queue SMS delivery via `notification.sms` queue
8. If channel=whatsapp: queue via `notification.whatsapp`
9. Return success (never return OTP in response — security)

**Response Success:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OTP sent successfully",
  "data": {
    "otp_request_id": "uuid",
    "expires_in": 300,
    "resend_available_after": 30,
    "masked_mobile": "987*****10"
  }
}
```

**Error Responses:**
```json
// Rate limit exceeded
{ "success": false, "statusCode": 429, "error": { "code": "OTP_RATE_LIMIT", "message": "Too many OTP requests. Try again after 47 minutes." } }

// Invalid mobile
{ "success": false, "statusCode": 422, "error": { "code": "INVALID_MOBILE", "message": "Please enter a valid 10-digit mobile number." } }
```

---

### POST /v1/auth/otp/verify

**Purpose:** Verify OTP and issue JWT tokens  
**Auth:** None

**Request:**
```json
{
  "mobile": "9876543210",
  "otp": "123456",
  "purpose": "login"
}
```

**Backend Process:**
1. Find latest unused OTP for this mobile with this purpose
2. Check expiry (5 minutes)
3. Check attempt count (max 3 wrong attempts before invalidation)
4. Compare OTP with hash (bcrypt compare)
5. If wrong: increment attempt_count, return error
6. If max attempts: mark OTP as expired, return lockout error
7. Mark OTP as used
8. Check if user exists for this mobile
9. If new user: create user record with `mobile_verified=true`
10. If existing user: update `last_login_at`
11. Generate Access Token (JWT, 15 min)
12. Generate Refresh Token (JWT, 30 days)
13. Save refresh token to `sessions` table and Redis
14. Fire `user.registered` event (if new user)
15. Return tokens + user data

**Response Success (New User):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiJ9...",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "usr_abc123",
      "mobile": "9876543210",
      "is_new_user": true,
      "needs_profile_completion": true,
      "kyc_status": "pending"
    }
  }
}
```

**Response Success (Existing User):**
```json
{
  "success": true,
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "user": {
      "id": "usr_abc123",
      "full_name": "Rahul Sharma",
      "mobile": "9876543210",
      "city": "Delhi",
      "is_new_user": false,
      "kyc_status": "verified",
      "profile_completion_pct": 85
    }
  }
}
```

---

### POST /v1/auth/refresh

**Purpose:** Refresh expired access token  
**Auth:** Refresh token in body

**Request:**
```json
{ "refresh_token": "eyJhbGciOiJIUzI1NiJ9..." }
```

**Backend Process:**
1. Verify refresh token JWT signature
2. Check if token exists in Redis (not invalidated)
3. Check `sessions` table for validity
4. If valid: generate new access token
5. Optionally rotate refresh token (sliding expiry)
6. Return new access token

---

### POST /v1/auth/logout

**Purpose:** Invalidate session  
**Auth:** Required (access token)

**Backend Process:**
1. Verify access token
2. Delete refresh token from Redis
3. Mark session as invalid in `sessions` table
4. Return success

---

## 4.4 User APIs

### GET /v1/users/profile

**Purpose:** Get current user's profile  
**Auth:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "mobile": "9876543210",
    "email": "rahul@example.com",
    "full_name": "Rahul Sharma",
    "profile_photo_url": "https://cdn.roofridge.in/...",
    "city": "Delhi",
    "locality": "Dwarka",
    "user_type": "buyer",
    "kyc_status": "verified",
    "wallet_balance": 500.00,
    "referral_code": "RAHUL2026",
    "active_subscriptions": [
      {
        "plan_name": "Plumbing AMC Annual",
        "expires_at": "2027-07-01T00:00:00Z"
      }
    ],
    "stats": {
      "saved_properties": 5,
      "active_enquiries": 2,
      "active_bookings": 1
    },
    "notification_preferences": {
      "sms": true,
      "email": true,
      "whatsapp": true,
      "push": true
    }
  }
}
```

---

### PATCH /v1/users/profile

**Purpose:** Update user profile  
**Auth:** Required

**Request:**
```json
{
  "full_name": "Rahul Sharma",
  "email": "rahul@example.com",
  "date_of_birth": "1990-05-15",
  "gender": "male",
  "city": "Delhi",
  "locality": "Dwarka Sector 12",
  "address": "Flat 401, Tower B, XYZ Apartments",
  "user_type": "buyer",
  "budget_min": 5000000,
  "budget_max": 15000000,
  "preferred_cities": ["Delhi", "Gurgaon"],
  "notification_preferences": {
    "sms": true,
    "email": true,
    "whatsapp": true,
    "push": false
  }
}
```

**Validation Rules:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| full_name | string | ❌ | 2-100 chars, letters/spaces only |
| email | string | ❌ | Valid email format |
| date_of_birth | date | ❌ | Must be 18+ years |
| gender | enum | ❌ | male/female/other/prefer_not_to_say |
| city | string | ❌ | Max 100 chars |
| budget_min | integer | ❌ | Min 100000 (1L) |
| budget_max | integer | ❌ | Must be > budget_min |

---

### POST /v1/users/kyc/submit

**Purpose:** Submit KYC documents  
**Auth:** Required  
**Rate Limit:** 5 per user per day

**Request:** Multipart form data
```
aadhaar_front: File (image/jpeg, image/png, application/pdf, max 5MB)
aadhaar_back:  File
pan:           File
aadhaar_number: "123412341234" (last 4 digits visible)
pan_number:    "ABCDE1234F"
```

**Validation:**
- Aadhaar: 12 digits, no spaces
- PAN: Regex `[A-Z]{5}[0-9]{4}[A-Z]{1}`
- File types: JPEG, PNG, PDF
- File size: Max 5MB per file
- Must upload at minimum: 1 ID proof (Aadhaar or PAN)

**Backend Process:**
1. Validate file types and sizes
2. Upload files to S3 (`/kyc/{user_id}/`)
3. Encrypt Aadhaar number (AES-256) before storing
4. Encrypt PAN number (AES-256) before storing
5. Queue OCR via `file.ocr` queue (Google Vision API)
6. Create `kyc_documents` records
7. Update user `kyc_status` to `submitted`
8. Notify admin (new KYC for review)
9. Fire `user.kyc.submitted` event

---

## 4.5 Property APIs

### GET /v1/properties/search

**Purpose:** Search and filter property listings  
**Auth:** Optional (affects personalization)  
**Rate Limit:** 30 req/min per IP

**Query Parameters:**
```
q           string    Free-text search
city        string    City name
locality    string    Locality name
type        enum      sale|rent|pg|commercial
property_type enum   flat|villa|plot|commercial_office|...
bhk         string   1|2|3|4|4+|studio (comma-separated)
min_price   integer  Minimum price (INR)
max_price   integer  Maximum price (INR)
min_area    decimal  Minimum area (sqft)
max_area    decimal  Maximum area (sqft)
furnishing  enum     fully_furnished|semi_furnished|unfurnished
amenities   string   parking,gym,lift (comma-separated)
verified    boolean  Only verified listings
lat         decimal  User's latitude (for nearby search)
lng         decimal  User's longitude
radius      integer  Search radius in KM (default: 5)
sort        enum     newest|price_asc|price_desc|relevant|verified_first
page        integer  Page number (default: 1)
limit       integer  Results per page (default: 20, max: 50)
```

**Backend Process:**
1. Validate query parameters
2. Build Elasticsearch query with filters
3. Check Redis cache (key: MD5 hash of query params)
4. If cache hit: return cached results
5. Execute Elasticsearch query
6. If user authenticated: apply AI personalization re-ranking
7. Fetch enriched data from PostgreSQL (status, pricing, partner info)
8. Cache results (60s TTL)
9. Track search event in analytics

**Response:**
```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "prop_xyz789",
        "slug": "3-bhk-flat-dwarka-12345",
        "listing_type": "sale",
        "property_type": "flat",
        "title": "Spacious 3 BHK in Dwarka Sector 12",
        "price": 8500000,
        "price_per_sqft": 6800,
        "bhk_type": "3BHK",
        "super_built_up_area": 1250,
        "city": "Delhi",
        "locality": "Dwarka Sector 12",
        "facing": "east",
        "furnishing_status": "semi_furnished",
        "primary_photo_url": "https://cdn.roofridge.in/...",
        "photos_count": 12,
        "is_verified": true,
        "is_featured": false,
        "is_rera_verified": false,
        "age_of_property": "1-5years",
        "amenities": ["parking", "lift", "security"],
        "emi_min": 42500,
        "ai_price_confidence": 87.5,
        "listed_by": {
          "type": "dealer",
          "name": "ABC Properties",
          "rating": 4.5,
          "is_verified": true
        },
        "listed_at": "2026-07-20T10:00:00Z",
        "latitude": 28.5921,
        "longitude": 77.0669
      }
    ]
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 347,
    "total_pages": 18,
    "applied_filters": {
      "city": "Delhi",
      "type": "sale",
      "min_price": 5000000,
      "max_price": 12000000
    },
    "available_filters": {
      "bhk_counts": { "2BHK": 85, "3BHK": 120, "4BHK": 45 },
      "price_range": { "min": 3500000, "max": 45000000 },
      "localities": [
        { "name": "Dwarka Sector 12", "count": 45 },
        { "name": "Dwarka Sector 10", "count": 38 }
      ]
    }
  }
}
```

---

### GET /v1/properties/:slug

**Purpose:** Get property listing detail  
**Auth:** Optional  
**Rate Limit:** 60 req/min per IP

**Backend Process:**
1. Look up listing by slug
2. Check Redis cache (key: `property:{slug}`, TTL 300s)
3. If found: return cached data
4. If not found: return 404
5. Record property view asynchronously
6. Increment view count (batch update, not per-request)
7. Fetch AI price trend data
8. Fetch similar properties (AI recommendation)
9. If user authenticated: check if saved, previous enquiries

**Response (abbreviated):**
```json
{
  "success": true,
  "data": {
    "id": "prop_xyz789",
    "slug": "3-bhk-flat-dwarka-12345",
    "listing_type": "sale",
    "property_type": "flat",
    "title": "Spacious 3 BHK in Dwarka Sector 12",
    "description": "...",
    "price": 8500000,
    "price_per_sqft": 6800,
    "price_negotiable": true,
    "bhk_type": "3BHK",
    "bedrooms": 3,
    "bathrooms": 2,
    "balconies": 2,
    "super_built_up_area": 1250,
    "carpet_area": 980,
    "floor_number": 4,
    "total_floors": 12,
    "age_of_property": "1-5years",
    "facing": "east",
    "furnishing_status": "semi_furnished",
    "rera_number": "RERA/DL/GRP/OTHERS/2022/52",
    "rera_verified": true,
    "city": "Delhi",
    "locality": "Dwarka Sector 12",
    "address": "Tower B, XYZ Heights",
    "pincode": "110075",
    "latitude": 28.5921,
    "longitude": 77.0669,
    "photos": ["https://cdn.roofridge.in/..."],
    "video_url": null,
    "virtual_tour_url": "https://tour.roofridge.in/prop_xyz789",
    "floor_plan_url": null,
    "amenities": ["parking", "lift", "security", "power_backup"],
    "nearby_facilities": {
      "schools": ["DPS Dwarka (1.2km)", "Ryan International (2.1km)"],
      "hospitals": ["Venkateshwar Hospital (3km)"],
      "transit": ["Dwarka Sector 10 Metro (800m)"],
      "markets": ["V3S Mall (1.5km)"]
    },
    "listed_by": {
      "type": "dealer",
      "id": "partner_abc123",
      "name": "ABC Properties",
      "company": "ABC Real Estate Pvt Ltd",
      "photo": "https://cdn.roofridge.in/...",
      "rating": 4.5,
      "reviews_count": 23,
      "is_verified": true,
      "experience_years": 8,
      "masked_mobile": "987*****10",
      "properties_listed": 45
    },
    "ai_valuation": {
      "estimated_min": 8000000,
      "estimated_max": 9200000,
      "confidence": 87.5,
      "price_trend": "rising",
      "trend_pct_6m": 4.2
    },
    "similar_properties": [...],
    "user_context": {
      "is_saved": false,
      "previous_enquiry": null
    },
    "stats": {
      "views_today": 12,
      "saves": 8
    },
    "status": "live",
    "listed_at": "2026-07-20T10:00:00Z"
  }
}
```

---

### POST /v1/properties

**Purpose:** Create a new property listing  
**Auth:** Required (user or partner)  
**Rate Limit:** 10 per user per day

**Request:**
```json
{
  "listing_type": "sale",
  "property_type": "flat",
  "city": "Delhi",
  "locality": "Dwarka Sector 12",
  "sub_locality": "Block C",
  "address": "Flat 401, Tower B, XYZ Heights",
  "pincode": "110075",
  "latitude": 28.5921,
  "longitude": 77.0669,
  "bhk_type": "3BHK",
  "bedrooms": 3,
  "bathrooms": 2,
  "balconies": 2,
  "floor_number": 4,
  "total_floors": 12,
  "super_built_up_area": 1250,
  "carpet_area": 980,
  "area_unit": "sqft",
  "age_of_property": "1-5years",
  "facing": "east",
  "furnishing_status": "semi_furnished",
  "price": 8500000,
  "price_negotiable": true,
  "maintenance_charges": 3500,
  "rera_number": "RERA/DL/GRP/OTHERS/2022/52",
  "amenities": ["parking", "lift", "security", "power_backup"],
  "title": "Spacious 3 BHK in Dwarka Sector 12",
  "description": "Beautiful east-facing flat...",
  "highlights": ["Corner flat", "Vastu compliant", "Near metro"]
}
```

**Validation Rules:**
| Field | Required | Rules |
|-------|----------|-------|
| listing_type | ✅ | Enum check |
| property_type | ✅ | Enum check |
| city | ✅ | Max 100 chars |
| locality | ✅ | Max 200 chars |
| price | ✅ | Min 100000 |
| bhk_type | ✅ if residential | Enum check |
| super_built_up_area | ✅ | Min 1, Max 100000 |
| rera_number | ✅ if new project | Format: RERA/[STATE]/... |

**Backend Process:**
1. Validate all fields
2. Check user KYC status (must be `verified` to list)
3. Generate listing slug (city-bhk-locality-randomid)
4. Create listing in `draft` status
5. Queue AI valuation computation
6. Queue Elasticsearch indexing
7. Return listing ID and redirect URL for media upload

---

### POST /v1/properties/:id/photos

**Purpose:** Upload photos for a listing  
**Auth:** Required (listing owner)  
**Content-Type:** multipart/form-data  
**Max Files:** 20 per upload  
**Max Size:** 10MB per file

**Backend Process:**
1. Verify user is listing owner
2. Validate file types (JPEG, PNG, WebP, MP4 for videos)
3. Upload to S3 (`/properties/{listing_id}/`)
4. Queue image compression to WebP (max 200KB each)
5. Generate thumbnails (800×600, 400×300)
6. Update `photos` array in listing
7. Return uploaded file URLs

---

### POST /v1/properties/:id/submit

**Purpose:** Submit listing for review  
**Auth:** Required (listing owner)

**Backend Process:**
1. Check minimum photo count (≥ 5 required)
2. Check required fields are complete
3. Check KYC is verified
4. Update status: `draft` → `pending_review`
5. Notify admin (new listing for review)
6. Fire `property.submitted` event

---

### GET /v1/properties/search/autocomplete

**Purpose:** Fast autocomplete for search bar  
**Auth:** None  
**Rate Limit:** 60 req/min per IP

**Query:** `?q=dwarka&type=locality&limit=8`

**Response:**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      { "type": "locality", "name": "Dwarka", "city": "Delhi", "count": 345 },
      { "type": "locality", "name": "Dwarka Sector 12", "city": "Delhi", "count": 45 },
      { "type": "city", "name": "Dwarkadhish", "state": "Rajasthan", "count": 12 }
    ]
  }
}
```

---

## 4.6 Lead APIs

### POST /v1/leads/capture

**Purpose:** Capture a lead from any entry point  
**Auth:** Optional  
**Rate Limit:** 10 per IP per hour

**Request:**
```json
{
  "source": "homepage_quick_finder",
  "name": "Priya Mehta",
  "mobile": "9876543210",
  "city": "Mumbai",
  "category": "property_buy",
  "sub_category": "3BHK",
  "budget_min": 8000000,
  "budget_max": 15000000,
  "requirement_notes": "Looking in Andheri or Powai",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "mumbai-property-q3-2026",
  "landing_page_url": "https://roofridge.in/lp/property-mumbai"
}
```

**Validation:**
| Field | Required | Validation |
|-------|----------|------------|
| source | ✅ | Enum |
| mobile | ✅ | 10 digits Indian mobile |
| category | ✅ | Enum |
| city | ✅ | Max 100 chars |
| name | ❌ | 2-100 chars if provided |

**Backend Process:**
1. Validate fields
2. Check for duplicate: same mobile + same category in last 7 days
3. If duplicate: update existing lead (don't create new)
4. Generate lead_number (L-{YYYY}-{sequence})
5. Create lead in `new` status
6. Queue AI lead scoring (`lead.score` queue)
7. Queue lead routing (`lead.route` queue)
8. Queue WhatsApp acknowledgment to user
9. Fire `lead.created` event
10. Return lead ID

**Response:**
```json
{
  "success": true,
  "data": {
    "lead_id": "lead_abc123",
    "message": "Thank you! Our expert will contact you shortly.",
    "expected_callback_time": "Within 30 minutes"
  }
}
```

---

## 4.7 Booking APIs

### POST /v1/bookings

**Purpose:** Create a service booking  
**Auth:** Required

**Request:**
```json
{
  "booking_type": "on_demand_service",
  "service_category": "plumber",
  "service_sub_category": "pipe_leak_repair",
  "address": "Flat 301, Tower A, Green Park",
  "city": "Delhi",
  "locality": "Green Park",
  "pincode": "110016",
  "latitude": 28.5594,
  "longitude": 77.2076,
  "scheduled_at": "2026-07-25T10:00:00+05:30",
  "description": "Water is leaking from kitchen sink pipe",
  "photos": ["s3://roofridge-media/uploads/temp/abc123.jpg"]
}
```

**Validation:**
| Field | Required | Rules |
|-------|----------|-------|
| booking_type | ✅ | Enum |
| service_category | ✅ | Must be active category |
| address | ✅ | Min 10 chars |
| city | ✅ | Must be serviceable city |
| scheduled_at | ✅ | Future date, business hours (7AM–8PM) |

**Backend Process:**
1. Validate all fields
2. Check city is serviceable for this category
3. Check scheduled time is valid (future, business hours)
4. Find available partners for this category + city
5. Auto-assign to best-rated available partner (or queue for manual assignment)
6. Generate booking_number
7. Create booking in `pending` status
8. Create payment record (if advance required)
9. Notify user (booking created)
10. Notify assigned partner (new booking)
11. Fire `booking.created` event
12. Set SLA deadline (based on service category)

---

### PATCH /v1/bookings/:id/status

**Purpose:** Update booking status  
**Auth:** Required (partner for operational updates, user for cancellation)

**Request:**
```json
{
  "status": "in_progress",
  "notes": "Arrived at site, starting work",
  "latitude": 28.5594,
  "longitude": 77.2076
}
```

**Status Transitions (Partner):**
```
accepted → en_route → in_progress → completed
```

**Status Transitions (User):**
```
pending → cancelled_by_user (with reason)
```

**Status Transitions (Admin):**
```
Any status → Any status (with mandatory notes)
```

---

## 4.8 Payment APIs

### POST /v1/payments/initiate

**Purpose:** Create payment order with Razorpay  
**Auth:** Required

**Request:**
```json
{
  "payment_type": "service_booking",
  "booking_id": "booking_abc123",
  "coupon_code": "SAVE10"
}
```

**Backend Process:**
1. Calculate amount based on booking/order
2. Apply coupon if provided (validate, check eligibility)
3. Calculate GST
4. Create Razorpay order via server-side API call
5. Save to `payments` table with `initiated` status
6. Return Razorpay order ID and key to frontend

**Response:**
```json
{
  "success": true,
  "data": {
    "payment_id": "pay_abc123",
    "gateway": "razorpay",
    "gateway_order_id": "order_RzpAbc123",
    "razorpay_key_id": "rzp_live_xxx",
    "amount": 74900,         // In paise
    "currency": "INR",
    "breakdown": {
      "base_amount": 75000,
      "coupon_discount": 750,
      "gst": 12.42,
      "final_amount": 749.00
    }
  }
}
```

### POST /v1/payments/verify

**Purpose:** Verify Razorpay payment success  
**Auth:** Required

**Request:**
```json
{
  "payment_id": "pay_abc123",
  "razorpay_payment_id": "pay_RzpAbc123",
  "razorpay_order_id": "order_RzpAbc123",
  "razorpay_signature": "sha256hash"
}
```

**Backend Process:**
1. Verify HMAC SHA256 signature (Razorpay signature verification)
2. Update `payments` status to `success`
3. Update booking payment_status to `paid`
4. Reduce coupon usage count (if coupon used)
5. Add commission to partner earnings
6. Fire `payment.success` event
7. Send payment confirmation to user

---

### POST /v1/webhooks/razorpay

**Purpose:** Handle Razorpay webhook events  
**Auth:** Webhook signature verification  
**Note:** No JWT auth — uses Razorpay webhook secret

**Events Handled:**
- `payment.captured` → Mark payment successful
- `payment.failed` → Mark payment failed, notify user
- `refund.processed` → Mark refund complete
- `subscription.charged` → Update subscription status

---

## 4.9 Notification APIs

### POST /v1/notifications/send (Admin Only)

**Purpose:** Send bulk or targeted notification  
**Auth:** Admin required + `notification.send` permission

**Request:**
```json
{
  "target_type": "segment",
  "segment_filters": {
    "city": "Mumbai",
    "user_type": "buyer",
    "created_after": "2026-01-01"
  },
  "channels": ["push", "sms"],
  "template_id": "promotional_offer",
  "template_vars": {
    "offer_title": "Home Loan at 8.5% Interest",
    "cta_url": "https://roofridge.in/loans/home-loan/"
  },
  "schedule_for": null,   // null = send immediately
  "title": "Special Offer for Home Buyers",
  "body": "Get home loans starting at 8.5% interest. Apply now!"
}
```

---

## 4.10 Admin APIs

### GET /v1/admin/dashboard/stats

**Purpose:** Get real-time dashboard KPIs  
**Auth:** Admin required

**Response:**
```json
{
  "success": true,
  "data": {
    "today": {
      "new_users": 45,
      "new_listings": 23,
      "active_bookings": 87,
      "revenue": 142500,
      "new_leads": 156
    },
    "this_month": {
      "revenue": 4250000,
      "bookings_completed": 432,
      "new_partners": 18,
      "approvals_pending": 34
    },
    "realtime": {
      "online_users": 234,
      "active_bookings": 12,
      "pending_leads": 45
    },
    "api_health": {
      "payment_gateway": "healthy",
      "maps_api": "healthy",
      "whatsapp_api": "degraded",
      "sms_gateway": "healthy"
    }
  }
}
```

---

### GET /v1/admin/properties/moderation

**Purpose:** Get listings pending review  
**Auth:** Admin (operations or super_admin)  
**Filters:** status, city, property_type, date_range

**Response:**
```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "prop_xyz789",
        "title": "3 BHK Flat in Dwarka",
        "city": "Delhi",
        "listing_type": "sale",
        "price": 8500000,
        "listed_by": { "name": "Rahul Sharma", "kyc_status": "verified", "type": "user" },
        "photos_count": 8,
        "has_rera": true,
        "submitted_at": "2026-07-23T10:00:00Z",
        "waiting_hours": 4.5,
        "flags": []
      }
    ]
  },
  "meta": { "total": 34, "page": 1, "limit": 20 }
}
```

### PATCH /v1/admin/properties/:id/moderate

**Purpose:** Approve or reject a listing  
**Auth:** Admin (operations)

**Request:**
```json
{
  "action": "approve",
  "notes": "Listing verified. RERA number confirmed."
}
```

or

```json
{
  "action": "reject",
  "rejection_reason": "Property photos are unclear. Please upload high-quality photos.",
  "request_reupload": true,
  "reupload_note": "Please upload minimum 5 clear photos of interior and exterior."
}
```

**Backend Process (Approve):**
1. Update listing status to `live`
2. Set approved_by and approved_at
3. Index listing in Elasticsearch
4. Notify property owner (SMS + push)
5. Create audit log
6. Fire `property.approved` event

**Backend Process (Reject):**
1. Update listing status to `rejected`
2. Set rejection_reason
3. Notify property owner with reason + instructions
4. Create audit log
5. Fire `property.rejected` event

---

## 4.11 File Upload APIs

### POST /v1/files/upload

**Purpose:** Upload a file to S3  
**Auth:** Required  
**Content-Type:** multipart/form-data

**Request:**
```
file:     File binary
category: property_photo | kyc_document | profile_photo | booking_photo | product_image
context_id: (Optional) Related entity ID
```

**Validation:**
| Category | Allowed Types | Max Size |
|----------|--------------|---------|
| property_photo | JPEG, PNG, WebP, MP4 | 20MB |
| kyc_document | JPEG, PNG, PDF | 5MB |
| profile_photo | JPEG, PNG | 5MB |
| booking_photo | JPEG, PNG | 10MB |
| product_image | JPEG, PNG, WebP | 10MB |

**Backend Process:**
1. Validate file type and size
2. Sanitize filename
3. Generate unique S3 key
4. Upload to S3 with appropriate ACL
5. If image: queue compression to WebP
6. If kyc_document: queue OCR
7. Return CDN URL

**Response:**
```json
{
  "success": true,
  "data": {
    "file_id": "file_abc123",
    "url": "https://cdn.roofridge.in/properties/prop_xyz789/photo_1.webp",
    "thumbnail_url": "https://cdn.roofridge.in/properties/prop_xyz789/thumb_photo_1.webp",
    "file_size": 145680,
    "mime_type": "image/webp",
    "width": 1920,
    "height": 1080
  }
}
```

---

## 4.12 Chat APIs (Real-time via Socket.IO)

### Socket Events — Client to Server

```javascript
// Connect with auth
socket.auth = { token: 'JWT_ACCESS_TOKEN' };

// Join a conversation
socket.emit('chat:join', { 
  conversation_id: 'conv_abc123'  
});

// Send message
socket.emit('chat:message', {
  conversation_id: 'conv_abc123',
  content: 'Hello, is this property still available?',
  message_type: 'text'
});

// Typing indicator
socket.emit('chat:typing', { 
  conversation_id: 'conv_abc123',
  is_typing: true 
});
```

### Socket Events — Server to Client

```javascript
// New message received
socket.on('chat:new_message', (data) => {
  // { message_id, content, sender, timestamp }
});

// Message delivered
socket.on('chat:delivered', (data) => {
  // { message_id, delivered_at }
});

// Typing indicator
socket.on('chat:typing', (data) => {
  // { user_id, conversation_id, is_typing }
});

// Booking status update
socket.on('booking:status_update', (data) => {
  // { booking_id, new_status, partner_location }
});

// Lead assigned (Admin)
socket.on('lead:new', (data) => {
  // { lead_id, lead_number, category, city }
});
```

---

## 4.13 Rate Limiting Configuration

```typescript
// Global rate limits (per IP unless specified)
const rateLimits = {
  // Auth endpoints
  'POST /v1/auth/otp/send':     { windowMs: 3600000, max: 3, keyBy: 'body.mobile' },
  'POST /v1/auth/otp/verify':   { windowMs: 900000,  max: 10, keyBy: 'body.mobile' },
  
  // Search
  'GET /v1/properties/search':  { windowMs: 60000, max: 30 },
  'GET /v1/properties/*/autocomplete': { windowMs: 60000, max: 60 },
  
  // Lead capture
  'POST /v1/leads/capture':     { windowMs: 3600000, max: 10 },
  
  // File upload
  'POST /v1/files/upload':      { windowMs: 3600000, max: 50, keyBy: 'user.id' },
  
  // KYC
  'POST /v1/users/kyc/submit':  { windowMs: 86400000, max: 5, keyBy: 'user.id' },
  
  // General API
  'default':                    { windowMs: 60000, max: 60 }
};
```

---

## 4.14 Error Code Reference

| Error Code | HTTP | Description |
|------------|------|-------------|
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `AUTH_TOKEN_MISSING` | 401 | Authorization header not provided |
| `AUTH_TOKEN_INVALID` | 401 | JWT is malformed or invalid signature |
| `AUTH_TOKEN_EXPIRED` | 401 | Access token has expired |
| `AUTH_REFRESH_EXPIRED` | 401 | Refresh token has expired |
| `OTP_EXPIRED` | 422 | OTP has expired |
| `OTP_INVALID` | 422 | OTP is incorrect |
| `OTP_MAX_ATTEMPTS` | 422 | Too many wrong OTP attempts |
| `OTP_RATE_LIMIT` | 429 | Too many OTP requests |
| `RATE_LIMIT_EXCEEDED` | 429 | General rate limit exceeded |
| `PERMISSION_DENIED` | 403 | User lacks required permission |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource doesn't exist |
| `RESOURCE_CONFLICT` | 409 | Duplicate resource |
| `KYC_REQUIRED` | 403 | KYC verification required for this action |
| `LISTING_NOT_LIVE` | 403 | Listing is not in live status |
| `CITY_NOT_SERVICEABLE` | 422 | Service not available in this city |
| `SLOT_UNAVAILABLE` | 422 | Selected time slot is not available |
| `PAYMENT_FAILED` | 402 | Payment processing failed |
| `COUPON_INVALID` | 422 | Coupon code is invalid or expired |
| `COUPON_ALREADY_USED` | 422 | Coupon already used by this user |
| `INSUFFICIENT_WALLET` | 422 | Insufficient wallet balance |
| `FILE_TOO_LARGE` | 422 | Uploaded file exceeds size limit |
| `FILE_TYPE_INVALID` | 422 | File type not allowed |
| `SERVICE_UNAVAILABLE` | 503 | Downstream service is unavailable |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

*Continue to VOL-05 — Website: All Pages (Public)*
