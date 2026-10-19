const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const assert = require('assert');

async function testProductionGate() {
  console.log('\n========================================================');
  console.log('   ROOF RIDGE PRODUCTION SECURITY GATE VERIFICATION');
  console.log('========================================================\n');

  // Start temporary test DB for the verification test
  const mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());

  // Enforce production mode for this test
  process.env.NODE_ENV = 'production';

  const authController = require('./src/controllers/authController');
  const User = require('./src/models/User');

  // Test 1: Verify OTP 1234 is REJECTED in production mode
  let statusSet = 200;
  let responseData = null;
  const mockRes = {
    status(code) { statusSet = code; return this; },
    json(data) { responseData = data; return this; }
  };

  await authController.verifyOtp({ body: { phone: '9999999999', otp: '1234' } }, mockRes);
  console.log(`[Test 1] Production verifyOtp with 1234 -> HTTP Status: ${statusSet}, Message: "${responseData?.message}"`);
  assert.strictEqual(statusSet, 400, 'Production must reject bypass OTP 1234 with HTTP 400');
  assert(responseData?.message?.includes('Invalid or expired OTP'), 'Error message must state invalid or expired OTP');
  console.log('  ✅ PASS: Default bypass OTP 1234 is refused in production mode.');

  // Test 2: Verify OTP 123456 is REJECTED in production mode
  statusSet = 200;
  responseData = null;
  await authController.verifyOtp({ body: { phone: '9999999999', otp: '123456' } }, mockRes);
  console.log(`[Test 2] Production verifyOtp with 123456 -> HTTP Status: ${statusSet}, Message: "${responseData?.message}"`);
  assert.strictEqual(statusSet, 400, 'Production must reject bypass OTP 123456 with HTTP 400');
  console.log('  ✅ PASS: Default bypass OTP 123456 is refused in production mode.');

  // Test 3: Verify registration cannot assign admin role
  statusSet = 200;
  responseData = null;
  await authController.register({
    body: {
      name: 'Malicious Actor',
      email: 'hacker@example.com',
      password: 'password123',
      role: 'admin' // Attempt privilege escalation
    }
  }, mockRes);

  const registeredUser = await User.findOne({ email: 'hacker@example.com' });
  console.log(`[Test 3] Registration role escalation attempt -> Assigned Role: "${registeredUser?.role}"`);
  assert.strictEqual(registeredUser.role, 'user', 'Public registration must never assign admin role');
  console.log('  ✅ PASS: Privilege escalation blocked; assigned role is "user".');

  // Test 4: Database production guard: ensure MongoMemoryServer fallback is rejected when in production
  const db = require('./src/config/db');
  let threwExpectedError = false;
  try {
    delete process.env.MONGO_URI;
    await db.connectDB();
  } catch (err) {
    threwExpectedError = true;
    console.log(`[Test 4] Production DB fallback prevention -> Caught: "${err.message}"`);
  }
  assert.strictEqual(threwExpectedError, true, 'Production must reject running without valid persistent MONGO_URI');
  console.log('  ✅ PASS: Ephemeral in-memory database fallback is strictly blocked in production mode.');

  await mongoose.disconnect();
  await mongod.stop();

  console.log('\n--------------------------------------------------------');
  console.log('  ALL PRODUCTION SECURITY & PERSISTENCE GATES PASSED!   ');
  console.log('--------------------------------------------------------\n');
}

testProductionGate().catch(err => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
