const express = require('express');
const router = express.Router();
const {
  getBanners,
  createBanner,
  getReviews,
  submitReview,
} = require('../controllers/cmsController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/banners', getBanners);
router.post('/banners', protect, authorize('admin', 'superadmin'), createBanner);

router.get('/reviews', getReviews);
router.post('/reviews', protect, submitReview);

module.exports = router;
