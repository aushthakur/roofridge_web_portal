const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, googleSignIn } = require('../controllers/authController');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', googleSignIn);

module.exports = router;
