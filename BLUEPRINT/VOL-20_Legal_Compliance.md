# VOL-20: Legal, Compliance & Governance
## Roof Ridge — Enterprise Software Blueprint

---

## 20.1 Digital Personal Data Protection (DPDP) Act 2023 Compliance

### 20.1.1 Core Principles & Platform Mapping
The Roof Ridge platform enforces Indian DPDP Act 2023 compliance across all services (Website, PWA, B2C, B2B Apps, Admin Panel).

| DPDP Principle | Platform Implementation |
|---|---|
| **Consent-Based Processing** | Consent architecture with granular check-boxes. No pre-ticked boxes for data processing. |
| **Purpose Limitation** | Data collected for property matches, service bookings, or loan applications is not cross-utilized for unrelated marketing without separate consent. |
| **Granular Revocation** | Users can revoke consent for specific categories (e.g., WhatsApp updates, marketing emails) via Profile Settings. |
| **Right to Correction & Erasure** | Dedicated self-service portal to update profile information or request permanent account deletion (with a 30-day recovery grace period). |
| **Data Localization** | All user and partner data (databases, files, backups, analytical stores) resides within AWS `ap-south-1` (Mumbai). |

### 20.1.2 Consent Manager Architecture

```
User Input Form → Consent Overlay Modal (Multi-Language)
                        │
                        ▼
            Consent Verification API (Node.js)
                        │
      ┌─────────────────┴─────────────────┐
      ▼                                   ▼
PostgreSQL `user_consents`        Audit Ledger
- Hashed User ID                  - Signed Hash
- Consent Type                    - IP Address
- Consent Timestamp               - User-Agent
- Purpose ID                      - Active Schema
```

**Consent Log Schema (`user_consents` table):**
- `id` (UUID)
- `user_id` (UUID, Foreign Key)
- `purpose_id` (VARCHAR) — e.g., `PROP_ENQUIRY_SHARE`, `LOAN_ELIGIBILITY_SUBMIT`, `SMS_NOTIFICATIONS`
- `status` (BOOLEAN) — `true` (Granted) / `false` (Revoked)
- `ip_address` (VARCHAR)
- `user_agent` (TEXT)
- `consent_text_snapshot` (TEXT) — Exact text displayed to user
- `timestamp` (TIMESTAMP WITH TIME ZONE)

---

## 20.2 Terms of Service & Privacy Policy Framework

### 20.2.1 Terms of Service Key Clauses
1. **User Eligibility:** 18+ years of age. Corporate accounts require proof of incorporation.
2. **Account Responsibility:** Dual-factor credentials security responsibility lies with the user. Sharing accounts on the B2B App violates platform policies.
3. **No-Brokerage Guarantee:** Details of Direct Owner listings. Broker listings must explicitly state broker fees or be flagged.
4. **Service Booking Policies:** Cancellation fees schedule, rescheduling limits, and dynamic pricing rules.
5. **Vendor Escrow Agreement:** Release conditions of payment to building material vendors (upon delivery OTP verification).
6. **Platform Liability:** Platform acts as an intermediary (facilitator) under Section 79 of the IT Act 2000. No liability for design execution of third-party builders, architects, or interior decorators.

### 20.2.2 Privacy Policy Structure
- **Information Collected:** Profile information, KYC documents, device details, GPS locations (on-demand), financial records.
- **Sharing of Data:** Shared strictly with matched service partners, bank partners (loans), and payment gateways. No sharing with third-party marketing brokers.
- **Children's Privacy:** Platform explicitly blocks minors.
- **Cookies & Tracking:** Details of PostHog, GA4, and Amplitude cookies. Users can opt out of behavioral cookies.

---

## 20.3 RERA Compliance

### 20.3.1 Builder and Broker Obligations
- **Broker Registration:** Every partner operating as a Property Dealer must supply their State RERA Registration Number.
- **Builder Project Listings:** RERA number is mandatory for all new projects.
- **Disclaimer Placement:** All listings contain a dynamic lookup disclaimer matching state RERA directories.

### 20.3.2 Automated Validation Workflows

```
Partner Inputs RERA Number → Form Validation (Regex match state format)
                                  │
                                  ▼
                    API Trigger (Queue worker)
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      ▼ (If State API Available)                              ▼ (Fallback)
Auto-lookup details                                Admin panel alert for
- Builder Name                                     manual checking
- Expiry Date
- Project Status
      │                                                       │
      └───────────────────────────┬───────────────────────────┘
                                  ▼
                  DB Update (rera_status = 'verified')
```

---

## 20.4 IRDAI (Insurance) Web Aggregator Compliance

### 20.4.1 Aggregator Guidelines
- **Product Display:** Direct display of home and content insurance premiums from partner insurers. No bias in product rankings.
- **Zero Commission Loading:** Premiums shown match public tariffs of insurers without platform loading.
- **Lead Transfer:** Insured details passed to partner portals securely via encrypted APIs.

---

## 20.5 Grievance Redressal Mechanism

### 20.5.1 Grievance Officer Details
In compliance with the IT Rules 2021:
- **Designation:** Grievance Officer
- **Contact Email:** `grievance@roofridge.in`
- **SLA:** Acknowledge receipt within 24 hours. Resolve within 15 days.

### 20.5.2 Escalation Matrix

```
Level 1: Ticket Filed (Customer Support) → Auto-acknowledgement (24 hours)
                                │
                                ▼
Level 2: Grievance Officer Review → Status update/Internal investigation (7 days)
                                │
                                ▼
Level 3: Legal & Compliance Audit → Mediation/Settlement/Final Ruling (15 days)
```

---

## 20.6 Compliance Reporting Dashboard

### 20.6.1 Features
- **Consent Logs Audit Tool:** View active consent history per user ID.
- **Erasure Logs (Right to be Forgotten):** Track queue of anonymization actions.
- **RERA Compliance Audits:** Reports of non-RERA listings blocked or flagged.
- **Grievance Resolution Metrics:** Average turnaround time calculations.

---

## 20.7 Platform Governance Rules

### 20.7.1 Content Moderation Standards
- No offensive language in descriptions or reviews.
- Strict OCR checks on listing media to block watermark contact details.
- Flagged listing reviews sent to manual queue.

### 20.7.2 Partner Sanctions Framework
- **Minor Offenses:** (e.g., late arrival, incomplete profile) → Warning notification.
- **Medium Offenses:** (e.g., listing properties not owned/exclusive without broker license) → Temporary suspension (7 days).
- **Major Offenses:** (e.g., payment request bypass escrow, KYC forgery, physical safety issues) → Permanent ban, blacklist mobile, report to local law enforcement.

---

## 20.8 Legal & Compliance APIs

### POST /v1/legal/consent

**Auth:** Required

**Request:**
```json
{
  "purpose_id": "PROP_ENQUIRY_SHARE",
  "status": true,
  "consent_text_snapshot": "I agree to share my contact information with matches."
}
```

### POST /v1/legal/grievance

**Auth:** Optional

**Request:**
```json
{
  "name": "Arjun Kumar",
  "email": "arjun@example.com",
  "mobile": "9876543211",
  "booking_id": "BK-2026-001234",
  "subject": "Delay in refund processing",
  "description": "Refund initiated but not credited for 10 days.",
  "attachments": ["s3://roofridge-media/grievance/invoice.pdf"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ticket_id": "GRV-2026-00045",
    "status": "received",
    "sla_acknowledgement_within_hours": 24,
    "sla_resolution_days": 15
  }
}
```

---

*This concludes VOL-20 and the Complete Enterprise Software Blueprint.*
