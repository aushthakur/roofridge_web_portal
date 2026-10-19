const express = require('express');
const router = express.Router();
const {
  captureLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  assignLead,
  addLeadNote,
} = require('../controllers/leadController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public lead capture
router.post('/capture', captureLead);

// Protected CRM routes
router.get('/', protect, authorize('admin', 'superadmin', 'crm_executive', 'agent'), getLeads);
router.get('/:id', protect, authorize('admin', 'superadmin', 'crm_executive', 'agent'), getLeadById);
router.put('/:id/status', protect, authorize('admin', 'superadmin', 'crm_executive', 'agent'), updateLeadStatus);
router.put('/:id/assign', protect, authorize('admin', 'superadmin'), assignLead);
router.post('/:id/notes', protect, authorize('admin', 'superadmin', 'crm_executive', 'agent'), addLeadNote);

module.exports = router;
