# VOL-13: AI Engine & Recommendation System
## Roof Ridge — Enterprise Software Blueprint

---

## 13.1 AI Architecture Overview

### 13.1.1 Technology Stack

| Component | Technology |
|-----------|-----------|
| ML Framework | Python 3.11 + scikit-learn + PyTorch |
| Serving | FastAPI (separate Python microservice)            |
| Model Registry | MLflow                    |
| Feature Store | Redis (real-time) + PostgreSQL (historical) |
| Training Pipeline | Apache Airflow DAGs |
| GPU Training | AWS SageMaker / Google Colab (for large models) |
| Recommendation Engine | Hybrid: Collaborative Filtering + Content-Based |
| NLP / Embeddings | Sentence Transformers (multilingual) |
| OCR | Google Vision API + Tesseract (fallback)     |
| Valuation Model | Gradient Boosting (XGBoost)      |
| Lead Scoring | Logistic Regression + Random Forest |
| Fraud Detection | Isolation Forest + Rule Engine |

### 13.1.2 AI Service Architecture

```
User Request → Node.js API Gateway → Python AI Service (FastAPI)
                                              │
                      ┌───────────────────────┴──────────────────────┐
                      │              AI Modules                      │
                      │  /ai/valuation     → Valuation Engine        │
                      │  /ai/recommend     → Recommendation Engine   │
                      │  /ai/lead-score    → Lead Scoring Model      │
                      │  /ai/search-rank   → Search Re-ranking       │
                      │  /ai/fraud-check   → Fraud Detection         │
                      │  /ai/price-trend   → Price Trend Forecasting │
                      │  /ai/ocr           → Document OCR            │
                      │  /ai/chatbot       → AI Chat Assistant       │
                      └────────────────────────────────────────────── 
```

**AI Service Base URL:** `http://ai-service:8000` (internal, not exposed to public)

---

## 13.2 Property Valuation Engine

### 13.2.1 Model Architecture

**Algorithm:** Gradient Boosted Trees (XGBoost)

**Input Features:**

| Feature | Type | Description |
|---------|------|-------------|
| `locality_code` | Categorical | Encoded locality |
| `city_code` | Categorical | Encoded city |
| `bhk_type` | Categorical | 1BHK/2BHK/3BHK/... |
| `super_built_up_area` | Float | In sqft |
| `carpet_area` | Float | In sqft |
| `floor_number` | Int | Floor number |
| `total_floors` | Int | Total floors in building |
| `age_years` | Float | Age of property |
| `facing` | Categorical | North/South/East/West |
| `furnishing_status` | Categorical | |
| `amenities_score` | Float | Count of premium amenities / total |
| `metro_distance_km` | Float | Distance to nearest metro |
| `school_within_2km` | Int | Count of schools within 2km |
| `hospital_within_3km` | Int | Count of hospitals within 3km |
| `locality_demand_index` | Float | Computed 0-1 score (views/listings ratio) |
| `comparable_avg_price` | Float | Avg price of recent sales in same locality, same BHK |
| `month_of_year` | Int | Seasonality factor |

**Output:**
```json
{
  "estimated_value": 8500000,
  "value_min": 7800000,
  "value_max": 9200000,
  "confidence_score": 87.5,
  "key_factors": [
    { "factor": "locality_premium", "impact": "+8.2%", "description": "Dwarka Sector 12 commands a 8.2% premium" },
    { "factor": "metro_proximity", "impact": "+5.1%", "description": "Metro station within 800m" },
    { "factor": "age_discount", "impact": "-3.5%", "description": "Property 3 years old" }
  ],
  "comparable_sales": [
    { "area": 1180, "price": 8200000, "date": "2026-06-15", "locality": "Dwarka Sector 12" }
  ]
}
```

### 13.2.2 Training Data

**Data Sources:**
- Historical closed listings (price + final sale value)
- Real estate transaction data (government registrar APIs where available)
- User-reported sale prices (cross-validated)
- Market reports (processed quarterly)

**Training Frequency:** Monthly retraining with new data

**Validation:** 80/20 train-test split; MAPE (Mean Absolute Percentage Error) target <8%

### 13.2.3 Price Trend Forecasting

**Model:** LSTM (Long Short-Term Memory) neural network

**Input:** 24-month price history per (locality, BHK type) pair

**Output:**
```json
{
  "locality": "Dwarka Sector 12",
  "bhk_type": "3BHK",
  "current_avg": 6800,
  "trend_3m": "+2.1%",
  "trend_6m": "+4.2%",
  "trend_12m": "+11.5%",
  "forecast_3m": "+2.8%",
  "forecast_6m": "+5.1%",
  "confidence": 0.78,
  "trend_direction": "rising"
}
```

---

## 13.3 Property Recommendation Engine

### 13.3.1 Algorithm

**Hybrid approach (weighted combination):**
1. **Content-Based Filtering (40%):** Match user preferences (city, BHK, budget) with property attributes
2. **Collaborative Filtering (40%):** "Users similar to you also saved/enquired about these"
3. **Popularity Boost (20%):** Recently viewed, saved, and enquired properties boosted

### 13.3.2 User Feature Vector

Computed for each authenticated user:

```python
user_features = {
    "preferred_city": "Delhi",
    "preferred_localities": ["Dwarka", "Rohini"],
    "bhk_preferences": [2, 3],           # Most searched BHK types
    "budget_min_p25": 4500000,            # 25th percentile of searches
    "budget_max_p75": 11000000,           # 75th percentile
    "property_types": ["flat"],
    "furnishing_preference": "semi_furnished",
    "avg_view_time_secs": 45,             # Time spent on listings
    "saves_count": 5,
    "enquiries_count": 3,
    "engagement_score": 0.72,
    "last_active": "2026-07-23T14:00:00Z"
}
```

### 13.3.3 Recommendation API

**Endpoint:** `POST /ai/recommend/properties`

**Request:**
```json
{
  "user_id": "usr_abc123",
  "context": "homepage",
  "exclude_ids": ["prop_123", "prop_456"],
  "limit": 6
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "listing_id": "prop_xyz789",
      "score": 0.94,
      "reason": "Matches your preference for 3BHK in Dwarka under ₹1Cr"
    }
  ],
  "recommendation_type": "personalized",
  "model_version": "rec_v2.1"
}
```

**Contexts:**
- `homepage` → Personalized properties section
- `property_detail` → "Similar Properties" section
- `post_save` → "You might also like" sheet
- `post_enquiry` → "Related properties from same dealer"

---

## 13.4 Lead Scoring Model

### 13.4.1 Input Features

| Feature | Description | Weight |
|---------|-------------|--------|
| Source quality | Homepage > Ad > SEO > Social | High |
| Time of enquiry | Working hours = higher intent | Medium |
| Budget clarity | Specific budget = higher intent | High |
| Timeline urgency | ASAP vs 6 months | High |
| Mobile verification | OTP-verified = higher trust | High |
| City match | Queried city = partner's coverage | High |
| Previous enquiries | How many times enquired before | Medium |
| Days since last contact | Freshness | High |
| Profile completion | Name + email provided | Low |
| Property price match | Budget matches property range | High |

### 13.4.2 Scoring Output

**Score:** 0–100 integer

| Range | Classification | Behavior |
|-------|---------------|---------|
| 70–100 | 🔴 HOT | Priority assignment, SMS alert to partner |
| 40–69 | 🟡 WARM | Normal assignment |
| 0–39 | 🔵 COLD | Lower priority, pooled assignment |

**API:** `POST /ai/lead-score`
```json
// Request
{
  "lead_id": "lead_abc123",
  "source": "property_enquiry",
  "budget_min": 8000000,
  "budget_max": 12000000,
  "timeline": "3_months",
  "mobile_verified": true,
  "city": "Delhi",
  "hour_of_day": 14
}

// Response
{
  "score": 82,
  "classification": "hot",
  "top_factors": ["verified_mobile", "clear_budget", "property_enquiry_source"],
  "recommended_callback_time": "Within 30 minutes"
}
```

---

## 13.5 Search Personalization & Re-ranking

### 13.5.1 Base Ranking (Elasticsearch)

1. Text relevance score (BM25)
2. Boosted: Featured listings (3x), Verified (1.5x), Subscription tier

### 13.5.2 AI Re-ranking Layer

After Elasticsearch returns top-50 results, AI re-ranking applied:

**Signals Used:**
- User's BHK history (prefer results matching most-searched BHK)
- User's price band (prefer listings within usual search range)
- Partner quality score (verified, high rating, fast response time)
- Listing freshness (newer listings slightly boosted)
- Diversity: Ensure locality diversity (don't show all results from 1 locality)

**Implementation:**
```python
def rerank(listings: List[Listing], user: User) -> List[Listing]:
    for listing in listings:
        # Personal preference score (0-1)
        pref_score = compute_preference_score(listing, user.preferences)
        
        # Partner quality score (0-1)
        quality_score = listing.partner_rating / 5.0 * listing.response_rate
        
        # Diversity penalty (reduce score if same locality as top result)
        diversity_penalty = compute_diversity_penalty(listing, selected_listings)
        
        listing.final_score = (
            0.4 * listing.es_score_normalized +
            0.3 * pref_score +
            0.2 * quality_score +
            0.1 * listing.recency_score
        ) * (1 - diversity_penalty)
    
    return sorted(listings, key=lambda l: l.final_score, reverse=True)
```

---

## 13.6 Fraud Detection System

### 13.6.1 Listing Fraud Detection

**Rule-Based Checks (synchronous, blocking):**
| Check | Rule | Action |
|-------|------|--------|
| Phone in photo | Google Vision OCR detects phone number in image | Auto-reject |
| Price anomaly | Price >50% below locality average | Flag for review |
| Duplicate listing | Same address, same BHK, same owner, within 30 days | Flag, notify |
| Competitor URL | Description contains competitor domain names | Remove URLs, flag |
| PAN/Aadhaar in photo | OCR detects sensitive number in images | Block, secure delete |

**ML-Based Checks (async, 5-min window):**
| Check | Model | Action |
|-------|-------|--------|
| Listing quality | Image quality classifier | Low-quality photo warning to user |
| Description quality | NLP: checks for spam patterns | Low-quality flag |
| Fake testimonials | Pattern detection | Flag for review |

### 13.6.2 User Fraud Detection

**Signals:**
- Multiple accounts from same IP
- Multiple accounts sharing same PAN/Aadhaar hash
- Unusual activity pattern (100+ searches in 5 minutes)
- Rapid lead captures from same IP

**Isolation Forest Model:**
- Trained on normal user behavior features
- Anomaly score > 0.7 → Flag account for review
- Anomaly score > 0.9 → Auto-suspend, alert super_admin

---

## 13.7 AI Document OCR System

### 13.7.1 Aadhaar OCR

**API:** Google Vision API (primary) + Tesseract (fallback)

**Extracted Fields:**
- Full Name (from Aadhaar)
- Date of Birth
- Gender
- Aadhaar Number (12 digits)
- Address

**Cross-validation:**
- Compare extracted name vs user-provided name in profile
- Match score < 80% → Flag for manual review

**Security:**
- OCR result stored encrypted in DB
- Raw image stored in private S3 (user-specific folder)
- Aadhaar number stored as: `SHA256(aadhaar) + AES256(aadhaar)` separately

### 13.7.2 PAN OCR

**Extracted Fields:**
- Name on PAN
- PAN Number
- Date of Birth
- Father's Name

**Validation:**
- PAN format regex check
- Name match with profile > 70%

---

## 13.8 AI Chatbot (RidgeBot)

### 13.8.1 Overview

| Attribute | Value |
|-----------|-------|
| **Visible As** | Chat bubble on website + B2C App |
| **Technology** | LLM (GPT-4o via OpenAI API) + RAG (Retrieval Augmented Generation) |
| **Context Window** | Last 10 conversation turns |
| **Handoff** | Escalate to human support after 3 unresolved turns |
| **Languages** | English + Hindi |

### 13.8.2 Knowledge Base (RAG)

**Sources indexed:**
- Platform FAQ (200+ Q&As)
- Booking SOP documents
- City-specific property guides
- Loan process documents
- Legal service descriptions

**Indexing:**
- Chunked into 512-token segments
- Sentence-BERT embeddings
- Stored in Pinecone vector DB

### 13.8.3 Intent Classification

| Intent | Example | Response |
|--------|---------|---------|
| `property_search` | "3BHK in Dwarka under 80L" | Direct to search with pre-filters |
| `booking_help` | "How do I book a plumber?" | Step-by-step booking guide |
| `booking_status` | "Where is my plumber?" | Fetch booking status via API |
| `loan_inquiry` | "What documents for home loan?" | Document checklist |
| `complaint` | "Partner didn't come" | Escalation flow + ticket creation |
| `general_faq` | "Do you operate in Noida?" | FAQ retrieval |
| `fallback` | Unrecognized | "Let me connect you with our support team" |

### 13.8.4 Chatbot API

**Endpoint:** `POST /ai/chatbot/message`

**Request:**
```json
{
  "session_id": "chat_xyz123",
  "user_id": "usr_abc123",
  "message": "I need a plumber in Dwarka today",
  "context_type": "property_detail",
  "context_id": "prop_xyz789"
}
```

**Response:**
```json
{
  "reply": "I can help you book a plumber in Dwarka! We have 8 professionals available right now. When would you like the service?",
  "suggestions": ["ASAP (today)", "Later today", "Tomorrow"],
  "action": {
    "type": "show_booking_flow",
    "data": { "category": "plumber", "city": "Delhi", "locality": "Dwarka" }
  },
  "is_handoff": false
}
```

---

## 13.9 Automated Notification Intelligence

### 13.9.1 Smart Timing

Instead of sending notifications at fixed times, AI predicts optimal send time per user:

**Model:** User activity pattern clustering
- Track: Hours when user opens app
- Classify: Morning user / Evening user / Late night / Irregular
- Schedule: Send notifications within predicted active window

**Implementation:**
```python
def get_optimal_send_time(user_id: str, notification_type: str) -> datetime:
    user_pattern = get_user_activity_pattern(user_id)  # from analytics
    
    if notification_type == "promotional":
        return user_pattern.peak_activity_hour + timedelta(minutes=random.randint(0, 30))
    elif notification_type == "transactional":
        return datetime.now()  # Always immediate
    elif notification_type == "reminder":
        return user_pattern.morning_check_time
```

### 13.9.2 Churn Prevention

**Signals for churn risk:**
- No login in 14 days
- No search in 7 days
- Saved properties not viewed in 10 days
- Incomplete booking flow

**Intervention:**
- Day 7: "We found 3 new properties matching your search" push + email
- Day 10: "Prices dropped in your saved localities!" push
- Day 14: Re-engagement campaign with personalized property suggestions

---

## 13.10 AI APIs — Complete Reference

| Endpoint | Method | Input | Output |
|----------|--------|-------|--------|
| `/ai/valuation` | POST | Property features | Valuation estimate + factors |
| `/ai/price-trend` | POST | Locality + BHK type | 24-month trend + forecast |
| `/ai/recommend/properties` | POST | User ID + context | Property recommendations |
| `/ai/recommend/services` | POST | User ID + location | Service recommendations |
| `/ai/lead-score` | POST | Lead attributes | Score + classification |
| `/ai/search-rerank` | POST | User ID + listings | Re-ranked listings |
| `/ai/fraud-check/listing` | POST | Listing data | Fraud signals |
| `/ai/fraud-check/user` | POST | User behavior | Anomaly score |
| `/ai/ocr/aadhaar` | POST | Image URL | Extracted fields |
| `/ai/ocr/pan` | POST | Image URL | Extracted fields |
| `/ai/chatbot/message` | POST | Message + context | Reply + action |
| `/ai/optimal-send-time` | GET | User ID | Optimal datetime |
| `/ai/churn-risk` | GET | User ID | Risk score + recommendations |

---

## 13.11 Model Monitoring & Drift Detection

### 13.11.1 Metrics Tracked

| Model | Metric | Alert Threshold |
|-------|--------|----------------|
| Valuation Engine | MAPE | >10% |
| Lead Scoring | F1 Score | <0.70 |
| Fraud Detection | Precision | <0.80 |
| Recommendation | CTR | <5% |
| Chatbot | Resolution Rate | <60% |

### 13.11.2 Monitoring Setup

- **MLflow:** Model versioning and experiment tracking
- **Evidently AI:** Data drift and model performance monitoring
- **Alerting:** PagerDuty integration for critical metric drops
- **Dashboard:** `/admin/analytics/ai-performance/` for admin visibility

### 13.11.3 Retraining Schedule

| Model | Frequency | Trigger |
|-------|-----------|---------|
| Valuation Engine | Monthly | Cron + MAPE > 8% |
| Price Trend | Weekly | Cron |
| Lead Scoring | Bi-weekly | Cron + F1 < 0.72 |
| Recommendation | Daily (incremental) | Cron |
| Fraud Detection | Weekly | Cron |
| Chatbot | On-demand | New FAQ added |

---

*Continue to VOL-14 — Notification System (All Channels)*
