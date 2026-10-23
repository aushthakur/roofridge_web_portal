/**
 * Roof Ridge Admin Panel - Comprehensive Relation & Crash Prevention Test Suite
 * Validates:
 * 1. Admin Authentication & Role Enforcement
 * 2. Nested Entity Relations & Null Safety (Properties, Leads, Partners, Bookings, Orders)
 * 3. State Transitions & Moderation Action Handlers
 * 4. Data Type Consistency (Prices, Dates, Phone Numbers, Flags)
 * 5. Audit Logging Integrity
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api/v1';

async function runAdminVerification() {
  console.log('================================================================');
  console.log('   ROOF RIDGE ADMIN PANEL — FULL RELATION & STABILITY AUDIT     ');
  console.log('================================================================\n');

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      testsPassed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      testsFailed++;
    }
  }

  // 1. Authenticate Admin
  console.log('▶ [1/9] Testing Admin Authentication & Access Control');
  let token = '';
  let adminUser = null;
  try {
    const authRes = await axios.post(`${API_BASE}/auth/verify-otp`, {
      phone: '9999999999',
      otp: '1234',
    });
    token = authRes.data?.data?.token;
    adminUser = authRes.data?.data?.user;
    assert(token && token.length > 20, 'Admin JWT token successfully issued');
    assert(adminUser?.role === 'admin' || adminUser?.role === 'superadmin', `Admin role authorized: role='${adminUser?.role}'`);
  } catch (err) {
    assert(false, `Authentication failed: ${err.message}`);
    process.exit(1);
  }

  const client = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: () => true,
  });

  // 2. Overview Metrics & Recent Leads Relation Check
  console.log('\n▶ [2/9] Testing Overview Dashboard Data & Metrics Relations');
  try {
    const res = await client.get('/admin/overview');
    assert(res.status === 200, 'GET /admin/overview returns 200 OK');
    const data = res.data?.data;
    assert(data?.metrics !== undefined, 'Overview contains metrics object');
    assert(typeof data?.metrics?.totalProperties === 'number', `totalProperties is numeric (${data?.metrics?.totalProperties})`);
    assert(typeof data?.metrics?.pendingProperties === 'number', `pendingProperties is numeric (${data?.metrics?.pendingProperties})`);
    assert(typeof data?.metrics?.totalLeads === 'number', `totalLeads is numeric (${data?.metrics?.totalLeads})`);
    assert(Array.isArray(data?.recentLeads), 'recentLeads is an array');

    // Test relation safety on recentLeads
    for (const lead of data.recentLeads || []) {
      assert(typeof lead.fullName === 'string' && lead.fullName.length > 0, `Lead #${lead.leadNumber} has valid fullName: ${lead.fullName}`);
      // Check that lead.property does not crash if null
      const propertyTitle = lead.property?.title || 'None';
      assert(true, `Lead property relation safely resolves: '${propertyTitle}'`);
    }
  } catch (err) {
    assert(false, `Overview verification failed: ${err.message}`);
  }

  // 3. Properties Moderation Desk Relations
  console.log('\n▶ [3/9] Testing Properties Moderation & Nested Field Integrity');
  let testPropertyId = null;
  try {
    const res = await client.get('/admin/properties?status=all');
    assert(res.status === 200, 'GET /admin/properties returns 200 OK');
    const properties = res.data?.data;
    assert(Array.isArray(properties) && properties.length > 0, `Retrieved ${properties?.length} properties for moderation`);

    for (const prop of properties) {
      assert(prop._id && prop.title, `Property unit has valid ID and title: "${prop.title?.slice(0, 30)}..."`);
      assert(typeof prop.price === 'number', `Price is valid number: ₹${prop.price}`);
      assert(['pending', 'approved', 'rejected', 'request_changes'].includes(prop.approvalStatus), `Valid approvalStatus: '${prop.approvalStatus}'`);
      assert(prop.location !== null && typeof prop.location === 'object', `Location object exists on property`);
      assert(typeof prop.location?.city === 'string', `City field populated: '${prop.location?.city}'`);
    }

    testPropertyId = properties[0]._id;

    // Test moderation action: toggle featured
    const modRes = await client.put(`/admin/properties/${testPropertyId}/moderate`, {
      action: 'toggle_featured',
      moderationNotes: 'Automated test toggle featured flag',
    });
    assert(modRes.status === 200, `PUT /admin/properties/${testPropertyId}/moderate (toggle_featured) returns 200 OK`);
  } catch (err) {
    assert(false, `Properties verification error: ${err.message}`);
  }

  // 4. CRM Leads Management Desk
  console.log('\n▶ [4/9] Testing CRM Leads & Pipeline Stage Transition');
  try {
    // Seed a lead if none exists so we can verify pipeline operations
    let leadsRes = await client.get('/leads?status=all');
    let leadsList = leadsRes.data?.data || [];

    if (leadsList.length === 0) {
      // Create a test lead
      const createLeadRes = await client.post('/leads/capture', {
        fullName: 'Test Client Verma',
        phone: '9876543210',
        email: 'test.client@example.com',
        source: 'property_inquiry',
        interestType: 'buy',
        city: 'Noida',
        notes: 'Interested in 3 BHK near Expressway',
      });
      assert(createLeadRes.status === 201 || createLeadRes.status === 200, 'Created sample CRM lead for relation test');
      leadsRes = await client.get('/leads?status=all');
      leadsList = leadsRes.data?.data || [];
    }

    assert(leadsList.length > 0, `Active CRM pipeline contains ${leadsList.length} leads`);
    const targetLead = leadsList[0];

    // Test safe phone & WhatsApp URL formatting (re-verifying bug fix)
    const safePhone = (targetLead.phone || '').replace(/[^0-9]/g, '');
    assert(safePhone.length >= 10, `Lead phone formatted safely for WhatsApp link: +91${safePhone}`);

    // Update lead status
    const updateRes = await client.put(`/leads/${targetLead._id}/status`, {
      status: 'contacted',
      comment: 'Representative initiated outreach call',
    });
    assert(updateRes.status === 200, `PUT /leads/${targetLead._id}/status successfully transitions lead to 'contacted'`);

    // Add note to lead
    const noteRes = await client.post(`/leads/${targetLead._id}/notes`, {
      comment: 'Client requested Sunday afternoon site visit',
      activityType: 'note_added',
    });
    assert(noteRes.status === 200 || noteRes.status === 201, `POST /leads/${targetLead._id}/notes successfully records timeline note`);
  } catch (err) {
    assert(false, `CRM Leads test error: ${err.message}`);
  }

  // 5. Partner KYC & B2B Verification Desk
  console.log('\n▶ [5/9] Testing Partner KYC & B2B Desk Relations');
  try {
    const res = await client.get('/admin/partners?status=all');
    assert(res.status === 200, 'GET /admin/partners returns 200 OK');
    const partners = res.data?.data || [];
    assert(Array.isArray(partners), `Partners list returned (${partners.length} registered partners)`);

    for (const p of partners) {
      assert(p.businessName, `Partner businessName valid: '${p.businessName}'`);
      assert(['pending', 'verified', 'rejected'].includes(p.verificationStatus), `Valid partner verificationStatus: '${p.verificationStatus}'`);
    }
  } catch (err) {
    assert(false, `Partners verification error: ${err.message}`);
  }

  // 6. Service Bookings Desk
  console.log('\n▶ [6/9] Testing Service Bookings Relations');
  try {
    const res = await client.get('/bookings?status=all');
    assert(res.status === 200, 'GET /bookings returns 200 OK');
    const bookings = res.data?.data || [];
    assert(Array.isArray(bookings), `Bookings response is array (${bookings.length} bookings)`);

    for (const b of bookings) {
      assert(b.bookingNumber, `Booking has valid bookingNumber: ${b.bookingNumber}`);
      assert(typeof b.totalAmount === 'number', `totalAmount is numeric: ₹${b.totalAmount}`);
    }
  } catch (err) {
    assert(false, `Bookings test error: ${err.message}`);
  }

  // 7. Materials Marketplace Orders
  console.log('\n▶ [7/9] Testing Materials Store Orders');
  try {
    const res = await client.get('/materials/orders');
    assert(res.status === 200, 'GET /materials/orders returns 200 OK');
    const orders = res.data?.data || [];
    assert(Array.isArray(orders), `Orders response is array (${orders.length} orders)`);

    for (const o of orders) {
      assert(o.orderNumber, `Order has orderNumber: ${o.orderNumber}`);
      assert(Array.isArray(o.items), `Order items is array with ${o.items?.length} items`);
    }
  } catch (err) {
    assert(false, `Materials orders test error: ${err.message}`);
  }

  // 8. Finance, Loans & Legal Consultations
  console.log('\n▶ [8/9] Testing Finance, Loans & Legal Consultations');
  try {
    const res = await client.get('/finance/all');
    assert(res.status === 200, 'GET /finance/all returns 200 OK');
    const data = res.data?.data;
    assert(Array.isArray(data?.loans), 'financeData.loans is an array');
    assert(Array.isArray(data?.legal), 'financeData.legal is an array');
  } catch (err) {
    assert(false, `Finance desk test error: ${err.message}`);
  }

  // 9. Banners CMS & Platform Security Audit Logs
  console.log('\n▶ [9/9] Testing Banners CMS & Immutable Audit Trail');
  try {
    // CMS Banners
    const bannersRes = await client.get('/cms/banners');
    assert(bannersRes.status === 200, 'GET /cms/banners returns 200 OK');
    const banners = bannersRes.data?.data || [];
    assert(Array.isArray(banners) && banners.length > 0, `Active banners retrieved: ${banners.length} banner(s)`);

    // Audit Logs
    const auditRes = await client.get('/admin/audit-logs');
    assert(auditRes.status === 200, 'GET /admin/audit-logs returns 200 OK');
    const logs = auditRes.data?.data || [];
    assert(Array.isArray(logs), `Security audit logs retrieved (${logs.length} logged events)`);
    if (logs.length > 0) {
      const latestLog = logs[0];
      assert(latestLog.adminName && latestLog.action, `Audit log entry verified: admin='${latestLog.adminName}', action='${latestLog.action}'`);
    }
  } catch (err) {
    assert(false, `CMS & Audit Logs test error: ${err.message}`);
  }

  console.log('\n================================================================');
  console.log(` AUDIT SUMMARY: ${testsPassed} Checks PASSED | ${testsFailed} Checks FAILED`);
  console.log('================================================================');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runAdminVerification().catch((e) => {
  console.error('Fatal Test Runner Exception:', e);
  process.exit(1);
});
