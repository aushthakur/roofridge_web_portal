# VOL-16: Infrastructure, DevOps & Security
## Roof Ridge — Enterprise Software Blueprint

---

## 16.1 Cloud Infrastructure

### 16.1.1 Cloud Provider

**Primary:** AWS (Amazon Web Services) — `ap-south-1` (Mumbai)  
**Secondary Region:** `ap-southeast-1` (Singapore) — DR/Failover

### 16.1.2 Infrastructure Architecture

```
                        ┌───────────────────────────────────────────┐
                        │  CloudFront CDN (Global Edge)             │
                        │  - Static assets                          │
                        │  - Image optimization                     │
                        │  - API caching (selected endpoints)       │
                        └───────────────────┬───────────────────────┘
                                            │
                        ┌───────────────────▼───────────────────────┐
                        │  Application Load Balancer (ALB)          │
                        │  - SSL termination (ACM certificate)      │
                        │  - Health checks                          │
                        │  - Rate limiting (WAF rules)              │
                        └─────┬─────────────┬────────────────┬──────┘
                              │             │                │
            ┌─────────────────▼─┐  ┌────────▼────────┐  ┌──▼──────────────┐
            │  ECS Fargate       │  │  ECS Fargate    │  │  ECS Fargate    │
            │  Node.js API       │  │  Python AI Svc  │  │  Admin Next.js  │
            │  (Auto-scaling)    │  │  (GPU instances)│  │  (Fixed)        │
            │  Min: 2, Max: 20  │  │  Min: 1, Max: 5 │  │  Min: 1, Max: 3 │
            └─────────┬─────────┘  └────────┬────────┘  └─────────────────┘
                      │                     │
            ┌─────────▼─────────────────────▼──────────────────┐
            │                  Data Tier                        │
            │  RDS PostgreSQL (Multi-AZ, db.r6g.xlarge)        │
            │  ElastiCache Redis (Cluster mode, 3 shards)       │
            │  MongoDB Atlas (M30, ap-south-1)                  │
            │  Elasticsearch (3-node, m6g.large)                │
            └────────────────────────────────────────────────────┘
```

### 16.1.3 AWS Services Used

| Service | Purpose | Tier |
|---------|---------|------|
| ECS Fargate | Container orchestration | Managed |
| ECR | Container registry | Managed |
| RDS PostgreSQL 15 | Primary database | Multi-AZ |
| ElastiCache Redis 7 | Caching + queues | Cluster Mode |
| S3 | File storage (KYC, photos, assets) | Standard + Glacier |
| CloudFront | CDN for S3 assets + API caching | Edge |
| ALB | Load balancing | Regional |
| WAF | Web application firewall | Regional |
| ACM | SSL certificates | Managed |
| Route 53 | DNS management | Global |
| SES | Transactional email (backup) | Regional |
| SQS | Message queuing (fallback for BullMQ) | Regional |
| SNS | Pub/Sub notifications (internal) | Regional |
| CloudWatch | Logs, metrics, alarms | Regional |
| Secrets Manager | API keys, credentials | Regional |
| KMS | Encryption key management | Regional |
| GuardDuty | Threat detection | Regional |
| Config | Resource compliance | Regional |
| Shield Standard | DDoS protection | Global (free tier) |
| X-Ray | Distributed tracing | Regional |

---

## 16.2 Container Architecture (Docker)

### 16.2.1 Service Containers

```dockerfile
# Node.js API Service
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3001/health || exit 1
USER node
CMD ["node", "dist/app.js"]
```

```dockerfile
# Python AI Service  
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 16.2.2 Resource Limits

| Service | CPU | Memory | Min Instances | Max Instances |
|---------|-----|--------|--------------|--------------|
| API Service | 1 vCPU | 2 GB | 2 | 20 |
| AI Service | 2 vCPU | 4 GB | 1 | 5 |
| Admin Panel | 0.5 vCPU | 1 GB | 1 | 3 |
| Worker (BullMQ) | 1 vCPU | 2 GB | 2 | 10 |
| Cron Service | 0.25 vCPU | 512 MB | 1 | 1 |

---

## 16.3 Auto-Scaling Configuration

### 16.3.1 API Service Scaling

**Trigger:** CPU > 70% OR Memory > 80% OR Request Queue > 100

**Scaling Policy:**
- Scale Out: Add 2 instances, wait 120s, evaluate again
- Scale In: Remove 1 instance every 5 minutes when CPU < 30%
- Cooldown: 120 seconds between scale actions
- Max scale-out event: Add 5 instances at once (burst)

**Pre-warming (Scheduled Scaling):**
- Monday–Friday 8AM: Scale to minimum 4 instances (pre-load)
- 11PM–7AM: Scale to minimum 2 instances (off-peak)

---

## 16.4 Database Configuration

### 16.4.1 PostgreSQL (RDS)

| Setting | Value |
|---------|-------|
| Engine | PostgreSQL 15.x |
| Instance | db.r6g.xlarge (4 vCPU, 32 GB RAM) |
| Multi-AZ | Yes (hot standby in different AZ) |
| Storage | 1TB gp3 SSD |
| Auto-scaling storage | Up to 5TB |
| Backup | Daily automated + transaction logs (PITR 7 days) |
| Maintenance | Sunday 3:00 AM – 4:00 AM IST |
| Encryption | AES-256 (KMS) |
| Parameter Group | `max_connections=200`, `work_mem=16MB`, `shared_buffers=8GB` |

**Read Replicas:**
- 1 read replica in same AZ (for analytics queries)
- Connection pooling: PgBouncer (pooler mode, max 100 connections)

**Backup Strategy:**
- Automated: Daily snapshot (kept 7 days)
- Manual: Weekly snapshot before major releases (kept 30 days)
- Cross-region copy: Weekly to ap-southeast-1 (kept 30 days)
- RTO: <30 minutes | RPO: <5 minutes

### 16.4.2 Redis (ElastiCache)

| Setting | Value |
|---------|-------|
| Version | Redis 7.0 |
| Mode | Cluster Mode Enabled |
| Shards | 3 |
| Nodes per shard | 1 primary + 1 replica |
| Total nodes | 6 |
| Instance type | cache.r6g.large (2 vCPU, 13 GB) |
| Encryption in transit | TLS |
| Encryption at rest | AES-256 |
| Backup | Daily snapshot, 1-day retention |

**Redis Key Naming Convention:**
```
property:{listing_id} → Property cache
search:{md5_of_query} → Search result cache
session:{session_id} → User session
otp:{mobile}:{purpose} → OTP storage
rate_limit:{ip}:{endpoint} → Rate limit counter
analytics:pv:{listing_id} → Page view counter
partner:available:{city}:{category} → Available partners
```

---

## 16.5 CI/CD Pipeline

### 16.5.1 Pipeline Architecture (GitHub Actions)

```
Push to branch → 
  └─ Lint check (ESLint + Prettier)
  └─ TypeScript compilation check
  └─ Unit tests (Jest)
  └─ Build Docker image
  └─ Push to ECR (branch tag)

Pull Request to main →
  └─ All above +
  └─ Integration tests
  └─ Security scan (Snyk)
  └─ SAST (Semgrep)
  └─ Code review required (1 reviewer)

Merge to main →
  └─ All above +
  └─ Deploy to Staging (auto)
  └─ E2E tests on staging (Playwright)
  └─ Manual approval gate for Production
  
Manual Approval → 
  └─ Deploy to Production (Blue-Green)
  └─ Smoke tests
  └─ Monitor 30 minutes
  └─ Auto-rollback if error rate >1%
```

### 16.5.2 Blue-Green Deployment

```
Current (Blue):                    New (Green):
ECS Service: api-blue              ECS Service: api-green
Target Group: blue-tg              Target Group: green-tg
                                   
ALB routing:
  Phase 1: Blue 100% / Green 0%
  Phase 2: Blue 90% / Green 10%  (canary — 10 min)
  Phase 3: Blue 0% / Green 100%  (full cutover)
  Phase 4: (10 min monitoring)
  Phase 5: Terminate Blue tasks
```

**Rollback Trigger (automatic):**
- 5xx error rate > 1% for any 60-second window
- P99 latency > 2000ms for any 60-second window
- Health check failures > 20% of instances

**Rollback Action:**
- ALB routing: Immediately 100% back to Blue
- Alert sent to on-call engineer
- PagerDuty incident created (Priority P1)

### 16.5.3 Database Migration Strategy

**Tool:** Prisma Migrate (zero-downtime migrations)

**Safe Migration Patterns:**
1. **Add column:** Safe, default value required
2. **Add table:** Safe always
3. **Add index:** Concurrent index creation (non-blocking)
4. **Rename column:** 3-phase: Add new → backfill → remove old
5. **Drop column:** 2-phase: Remove from code → then drop
6. **Remove table:** 2-phase: Remove from code → then drop

**Migration Approval:**
- Migrations reviewed in PR
- Complex migrations (affecting >1M rows) require DBA review
- Run on staging first, then production with monitoring

---

## 16.6 Security Architecture

### 16.6.1 Network Security

**VPC Configuration:**
- Isolated VPC (`10.0.0.0/16`)
- Public subnets: ALB, NAT Gateway only
- Private subnets: ECS tasks, RDS, ElastiCache
- Database subnet: RDS only, no internet access
- Security Groups: Least privilege (only required ports)

**Security Group Rules:**

| SG | Inbound | Outbound |
|----|---------|---------|
| `sg-alb` | 80, 443 from 0.0.0.0/0 | 3001 to `sg-api` |
| `sg-api` | 3001 from `sg-alb` only | 5432, 6379, 443 |
| `sg-rds` | 5432 from `sg-api` only | None |
| `sg-redis` | 6379 from `sg-api` only | None |

### 16.6.2 Application Security

**OWASP Top 10 Mitigations:**

| Threat | Mitigation |
|--------|-----------|
| A01: Broken Access Control | RBAC on every API endpoint, resource-level auth checks |
| A02: Cryptographic Failures | TLS 1.3, AES-256 for PII, bcrypt for OTPs |
| A03: Injection | Parameterized queries (Prisma), Zod input validation |
| A04: Insecure Design | Architecture review per feature, threat modeling |
| A05: Security Misconfiguration | IaC (Terraform), no default credentials, Secrets Manager |
| A06: Vulnerable Components | Snyk in CI/CD, Dependabot PRs |
| A07: Identification Failures | Rate limiting on auth, account lockout |
| A08: Integrity Failures | Signed Docker images, checksums |
| A09: Logging Failures | Centralized logging, all errors logged |
| A10: SSRF | No user-supplied URLs fetched server-side |

### 16.6.3 Data Encryption

| Data | At Rest | In Transit |
|------|---------|-----------|
| Database (PostgreSQL) | AES-256 (RDS KMS) | TLS 1.3 |
| Files (S3) | AES-256 (S3-KMS) | TLS 1.3 (HTTPS only) |
| Redis | AES-256 (ElastiCache KMS) | TLS 1.3 |
| Aadhaar numbers | AES-256 (app-level, column-level) | Encrypted at rest |
| PAN numbers | AES-256 (app-level, column-level) | Encrypted at rest |
| Bank account numbers | AES-256 (app-level) | Never returned in API responses |
| API keys / Secrets | AWS Secrets Manager | N/A |

**AES-256 Implementation:**
```typescript
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.FIELD_ENCRYPTION_KEY; // 32-byte hex key from Secrets Manager
const ALGORITHM = 'aes-256-gcm';

function encrypt(plaintext: string): string {
  const iv = randomBytes(12); // 96-bit IV
  const cipher = createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Store as: iv:tag:ciphertext (all hex-encoded)
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}
```

---

## 16.7 API Security

### 16.7.1 JWT Configuration

```typescript
// Access Token
{
  algorithm: 'HS256',
  expiresIn: '15m',
  issuer: 'roofridge.in',
  audience: 'api.roofridge.in',
  payload: {
    sub: 'usr_abc123',         // User ID
    role: 'user',               // user | admin | partner
    iat: 1721732454,            // Issued at
    jti: 'uuid-v4-unique'      // JWT ID (for revocation)
  }
}

// Refresh Token
{
  algorithm: 'HS256',
  expiresIn: '30d',
  payload: {
    sub: 'usr_abc123',
    session_id: 'sess_xyz',    // For session invalidation
    type: 'refresh'
  }
}
```

**Admin JWT:**
```typescript
{
  algorithm: 'HS512',  // Stronger for admin
  expiresIn: '8h',
  payload: {
    sub: 'admin_abc',
    role: 'operations',
    permissions: ['property.read', 'property.moderate', 'user.read'],
    require_2fa: true,
    ip: '103.21.x.x'  // Validate IP on each request
  }
}
```

### 16.7.2 WAF Rules (AWS WAF)

| Rule | Type | Action |
|------|------|--------|
| Rate limit: >1000 req/5min per IP | Rate-based | Block for 1 hour |
| SQL injection patterns | Managed rule group | Block |
| XSS patterns | Managed rule group | Block |
| Known bad bots | Managed rule group | Block |
| Geographic: Allow only India + priority countries | Geo rule | Block others (configurable) |
| IP reputation list | Managed rule group | Block |
| Large body (>10MB) | Size constraint | Block |

---

## 16.8 Monitoring & Alerting

### 16.8.1 Health Check Endpoints

**API Health:** `GET /health`
```json
{
  "status": "healthy",
  "version": "2.1.0",
  "uptime": 86400,
  "checks": {
    "database": "healthy",
    "redis": "healthy",
    "elasticsearch": "healthy",
    "ai_service": "healthy"
  },
  "timestamp": "2026-07-23T14:00:00Z"
}
```

### 16.8.2 CloudWatch Alarms

| Alarm | Metric | Threshold | Action |
|-------|--------|-----------|--------|
| API High Error Rate | 5xx errors / total requests | >1% for 5 min | PagerDuty P1 |
| API High Latency | P99 response time | >2000ms for 5 min | PagerDuty P2 |
| Database CPU | RDS CPU Utilization | >80% for 10 min | PagerDuty P2 |
| Database Connections | DB Connections | >180 (90% of 200) | PagerDuty P2 |
| Redis Memory | ElastiCache Memory | >80% | PagerDuty P2 |
| Disk Space | EBS Volume | >85% | Email alert |
| Failed Deployments | CodeDeploy | Any failure | PagerDuty P1 |
| WAF Blocked Spike | WAF Block events | >1000 in 5 min | PagerDuty P2 |
| Queue Depth | BullMQ queue size | >10,000 for 5 min | Slack alert |

### 16.8.3 Grafana Dashboards

**Infrastructure:**
- ECS task count + CPU/Memory per service
- RDS connections + query latency + replication lag
- Redis hit/miss ratio + memory + evictions
- Elasticsearch indexing rate + query time

**Application:**
- API request rate by endpoint
- Error rate by endpoint (4xx, 5xx)
- P50/P95/P99 latency per endpoint
- Queue depth per channel (SMS/Email/Push)
- AI service response time

---

## 16.9 Disaster Recovery Plan

### 16.9.1 Recovery Objectives

| Component | RTO (Recovery Time) | RPO (Data Loss) |
|-----------|--------------------|-----------------| 
| API Service | 5 minutes | 0 (stateless) |
| Database | 30 minutes | 5 minutes (PITR) |
| Redis | 10 minutes | 0 (rebuild from DB) |
| Elasticsearch | 20 minutes | 1 hour (snapshot) |
| S3 Files | Immediate | 0 (cross-region replication) |
| AI Service | 15 minutes | N/A (stateless) |

### 16.9.2 DR Playbook (Scenarios)

**Scenario 1: Single AZ failure**
- ECS automatically re-schedules tasks in healthy AZ
- RDS automatic failover to standby (2-3 min)
- ElastiCache replica promoted
- Expected downtime: <5 minutes

**Scenario 2: Full region failure (ap-south-1)**
- Route 53 health checks detect failure
- Route 53 failover: Switch DNS to ap-southeast-1 within 60 seconds
- ap-southeast-1 has warm standby (pre-seeded with latest backup)
- Expected downtime: 15-30 minutes

**Scenario 3: Database corruption**
- Stop all API traffic (maintenance mode)
- Identify last clean PITR point
- Restore RDS from PITR
- Replay missed transactions from logs (if available)
- Expected RTO: 30 minutes | RPO: <5 minutes

---

## 16.10 Security Incident Response

### 16.10.1 Incident Severity Levels

| Level | Criteria | Response SLA |
|-------|---------|-------------|
| P0 (Critical) | Data breach, production down | Immediate (24x7) |
| P1 (Major) | Partial outage, security exploit | <30 minutes |
| P2 (High) | Degraded service, suspicious activity | <2 hours |
| P3 (Medium) | Performance degradation, failed notifications | <8 hours |
| P4 (Low) | Non-critical bugs, minor issues | <48 hours |

### 16.10.2 Data Breach Response Protocol

1. **Detect** — GuardDuty / CloudWatch alert or user report
2. **Contain** — Revoke compromised credentials, block source IP
3. **Assess** — Identify scope of breach, data types affected
4. **Notify** — CERT-In within 6 hours (as required by IT Act)
5. **Notify Users** — If personal data compromised, notify affected users
6. **Remediate** — Patch vulnerability, rotate all credentials
7. **Post-Mortem** — Written report within 72 hours, lessons learned

**CERT-In Notification Template:**
```
Organization: Roof Ridge Technologies Pvt Ltd
Incident Type: [Unauthorized Access / Data Breach / DDoS]
Date/Time Detected: 
Description: 
Data Categories Affected: 
Number of Individuals Affected: 
Actions Taken: 
Contact: security@roofridge.in
```

---

## 16.11 Compliance & Certifications Roadmap

| Compliance | Applicability | Target |
|------------|--------------|--------|
| DPDP Act 2023 | Mandatory (India) | Before launch |
| IT Act 2000 / IT Rules 2021 | Mandatory | Before launch |
| PCI DSS Level 4 | Card payments (via Razorpay) | Razorpay handles |
| IRDAI Web Aggregator License | Insurance marketplace | Pre-launch |
| RERA Agent Registration | Property marketplace | Per state |
| ISO 27001 | Information security | Year 2 |
| SOC 2 Type II | If enterprise customers | Year 3 |

---

*Continue to VOL-17 — CRM System & Lead Management*
