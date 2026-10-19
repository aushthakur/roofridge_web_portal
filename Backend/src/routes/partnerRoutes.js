const express = require('express');
const router = express.Router();
const {
  onboardPartner,
  getPartners,
  getMyPartnerProfile,
} = require('../controllers/partnerController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getPartners);
router.post('/onboard', protect, onboardPartner);
router.get('/me', protect, getMyPartnerProfile);

module.exports = router;
