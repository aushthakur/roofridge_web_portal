const express = require('express');
const router = express.Router();
const {
  getLoanEligibility,
  applyLoan,
  requestLegalConsultation,
  getUserFinanceRequests,
  getAllFinanceRequests,
  updateLoanStatus,
} = require('../controllers/financeController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/eligibility', getLoanEligibility);
router.post('/loans', protect, applyLoan);
router.post('/legal', protect, requestLegalConsultation);
router.get('/my', protect, getUserFinanceRequests);
router.get('/all', protect, authorize('admin', 'superadmin'), getAllFinanceRequests);
router.put('/loans/:id/status', protect, authorize('admin', 'superadmin'), updateLoanStatus);

module.exports = router;
