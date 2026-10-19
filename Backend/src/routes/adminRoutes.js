const express = require('express');
const router = express.Router();
const {
  getAdminOverview,
  getModerationProperties,
  moderateProperty,
  getPartnersForApproval,
  verifyPartner,
  getAuditLogs,
  getAdminUsersList,
  updateUserStatus,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Admin protected endpoints
router.get('/overview', protect, authorize('admin', 'superadmin'), getAdminOverview);
router.get('/metrics', protect, authorize('admin', 'superadmin'), getAdminOverview);
router.get('/properties', protect, authorize('admin', 'superadmin'), getModerationProperties);
router.put('/properties/:id/moderate', protect, authorize('admin', 'superadmin'), moderateProperty);
router.get('/partners', protect, authorize('admin', 'superadmin'), getPartnersForApproval);
router.put('/partners/:id/verify', protect, authorize('admin', 'superadmin'), verifyPartner);
router.get('/audit-logs', protect, authorize('admin', 'superadmin'), getAuditLogs);
router.get('/users', protect, authorize('admin', 'superadmin'), getAdminUsersList);
router.put('/users/:id', protect, authorize('admin', 'superadmin'), updateUserStatus);

module.exports = router;
