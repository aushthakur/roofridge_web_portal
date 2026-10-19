# ROOF RIDGE — GAP ANALYSIS

**Document Version:** 1.0.0  
**Updated:** 2026-10-12  
**Scope:** Discrepancy comparison between 21 Blueprint Volumes and the actual Codebase.

---

## 1. Prioritized Gap Summary

The analysis below categorizes gaps across all functional pillars of the Roof Ridge platform:

### 🔴 Critical Architecture Gaps (Blockers to Production)
1. **Admin Panel Empty Starter Skeleton:**
   - Blueprint VOL-11 mandates a dedicated administration system (Moderation queue, partner verification desk, CRM routing, revenue/refunds, CMS, and audit trails).
   - Current Codebase: Default Vite counter template in `/Admin`.
   - Action: Build full operational SPA in `/Admin`.

2. **Incomplete Backend Domain Models & REST APIs:**
   - Blueprint VOL-03 & VOL-04 specify 18+ relational entities and 40+ REST API endpoints.
   - Current Codebase: Only basic `User` and `Property` models and minimal CRUD routes exist in `Backend`.
   - Action: Implement all missing schemas, controllers, and routes in `Backend/src/models/` and `Backend/src/routes/`.

3. **Frontend Operating on Static Mocks:**
   - Blueprint VOL-05, VOL-07, VOL-08 mandate live database persistence for property search, inquiries, service bookings, and post-property wizard.
   - Current Codebase: `Frontend/src/data/mockData.js` supplies mock arrays; form submissions do not hit backend APIs.
   - Action: Build unified API client `src/services/api.js` and connect all components and pages to live backend endpoints.

---

## 2. Pillar-by-Pillar Gap Details

### Pillar A: Database & Models (VOL-03)
| Entity / Schema | Blueprint Specification | Existing Codebase | Gap Classification |
|---|---|---|---|
| User | Extended profile, KYC status, wallet, favorites, preferences | Minimal fields (name, email, phone, role) | **PARTIAL** |
| Property | Slugs, GPS coordinates, RERA, floor plans, moderation status, analytics | Basic properties (title, price, type, location) | **PARTIAL** |
| Partner / Vendor | KYC docs, business details, rating, service areas, bank info | None | **MISSING** |
| Lead & Activity | Source, score, pipeline stage, assigned agent, notes timeline | None | **MISSING** |
| Booking | Service type, scheduled date, address, vendor assigned, status | None | **MISSING** |
| Material & Orders | Catalog, SKU, categories, cart, shipping address, fulfillment | None | **MISSING** |
| Loan & Legal | Application details, credit score, loan amount, legal doc types | None | **MISSING** |
| Payment & Ledger | Razorpay order ID, payment ID, status, invoice URL, escrow | None | **MISSING** |
| Notification | In-app alerts, channel (SMS/WhatsApp/Push), read status | None | **MISSING** |
| Admin & AuditLog | Admin roles, IP address, action, target entity, timestamp | None | **MISSING** |
| CMS & Grievance | Banner slides, FAQs, dynamic pages, DPDP complaint tickets | None | **MISSING** |

---

### Pillar B: Backend Services & APIs (VOL-01, VOL-04, VOL-17)
| Route Group | Required Endpoints | Existing Status | Action Plan |
|---|---|---|---|
| `/api/v1/auth` | Login, Register, Google, OTP, Refresh, Me | Partial (basic auth exists) | Add standard response envelopes and role verification |
| `/api/v1/properties` | Search, Filters, Geo, Slug, Valuation, Create, Moderate | Partial (basic CRUD) | Add filters, slug lookup, inquiry capture, approval flags |
| `/api/v1/leads` | Capture, List, Detail, Update Stage, Assign, Add Note | Missing | Implement full CRM lead pipeline API |
| `/api/v1/bookings` | Create Booking, Get User Bookings, Vendor Dispatch | Missing | Implement service and interior booking API |
| `/api/v1/materials` | Get Catalog, Product Details, Create Order, Track | Missing | Implement materials catalog and ordering API |
| `/api/v1/loans` | Loan Eligibility, Submit Application, Legal Request | Missing | Implement finance & legal lead processing |
| `/api/v1/partners` | Onboarding, Verification, Profile, Assigned Jobs | Missing | Implement B2B partner management API |
| `/api/v1/admin` | Metrics, Moderation, User List, Partner KYC, CMS, Logs | Missing | Implement comprehensive admin controller & routes |
| `/api/v1/notifications` | Get In-App, Mark Read, Send System Alert | Missing | Implement notification controller |

---

### Pillar C: Frontend Web Application (VOL-02, VOL-05, VOL-06, VOL-08)
| Module / Page | Visual UI Status | API Integration Status | Required Fix |
|---|---|---|---|
| Homepage | Complete (100%) | Static / Mock | Connect QuickFinderWidget to live search & lead capture |
| Properties Page | Complete (100%) | Static Mock Array | Fetch from `/api/v1/properties` with query params |
| Post Property Modal | Complete (100%) | Console Log Only | POST to `/api/v1/properties` with token auth |
| Property Details Modal | Complete (100%) | Mock ID Lookup | Fetch `/api/v1/properties/:id` and submit live enquiry |
| Service Pages (Interiors, Construction, etc.) | Complete (100%) | Form alerts only | Submit quote request to `/api/v1/leads` / `/api/v1/bookings` |
| Materials Marketplace | Complete (100%) | Static Catalog | Connect to `/api/v1/materials` and live checkout |
| Auth Modal | Complete (100%) | Local Mock fallback | Store JWT in localStorage and sync with `AuthContext` |
| My Property Hub | Complete (100%) | Mock state | Load active user's posted listings and inquiries |

---

### Pillar D: Admin Panel (VOL-11)
| Feature | Blueprint Requirement | Current Codebase | Target Implementation |
|---|---|---|---|
| Admin Layout & Navigation | Collapsible sidebar, stats topbar, dark/light theme | Missing | Full responsive dashboard layout |
| Property Moderation Desk | Review pending listings, approve, reject with reason | Missing | Moderation table with preview modal & status toggle |
| Partner Verification Desk | Verify contractor/agent trade licenses & GST | Missing | KYC verification table with document viewer |
| CRM Lead Management Desk | Kanban / table view of leads, assign reps, log calls | Missing | Full lead pipeline with stage advancement & notes |
| Service & Material Orders | Order tracking, fulfill, cancel, assign technicians | Missing | Service & order fulfillment management desk |
| Analytics & Audit Logs | Real DB metrics (GMV, listings count, conversion rates) | Missing | Live aggregation cards & chronological audit trail |

---

## 3. Resolution Matrix
All identified gaps will be methodically resolved in accordance with the Execution Plan without replacing existing functional UI components.
