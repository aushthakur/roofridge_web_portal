const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

async function runE2EPropertyFlow() {
  console.log('\n============================================================');
  console.log('   ROOF RIDGE — END-TO-END PROPERTY LISTING & MODERATION FLOW');
  console.log('============================================================\n');

  let userToken = null;
  let adminToken = null;
  let propertyId = null;
  const testTitle = `Skyline Penthouse Test ${Date.now()}`;

  // STEP 1: USER AUTH
  console.log('--- Step 1: User Authentication ---');
  try {
    const userOtpRes = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      phone: '9876543210',
      otp: '1234',
      name: 'Priya Sharma (Owner)',
      role: 'seller'
    });
    userToken = userOtpRes.data?.data?.token;
    assert(Boolean(userToken), `User login successful, received JWT token for phone 9876543210`);
  } catch (err) {
    assert(false, `User login failed: ${err.response?.data?.message || err.message}`);
    return;
  }

  // STEP 2: USER POSTS A PROPERTY
  console.log('\n--- Step 2: User Posts New Property ---');
  try {
    const postPayload = {
      title: testTitle,
      type: 'sale',
      propertyType: 'apartment',
      price: 18500000,
      priceDisplay: '₹ 1.85 Cr',
      bhk: 4,
      location: {
        city: 'Noida',
        locality: 'Sector 150',
        address: 'Tower A, Premium Boulevard'
      },
      features: {
        areaSqFt: 2850,
        bedrooms: 4,
        bathrooms: 4,
        balconies: 3,
        furnishing: 'semi-furnished'
      },
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Exclusive luxury high-rise penthouse overlooking green expressway belt.'
    };

    const postRes = await axios.post(`${BASE_URL}/properties`, postPayload, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    const createdProp = postRes.data?.data;
    propertyId = createdProp?._id;

    assert(Boolean(propertyId), `Property created with ID: ${propertyId}`);
    assert(createdProp?.approvalStatus === 'pending', `Property approvalStatus initialized to 'pending' (found: ${createdProp?.approvalStatus})`);
    assert(createdProp?.isVerified === false, `Property isVerified is false prior to moderation`);
    assert(createdProp?.title === testTitle, `Title saved accurately`);
  } catch (err) {
    assert(false, `Post property failed: ${err.response?.data?.message || err.message}`);
    return;
  }

  // STEP 3: VERIFY PUBLIC MARKETPLACE ISOLATION
  console.log('\n--- Step 3: Verify Public Marketplace Isolation (Pending not publicly visible) ---');
  try {
    const publicRes = await axios.get(`${BASE_URL}/properties`);
    const publicList = publicRes.data?.data || [];
    const isPubliclyVisible = publicList.some(p => p._id === propertyId || p.title === testTitle);
    assert(!isPubliclyVisible, `Pending property is NOT visible to public buyers on marketplace search`);
  } catch (err) {
    assert(false, `Failed checking public properties: ${err.message}`);
  }

  // STEP 4: VERIFY USER HUB LISTINGS
  console.log('\n--- Step 4: Verify User /myhub Listings Shows Pending Review ---');
  try {
    const userHubRes = await axios.get(`${BASE_URL}/properties/my/listings`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const userProperties = userHubRes.data?.data || [];
    const myProp = userProperties.find(p => p._id === propertyId);
    assert(Boolean(myProp), `Property appears in user's personal hub (/myhub)`);
    assert(myProp?.approvalStatus === 'pending', `Personal hub displays status as 'pending'`);
  } catch (err) {
    assert(false, `Failed fetching user listings: ${err.message}`);
  }

  // STEP 5: ADMIN AUTHENTICATION
  console.log('\n--- Step 5: Admin Login ---');
  try {
    const adminAuthRes = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      phone: '9999999999',
      otp: '1234',
      name: 'Super Admin',
      role: 'admin'
    });
    adminToken = adminAuthRes.data?.data?.token;
    assert(Boolean(adminToken), `Admin authenticated successfully`);
  } catch (err) {
    assert(false, `Admin authentication failed: ${err.message}`);
    return;
  }

  // STEP 6: ADMIN MODERATION QUEUE INSPECTION
  console.log('\n--- Step 6: Admin Views Moderation Queue ---');
  try {
    const queueRes = await axios.get(`${BASE_URL}/admin/properties?status=pending`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const pendingList = queueRes.data?.data || [];
    const foundInQueue = pendingList.find(p => p._id === propertyId);
    assert(Boolean(foundInQueue), `Admin moderation queue detects submitted property (${testTitle})`);
  } catch (err) {
    assert(false, `Failed querying admin moderation queue: ${err.message}`);
  }

  // STEP 7: ADMIN APPROVES PROPERTY
  console.log('\n--- Step 7: Admin Approves Property Listing ---');
  try {
    const moderateRes = await axios.put(`${BASE_URL}/admin/properties/${propertyId}/moderate`, {
      action: 'approve',
      moderationNotes: 'Title deed & RERA verified by Senior Compliance Desk'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    const moderatedProp = moderateRes.data?.data;
    assert(moderatedProp?.approvalStatus === 'approved', `Property marked as 'approved' by Admin`);
    assert(moderatedProp?.isVerified === true, `Property verification badge granted (isVerified: true)`);
  } catch (err) {
    assert(false, `Admin moderation failed: ${err.response?.data?.message || err.message}`);
  }

  // STEP 8: VERIFY LIVE MARKETPLACE ACCESSIBILITY
  console.log('\n--- Step 8: Verify Live Marketplace Access ---');
  try {
    const publicRes = await axios.get(`${BASE_URL}/properties`);
    const publicList = publicRes.data?.data || [];
    const foundLive = publicList.find(p => p._id === propertyId);
    assert(Boolean(foundLive), `Approved property is now LIVE in public marketplace search!`);

    const singleRes = await axios.get(`${BASE_URL}/properties/${propertyId}`);
    const singleProp = singleRes.data?.data;
    assert(singleProp?.approvalStatus === 'approved', `Direct lookup confirms status: approved`);
    assert(singleProp?.isVerified === true, `Direct lookup confirms isVerified: true`);
  } catch (err) {
    assert(false, `Failed checking live status: ${err.message}`);
  }

  // STEP 9: VERIFY USER HUB STATUS UPDATE
  console.log('\n--- Step 9: Verify User Hub Displays Live Status ---');
  try {
    const userHubRes = await axios.get(`${BASE_URL}/properties/my/listings`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const userProperties = userHubRes.data?.data || [];
    const myProp = userProperties.find(p => p._id === propertyId);
    assert(myProp?.approvalStatus === 'approved', `User /myhub reflects live approved status in real-time`);
    assert(myProp?.isVerified === true, `User /myhub shows verified resident badge`);
  } catch (err) {
    assert(false, `Failed checking updated user listings: ${err.message}`);
  }

  // STEP 10: BUYER INQUIRY TEST & CRM LEAD GENERATION
  console.log('\n--- Step 10: Buyer Enquiry & CRM Lead Flow ---');
  try {
    const enquiryRes = await axios.post(`${BASE_URL}/properties/${propertyId}/enquiry`, {
      name: 'Rohan Verma',
      phone: '9811223344',
      email: 'rohan.verma@example.com',
      message: 'Interested in scheduling a site visit this Saturday afternoon.'
    });
    assert(enquiryRes.data?.success === true, `Buyer successfully submitted enquiry for the property`);

    // Verify in Admin CRM Leads
    const leadsRes = await axios.get(`${BASE_URL}/leads`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const leads = leadsRes.data?.data?.leads || leadsRes.data?.data || [];
    const leadMatch = leads.find(l => l.phone === '9811223344' || l.fullName === 'Rohan Verma' || l.name === 'Rohan Verma');
    assert(Boolean(leadMatch), `Enquiry automatically converted into CRM lead in Admin Control Room (Lead ID: ${leadMatch?.leadNumber || leadMatch?._id})`);
  } catch (err) {
    assert(false, `Enquiry / CRM test failed: ${err.response?.data?.message || err.message}`);
  }

  // STEP 11: CLEANUP TEST PROPERTY
  console.log('\n--- Step 11: Cleanup Test Property Listing ---');
  try {
    const deleteRes = await axios.put(`${BASE_URL}/admin/properties/${propertyId}/moderate`, {
      action: 'delete'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(deleteRes.data?.success === true, `Test property cleaned up from database`);
  } catch (err) {
    assert(false, `Cleanup failed: ${err.message}`);
  }

  console.log('\n============================================================');
  console.log(`E2E FLOW RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runE2EPropertyFlow();
