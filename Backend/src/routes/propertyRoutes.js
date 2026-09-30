const express = require('express');
const { getProperties, createProperty } = require('../controllers/propertyController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, authorize('admin', 'dealer'), createProperty);

module.exports = router;
