const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);
router.get('/', protect, authorize('admin', 'superadmin', 'service_partner'), getAllBookings);
router.put('/:id/status', protect, authorize('admin', 'superadmin', 'service_partner'), updateBookingStatus);

module.exports = router;
