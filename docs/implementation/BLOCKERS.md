# ROOF RIDGE — BLOCKERS AND DEPENDENCY TRACKER

**Document Version:** 1.0.0  
**Updated:** 2026-10-12  

---

## 1. External Third-Party Dependencies

| Dependency | Required For | Status | Action / Workaround |
|---|---|---|---|
| **MongoDB Atlas** | Primary Persistence | ACTIVE | Connected and live on cluster `roofridge.ivajxzh.mongodb.net` |
| **Twilio SMS / WhatsApp** | OTP Verification | OPTIONAL / CONDITIONAL | Mock fallback OTP (`123456`) enabled in local dev when credentials are placeholder |
| **Google OAuth** | Social Sign-In | OPTIONAL / CONDITIONAL | Client ID present in `.env`; graceful demo fallback enabled |
| **Cloudinary** | Image & Document Storage | ACTIVE | Keys present in `Backend/.env`; base64/URL fallbacks supported |
| **Razorpay** | Online Payment Gateway | DEV SANDBOX | Key ID / Secret placeholders; sandbox test mode simulated safely |

---

## 2. Technical Blockers
- **None currently blocking execution.** All core modules can be implemented, persisted, and verified end-to-end.
