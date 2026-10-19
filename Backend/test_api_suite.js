/**
 * Roof Ridge SuperApp — Automated API Verification Test Suite
 * Tests all core backend endpoints across Auth, Properties, Moderation,
 * CRM Leads, Bookings, Materials, Finance, Partners, and CMS.
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = new URL(BASE_URL + endpoint);
  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            resolve({ status: res.statusCode, data });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n============================================================');
  console.log('   ROOF RIDGE API VERIFICATION TEST SUITE (PHASE 8)');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;
  let adminToken = '';
  let testPropertyId = '';
  let testLeadId = '';
  let testOrderId = '';

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} — ${details}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await request('/health');
    assert(health.status === 200 && health.data?.success === true, 'Health check endpoint (/api/v1/health)');

    // 2. Auth: OTP Send
    const otpSend = await request('/auth/send-otp', {
      method: 'POST',
      body: { phone: '9999999999' },
    });
    assert(otpSend.status === 200 && otpSend.data?.success === true, 'Auth: Send OTP (/auth/send-otp)');

    // 3. Auth: Verify OTP for Admin
    const otpVerify = await request('/auth/verify-otp', {
      method: 'POST',
      body: { phone: '9999999999', otp: '1234' },
    });
    assert(otpVerify.status === 200 && otpVerify.data?.data?.token, 'Auth: Verify OTP and return JWT (/auth/verify-otp)');
    adminToken = otpVerify.data?.data?.token || '';

    const authHeaders = { Authorization: `Bearer ${adminToken}` };

    // 4. Properties: Public Listing
    const props = await request('/properties?type=buy&limit=5');
    assert(props.status === 200 && Array.isArray(props.data?.data), 'Properties: Get listings with filters (/properties)');

    // 5. Properties: Create New Property
    const newProp = await request('/properties', {
      method: 'POST',
      headers: authHeaders,
      body: {
        title: 'ATS Greens Test Suite Property',
        description: 'Automated test luxury villa in Greater Noida with golf course view.',
        price: 25000000,
        priceDisplay: '₹2.50 Cr',
        type: 'buy',
        propertyType: 'residential',
        subType: 'villa',
        bhk: 4,
        location: {
          city: 'Noida',
          locality: 'Sector 150',
          state: 'Uttar Pradesh',
        },
        features: { areaSqFt: 2800, bedrooms: 4, bathrooms: 4 },
        approvalStatus: 'pending',
      },
    });
    assert(newProp.status === 201 && newProp.data?.data?._id, 'Properties: Create new property listing (/properties)');
    testPropertyId = newProp.data?.data?._id || '';

    // 6. Admin: Overview Metrics
    const overview = await request('/admin/overview', { headers: authHeaders });
    assert(overview.status === 200 && overview.data?.data?.metrics?.totalProperties >= 1, 'Admin: Overview metrics (/admin/overview)');

    // 7. Admin: Moderate Property (Approve)
    if (testPropertyId) {
      const moderate = await request(`/admin/properties/${testPropertyId}/moderate`, {
        method: 'PUT',
        headers: authHeaders,
        body: { action: 'approve', moderationNotes: 'Approved via automated test suite' },
      });
      assert(moderate.status === 200 && moderate.data?.data?.approvalStatus === 'approved', 'Admin: Moderate property to approved (/admin/properties/:id/moderate)');
    }

    // 8. CRM Leads: Capture Lead
    const leadCapture = await request('/leads/capture', {
      method: 'POST',
      body: {
        fullName: 'Rohan Sharma',
        phone: '9876543210',
        email: 'rohan.test@example.com',
        source: 'property_detail',
        interestType: 'buy',
        property: testPropertyId || undefined,
        city: 'Mumbai',
        notes: 'Interested in site inspection visit this weekend.',
      },
    });
    assert(leadCapture.status === 201 && (leadCapture.data?.data?._id || leadCapture.data?.data?.leadNumber), 'Leads: Capture CRM lead (/leads/capture)');

    // 9. CRM Leads: Admin List & Stage Update
    const leadList = await request('/leads', { headers: authHeaders });
    assert(leadList.status === 200 && Array.isArray(leadList.data?.data), 'Leads: Admin lead pipeline retrieval (/leads)');
    testLeadId = leadList.data?.data?.[0]?._id || '';

    if (testLeadId) {
      const leadStatus = await request(`/leads/${testLeadId}/status`, {
        method: 'PUT',
        headers: authHeaders,
        body: { status: 'contacted', priority: 'high' },
      });
      assert(leadStatus.status === 200 && leadStatus.data?.data?.status === 'contacted', 'Leads: Advance pipeline stage (/leads/:id/status)');
    }

    // 10. Services Bookings: Create & List
    const newBooking = await request('/bookings', {
      method: 'POST',
      headers: authHeaders,
      body: {
        customerName: 'Aarav Patel',
        customerPhone: '9811223344',
        serviceCategory: 'interiors',
        serviceName: 'Turnkey Modular Kitchen Design',
        scheduledDate: '2026-11-01',
        totalAmount: 185000,
        address: { line1: 'Flat 14B, Palm Grove', city: 'Mumbai', pincode: '400050' },
      },
    });
    assert(newBooking.status === 201 && newBooking.data?.data?._id, 'Bookings: Create service appointment (/bookings)');

    // 11. Materials Marketplace: Categories & Products
    const matCats = await request('/materials/categories');
    assert(matCats.status === 200 && Array.isArray(matCats.data?.data), 'Materials: Fetch wholesale categories (/materials/categories)');

    const matProds = await request('/materials/products');
    assert(matProds.status === 200 && Array.isArray(matProds.data?.data), 'Materials: Fetch wholesale products catalog (/materials/products)');

    // 12. Materials Marketplace: Create Order
    const newOrder = await request('/materials/orders', {
      method: 'POST',
      headers: authHeaders,
      body: {
        customerName: 'Construction Corp Ltd',
        customerPhone: '9988776655',
        shippingAddress: { line1: 'Site 4B, Sector 62', city: 'Noida', pincode: '201301' },
        items: [
          { name: 'UltraTech Cement 50kg', quantity: 250, unitPrice: 385, totalPrice: 96250 },
        ],
        totalAmount: 96250,
      },
    });
    assert(newOrder.status === 201 && newOrder.data?.data?.orderNumber, 'Materials: Place wholesale order (/materials/orders)');
    testOrderId = newOrder.data?.data?._id || '';

    // 13. Materials Marketplace: Admin Update Order Status
    if (testOrderId) {
      const orderUpdate = await request(`/materials/orders/${testOrderId}/status`, {
        method: 'PUT',
        headers: authHeaders,
        body: { status: 'confirmed' },
      });
      assert(orderUpdate.status === 200 && orderUpdate.data?.data?.status === 'confirmed', 'Materials: Admin update order fulfillment status (/materials/orders/:id/status)');
    }

    // 14. Finance: Loan Eligibility Calculation
    const eligibility = await request('/finance/eligibility', {
      method: 'POST',
      body: { monthlyIncome: 150000, existingEmi: 15000, tenureYears: 20 },
    });
    assert(eligibility.status === 200 && eligibility.data?.data?.maxEligibleLoan > 0, 'Finance: Real-time loan eligibility & FOIR calculator (/finance/eligibility)');

    // 15. Finance: Admin All Finance Requests
    const financeAll = await request('/finance/all', { headers: authHeaders });
    assert(financeAll.status === 200 && financeAll.data?.data?.loans !== undefined, 'Finance: Admin fetch all loans & legal requests (/finance/all)');

    // 16. B2B Partners: Directory & Onboard
    const partners = await request('/partners');
    assert(partners.status === 200 && Array.isArray(partners.data?.data), 'Partners: B2B partners directory (/partners)');

    // 17. CMS: Banners
    const banners = await request('/cms/banners');
    assert(banners.status === 200 && Array.isArray(banners.data?.data), 'CMS: Fetch promotional banners (/cms/banners)');

    // 18. Notifications: In-App User Alerts
    const notifs = await request('/notifications', { headers: authHeaders });
    assert(notifs.status === 200 && (Array.isArray(notifs.data?.data) || Array.isArray(notifs.data?.data?.notifications)), 'Notifications: Fetch in-app user notifications (/notifications)');

    // 19. Audit Logs: Admin Audit Trail
    const logs = await request('/admin/audit-logs', { headers: authHeaders });
    assert(logs.status === 200 && Array.isArray(logs.data?.data) && logs.data.data.length > 0, 'Audit: Verify chronological audit trail logging (/admin/audit-logs)');

    // 20. Security: Unauthenticated access to admin endpoints blocked
    const unauthAdmin = await request('/admin/overview');
    assert(unauthAdmin.status === 401, 'Security Gate: Unauthenticated access to /admin/overview rejected with 401');

    // 21. Security: Create ordinary user and test role enforcement
    const normalUserAuth = await request('/auth/verify-otp', {
      method: 'POST',
      body: { phone: '9820011223', otp: '1234' },
    });
    const normalToken = normalUserAuth.data?.data?.token;
    const normalHeaders = { Authorization: `Bearer ${normalToken}` };

    const forbiddenAdmin = await request('/admin/overview', { headers: normalHeaders });
    assert(forbiddenAdmin.status === 403, 'Security Gate: Ordinary user access to /admin/overview rejected with 403 Forbidden');

    // 22. Security: Ordinary user cannot access admin materials orders
    const forbiddenOrders = await request('/materials/orders', { headers: normalHeaders });
    assert(forbiddenOrders.status === 403, 'Security Gate: Ordinary user access to /materials/orders rejected with 403 Forbidden');

    // 23. Security: Ordinary user cannot access all finance requests
    const forbiddenFinance = await request('/finance/all', { headers: normalHeaders });
    assert(forbiddenFinance.status === 403, 'Security Gate: Ordinary user access to /finance/all rejected with 403 Forbidden');

    // 24. Security: Invalid OTP rejection
    const invalidOtp = await request('/auth/verify-otp', {
      method: 'POST',
      body: { phone: '9820011223', otp: '9999' },
    });
    assert(invalidOtp.status === 400, 'Security Gate: Invalid OTP rejected with 400 Bad Request');

  } catch (err) {
    console.error('Test Suite Runtime Error:', err);
    failed++;
  }

  console.log('\n------------------------------------------------------------');
  console.log(`Test Execution Summary: ${passed} PASSED | ${failed} FAILED`);
  console.log('------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
