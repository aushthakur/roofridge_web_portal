# VOL-19: Payments, Billing & Finance Flows
## Roof Ridge — Enterprise Software Blueprint

---

## 19.1 Payment Architecture

### 19.1.1 Gateway Strategy

| Gateway | Use Case | Environment |
|---------|----------|------------|
| Razorpay | Primary — all B2C payments | Production |
| RazorpayX | Payouts to partners | Production |
| PayU | Backup gateway (auto-failover) | Production |
| Stripe | International payments (future) | Planned |
| Juspay | UPI orchestration (future) | Planned |

**Auto-failover Logic:**
```typescript
async function createPaymentOrder(amount: number, metadata: PaymentMeta) {
  try {
    return await razorpay.orders.create({ amount, currency: 'INR', ...metadata });
  } catch (err) {
    logger.warn('Razorpay unavailable, switching to PayU', err);
    return await payu.createOrder({ amount, ...metadata });
  }
}
```

### 19.1.2 Supported Payment Methods

| Method | Support | Commission | Refundable |
|--------|---------|-----------|-----------|
| UPI | ✅ | 0% | ✅ T+1 to T+3 |
| Credit Card (Visa/MC) | ✅ | 2% | ✅ T+3 to T+7 |
| Debit Card | ✅ | 0.9% | ✅ T+3 to T+7 |
| Net Banking | ✅ | 1.5% | ✅ T+3 to T+7 |
| Wallet (Paytm, PhonePe) | ✅ | 1.8% | ✅ T+1 to T+3 |
| EMI (Credit card) | ✅ | 2-3% | ✅ |
| EMI (No-cost) | ✅ (selected cards) | Subvented | ✅ |
| Wallet (Platform) | ✅ | 0% | ✅ Instant |
| Pay Later | ❌ (planned) | — | — |

---

## 19.2 Payment Flows — Detailed

### 19.2.1 Service Booking Payment

**Payment Timing Options (configurable per service category):**

| Option | Description | Use Case |
|--------|-------------|---------|
| Pay after service | Invoice sent post-completion | Most on-demand services |
| Pay upfront | Full amount at booking | Deep cleaning, pest control |
| Pay partial upfront | 30-50% advance + rest after | Interior design, construction |

**Pay After Service Flow:**
```
Booking Confirmed (no payment collected)
  ↓
Service Completed (partner marks complete + enters amount)
  ↓
Invoice Generated (auto, sent via WhatsApp + email)
  ↓
Payment Link Sent (Razorpay Payment Link)
  ↓
User Pays (UPI/Card)
  ↓
Partner Notified: "Payment received for BK-001234"
  ↓
Commission split: 80% queued for partner payout
```

**Pay Upfront Flow:**
```
Booking Confirmation Screen
  ↓
Payment Gateway (Razorpay checkout)
  ↓
Payment Success Webhook → Mark booking as paid
  ↓
Booking Status: Confirmed + Paid
  ↓
If Cancelled by Platform: Full refund initiated
  ↓
If Cancelled by User (>2hrs before): Full refund
  ↓
If Cancelled by User (<2hrs before): 50% refund
```

### 19.2.2 Material Order Payment

**Escrow Flow (large orders >₹50,000):**
```
User places order → Payment collected in escrow (held by Razorpay)
  ↓
Vendor ships material
  ↓
Delivery confirmed (user OTP or GPS confirmation)
  ↓
Escrow released to vendor (T+1)
  
If Dispute:
  User raises dispute within 48hrs of delivery
  Admin reviews evidence
  Escrow held during dispute
  Admin resolves → Release or refund
```

**Small orders (<₹50,000):**
```
Standard: Payment collected → Vendor paid weekly minus commission
```

### 19.2.3 Subscription Payment (AMC, B2B Plans)

**Razorpay Subscription API:**
```json
// Create subscription
{
  "plan_id": "plan_plumbing_amc_annual",
  "total_count": 1,            // Annual = 1 payment
  "customer_notify": 1,
  "start_at": "unix_timestamp",
  "addons": [],
  "notes": { "user_id": "usr_abc123", "plan": "amc_plumbing_annual" }
}
```

**Subscription Lifecycle:**
```
Created → Authenticated (mandate set) → Active → Renewal Attempt (auto)
  → Renewal Success → Active (extended)
  → Renewal Failure (3 attempts over 5 days) → Paused
  → User updates payment method → Retry
  → If still fails after 10 days → Cancelled
```

**Renewal Notifications:**
- 30 days before: Email + Push
- 7 days before: SMS + WhatsApp + Push
- 1 day before: Push + WhatsApp
- On renewal success: Email receipt
- On renewal failure: SMS + Email "Update payment method"

### 19.2.4 Loan Application Fee (if applicable)

- Processing fee collected only after loan approval
- Pre-approval: No fee
- Approval stage: Fee collected via payment link (bank-specific amount)
- Fee collected by: Partner bank (not Roof Ridge)
- Roof Ridge role: Facilitate, not collect

---

## 19.3 Refund Management

### 19.3.1 Refund Policy Matrix

| Scenario | Refund Amount | Timeline | Method |
|----------|--------------|---------|--------|
| Booking cancelled by user >2hrs | 100% | 3-5 business days | Original payment method |
| Booking cancelled by user <2hrs | 50% | 3-5 business days | Wallet credit (instant) OR original (3-5 days) |
| Booking cancelled by platform | 100% | 1 business day | Original method |
| Partner no-show | 100% | 1 business day | Wallet credit |
| Service quality dispute (upheld) | 50-100% | 5-7 business days | Original method |
| Material order rejected | 100% | 5-7 business days | Original method |
| Material damaged on delivery | 100% | 3-5 business days | Original method |
| Duplicate payment | 100% | 1 business day | Original method |
| Subscription cancelled mid-period | Pro-rata (monthly units) | 7 business days | Wallet credit |

### 19.3.2 Refund Processing Flow

**User-initiated (from app/web):**
```
Booking cancelled → Eligibility check (time window)
  → If eligible: Refund amount calculated
  → User selects: Original payment method OR Wallet credit
  → Razorpay refund API called (if original method)
  → Razorpay webhook: refund.processed → Update status
  → User notification: "₹850 refund initiated. Credit in 3-5 days."
```

**Admin-initiated:**
```
Admin reviews → Selects refund amount → Selects method
  → Confirmation modal (mandatory notes)
  → Razorpay refund API OR Wallet credit
  → Audit log created
  → User notification sent
```

**Razorpay Refund API:**
```typescript
await razorpay.payments.refund(paymentId, {
  amount: refundAmountInPaise,
  speed: 'optimum',           // 'normal' (T+5) or 'optimum' (instant for UPI)
  notes: { reason: 'Partner no-show', booking_id: bookingId },
  receipt: `REFUND-${Date.now()}`
});
```

---

## 19.4 Platform Wallet System

### 19.4.1 Wallet Architecture

**Balance stored in:** PostgreSQL `user_wallets` table  
**Ledger:** Every credit/debit creates a ledger entry (append-only)  
**Concurrency:** Pessimistic locking for balance updates (PostgreSQL `SELECT FOR UPDATE`)

```sql
-- Atomic balance deduction with lock
BEGIN;
SELECT balance FROM user_wallets WHERE user_id = $1 FOR UPDATE;
-- Check balance >= amount
UPDATE user_wallets SET balance = balance - $2 WHERE user_id = $1;
INSERT INTO wallet_transactions (...) VALUES (...);
COMMIT;
```

### 19.4.2 Wallet Transaction Types

| Type | Description | Effect |
|------|-------------|--------|
| `referral_reward` | Earned from referral | +₹500 (or configured) |
| `cashback` | Booking cashback | +amount |
| `refund` | Booking/order refund | +amount |
| `promo_credit` | Admin added credits | +amount |
| `service_payment` | Used for booking payment | -amount |
| `order_payment` | Used for material order | -amount |
| `withdrawal` | Bank transfer | -amount |
| `adjustment` | Admin correction | ±amount |

### 19.4.3 Wallet Withdrawal

**Minimum withdrawal:** ₹500  
**Maximum per day:** ₹50,000  
**Processing:** 1-2 business days (via IMPS)  
**KYC required:** Yes (for withdrawals)  
**Bank account required:** Yes  

**Withdrawal Flow:**
```
User requests withdrawal → KYC check → Bank account check
  → Admin approval (if >₹10,000)
  → RazorpayX payout API
  → Success: Wallet balance reduced, payout record created
  → User notification: "₹2,000 transferred to HDFC ****4321"
```

---

## 19.5 Partner Payouts

### 19.5.1 Payout Schedule

**Service Professionals:** Weekly (every Monday for previous week's completed bookings)  
**Property Dealers:** On conversion (commission model) OR monthly (subscription model)  
**Material Vendors:** Weekly (for delivered + confirmed orders)  
**Loan DSAs:** On disbursement (bank confirms → commission calculated)  

### 19.5.2 Payout Calculation

**Service Professional Payout:**
```
Gross Amount Collected from Customer: ₹1,200
Platform Fee (20%): -₹240
GST on Platform Fee (18% of ₹240): -₹43.20
Net Payout to Partner: ₹916.80
```

**Property Dealer Commission (if applicable):**
```
Transaction Value: ₹85,00,000
Commission Rate: 0.25% (platform fee per deal, paid by dealer)
Platform Revenue: ₹21,250
Note: Most dealer revenue is subscription-based
```

**Material Vendor Payout:**
```
Order Value: ₹14,750
Commission (8%): -₹1,180
GST on Commission: -₹212.40
Net Payout: ₹13,357.60
```

### 19.5.3 RazorpayX Payout API

```typescript
// Mass payout (weekly batch)
const payoutBatch = await razorpayX.payout.create({
  account_number: RAZORPAYX_ACCOUNT_NUMBER,
  fund_account_id: partner.razorpayx_fund_account_id,
  amount: netPayoutAmountInPaise,
  currency: 'INR',
  mode: 'IMPS',               // IMPS for instant, NEFT for large batches
  purpose: 'payout',
  queue_if_low_balance: true,
  reference_id: `PAYOUT-${partner.id}-${weekLabel}`,
  narration: `Roof Ridge Earnings - Week ${weekLabel}`,
  notes: {
    partner_id: partner.id,
    booking_ids: completedBookingIds.join(','),
    week: weekLabel
  }
});
```

**Payout Reconciliation:**
1. Generate payout batch every Monday morning (cron 7AM)
2. Batch file created (partner, amount, account)
3. Review by finance team (if total >₹10L: manual approval)
4. Batch submitted to RazorpayX
5. Webhooks received per payout: `payout.processed` → Mark complete
6. Failed payouts: Alert admin, retry with corrected bank details

---

## 19.6 GST Compliance

### 19.6.1 GST Configuration

**Roof Ridge GST Number:** Registered in all states where operating

**GST Rates Applicable:**

| Service | GST Rate | SAC Code |
|---------|---------|---------|
| Technology service fee (platform fee on bookings) | 18% | 998319 |
| Real estate agency service (lead facilitation) | 18% | 997212 |
| Construction services | 18% | 995411 |
| Interior design services | 18% | 998311 |
| Subscription (B2B plans) | 18% | 998312 |
| Material supply (cement, steel, etc.) | 28% (GST on product) | HSN specific |
| Insurance premium | Nil (tax exempt) | — |
| Home loan processing (facilitation) | 18% | 997129 |

### 19.6.2 Invoice Generation

**Auto-generated for every transaction:**

```
INVOICE
Roof Ridge Technologies Pvt Ltd
GSTIN: {GSTIN}
{Company address}

Invoice No: INV-2026-{sequence}
Date: {date}

BILL TO:
{User Name}
{User GSTIN if B2B}

DESCRIPTION             | QTY | RATE    | GST% | GST   | TOTAL
Platform service fee    |  1  | ₹1,000  | 18%  | ₹180  | ₹1,180
(Booking #BK-001234)

Subtotal: ₹1,000
GST (18%): ₹180
Total: ₹1,180

Payment: UPI — Jul 23, 2026
Transaction ID: pay_RzpAbc123
```

**GST Return Compliance:**
- Monthly GSTR-1 (outward supplies) — generated automatically
- Monthly GSTR-3B (summary) — generated automatically
- Annual GSTR-9 — generated automatically
- Data exported to chartered accountant's system monthly

---

## 19.7 Financial Dashboards (Admin)

### 19.7.1 Revenue Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ Revenue Dashboard — July 2026                                     │
│──────────────────────────────────────────────────────────────────  │
│ GROSS REVENUE                                                      │
│ Jul MTD: ₹42,50,000  | Full Month Est: ₹58,00,000 | MoM: +14%   │
│                                                                    │
│ REVENUE BREAKDOWN                                                  │
│ Services (booking commission): ₹18,50,000 (43.5%)               │
│ Subscriptions (B2B plans):    ₹12,50,000 (29.4%)                │
│ Materials (vendor commission): ₹6,50,000 (15.3%)                │
│ Listings (promoted/boost):    ₹3,50,000 (8.2%)                  │
│ Legal services:                ₹1,50,000 (3.5%)                  │
│──────────────────────────────────────────────────────────────────  │
│ DEDUCTIONS                                                         │
│ Refunds:     ₹1,20,000                                            │
│ Gateway fees: ₹89,500                                             │
│──────────────────────────────────────────────────────────────────  │
│ NET REVENUE: ₹40,40,500                                           │
│──────────────────────────────────────────────────────────────────  │
│ PAYOUTS DUE (This Week Batch)                                     │
│ Partners: ₹28,45,000 (142 partners)                               │
│ Status: ⏳ Pending Finance Approval                               │
│ [Preview Payout Batch] [Approve & Process]                        │
└────────────────────────────────────────────────────────────────────┘
```

---

## 19.8 Coupon & Discount System

### 19.8.1 Coupon Types

| Type | Description | Example |
|------|-------------|---------|
| `flat_off` | Fixed amount off | SAVE100 = ₹100 off |
| `percent_off` | Percentage discount with max cap | SAVE10 = 10% off, max ₹500 |
| `free_service` | Free visit/service | FREECLEAN1 = 1 free cleaning |
| `cashback` | Amount credited to wallet | CASHBACK20 = 20% cashback |
| `referral` | Referral code discount | RAHUL2026 = 5% off for referee |

### 19.8.2 Coupon Configuration

| Field | Type | Description |
|-------|------|-------------|
| code | string | Unique, uppercase, no spaces |
| type | enum | See types above |
| value | number | Amount or percentage |
| max_discount | number | Cap (for percent_off) |
| min_order_value | number | Minimum cart/order value |
| applicable_categories | array | Which service/product categories |
| applicable_cities | array | Which cities |
| usage_limit_global | number | Total uses across all users |
| usage_limit_per_user | number | Default: 1 |
| valid_from | datetime | |
| valid_until | datetime | |
| first_time_user_only | boolean | |
| is_active | boolean | |

### 19.8.3 Coupon Validation API

`POST /v1/cart/coupon/validate`

**Request:**
```json
{
  "coupon_code": "SAVE100",
  "order_value": 1500,
  "category": "plumbing",
  "city": "Delhi",
  "user_id": "usr_abc123"
}
```

**Backend Process:**
1. Find coupon by code (case-insensitive)
2. Check `is_active = true`
3. Check `valid_from <= now <= valid_until`
4. Check `min_order_value <= order_value`
5. Check `applicable_categories` includes this category
6. Check `applicable_cities` includes this city
7. Check user's usage count < `usage_limit_per_user`
8. Check global usage < `usage_limit_global`
9. If `first_time_user_only`: Check user has 0 completed orders
10. Calculate discount amount

**Response (Valid):**
```json
{
  "valid": true,
  "code": "SAVE100",
  "discount_type": "flat_off",
  "discount_amount": 100,
  "final_amount": 1400,
  "message": "₹100 discount applied!"
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "error_code": "COUPON_EXPIRED",
  "message": "This coupon has expired."
}
```

---

## 19.9 Financial Audit Controls

### 19.9.1 Dual-Control for Large Transactions

| Transaction Type | Single Approval | Dual Approval |
|----------------|----------------|--------------|
| Refund < ₹1,000 | Support agent | — |
| Refund ₹1,000–₹10,000 | Finance | — |
| Refund > ₹10,000 | Finance | + Super Admin |
| Partner payout batch < ₹5L | Finance | — |
| Partner payout batch ₹5L–₹20L | Finance | + Super Admin |
| Partner payout batch > ₹20L | Finance | + CEO |
| Wallet credit > ₹10,000 (manual) | Finance | + Super Admin |

### 19.9.2 Reconciliation Process

**Daily reconciliation (automated, 11 PM):**
```
1. Fetch all payments from Razorpay settlement report
2. Match against internal payment records
3. Flag discrepancies (amount mismatch, missing payments, extra payments)
4. Generate reconciliation report
5. Email to finance team
6. Discrepancies auto-create admin tickets for review
```

---

*Continue to VOL-20 — Legal, Compliance & Governance*
