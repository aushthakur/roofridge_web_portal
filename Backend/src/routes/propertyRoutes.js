const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleSaveProperty,
  submitEnquiry,
  getAiValuation,
  getMyProperties,
} = require('../controllers/propertyController');
const { protect, optionalAuth } = require('../middlewares/authMiddleware');

router.get('/', getProperties);
router.post('/ai-valuation', getAiValuation);
router.get('/my/listings', protect, getMyProperties);
router.get('/:idOrSlug', getPropertyById);
router.post('/:id/enquiry', submitEnquiry);

// Property creation routes to admin moderation queue
router.post('/', optionalAuth, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.post('/:id/save', protect, toggleSaveProperty);

module.exports = router;
