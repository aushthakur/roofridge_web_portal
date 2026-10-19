# VOL-03: Database Architecture & ER Diagram
## Roof Ridge — Enterprise Software Blueprint

---

## 3.1 Database Strategy

### 3.1.1 Multi-Database Architecture

| Database | Engine | Use Case |
|----------|--------|----------|
| **Primary DB** | PostgreSQL 16 | All relational data: users, properties, leads, bookings, payments |
| **Document DB** | MongoDB 7 | Analytics events, AI model data, chat logs, flexible schema documents |
| **Search Engine** | Elasticsearch 8 | Full-text property search, autocomplete, geo-search |
| **Cache** | Redis 7 | Sessions, rate limiting, cache, queues (BullMQ) |
| **Real-time** | Firebase Firestore | Live booking status, chat messages, online presence |
| **File Store** | AWS S3 | Media files, documents, reports |

### 3.1.2 Naming Conventions

- **Tables**: snake_case plural (e.g., `property_listings`)
- **Columns**: snake_case (e.g., `created_at`, `is_verified`)
- **Primary Keys**: `id` — UUID v4 with `gen_random_uuid()`
- **Foreign Keys**: `{table_singular}_id` (e.g., `user_id`, `listing_id`)
- **Timestamps**: `created_at`, `updated_at` on all tables
- **Soft Delete**: `deleted_at` timestamp (NULL = not deleted)
- **Audit columns**: `created_by`, `updated_by` on moderated tables
- **Boolean flags**: `is_` prefix (e.g., `is_active`, `is_verified`)

### 3.1.3 Standard Audit Columns (All Tables)

```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
deleted_at  TIMESTAMPTZ,           -- Soft delete
created_by  UUID REFERENCES users(id),
updated_by  UUID REFERENCES users(id)
```

---

## 3.2 Complete Table Specifications

### 3.2.1 USERS & AUTHENTICATION DOMAIN

#### Table: `users`

```sql
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile              VARCHAR(15) NOT NULL UNIQUE,
  mobile_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  email               VARCHAR(255) UNIQUE,
  email_verified      BOOLEAN NOT NULL DEFAULT FALSE,
  full_name           VARCHAR(255),
  date_of_birth       DATE,
  gender              VARCHAR(10) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  city                VARCHAR(100),
  locality            VARCHAR(100),
  address             TEXT,
  profile_photo_url   TEXT,
  user_type           VARCHAR(50) NOT NULL DEFAULT 'buyer'
                      CHECK (user_type IN ('buyer', 'seller', 'owner', 'tenant', 'investor')),
  kyc_status          VARCHAR(30) NOT NULL DEFAULT 'pending'
                      CHECK (kyc_status IN ('pending', 'submitted', 'verified', 'rejected')),
  kyc_verified_at     TIMESTAMPTZ,
  aadhaar_number_enc  TEXT,           -- AES-256 encrypted
  pan_number_enc      TEXT,           -- AES-256 encrypted
  aadhaar_verified    BOOLEAN DEFAULT FALSE,
  pan_verified        BOOLEAN DEFAULT FALSE,
  budget_min          BIGINT,
  budget_max          BIGINT,
  preferred_cities    TEXT[],          -- Array of city names
  preferred_localities TEXT[],
  referral_code       VARCHAR(20) UNIQUE,
  referred_by         UUID REFERENCES users(id),
  wallet_balance      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  is_deleted          BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at       TIMESTAMPTZ,
  registration_source VARCHAR(50)      -- 'web', 'ios', 'android', 'whatsapp', 'referral'
                      CHECK (registration_source IN ('web', 'ios', 'android', 'whatsapp', 'referral', 'organic')),
  fcm_token           TEXT,            -- Firebase push notification token
  web_push_subscription TEXT,          -- Web push JSON
  preferred_language  VARCHAR(10) NOT NULL DEFAULT 'en'
                      CHECK (preferred_language IN ('en', 'hi')),
  notification_sms    BOOLEAN NOT NULL DEFAULT TRUE,
  notification_email  BOOLEAN NOT NULL DEFAULT TRUE,
  notification_whatsapp BOOLEAN NOT NULL DEFAULT TRUE,
  notification_push   BOOLEAN NOT NULL DEFAULT TRUE,
  gdpr_consent        BOOLEAN NOT NULL DEFAULT FALSE,
  gdpr_consent_at     TIMESTAMPTZ,
  dpdp_consent        BOOLEAN NOT NULL DEFAULT FALSE,
  dpdp_consent_at     TIMESTAMPTZ,
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);

CREATE INDEX idx_users_mobile ON users(mobile);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_kyc_status ON users(kyc_status);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

#### Table: `otp_requests`

```sql
CREATE TABLE otp_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile      VARCHAR(15) NOT NULL,
  otp_hash    VARCHAR(255) NOT NULL,    -- bcrypt hash of OTP
  purpose     VARCHAR(50) NOT NULL
              CHECK (purpose IN ('login', 'register', 'kyc', 'withdraw', 'partner_login')),
  channel     VARCHAR(20) NOT NULL DEFAULT 'sms'
              CHECK (channel IN ('sms', 'whatsapp')),
  is_used     BOOLEAN NOT NULL DEFAULT FALSE,
  is_expired  BOOLEAN NOT NULL DEFAULT FALSE,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts  INTEGER NOT NULL DEFAULT 3,
  expires_at  TIMESTAMPTZ NOT NULL,     -- NOW() + 5 minutes
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_otp_mobile ON otp_requests(mobile);
CREATE INDEX idx_otp_expires_at ON otp_requests(expires_at);
-- Composite index for rate limiting check
CREATE INDEX idx_otp_mobile_created ON otp_requests(mobile, created_at DESC);
```

#### Table: `sessions`

```sql
CREATE TABLE sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token   VARCHAR(500) NOT NULL UNIQUE,
  device_type     VARCHAR(20) CHECK (device_type IN ('web', 'ios', 'android')),
  device_info     JSONB,               -- Browser/device metadata
  ip_address      INET,
  is_valid        BOOLEAN NOT NULL DEFAULT TRUE,
  last_used_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at      TIMESTAMPTZ NOT NULL,  -- 30 days
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_refresh_token ON sessions(refresh_token);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

#### Table: `kyc_documents`

```sql
CREATE TABLE kyc_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  partner_id      UUID REFERENCES partners(id),
  document_type   VARCHAR(50) NOT NULL
                  CHECK (document_type IN (
                    'aadhaar_front', 'aadhaar_back', 'pan', 'passport',
                    'driving_license', 'voter_id', 'trade_license',
                    'rera_certificate', 'gst_certificate', 'bank_statement',
                    'company_registration', 'professional_certificate'
                  )),
  file_url        TEXT NOT NULL,
  file_name       VARCHAR(255),
  file_size_bytes INTEGER,
  mime_type       VARCHAR(100),
  ocr_extracted   JSONB,               -- OCR output from Google Vision
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  verification_status VARCHAR(30) NOT NULL DEFAULT 'pending'
                  CHECK (verification_status IN ('pending', 'under_review', 'verified', 'rejected', 'reupload_required')),
  rejection_reason TEXT,
  reupload_note   TEXT,
  verified_by     UUID REFERENCES admin_users(id),
  verified_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kyc_user_id ON kyc_documents(user_id);
CREATE INDEX idx_kyc_partner_id ON kyc_documents(partner_id);
CREATE INDEX idx_kyc_status ON kyc_documents(verification_status);
```

---

### 3.2.2 PARTNERS DOMAIN

#### Table: `partners`

```sql
CREATE TABLE partners (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES users(id),    -- If partner is also a B2C user
  partner_type          VARCHAR(50) NOT NULL
                        CHECK (partner_type IN (
                          'dealer_broker', 'builder', 'architect',
                          'interior_designer', 'civil_contractor',
                          'material_vendor', 'service_professional',
                          'legal_partner', 'loan_dsa', 'insurance_dsa'
                        )),
  company_name          VARCHAR(255),
  brand_name            VARCHAR(255),
  mobile                VARCHAR(15) NOT NULL,
  email                 VARCHAR(255),
  full_name             VARCHAR(255) NOT NULL,
  profile_photo_url     TEXT,
  bio                   TEXT,
  rera_number           VARCHAR(100),
  rera_verified         BOOLEAN DEFAULT FALSE,
  gst_number            VARCHAR(20),
  gst_verified          BOOLEAN DEFAULT FALSE,
  pan_number_enc        TEXT,          -- Encrypted
  bank_account_enc      JSONB,         -- {account_no_enc, ifsc, bank_name} encrypted
  service_cities        TEXT[],        -- Cities they operate in
  service_localities    TEXT[],
  service_categories    TEXT[],        -- Specific services offered
  portfolio_urls        TEXT[],
  website_url           TEXT,
  social_links          JSONB,         -- {facebook, instagram, youtube}
  years_of_experience   INTEGER,
  team_size             INTEGER,
  rating                DECIMAL(3,2) DEFAULT 0.0,
  total_reviews         INTEGER DEFAULT 0,
  total_leads_received  INTEGER DEFAULT 0,
  total_conversions     INTEGER DEFAULT 0,
  conversion_rate       DECIMAL(5,2) DEFAULT 0.0,
  onboarding_status     VARCHAR(30) NOT NULL DEFAULT 'pending'
                        CHECK (onboarding_status IN (
                          'draft', 'pending_review', 'approved',
                          'rejected', 'suspended', 'inactive'
                        )),
  rejection_reason      TEXT,
  is_verified           BOOLEAN NOT NULL DEFAULT FALSE,
  verified_badge_at     TIMESTAMPTZ,
  verified_by           UUID REFERENCES admin_users(id),
  subscription_plan_id  UUID REFERENCES subscription_plans(id),
  subscription_status   VARCHAR(20) DEFAULT 'free'
                        CHECK (subscription_status IN ('free', 'silver', 'gold', 'platinum')),
  subscription_expires_at TIMESTAMPTZ,
  commission_structure  JSONB,         -- {type: 'percentage', rate: 2.5}
  onboarding_form_data  JSONB,         -- Dynamic form fields
  fcm_token             TEXT,
  notification_sms      BOOLEAN DEFAULT TRUE,
  notification_whatsapp BOOLEAN DEFAULT TRUE,
  notification_push     BOOLEAN DEFAULT TRUE,
  is_active             BOOLEAN NOT NULL DEFAULT TRUE,
  last_active_at        TIMESTAMPTZ,
  -- Audit
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at            TIMESTAMPTZ,
  created_by            UUID REFERENCES admin_users(id),
  updated_by            UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_partners_type ON partners(partner_type);
CREATE INDEX idx_partners_status ON partners(onboarding_status);
CREATE INDEX idx_partners_service_cities ON partners USING GIN(service_cities);
CREATE INDEX idx_partners_categories ON partners USING GIN(service_categories);
CREATE INDEX idx_partners_rating ON partners(rating DESC);
CREATE INDEX idx_partners_subscription ON partners(subscription_status);
```

#### Table: `partner_reviews`

```sql
CREATE TABLE partner_reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id  UUID NOT NULL REFERENCES partners(id),
  user_id     UUID NOT NULL REFERENCES users(id),
  booking_id  UUID REFERENCES bookings(id),
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       VARCHAR(255),
  review_text TEXT,
  photos      TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,    -- Verified via actual booking
  is_visible  BOOLEAN DEFAULT TRUE,
  admin_note  TEXT,
  -- Reply from partner
  reply_text  TEXT,
  reply_at    TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_partner_id ON partner_reviews(partner_id);
CREATE INDEX idx_reviews_user_id ON partner_reviews(user_id);
CREATE INDEX idx_reviews_rating ON partner_reviews(rating);
```

---

### 3.2.3 PROPERTY LISTINGS DOMAIN

#### Table: `property_listings`

```sql
CREATE TABLE property_listings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_slug          VARCHAR(255) UNIQUE NOT NULL,   -- SEO-friendly URL slug
  listed_by_user_id     UUID REFERENCES users(id),
  listed_by_partner_id  UUID REFERENCES partners(id),
  listing_type          VARCHAR(20) NOT NULL
                        CHECK (listing_type IN ('sale', 'rent', 'pg', 'commercial_sale', 'commercial_rent', 'new_project')),
  property_type         VARCHAR(50) NOT NULL
                        CHECK (property_type IN (
                          'flat', 'villa', 'plot', 'builder_floor', 'penthouse',
                          'studio', 'commercial_office', 'commercial_shop',
                          'commercial_warehouse', 'commercial_showroom',
                          'pg_hostel', 'co_living'
                        )),
  -- Location
  country               VARCHAR(100) NOT NULL DEFAULT 'India',
  state                 VARCHAR(100) NOT NULL,
  city                  VARCHAR(100) NOT NULL,
  locality              VARCHAR(200) NOT NULL,
  sub_locality          VARCHAR(200),
  address               TEXT,
  landmark              VARCHAR(255),
  pincode               VARCHAR(10),
  latitude              DECIMAL(10, 8),
  longitude             DECIMAL(11, 8),
  google_maps_place_id  VARCHAR(255),
  -- Property Details
  bhk_type              VARCHAR(20),    -- '1BHK', '2BHK', '3BHK', '4BHK', '4+BHK', 'Studio'
  bedrooms              INTEGER,
  bathrooms             INTEGER,
  balconies             INTEGER,
  floors                INTEGER,
  total_floors          INTEGER,
  floor_number          INTEGER,
  super_built_up_area   DECIMAL(10,2),  -- sq.ft
  carpet_area           DECIMAL(10,2),  -- sq.ft
  plot_area             DECIMAL(10,2),  -- sq.ft (for plots)
  area_unit             VARCHAR(10) DEFAULT 'sqft'
                        CHECK (area_unit IN ('sqft', 'sqmt', 'gaj', 'bigha')),
  age_of_property       VARCHAR(30),    -- 'new', 'under_construction', '1-5years', '5-10years', '10+years'
  possession_date       DATE,           -- For under-construction
  facing                VARCHAR(20)     CHECK (facing IN ('north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west')),
  furnishing_status     VARCHAR(30)     CHECK (furnishing_status IN ('fully_furnished', 'semi_furnished', 'unfurnished')),
  -- Pricing
  price                 BIGINT NOT NULL,              -- In INR (paise-level not needed)
  price_negotiable      BOOLEAN DEFAULT FALSE,
  price_per_sqft        DECIMAL(10,2),
  maintenance_charges   INTEGER,                      -- Monthly, INR
  security_deposit      INTEGER,                      -- For rent
  brokerage             VARCHAR(50),                  -- 'zero', '1_month', '2_months', 'negotiable'
  -- RERA
  rera_number           VARCHAR(100),
  rera_verified         BOOLEAN DEFAULT FALSE,
  -- Status
  status                VARCHAR(30) NOT NULL DEFAULT 'draft'
                        CHECK (status IN (
                          'draft', 'pending_review', 'approved', 'live',
                          'rejected', 'paused', 'expired', 'sold', 'rented'
                        )),
  rejection_reason      TEXT,
  approved_by           UUID REFERENCES admin_users(id),
  approved_at           TIMESTAMPTZ,
  listing_expires_at    TIMESTAMPTZ,
  -- Boost / Feature
  is_featured           BOOLEAN DEFAULT FALSE,
  is_boosted            BOOLEAN DEFAULT FALSE,
  boost_expires_at      TIMESTAMPTZ,
  featured_expires_at   TIMESTAMPTZ,
  -- Media
  primary_photo_url     TEXT,
  photos                TEXT[],
  video_url             TEXT,
  virtual_tour_url      TEXT,          -- 360° tour URL
  floor_plan_url        TEXT,
  -- Description
  title                 VARCHAR(500),
  description           TEXT,
  highlights            TEXT[],
  -- Amenities (stored as array of strings for flexibility)
  amenities             TEXT[],        -- ['gym', 'swimming_pool', 'parking', ...]
  nearby_facilities     JSONB,         -- {schools: [...], hospitals: [...], transit: [...]}
  -- SEO
  meta_title            VARCHAR(70),
  meta_description      VARCHAR(170),
  -- Analytics
  view_count            INTEGER DEFAULT 0,
  save_count            INTEGER DEFAULT 0,
  enquiry_count         INTEGER DEFAULT 0,
  share_count           INTEGER DEFAULT 0,
  -- AI
  ai_estimated_price_min BIGINT,
  ai_estimated_price_max BIGINT,
  ai_price_confidence   DECIMAL(5,2),
  ai_last_valued_at     TIMESTAMPTZ,
  price_trend_data      JSONB,         -- Historical price data for this locality
  -- Audit
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at            TIMESTAMPTZ,
  created_by            UUID,          -- user_id or partner_id
  updated_by            UUID
);

CREATE INDEX idx_listings_type ON property_listings(listing_type, property_type);
CREATE INDEX idx_listings_city ON property_listings(city);
CREATE INDEX idx_listings_locality ON property_listings(city, locality);
CREATE INDEX idx_listings_status ON property_listings(status);
CREATE INDEX idx_listings_price ON property_listings(price);
CREATE INDEX idx_listings_bhk ON property_listings(bhk_type);
CREATE INDEX idx_listings_partner ON property_listings(listed_by_partner_id);
CREATE INDEX idx_listings_user ON property_listings(listed_by_user_id);
CREATE INDEX idx_listings_geo ON property_listings(latitude, longitude);
CREATE INDEX idx_listings_featured ON property_listings(is_featured, is_boosted);
CREATE INDEX idx_listings_slug ON property_listings(listing_slug);
CREATE INDEX idx_listings_created ON property_listings(created_at DESC);
-- Full-text search (backup to Elasticsearch)
CREATE INDEX idx_listings_fts ON property_listings
  USING GIN(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || city || ' ' || locality));
```

#### Table: `property_saved`

```sql
CREATE TABLE property_saved (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id  UUID NOT NULL REFERENCES property_listings(id) ON DELETE CASCADE,
  saved_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

CREATE INDEX idx_saved_user ON property_saved(user_id);
CREATE INDEX idx_saved_listing ON property_saved(listing_id);
```

#### Table: `property_enquiries`

```sql
CREATE TABLE property_enquiries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id      UUID NOT NULL REFERENCES property_listings(id),
  user_id         UUID REFERENCES users(id),      -- NULL if guest
  guest_mobile    VARCHAR(15),                    -- If not logged in
  guest_name      VARCHAR(255),
  message         TEXT,
  enquiry_type    VARCHAR(30) DEFAULT 'general'
                  CHECK (enquiry_type IN ('general', 'site_visit', 'callback', 'price_query', 'availability')),
  preferred_time  VARCHAR(100),
  lead_id         UUID REFERENCES leads(id),      -- Linked lead
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_enquiries_listing ON property_enquiries(listing_id);
CREATE INDEX idx_enquiries_user ON property_enquiries(user_id);
CREATE INDEX idx_enquiries_created ON property_enquiries(created_at DESC);
```

#### Table: `property_views`

```sql
CREATE TABLE property_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id  UUID NOT NULL REFERENCES property_listings(id),
  user_id     UUID REFERENCES users(id),
  session_id  VARCHAR(255),
  ip_address  INET,
  source      VARCHAR(50),         -- 'search', 'similar', 'homepage', 'email', 'whatsapp'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_views_listing ON property_views(listing_id);
CREATE INDEX idx_views_user ON property_views(user_id);
CREATE INDEX idx_views_created ON property_views(created_at DESC);
```

---

### 3.2.4 LEADS DOMAIN

#### Table: `leads`

```sql
CREATE TABLE leads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_number         VARCHAR(20) UNIQUE NOT NULL,   -- L-2026-00001 (auto-generated)
  -- Source
  source              VARCHAR(50) NOT NULL
                      CHECK (source IN (
                        'homepage_quick_finder', 'post_property_flow',
                        'property_enquiry', 'service_booking_abandon',
                        'callback_request', 'missed_call', 'exit_intent_popup',
                        'whatsapp', 'chatbot', 'referral', 'paid_ad',
                        'organic_search', 'email_campaign', 'phone_call'
                      )),
  utm_source          VARCHAR(100),
  utm_medium          VARCHAR(100),
  utm_campaign        VARCHAR(100),
  utm_term            VARCHAR(255),
  utm_content         VARCHAR(255),
  landing_page_url    TEXT,
  -- Contact
  name                VARCHAR(255),
  mobile              VARCHAR(15) NOT NULL,
  email               VARCHAR(255),
  city                VARCHAR(100),
  -- Intent
  category            VARCHAR(50) NOT NULL
                      CHECK (category IN (
                        'property_buy', 'property_rent', 'property_sell',
                        'construction', 'material', 'on_demand_service',
                        'interior', 'loan', 'insurance', 'legal', 'amc', 'general'
                      )),
  sub_category        VARCHAR(100),           -- More specific (e.g., '3BHK', 'plumber')
  budget_min          BIGINT,
  budget_max          BIGINT,
  requirement_notes   TEXT,
  linked_listing_id   UUID REFERENCES property_listings(id),
  linked_booking_id   UUID REFERENCES bookings(id),
  -- AI Scoring
  lead_score          INTEGER DEFAULT 0
                      CHECK (lead_score BETWEEN 0 AND 100),
  lead_temperature    VARCHAR(10) DEFAULT 'cold'
                      CHECK (lead_temperature IN ('hot', 'warm', 'cold')),
  score_factors       JSONB,                  -- AI scoring breakdown
  last_scored_at      TIMESTAMPTZ,
  -- Assignment
  assigned_to_staff   UUID REFERENCES admin_users(id),
  assigned_to_partner UUID REFERENCES partners(id),
  assigned_at         TIMESTAMPTZ,
  -- Status Pipeline
  status              VARCHAR(30) NOT NULL DEFAULT 'new'
                      CHECK (status IN (
                        'new', 'contacted', 'site_visit', 'quote_sent',
                        'negotiation', 'converted', 'lost', 'junk'
                      )),
  lost_reason         VARCHAR(100),
  conversion_value    BIGINT,                 -- If converted
  -- Follow-up
  next_followup_at    TIMESTAMPTZ,
  followup_count      INTEGER DEFAULT 0,
  last_contacted_at   TIMESTAMPTZ,
  -- Flags
  is_duplicate        BOOLEAN DEFAULT FALSE,
  duplicate_of        UUID REFERENCES leads(id),
  is_qualified        BOOLEAN DEFAULT FALSE,
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ,
  created_by          UUID,
  updated_by          UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_leads_mobile ON leads(mobile);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_category ON leads(category);
CREATE INDEX idx_leads_city ON leads(city);
CREATE INDEX idx_leads_temperature ON leads(lead_temperature);
CREATE INDEX idx_leads_assigned_staff ON leads(assigned_to_staff);
CREATE INDEX idx_leads_assigned_partner ON leads(assigned_to_partner);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_followup ON leads(next_followup_at);
CREATE INDEX idx_leads_score ON leads(lead_score DESC);
```

#### Table: `lead_activities`

```sql
CREATE TABLE lead_activities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  activity_type   VARCHAR(50) NOT NULL
                  CHECK (activity_type IN (
                    'note', 'call', 'whatsapp', 'email', 'sms',
                    'site_visit', 'status_change', 'assignment',
                    'score_update', 'followup_set', 'document_shared'
                  )),
  activity_by     UUID REFERENCES admin_users(id),
  partner_id      UUID REFERENCES partners(id),
  subject         VARCHAR(255),
  notes           TEXT,
  call_duration   INTEGER,            -- seconds
  call_recording_url TEXT,
  attachments     TEXT[],
  old_value       VARCHAR(255),       -- For status_change activities
  new_value       VARCHAR(255),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_activities_type ON lead_activities(activity_type);
CREATE INDEX idx_activities_created ON lead_activities(created_at DESC);
```

#### Table: `lead_followups`

```sql
CREATE TABLE lead_followups (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  assigned_to     UUID NOT NULL REFERENCES admin_users(id),
  followup_at     TIMESTAMPTZ NOT NULL,
  notes           TEXT,
  reminder_sent   BOOLEAN DEFAULT FALSE,
  is_completed    BOOLEAN DEFAULT FALSE,
  completed_at    TIMESTAMPTZ,
  outcome         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_followups_lead ON lead_followups(lead_id);
CREATE INDEX idx_followups_assigned ON lead_followups(assigned_to);
CREATE INDEX idx_followups_at ON lead_followups(followup_at);
```

---

### 3.2.5 BOOKINGS DOMAIN

#### Table: `bookings`

```sql
CREATE TABLE bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number      VARCHAR(20) UNIQUE NOT NULL,   -- BK-2026-00001
  -- Relations
  user_id             UUID NOT NULL REFERENCES users(id),
  partner_id          UUID REFERENCES partners(id),
  -- Category
  booking_type        VARCHAR(50) NOT NULL
                      CHECK (booking_type IN (
                        'on_demand_service', 'construction', 'interior',
                        'legal', 'amc_visit', 'valuation', 'site_visit'
                      )),
  service_category    VARCHAR(100) NOT NULL,          -- 'plumber', 'architect', 'civil_contractor', etc.
  service_sub_category VARCHAR(100),
  -- Location
  city                VARCHAR(100),
  locality            VARCHAR(200),
  address             TEXT NOT NULL,
  latitude            DECIMAL(10,8),
  longitude           DECIMAL(11,8),
  -- Scheduling
  scheduled_at        TIMESTAMPTZ,                    -- User's preferred time
  confirmed_at        TIMESTAMPTZ,                    -- When partner confirmed
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  -- Details
  description         TEXT,
  photos_before       TEXT[],
  photos_after        TEXT[],
  partner_notes       TEXT,
  completion_notes    TEXT,
  -- Status
  status              VARCHAR(30) NOT NULL DEFAULT 'pending'
                      CHECK (status IN (
                        'pending', 'assigned', 'accepted', 'rejected_by_partner',
                        'en_route', 'in_progress', 'completed', 'cancelled_by_user',
                        'cancelled_by_partner', 'no_show', 'disputed'
                      )),
  cancellation_reason TEXT,
  cancelled_by        VARCHAR(20) CHECK (cancelled_by IN ('user', 'partner', 'admin')),
  -- Payment
  quoted_amount       DECIMAL(10,2),
  final_amount        DECIMAL(10,2),
  payment_status      VARCHAR(30) DEFAULT 'pending'
                      CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded', 'waived')),
  payment_method      VARCHAR(30),                    -- 'online', 'cash', 'upi'
  -- Review
  user_rating         INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  user_review_text    TEXT,
  user_reviewed_at    TIMESTAMPTZ,
  partner_rating      INTEGER CHECK (partner_rating BETWEEN 1 AND 5),
  -- SLA
  sla_deadline        TIMESTAMPTZ,
  is_sla_breached     BOOLEAN DEFAULT FALSE,
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ,
  created_by          UUID,
  updated_by          UUID
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_partner ON bookings(partner_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_type ON bookings(booking_type);
CREATE INDEX idx_bookings_city ON bookings(city);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_bookings_number ON bookings(booking_number);
```

#### Table: `booking_status_history`

```sql
CREATE TABLE booking_status_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_status  VARCHAR(30),
  new_status  VARCHAR(30) NOT NULL,
  changed_by  VARCHAR(20) CHECK (changed_by IN ('user', 'partner', 'admin', 'system')),
  changed_by_id UUID,
  notes       TEXT,
  latitude    DECIMAL(10,8),   -- GPS location at status change (for 'en_route', 'in_progress')
  longitude   DECIMAL(11,8),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_status_history_booking ON booking_status_history(booking_id);
CREATE INDEX idx_status_history_created ON booking_status_history(created_at);
```

---

### 3.2.6 PAYMENTS DOMAIN

#### Table: `payments`

```sql
CREATE TABLE payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_number      VARCHAR(30) UNIQUE NOT NULL,   -- PAY-2026-00001
  -- Relations
  user_id             UUID NOT NULL REFERENCES users(id),
  booking_id          UUID REFERENCES bookings(id),
  order_id            UUID REFERENCES material_orders(id),
  subscription_id     UUID REFERENCES user_subscriptions(id),
  lead_id             UUID REFERENCES leads(id),
  listing_id          UUID REFERENCES property_listings(id),
  -- Gateway
  gateway             VARCHAR(30) NOT NULL DEFAULT 'razorpay'
                      CHECK (gateway IN ('razorpay', 'payumoney', 'stripe', 'upi', 'cash')),
  gateway_order_id    VARCHAR(255),
  gateway_payment_id  VARCHAR(255),
  gateway_signature   VARCHAR(500),
  gateway_response    JSONB,
  -- Amount
  amount              DECIMAL(10,2) NOT NULL,
  currency            VARCHAR(5) NOT NULL DEFAULT 'INR',
  tax_amount          DECIMAL(10,2) DEFAULT 0,
  discount_amount     DECIMAL(10,2) DEFAULT 0,
  coupon_code         VARCHAR(50),
  coupon_discount     DECIMAL(10,2) DEFAULT 0,
  net_amount          DECIMAL(10,2) NOT NULL,         -- Final charged
  -- Status
  payment_type        VARCHAR(30) NOT NULL
                      CHECK (payment_type IN (
                        'service_booking', 'material_purchase', 'subscription',
                        'listing_boost', 'valuation_report', 'loan_processing_fee',
                        'legal_service', 'amc', 'escrow'
                      )),
  status              VARCHAR(30) NOT NULL DEFAULT 'initiated'
                      CHECK (status IN (
                        'initiated', 'processing', 'success',
                        'failed', 'refunded', 'partially_refunded', 'disputed'
                      )),
  failure_reason      TEXT,
  -- Refund
  refunded_amount     DECIMAL(10,2) DEFAULT 0,
  refund_reason       TEXT,
  refund_initiated_at TIMESTAMPTZ,
  refund_completed_at TIMESTAMPTZ,
  refund_gateway_id   VARCHAR(255),
  -- Escrow
  is_escrow           BOOLEAN DEFAULT FALSE,
  escrow_released_at  TIMESTAMPTZ,
  escrow_release_condition TEXT,
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_gateway_id ON payments(gateway_payment_id);
CREATE INDEX idx_payments_created ON payments(created_at DESC);
CREATE INDEX idx_payments_type ON payments(payment_type);
```

---

### 3.2.7 MATERIALS MARKETPLACE DOMAIN

#### Table: `material_categories`

```sql
CREATE TABLE material_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id     UUID REFERENCES material_categories(id),  -- For subcategories
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(100) UNIQUE NOT NULL,
  description   TEXT,
  icon_url      TEXT,
  banner_url    TEXT,
  sort_order    INTEGER DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  meta_title    VARCHAR(70),
  meta_desc     VARCHAR(170),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Table: `material_products`

```sql
CREATE TABLE material_products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id           UUID NOT NULL REFERENCES partners(id),
  category_id         UUID NOT NULL REFERENCES material_categories(id),
  sku                 VARCHAR(100),
  name                VARCHAR(500) NOT NULL,
  slug                VARCHAR(500) UNIQUE NOT NULL,
  description         TEXT,
  specifications      JSONB,             -- {brand, grade, size, color, ...}
  unit                VARCHAR(20) NOT NULL,   -- 'bag', 'tonne', 'sqft', 'piece', 'litre', 'kg'
  -- Pricing
  price               DECIMAL(10,2) NOT NULL,
  mrp                 DECIMAL(10,2),
  bulk_pricing        JSONB,             -- [{min_qty: 10, price: 280}, {min_qty: 50, price: 260}]
  gst_rate            DECIMAL(5,2) DEFAULT 18.0,
  -- Stock
  stock_quantity      INTEGER DEFAULT 0,
  stock_unit          VARCHAR(20),
  is_in_stock         BOOLEAN DEFAULT TRUE,
  min_order_qty       INTEGER DEFAULT 1,
  max_order_qty       INTEGER,
  -- Media
  primary_image_url   TEXT,
  images              TEXT[],
  -- Status
  status              VARCHAR(30) DEFAULT 'pending'
                      CHECK (status IN ('pending', 'approved', 'live', 'paused', 'rejected')),
  -- Reviews
  rating              DECIMAL(3,2) DEFAULT 0.0,
  review_count        INTEGER DEFAULT 0,
  -- SEO
  meta_title          VARCHAR(70),
  meta_description    VARCHAR(170),
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);

CREATE INDEX idx_products_vendor ON material_products(vendor_id);
CREATE INDEX idx_products_category ON material_products(category_id);
CREATE INDEX idx_products_status ON material_products(status);
CREATE INDEX idx_products_price ON material_products(price);
CREATE INDEX idx_products_rating ON material_products(rating DESC);
```

#### Table: `material_orders`

```sql
CREATE TABLE material_orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        VARCHAR(20) UNIQUE NOT NULL,   -- ORD-2026-00001
  user_id             UUID NOT NULL REFERENCES users(id),
  vendor_id           UUID REFERENCES partners(id),
  -- Delivery
  delivery_address    JSONB NOT NULL,    -- {name, mobile, address, city, pincode, lat, lng}
  delivery_date       DATE,
  delivery_slot       VARCHAR(50),       -- 'morning', 'afternoon', 'evening'
  delivery_notes      TEXT,
  -- Amounts
  subtotal            DECIMAL(10,2) NOT NULL,
  gst_amount          DECIMAL(10,2) NOT NULL,
  delivery_fee        DECIMAL(10,2) DEFAULT 0,
  discount_amount     DECIMAL(10,2) DEFAULT 0,
  total_amount        DECIMAL(10,2) NOT NULL,
  -- Status
  order_status        VARCHAR(30) NOT NULL DEFAULT 'pending'
                      CHECK (order_status IN (
                        'pending', 'confirmed', 'preparing', 'dispatched',
                        'in_transit', 'out_for_delivery', 'delivered',
                        'cancelled', 'return_initiated', 'returned'
                      )),
  payment_status      VARCHAR(30) DEFAULT 'pending',
  -- Tracking
  tracking_number     VARCHAR(100),
  tracking_url        TEXT,
  dispatched_at       TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  -- Cancellation
  cancelled_at        TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancelled_by        VARCHAR(20),
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON material_orders(user_id);
CREATE INDEX idx_orders_vendor ON material_orders(vendor_id);
CREATE INDEX idx_orders_status ON material_orders(order_status);
CREATE INDEX idx_orders_created ON material_orders(created_at DESC);
```

#### Table: `material_order_items`

```sql
CREATE TABLE material_order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES material_orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES material_products(id),
  product_name    VARCHAR(500),    -- Snapshot at time of order
  product_sku     VARCHAR(100),
  quantity        INTEGER NOT NULL,
  unit            VARCHAR(20),
  unit_price      DECIMAL(10,2) NOT NULL,
  gst_rate        DECIMAL(5,2),
  gst_amount      DECIMAL(10,2),
  total_price     DECIMAL(10,2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON material_order_items(order_id);
CREATE INDEX idx_order_items_product ON material_order_items(product_id);
```

---

### 3.2.8 LOANS & INSURANCE DOMAIN

#### Table: `loan_products`

```sql
CREATE TABLE loan_products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id          UUID NOT NULL REFERENCES partners(id),   -- Bank/NBFC
  loan_type           VARCHAR(30) NOT NULL
                      CHECK (loan_type IN ('home_loan', 'lap', 'home_improvement', 'balance_transfer', 'top_up')),
  product_name        VARCHAR(255) NOT NULL,
  interest_rate_min   DECIMAL(5,2),
  interest_rate_max   DECIMAL(5,2),
  processing_fee      VARCHAR(100),   -- '0.5%' or 'Flat ₹5000'
  min_loan_amount     BIGINT,
  max_loan_amount     BIGINT,
  min_tenure_months   INTEGER,
  max_tenure_months   INTEGER,
  eligible_employment JSONB,          -- ['salaried', 'self_employed', 'business']
  min_cibil_score     INTEGER,
  eligible_cities     TEXT[],
  features            TEXT[],
  documents_required  TEXT[],
  is_active           BOOLEAN DEFAULT TRUE,
  sort_order          INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Table: `loan_applications`

```sql
CREATE TABLE loan_applications (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number    VARCHAR(20) UNIQUE NOT NULL,   -- LA-2026-00001
  user_id               UUID NOT NULL REFERENCES users(id),
  loan_product_id       UUID NOT NULL REFERENCES loan_products(id),
  listing_id            UUID REFERENCES property_listings(id),
  -- Applicant Details
  employment_type       VARCHAR(30) CHECK (employment_type IN ('salaried', 'self_employed', 'business', 'freelancer', 'retired')),
  employer_name         VARCHAR(255),
  monthly_income        DECIMAL(10,2),
  other_income          DECIMAL(10,2),
  existing_emi          DECIMAL(10,2),
  cibil_score           INTEGER,
  -- Loan Details
  property_value        BIGINT,
  loan_amount_requested BIGINT,
  loan_tenure_months    INTEGER,
  purpose               TEXT,
  -- Status
  status                VARCHAR(30) NOT NULL DEFAULT 'draft'
                        CHECK (status IN (
                          'draft', 'submitted', 'under_review',
                          'documents_pending', 'pre_approved', 'approved',
                          'disbursed', 'rejected', 'withdrawn'
                        )),
  status_reason         TEXT,
  approved_amount       BIGINT,
  approved_rate         DECIMAL(5,2),
  approved_tenure       INTEGER,
  disbursed_amount      BIGINT,
  disbursed_at          TIMESTAMPTZ,
  -- Documents
  documents             JSONB,          -- List of uploaded document IDs
  -- Assigned DSA/Partner
  assigned_to_partner   UUID REFERENCES partners(id),
  -- Audit
  submitted_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_loan_applications_user ON loan_applications(user_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
CREATE INDEX idx_loan_applications_created ON loan_applications(created_at DESC);
```

---

### 3.2.9 AMC & SUBSCRIPTIONS DOMAIN

#### Table: `subscription_plans`

```sql
CREATE TABLE subscription_plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_type       VARCHAR(20) NOT NULL CHECK (plan_type IN ('b2c_amc', 'b2b_partner')),
  name            VARCHAR(100) NOT NULL,
  slug            VARCHAR(100) UNIQUE NOT NULL,
  description     TEXT,
  billing_cycle   VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  price           DECIMAL(10,2) NOT NULL,
  original_price  DECIMAL(10,2),
  included_services TEXT[],
  features        JSONB,              -- Detailed feature list
  applicable_categories TEXT[],       -- Which service categories
  max_visits      INTEGER,            -- Visits per year for AMC
  priority_support BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Table: `user_subscriptions`

```sql
CREATE TABLE user_subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id),
  partner_id          UUID REFERENCES partners(id),    -- For B2B subscriptions
  plan_id             UUID NOT NULL REFERENCES subscription_plans(id),
  subscription_type   VARCHAR(20) NOT NULL CHECK (subscription_type IN ('b2c_amc', 'b2b_partner')),
  status              VARCHAR(20) NOT NULL DEFAULT 'active'
                      CHECK (status IN ('active', 'expired', 'cancelled', 'paused')),
  starts_at           TIMESTAMPTZ NOT NULL,
  expires_at          TIMESTAMPTZ NOT NULL,
  auto_renew          BOOLEAN DEFAULT TRUE,
  payment_id          UUID REFERENCES payments(id),
  last_renewal_at     TIMESTAMPTZ,
  next_renewal_at     TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancelled_at        TIMESTAMPTZ,
  services_used       INTEGER DEFAULT 0,
  services_remaining  INTEGER,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subs_user ON user_subscriptions(user_id);
CREATE INDEX idx_subs_partner ON user_subscriptions(partner_id);
CREATE INDEX idx_subs_status ON user_subscriptions(status);
CREATE INDEX idx_subs_expires ON user_subscriptions(expires_at);
```

---

### 3.2.10 NOTIFICATIONS DOMAIN

#### Table: `notifications`

```sql
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Target
  user_id         UUID REFERENCES users(id),
  partner_id      UUID REFERENCES partners(id),
  admin_user_id   UUID REFERENCES admin_users(id),
  -- Content
  title           VARCHAR(255) NOT NULL,
  body            TEXT NOT NULL,
  icon_url        TEXT,
  image_url       TEXT,
  -- Action
  action_type     VARCHAR(30),                       -- 'open_url', 'open_screen', 'none'
  action_url      TEXT,                              -- Deep link or URL
  action_data     JSONB,                             -- Extra data for deep link
  -- Category
  notification_type VARCHAR(50) NOT NULL
                  CHECK (notification_type IN (
                    'booking_confirmed', 'booking_completed', 'booking_cancelled',
                    'payment_success', 'payment_failed', 'lead_assigned',
                    'property_approved', 'property_rejected', 'price_drop_alert',
                    'new_matching_listing', 'amc_renewal_reminder', 'emi_reminder',
                    'promotional', 'system', 'admin_broadcast'
                  )),
  -- Delivery
  channel         VARCHAR(20) NOT NULL CHECK (channel IN ('push', 'sms', 'email', 'whatsapp', 'in_app')),
  status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'queued', 'sent', 'delivered', 'failed', 'read')),
  -- SMS/Email/WhatsApp
  recipient_mobile VARCHAR(15),
  recipient_email  VARCHAR(255),
  template_id      VARCHAR(100),
  template_vars    JSONB,
  gateway_message_id VARCHAR(255),
  -- Push specific
  fcm_token       TEXT,
  fcm_response    JSONB,
  -- Status
  sent_at         TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  read_at         TIMESTAMPTZ,
  failed_at       TIMESTAMPTZ,
  failure_reason  TEXT,
  retry_count     INTEGER DEFAULT 0,
  -- Audit
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_partner ON notifications(partner_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

#### Table: `notification_templates`

```sql
CREATE TABLE notification_templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) NOT NULL UNIQUE,
  description     TEXT,
  channel         VARCHAR(20) NOT NULL,
  template_type   VARCHAR(50) NOT NULL,
  subject         VARCHAR(255),           -- Email subject
  body_template   TEXT NOT NULL,          -- Handlebars/Mustache template
  variables       TEXT[],                 -- Required variable names
  sms_sender_id   VARCHAR(20),
  whatsapp_template_name VARCHAR(100),    -- Meta-approved template name
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 3.2.11 ADMIN USERS DOMAIN

#### Table: `admin_users`

```sql
CREATE TABLE admin_users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  mobile          VARCHAR(15) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,   -- bcrypt hash
  role            VARCHAR(30) NOT NULL
                  CHECK (role IN ('super_admin', 'sales', 'operations', 'support', 'finance', 'content', 'analyst')),
  custom_permissions JSONB,               -- Additional or restricted permissions
  is_active       BOOLEAN DEFAULT TRUE,
  last_login_at   TIMESTAMPTZ,
  last_login_ip   INET,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_email ON admin_users(email);
```

#### Table: `audit_logs`

```sql
CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Who
  actor_type      VARCHAR(20) NOT NULL CHECK (actor_type IN ('admin', 'user', 'partner', 'system')),
  actor_id        UUID NOT NULL,
  actor_name      VARCHAR(255),
  actor_role      VARCHAR(30),
  -- What
  action          VARCHAR(100) NOT NULL,   -- 'property.approved', 'user.suspended', etc.
  resource_type   VARCHAR(50) NOT NULL,    -- 'property_listing', 'user', 'partner', etc.
  resource_id     UUID,
  resource_name   VARCHAR(255),
  -- Changes
  old_values      JSONB,
  new_values      JSONB,
  change_summary  TEXT,
  -- Context
  ip_address      INET,
  user_agent      TEXT,
  request_id      VARCHAR(100),
  -- Timestamp
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

---

### 3.2.12 GRIEVANCES DOMAIN

#### Table: `grievances`

```sql
CREATE TABLE grievances (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number       VARCHAR(20) UNIQUE NOT NULL,   -- GRV-2026-00001
  -- Reporter
  reporter_type       VARCHAR(20) NOT NULL CHECK (reporter_type IN ('user', 'partner')),
  user_id             UUID REFERENCES users(id),
  partner_id          UUID REFERENCES partners(id),
  reporter_name       VARCHAR(255),
  reporter_mobile     VARCHAR(15),
  reporter_email      VARCHAR(255),
  -- Related
  related_booking_id  UUID REFERENCES bookings(id),
  related_order_id    UUID REFERENCES material_orders(id),
  related_listing_id  UUID REFERENCES property_listings(id),
  -- Complaint
  category            VARCHAR(50) NOT NULL
                      CHECK (category IN (
                        'service_quality', 'payment_dispute', 'partner_misconduct',
                        'property_fraud', 'delivery_issue', 'platform_issue',
                        'refund_request', 'other'
                      )),
  subject             VARCHAR(255) NOT NULL,
  description         TEXT NOT NULL,
  attachments         TEXT[],
  -- Assignment
  assigned_to         UUID REFERENCES admin_users(id),
  assigned_at         TIMESTAMPTZ,
  -- Status
  status              VARCHAR(30) NOT NULL DEFAULT 'open'
                      CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'escalated')),
  resolution_notes    TEXT,
  resolved_at         TIMESTAMPTZ,
  resolved_by         UUID REFERENCES admin_users(id),
  escalated_at        TIMESTAMPTZ,
  escalated_to        UUID REFERENCES admin_users(id),
  escalation_reason   TEXT,
  -- SLA
  sla_due_at          TIMESTAMPTZ,
  is_sla_breached     BOOLEAN DEFAULT FALSE,
  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_grievances_user ON grievances(user_id);
CREATE INDEX idx_grievances_partner ON grievances(partner_id);
CREATE INDEX idx_grievances_status ON grievances(status);
CREATE INDEX idx_grievances_assigned ON grievances(assigned_to);
CREATE INDEX idx_grievances_sla ON grievances(sla_due_at);
CREATE INDEX idx_grievances_created ON grievances(created_at DESC);
```

---

### 3.2.13 CMS DOMAIN

#### Table: `cms_pages`

```sql
CREATE TABLE cms_pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(500) NOT NULL,
  slug            VARCHAR(500) UNIQUE NOT NULL,
  page_type       VARCHAR(50) NOT NULL
                  CHECK (page_type IN (
                    'homepage', 'static', 'landing', 'city', 'locality',
                    'partner', 'blog_post', 'blog_category', 'service',
                    'material_category', 'custom'
                  )),
  content         JSONB,              -- Structured content blocks (rich text, images, etc.)
  html_content    TEXT,               -- Rendered HTML (cached)
  -- SEO
  meta_title      VARCHAR(70),
  meta_description VARCHAR(170),
  og_image_url    TEXT,
  canonical_url   TEXT,
  schema_json     TEXT,               -- Custom schema markup
  -- City/Locality
  city            VARCHAR(100),
  locality        VARCHAR(200),
  -- Blog
  author_id       UUID REFERENCES admin_users(id),
  category        VARCHAR(100),
  tags            TEXT[],
  featured_image  TEXT,
  excerpt         TEXT,
  read_time_mins  INTEGER,
  -- Status
  status          VARCHAR(20) NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'pending_review', 'published', 'archived')),
  published_at    TIMESTAMPTZ,
  scheduled_for   TIMESTAMPTZ,
  -- Analytics
  view_count      INTEGER DEFAULT 0,
  -- Audit
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES admin_users(id),
  updated_by      UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_cms_slug ON cms_pages(slug);
CREATE INDEX idx_cms_type ON cms_pages(page_type);
CREATE INDEX idx_cms_status ON cms_pages(status);
CREATE INDEX idx_cms_city ON cms_pages(city);
```

#### Table: `banners`

```sql
CREATE TABLE banners (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  image_url       TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url        TEXT,
  link_target     VARCHAR(20) DEFAULT '_self' CHECK (link_target IN ('_self', '_blank')),
  -- Placement
  placement       VARCHAR(50) NOT NULL
                  CHECK (placement IN (
                    'homepage_hero', 'homepage_middle', 'category_top',
                    'listing_page_sidebar', 'below_search', 'popup'
                  )),
  -- Targeting
  target_cities   TEXT[],
  target_categories TEXT[],
  target_audience VARCHAR(20) DEFAULT 'all' CHECK (target_audience IN ('all', 'new', 'returning', 'logged_in', 'guest')),
  -- Schedule
  starts_at       TIMESTAMPTZ,
  ends_at         TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  -- Analytics
  impression_count INTEGER DEFAULT 0,
  click_count      INTEGER DEFAULT 0,
  -- Audit
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_banners_placement ON banners(placement);
CREATE INDEX idx_banners_active ON banners(is_active, starts_at, ends_at);
```

#### Table: `faqs`

```sql
CREATE TABLE faqs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question        TEXT NOT NULL,
  answer          TEXT NOT NULL,
  page_type       VARCHAR(50),         -- Which page type this FAQ belongs to
  category        VARCHAR(100),
  city            VARCHAR(100),
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_page_type ON faqs(page_type);
```

---

### 3.2.14 COUPONS & REFERRALS DOMAIN

#### Table: `coupons`

```sql
CREATE TABLE coupons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                VARCHAR(50) UNIQUE NOT NULL,
  title               VARCHAR(255) NOT NULL,
  description         TEXT,
  discount_type       VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  discount_value      DECIMAL(10,2) NOT NULL,
  max_discount_amount DECIMAL(10,2),     -- Cap for percentage coupons
  min_order_amount    DECIMAL(10,2),
  applicable_to       TEXT[],             -- ['service_booking', 'material_purchase', 'subscription']
  applicable_services TEXT[],             -- Specific service categories
  applicable_cities   TEXT[],
  usage_type          VARCHAR(20) DEFAULT 'multi' CHECK (usage_type IN ('single', 'multi')),
  total_usage_cap     INTEGER,
  per_user_cap        INTEGER DEFAULT 1,
  current_usage_count INTEGER DEFAULT 0,
  is_active           BOOLEAN DEFAULT TRUE,
  valid_from          TIMESTAMPTZ NOT NULL,
  valid_until         TIMESTAMPTZ NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by          UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(is_active, valid_from, valid_until);
```

#### Table: `coupon_usages`

```sql
CREATE TABLE coupon_usages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id   UUID NOT NULL REFERENCES coupons(id),
  user_id     UUID NOT NULL REFERENCES users(id),
  payment_id  UUID REFERENCES payments(id),
  booking_id  UUID REFERENCES bookings(id),
  order_id    UUID REFERENCES material_orders(id),
  discount_applied DECIMAL(10,2) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(coupon_id, user_id, booking_id),
  UNIQUE(coupon_id, user_id, order_id)
);
```

#### Table: `referrals`

```sql
CREATE TABLE referrals (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id    UUID REFERENCES users(id),
  referrer_partner_id UUID REFERENCES partners(id),
  referred_user_id    UUID REFERENCES users(id),
  referred_partner_id UUID REFERENCES partners(id),
  referral_code       VARCHAR(20) NOT NULL,
  referral_type       VARCHAR(20) CHECK (referral_type IN ('user_to_user', 'user_to_partner', 'partner_to_partner')),
  status              VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'qualified', 'rewarded', 'expired')),
  qualifying_event    VARCHAR(50),              -- 'first_booking', 'first_purchase', 'partner_approved'
  qualifying_event_at TIMESTAMPTZ,
  reward_amount       DECIMAL(10,2),
  reward_type         VARCHAR(20) CHECK (reward_type IN ('wallet', 'bank_transfer', 'coupon')),
  reward_paid_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 3.3 ER Diagram (Simplified — Key Relationships)

```
users ─────────────────────────────────────────────┐
  │                                                 │
  ├── sessions (1:many)                             │
  ├── otp_requests (1:many)                         │
  ├── kyc_documents (1:many)                        │
  ├── property_listings (1:many, as owner)          │
  ├── property_saved (1:many)                       │
  ├── property_enquiries (1:many)                   │
  ├── leads (1:many)                                │
  ├── bookings (1:many, as customer)                │
  ├── material_orders (1:many)                      │
  ├── loan_applications (1:many)                    │
  ├── user_subscriptions (1:many)                   │
  ├── payments (1:many)                             │
  ├── grievances (1:many)                           │
  ├── notifications (1:many)                        │
  └── referrals (1:many, as referrer)               │
                                                    │
partners ───────────────────────────────────────────┘
  │   (partners.user_id → users.id, optional)
  ├── kyc_documents (1:many)
  ├── property_listings (1:many, listed_by_partner)
  ├── bookings (1:many, as provider)
  ├── lead_activities (1:many)
  ├── partner_reviews (1:many)
  ├── user_subscriptions (1:many, for B2B)
  ├── material_products (1:many)
  └── material_orders (1:many)

property_listings
  ├── property_saved (1:many)
  ├── property_enquiries (1:many)
  ├── property_views (1:many)
  └── leads (1:many, linked_listing)

leads
  ├── lead_activities (1:many)
  └── lead_followups (1:many)

bookings
  ├── booking_status_history (1:many)
  ├── payments (1:many)
  └── partner_reviews (0:1)

material_orders
  ├── material_order_items (1:many)
  └── payments (1:many)

admin_users
  ├── audit_logs (1:many)
  ├── cms_pages (1:many)
  └── banners (1:many)
```

---

## 3.4 Database Migration Strategy

### Migration Tool: Prisma Migrate

```bash
# Create migration
npx prisma migrate dev --name add_property_listings

# Apply to staging
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Seed data
npx prisma db seed
```

### Rollback Strategy
- Every migration has a corresponding `down` migration script
- Blue-green deployment for zero-downtime schema changes
- Read replicas receive migrations after primary confirms success
- Critical schema changes require 2-week deprecation period for additive changes

### Soft Delete Implementation

```sql
-- All deletes must use this pattern
UPDATE table_name
SET deleted_at = NOW(), updated_at = NOW()
WHERE id = $1 AND deleted_at IS NULL;

-- All SELECT queries must filter
WHERE deleted_at IS NULL

-- Prisma middleware to auto-apply soft delete
```

---

*Continue to VOL-04 — Backend Architecture & API Specification*
