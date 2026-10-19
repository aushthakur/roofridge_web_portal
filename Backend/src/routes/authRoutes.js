const express = require('express');
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  register,
  login,
  googleSignIn,
  getMe,
  updateProfile,
  submitKyc,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleSignIn);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/kyc', protect, submitKyc);

module.exports = router;
