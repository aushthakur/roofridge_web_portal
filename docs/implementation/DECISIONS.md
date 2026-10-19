# ROOF RIDGE — ARCHITECTURE DECISIONS RECORD (ADR)

**Document Version:** 1.0.0  
**Updated:** 2026-10-12  

---

## ADR-001: Unified Database Persistence via MongoDB Atlas
- **Status:** APPROVED & IMPLEMENTED
- **Context:** Blueprint VOL-03 describes a dual relational SQL (PostgreSQL/Prisma) and document (MongoDB) architecture. In the actual existing repository, the backend is actively connected to MongoDB Atlas cluster (`roofridge.ivajxzh.mongodb.net`) with Mongoose.
- **Decision:** Model all platform entities (Users, Partners, Properties, Leads, Bookings, Orders, Payments, Notifications, Grievances, CMS, AuditLogs) using strongly-typed Mongoose schemas with indexed references, strict validation rules, and population. This avoids destructive infrastructure migration, preserves live connectivity, and provides immediate production reliability.

---

## ADR-002: Standard API Response Envelope
- **Status:** APPROVED & IMPLEMENTED
- **Context:** Blueprint VOL-01 and VOL-04 mandate a consistent JSON envelope across all endpoints.
- **Decision:** Every backend endpoint must return responses adhering to:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Operation successful",
    "data": {},
    "meta": {},
    "error": null
  }
  ```
  Handled via `apiResponse.js` and `apiError.js`.

---

## ADR-003: Graceful Frontend Fallbacks with Live Backend Integration
- **Status:** APPROVED & IMPLEMENTED
- **Context:** The Frontend has extensive UI components already working with `mockData.js`. If the backend is restarting or under maintenance, the frontend must not crash.
- **Decision:** Centralized API service (`Frontend/src/services/api.js`) will query the live backend endpoints first. If a network interruption occurs, the frontend gracefully degrades to cached/initial mock structures, ensuring zero UI downtime while giving full persistence when connected.

---

## ADR-004: Unified Modern Admin Panel Architecture
- **Status:** APPROVED & IMPLEMENTED
- **Context:** Blueprint VOL-11 specifies a comprehensive multi-role admin desk. The `/Admin` directory was a bare Vite starter.
- **Decision:** Build an integrated React SPA inside `/Admin` utilizing the Roof Ridge design system tokens (`#FF5722`, `#2B4AE8`, slate neutrals, Lucide React icons) and connecting to the `/api/v1/admin/*` backend endpoints.
