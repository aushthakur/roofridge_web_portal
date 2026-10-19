# VOL-09: Loans, Insurance & Legal Services
## Roof Ridge — Enterprise Software Blueprint

---

## 9.1 Home Loans Module

### 9.1.1 Loan Landing Page

**URL:** `/loans/home-loan/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Loans & Insurance > Home Loan               │
│─────────────────────────────────────────────────────────────── │
│ H1: Home Loans Starting at 8.35% p.a. — Compare & Apply       │
│ Check eligibility instantly. Zero processing fee partners.     │
│─────────────────────────────────────────────────────────────── │
│ [ Check Loan Eligibility ] ← Primary CTA                      │
│─────────────────────────────────────────────────────────────── │
│ EMI CALCULATOR (embedded, pre-filled)                          │
│─────────────────────────────────────────────────────────────── │
│ PARTNER BANKS                                                  │
│ ┌──────────┬──────────┬──────────┬──────────┐                │
│ │ HDFC     │ SBI      │ ICICI    │ Axis     │                │
│ │ 8.35%    │ 8.50%    │ 8.40%    │ 8.45%    │                │
│ │ Up to 30y│ Up to 30y│ Up to 30y│ Up to 25y│                │
│ │ Up to ₹5Cr│Up to ₹5Cr│Up to ₹3Cr│Up to ₹2Cr│              │
│ │ [Apply]  │ [Apply]  │ [Apply]  │ [Apply]  │                │
│ └──────────┴──────────┴──────────┴──────────┘                │
│─────────────────────────────────────────────────────────────── │
│ ELIGIBILITY CHECKER                                            │
│─────────────────────────────────────────────────────────────── │
│ REQUIRED DOCUMENTS (accordion)                                 │
│─────────────────────────────────────────────────────────────── │
│ PROCESS (step-by-step visual)                                  │
│─────────────────────────────────────────────────────────────── │
│ LOAN ELIGIBILITY CALCULATOR                                    │
│─────────────────────────────────────────────────────────────── │
│ FAQs (8+ with schema)                                          │
│─────────────────────────────────────────────────────────────── │
│ DISCLAIMER: Loan approval subject to bank policies...          │
└─────────────────────────────────────────────────────────────────┘
```

### 9.1.2 Loan Eligibility Checker

**URL:** `/tools/loan-eligibility/` (also embedded on `/loans/home-loan/`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Check Your Loan Eligibility                                     │
│                                                                 │
│  Employment Type *                                             │
│  (•) Salaried  ( ) Self-Employed  ( ) Business Owner          │
│                                                                 │
│  Gross Monthly Income *                                        │
│  [₹  75,000                    ]                               │
│                                                                 │
│  Other Monthly Income (rent/freelance)                         │
│  [₹  0                         ]                               │
│                                                                 │
│  Existing EMIs (total per month) *                             │
│  [₹  8,000                     ]                               │
│                                                                 │
│  City *                                                        │
│  [ Delhi ▾ ]                                                   │
│                                                                 │
│  Credit Score (if known)                                       │
│  (•) 750+  ( ) 700-750  ( ) 650-700  ( ) <650  ( ) Not sure   │
│                                                                 │
│  Property Value (approx.)                                      │
│  [₹  85,00,000                 ]                               │
│                                                                 │
│  [ Check My Eligibility ]                                      │
└─────────────────────────────────────────────────────────────────┘
```

**Eligibility Result:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎉 Congratulations! You're Eligible!                            │
│                                                                 │
│  You can get a loan of up to:                                   │
│                                                                 │
│  ┌────────────────────────────────────────┐                    │
│  │         ₹ 52,00,000                    │                    │
│  │   Based on your income profile         │                    │
│  └────────────────────────────────────────┘                    │
│                                                                 │
│  Matched Bank Partners for You:                                │
│                                                                 │
│  HDFC Bank                                                     │
│  Rate: 8.35% | Up to ₹55L | EMI: ₹47,382/month               │
│  Processing: 0.5% (max ₹15,000)                               │
│  [Apply Now →]                                                 │
│                                                                 │
│  SBI Home Loan                                                 │
│  Rate: 8.50% | Up to ₹60L | EMI: ₹49,209/month               │
│  Processing: Nil (limited period)                              │
│  [Apply Now →]                                                 │
│                                                                 │
│  ICICI Bank                                                    │
│  Rate: 8.40% | Up to ₹50L | EMI: ₹47,950/month               │
│  Processing: 0.25%                                             │
│  [Apply Now →]                                                 │
│                                                                 │
│  [Improve Eligibility Tips]                                    │
└─────────────────────────────────────────────────────────────────┘
```

**API:** `POST /v1/loans/eligibility/check`

```json
// Request
{
  "employment_type": "salaried",
  "monthly_income": 75000,
  "other_income": 0,
  "existing_emi": 8000,
  "city": "Delhi",
  "credit_score_band": "750+",
  "property_value": 8500000
}

// Response
{
  "success": true,
  "data": {
    "eligible": true,
    "max_loan_amount": 5200000,
    "matched_products": [
      {
        "bank": "HDFC Bank",
        "bank_logo": "...",
        "rate": 8.35,
        "max_amount": 5500000,
        "emi_estimate": 47382,
        "processing_fee": "0.5%",
        "tenure_years": 20,
        "product_id": "loan_prod_hdfc_hl"
      }
    ],
    "factors": {
      "foir": 0.42,        // Fixed Obligation to Income Ratio
      "net_income": 75000,
      "emi_capacity": 31500  // 42% of income
    },
    "improvement_tips": [
      "Adding a co-applicant can increase eligibility by up to 40%",
      "Clearing existing EMIs can boost your eligible amount"
    ]
  }
}
```

---

### 9.1.3 Loan Application Flow

**Step 1: Select Loan Product**

- Pre-selected if coming from eligibility checker
- Show product comparison if not pre-selected

**Step 2: Personal & Financial Details**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | ✅ | 2-100 chars |
| Date of Birth | Date | ✅ | 21-65 years |
| PAN Number | Text | ✅ | Regex `[A-Z]{5}[0-9]{4}[A-Z]` |
| Aadhaar Number | Text | ✅ | 12 digits |
| Employment Type | Radio | ✅ | Enum |
| Employer Name | Text | Conditional | Required if salaried |
| Designation | Text | ❌ | |
| Gross Monthly Income | Number | ✅ | Min 15000 |
| Other Monthly Income | Number | ❌ | |
| Existing EMI | Number | ❌ | |
| CIBIL Score (self-reported) | Number | ❌ | 300-900 |
| Work Experience | Number | ✅ | In months |
| Current City | Select | ✅ | |
| Current Address | Textarea | ✅ | |
| Years at Current Address | Number | ✅ | |
| Co-applicant? | Radio | ❌ | Yes/No |

**Step 3: Property Details**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Property Status | Select | ✅ | Under Construction / Ready |
| Property Type | Select | ✅ | Flat/Villa/Plot/... |
| Property Location | Text | ✅ | Address |
| Seller/Builder Name | Text | ❌ | |
| Agreement Value | Number | ✅ | |
| Market Value (if different) | Number | ❌ | |
| RERA Number | Text | Conditional | Required for under-construction |

**Step 4: Loan Details**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Loan Amount Required | Slider/Number | ✅ | Min 5L, Max by eligibility |
| Loan Tenure | Slider | ✅ | 5-30 years |
| Purpose | Select | ✅ | Purchase/Construction/Improvement/Transfer |

**Step 5: Document Upload**

Required Documents:
- Aadhaar (front + back)
- PAN Card
- Last 3 months salary slips (salaried) / ITR (self-employed)
- Last 6 months bank statement
- Employer's ID card / appointment letter (salaried)
- Property agreement / allotment letter

Upload interface: Multi-file, drag & drop, progress per file

**Step 6: Review & Submit**

- Full application summary
- Declaration checkbox (mandatory)
- "Submit Application" button
- API: `POST /v1/loans/applications`
- Response: Application ID + tracking URL

**Post-Submit:**
- Application ID shown prominently
- Track status link emailed + pushed
- "Our loan advisor will call you within 2 hours"
- Lead created (source: loan_application)

---

### 9.1.4 Loan Application Status Tracking

**URL:** `/dashboard/loans/{application-id}/`

```
Application Status Timeline:
┌─────────────────────────────────────────────────────────────┐
│ Application: LA-2026-00234 (HDFC Home Loan)                 │
│─────────────────────────────────────────────────────────────│
│ ✅ Applied — Jul 20, 10:30 AM                               │
│ ✅ Under Review — Jul 20, 2:00 PM                           │
│ 🔄 Documents Pending — Jul 21 (Action Required)            │
│    ↳ Please upload: 6-month bank statement                 │
│    [Upload Now]                                             │
│ ⏳ Pre-Approval                                              │
│ ⏳ Approved                                                  │
│ ⏳ Disbursed                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 9.2 Property Insurance Module

**URL:** `/insurance/property-insurance/`

### 9.2.1 Insurance Types

| Type | Description | URL |
|------|-------------|-----|
| Home Structure Insurance | Covers building/structure | `/insurance/home-structure/` |
| Home Contents Insurance | Covers belongings inside | `/insurance/home-contents/` |
| Landlord Insurance | For rental property owners | `/insurance/landlord/` |
| Home Loan Borrower Insurance | Life cover for loan repayment | `/insurance/loan-borrower/` |

### 9.2.2 Insurance Premium Calculator

```
┌─────────────────────────────────────────────────────────────────┐
│ Home Insurance Premium Calculator                               │
│                                                                 │
│  Property Type: [Flat ▾]                                       │
│                                                                 │
│  Property Value: ₹[85,00,000      ]                            │
│                                                                 │
│  Coverage Amount: [Full Value ▾]                               │
│                                                                 │
│  Property Age: [1-5 Years ▾]                                   │
│                                                                 │
│  City: [Delhi ▾]                                               │
│                                                                 │
│  [ Calculate Premium ]                                         │
│                                                                 │
│  ─────────────────────────────────────────────                 │
│  Estimated Annual Premium:                                     │
│                                                                 │
│  HDFC ERGO — ₹3,850/year      [Get Quote]                     │
│  Bajaj Allianz — ₹4,200/year  [Get Quote]                     │
│  ICICI Lombard — ₹3,990/year  [Get Quote]                     │
│                                                                 │
│  ⚠️ Premiums are estimates. Final premium depends on property   │
│  inspection and insurer's underwriting.                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9.3 Loan Against Property (LAP) Module

**URL:** `/loans/loan-against-property/`

**Additional Fields vs Home Loan:**
- Property ownership proof (required)
- Existing loan on property? (if yes: outstanding amount)
- Purpose of LAP (Business/Personal/Education)

---

## 9.4 Legal & Documentation Services Module

**URL:** `/services/legal/`

### 9.4.1 Services Offered

| Service | Description | Price | Timeline |
|---------|-------------|-------|----------|
| Sale Deed Drafting | Legal sale deed preparation | ₹999 | 2-3 business days |
| Sale Agreement | Agreement to sell | ₹799 | 1-2 business days |
| Lease Agreement | Residential lease | ₹599 | 1 business day |
| Rent Agreement (e-Signed) | Digital, legally valid | ₹499 | Same day |
| Property Registration | Help with sub-registrar | ₹2,999 | As per registrar |
| Mutation Application | Transfer of ownership records | ₹1,499 | 5-7 business days |
| Property Tax Filing | Annual property tax | ₹799 | 2-3 business days |
| Legal Verification | Title search + legal opinion | ₹1,999 | 3-5 business days |
| Power of Attorney | Special/General POA | ₹1,299 | 2-3 business days |

### 9.4.2 Legal Service Booking Flow

**Step 1: Select Service**
- Service list with description, price, and estimated timeline
- "What's included" accordion

**Step 2: Property & Party Details**

For Sale Deed:
| Field | Required |
|-------|---------|
| Seller Name(s) | ✅ |
| Seller PAN | ✅ |
| Buyer Name(s) | ✅ |
| Buyer PAN | ✅ |
| Property Address | ✅ |
| Sale Consideration Value | ✅ |
| Possession Date | ✅ |
| Special Conditions | ❌ |

**Step 3: Document Upload**
- Title deed / previous deed
- Encumbrance certificate
- Property tax receipts
- Identity proofs of all parties

**Step 4: Doorstep Pickup Scheduling**
- "Would you like doorstep document pickup?"
- If yes: Select date, time slot, address
- Additional ₹199 for doorstep pickup

**Step 5: Payment & Confirmation**
- Payment via Razorpay
- Case ID generated
- Legal partner assigned within 2 hours

**Status Tracking:**
```
Submitted → Documents Received → Under Review → Draft Ready 
→ Review with Client → Revisions (if any) → e-Sign → Registered/Completed
```

### 9.4.3 e-Sign Integration (Digio)

**Digital Rent Agreement Flow:**
1. User fills agreement details
2. System generates agreement PDF
3. System initiates e-Sign via Digio API (server-side)
4. Both parties receive OTP-based e-Sign link on registered mobile
5. Parties sign on Digio portal
6. Signed document returned to Roof Ridge
7. Stored in both users' Document Vault
8. Tamper-proof, legally valid

**Digio API Calls (Server-Side Only):**
```
POST /v2/clients/create → Create signing client
POST /v2/sign/document → Initiate signing request
GET /v2/sign/document/{id}/status → Check signing status
```

---

## 9.5 Loan & Insurance Partner Management (Admin)

### 9.5.1 Partner Management

**URL:** `/admin/loan-insurance/partners/`

| Action | Fields |
|--------|--------|
| Add Partner | Name, Logo, Type (Bank/NBFC/Insurer), Contact, API credentials (encrypted), Commission structure |
| Edit | Any field |
| Activate/Deactivate | Toggle |
| View Performance | Applications assigned, approved, rejected, turnaround time |

### 9.5.2 Product Management

Each partner can have multiple products:

```
HDFC Bank:
  - Home Loan (up to ₹5Cr, 8.35%, 30yr max)
  - Home Improvement Loan (up to ₹50L, 8.75%)
  - Balance Transfer (8.25% + 0.5% processing)
```

**Auto-Matching Rules (Admin-configurable):**
- Min CIBIL score: 650 (configurable)
- Min income: ₹20,000/month (configurable)
- Eligible cities: JSON list
- Employment type: Salaried / Self-Employed / Both
- Property type: Residential / Commercial / Both
- Loan amount range: Min/Max

---

## 9.6 API: Loans & Insurance

### POST /v1/loans/applications

**Auth:** Required (KYC must be verified)

**Request:** Full loan application object (see 9.1.3)

**Backend Process:**
1. Validate all fields
2. Check KYC status (required)
3. Check existing active applications for same loan type
4. Create application in `draft` status
5. If all fields complete: Submit (`submitted` status)
6. Assign to loan DSA partner based on city + product
7. Notify DSA via push notification
8. Notify user with application ID

### GET /v1/loans/applications

**Auth:** Required

### GET /v1/loans/applications/:id

**Response includes:**
```json
{
  "data": {
    "id": "la_abc123",
    "application_number": "LA-2026-00234",
    "product": { "name": "HDFC Home Loan", "rate": 8.35 },
    "status": "documents_pending",
    "status_reason": "Please upload 6-month bank statement",
    "pending_documents": ["bank_statement_6m"],
    "submitted_at": "2026-07-20T10:30:00Z",
    "last_updated_at": "2026-07-21T14:00:00Z",
    "assigned_dsa": { "name": "Priya Sharma", "mobile": "987*****10" },
    "timeline": [
      { "status": "submitted", "at": "2026-07-20T10:30:00Z" },
      { "status": "under_review", "at": "2026-07-20T14:00:00Z" },
      { "status": "documents_pending", "at": "2026-07-21T14:00:00Z" }
    ]
  }
}
```

### POST /v1/insurance/quote

**Auth:** Optional

**Request:**
```json
{
  "insurance_type": "home_structure",
  "property_type": "flat",
  "property_value": 8500000,
  "property_age_years": 3,
  "city": "Delhi",
  "coverage_amount": 8500000
}
```

---

## 9.7 Rental Property Management Module

**URL:** `/dashboard/rental-management/` (for property owners)

### 9.7.1 Features

**For Property Owners:**
- Automated rent collection reminders (5 days before due date)
- Online rent payment portal for tenants
- Digital rent receipts (PDF)
- Maintenance request tracking
- Periodic inspection scheduling
- Agreement renewal alerts

**For Tenants:**
- Rent payment via UPI/Card
- Download rent receipts (for HRA claims)
- Submit maintenance requests (with photo)
- View agreement details

### 9.7.2 Automated Rent Agreement Generator

**URL:** `/tools/rent-agreement-generator/`

```
┌─────────────────────────────────────────────────────────────────┐
│ Generate Rent Agreement                                         │
│ Legally valid, e-Signed in minutes                             │
│─────────────────────────────────────────────────────────────── │
│ Property Address *                                             │
│ [                                                    ]         │
│                                                                 │
│ Landlord Details                                               │
│ Name: [          ] PAN: [          ] Aadhaar: [          ]    │
│                                                                 │
│ Tenant Details                                                 │
│ Name: [          ] PAN: [          ] Mobile: [          ]      │
│ [+ Add Co-tenant]                                              │
│                                                                 │
│ Agreement Terms                                                 │
│ Monthly Rent: ₹[      ] Security Deposit: ₹[      ]           │
│ Start Date: [        ] Duration: [11 Months ▾]                │
│ Rent Increment: [5% annually ▾]                                │
│                                                                 │
│ Special Conditions                                             │
│ [                                                    ]         │
│                                                                 │
│ [ Preview Agreement ] [ Generate & e-Sign — ₹499 ]            │
└─────────────────────────────────────────────────────────────────┘
```

**Stamping:** 
- 11-month agreements: Not stamp-duty applicable (most common)
- Longer agreements: Stamp duty calculation shown, e-Stamp purchased via gateway

---

## 9.8 Compliance & Disclaimers

### RERA Compliance Display

All property listing pages must show:
```
⚠️ RERA Disclaimer
This project/listing is RERA registered under RERA No. RERA/DL/GRP/2022/52.
Verify at: https://rera.delhi.gov.in [↗]
All information provided is for reference only. 
Buyers are advised to verify all details before making any investment decision.
```

### Loan/Insurance Disclaimer

```
⚠️ Disclaimer
The EMI calculations shown are indicative only and are subject to the 
lender's terms and conditions. Actual loan amount, interest rate, and 
EMI may vary. Roof Ridge acts as a marketplace and is not a financial 
institution. All loan applications are subject to the lender's credit 
assessment and approval criteria. Please read all loan documents 
carefully before signing.

IRDAI Registration: [Number] | IRDAI License: [Number]
```

### DPDP Data Collection Notice

Displayed at all lead capture forms:
```
📋 Data Collection Notice
By submitting this form, you consent to Roof Ridge Technologies Pvt. Ltd. 
collecting and processing your personal data for the purpose of connecting 
you with relevant property/service partners. Your data will be shared with 
matched partners to facilitate your inquiry. You can withdraw consent at 
any time from your account settings. [Learn More]
```

---

*Continue to VOL-10 — B2B App: Partner Flows*
