# Roof Ridge — Real Estate & Home Services SuperApp

Roof Ridge is India's first complete property and living services ecosystem platform, integrating property transactions (Buy, Rent, Sell, Commercial, Land), turnkey home construction, architectural services, building materials procurement, luxury interior design, on-demand home maintenance, home loan financing, and RERA legal compliance.

---

## Architecture & Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Customer Portal** | React 19, Vite, TailwindCSS, React Router v7, Lucide Icons, Axios | Responsive customer marketplace with compact executive layouts, interactive search, listing wizard, and calculators. |
| **Admin Operations Panel** | React 19, Vite, TailwindCSS, Lucide Icons, Axios | Comprehensive operations control desk with moderation queues, CRM lead pipeline, order fulfillment, and audit logging. |
| **Backend API Engine** | Node.js, Express 5, JWT, bcryptjs, Mongoose | Secure REST API with dual route mounting (`/api/v1/*` and `/api/*`), RBAC, and standard response envelopes. |
| **Database & Resilience** | MongoDB (Atlas & MongoMemoryServer) | 17 domain entities with automatic failover to embedded in-memory MongoDB engine with seed data. |

---

## Repository Structure

```
Roofridge/
├── BLUEPRINT/                 # 20-Volume Enterprise Specifications
├── Frontend/                  # Customer-Facing Web Portal (Port 5173)
│   ├── src/
│   │   ├── components/        # Navigation, Search, Modals, Sliders
│   │   ├── pages/             # 13 Category & Transaction Pages
│   │   └── services/          # Unified API Client (api.js)
├── Admin/                     # Operations Admin Panel (Port 5174)
│   ├── src/
│   │   ├── components/        # Sidebar, Header
│   │   └── views/             # 9 Operations Desks (Moderation, Leads, Orders, etc.)
├── Backend/                   # Core REST API Service (Port 5000)
│   ├── src/
│   │   ├── config/            # DB Connection & Initial Seed Data
│   │   ├── controllers/       # 10 Domain Controllers
│   │   ├── models/            # 17 Mongoose Models
│   │   ├── routes/            # 10 Express Routers
│   │   └── middlewares/       # Auth, RBAC, Error Handling
│   └── test_api_suite.js      # Automated 21-Point API Verification Runner
├── BLUEPRINT_COMPLIANCE.md    # Traceability Matrix against Blueprint
├── QA_REPORT.md               # Complete Test & Build Execution Report
├── HANDOVER_CHECKLIST.md      # Client Acceptance & Handover Guide
├── .env.example               # Safe Environment Template
└── .gitignore                 # Clean Version Control Rules
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Environment Setup
Copy the example environment files into each service:
```bash
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
cp Admin/.env.example Admin/.env
```
*(The backend runs out-of-the-box in development mode without external database configuration).*

### 3. Installation
```bash
# Install Backend dependencies
cd Backend && npm install

# Install Frontend dependencies
cd ../Frontend && npm install

# Install Admin dependencies
cd ../Admin && npm install
```

### 4. Running the Development Servers

```bash
# Terminal 1: Start Backend (Port 5000)
cd Backend && npm run dev

# Terminal 2: Start Customer Portal (Port 5173)
cd Frontend && npm run dev

# Terminal 3: Start Admin Panel (Port 5174)
cd Admin && npm run dev
```

### 5. Running Automated Verification Tests
```bash
cd Backend
npm test
# Executes all 26 integration & RBAC regression tests against the running API engine
```

### 6. Running Production Security Gate Verification
```bash
cd Backend
node test_production_security.js
# Confirms that NODE_ENV=production blocks OTP bypasses, blocks admin escalation, and rejects ephemeral database fallback
```

### 7. Production Builds
```bash
# Build Frontend
cd Frontend && npm run build

# Build Admin Panel
cd ../Admin && npm run build
```

---

## Default Administrative Access (Development & Staging Only)

> [!NOTE]
> The credentials below are **strictly for local development and staging environments** (`NODE_ENV !== 'production'`). When deployed in production mode, OTP bypass codes are rejected and require live SMS verification.

- **Login URL:** `http://localhost:5174/`
- **Phone:** `9999999999`
- **Default Dev OTP:** `1234`
- **Role:** Administrator (`superadmin` privileges)

---

## Handover Documents

- [BLUEPRINT_COMPLIANCE.md](file:///Users/apple/Coding/Roofrdige/BLUEPRINT_COMPLIANCE.md) — Comprehensive requirements traceability matrix.
- [QA_REPORT.md](file:///Users/apple/Coding/Roofrdige/QA_REPORT.md) — Build, integration, and security verification results.
- [HANDOVER_CHECKLIST.md](file:///Users/apple/Coding/Roofrdige/HANDOVER_CHECKLIST.md) — Production readiness and acceptance checklist.
