const Lead = require('../models/Lead');
const LeadActivity = require('../models/LeadActivity');
const ApiResponse = require('../utils/apiResponse');

// @desc    Capture Lead (from Quick Finder, Service Quotes, etc.)
// @route   POST /api/v1/leads/capture
// @access  Public
exports.captureLead = async (req, res) => {
  const {
    fullName,
    phone,
    email,
    source = 'hero_quick_finder',
    interestType = 'buy',
    propertyId,
    serviceType,
    city = 'Noida',
    budget,
    notes,
    scheduledVisitDate,
  } = req.body;

  if (!fullName || !phone) {
    return ApiResponse.error(res, 'Full name and phone number are required', 400);
  }

  try {
    const validPropertyId =
      propertyId && typeof propertyId === 'string' && propertyId.match(/^[0-9a-fA-F]{24}$/)
        ? propertyId
        : undefined;

    const lead = await Lead.create({
      fullName,
      phone,
      email,
      source,
      interestType,
      property: validPropertyId,
      serviceType,
      city,
      budget: budget || {},
      status: scheduledVisitDate ? 'site_visit_scheduled' : 'new',
      notes: notes || `Lead submitted from ${source}`,
      nextFollowUp: scheduledVisitDate ? new Date(scheduledVisitDate) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      score: scheduledVisitDate ? 80 : 60,
    });

    // Record initial activity
    await LeadActivity.create({
      lead: lead._id,
      activityType: scheduledVisitDate ? 'site_visit' : 'status_change',
      newValue: lead.status,
      comment: `Lead captured via ${source}: ${notes || 'Direct inquiry'}`,
    });

    return ApiResponse.success(
      res,
      {
        leadNumber: lead.leadNumber,
        status: lead.status,
        message: 'Your inquiry has been received. Our team will contact you shortly.',
      },
      'Lead captured successfully',
      201
    );
  } catch (error) {
    return ApiResponse.error(res, 'Failed to capture lead: ' + error.message, 500);
  }
};

// @desc    Get all leads with filters (CRM Dashboard)
// @route   GET /api/v1/leads
// @access  Private (Agent/Admin/CRM)
exports.getLeads = async (req, res) => {
  try {
    const { status, source, interestType, priority, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status && status !== 'all') query.status = status;
    if (source && source !== 'all') query.source = source;
    if (interestType && interestType !== 'all') query.interestType = interestType;
    if (priority && priority !== 'all') query.priority = priority;

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { fullName: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { leadNumber: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .populate('property', 'title price location images')
      .populate('assignedTo', 'name email phone role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, leads, 'Leads retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Error retrieving leads: ' + error.message, 500);
  }
};

// @desc    Get single lead by ID with timeline activities
// @route   GET /api/v1/leads/:id
// @access  Private (Agent/Admin/CRM)
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('property', 'title price location images')
      .populate('assignedTo', 'name email phone role');

    if (!lead) {
      return ApiResponse.error(res, 'Lead not found', 404);
    }

    const activities = await LeadActivity.find({ lead: lead._id })
      .populate('performedBy', 'name role')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, { lead, activities }, 'Lead details retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error fetching lead: ' + error.message, 500);
  }
};

// @desc    Update lead stage / status
// @route   PUT /api/v1/leads/:id/status
// @access  Private (Agent/Admin/CRM)
exports.updateLeadStatus = async (req, res) => {
  const { status, comment, nextFollowUp } = req.body;

  if (!status) {
    return ApiResponse.error(res, 'New status is required', 400);
  }

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return ApiResponse.error(res, 'Lead not found', 404);
    }

    const previousStatus = lead.status;
    lead.status = status;
    if (nextFollowUp) lead.nextFollowUp = new Date(nextFollowUp);

    await lead.save();

    await LeadActivity.create({
      lead: lead._id,
      performedBy: req.user ? req.user.id : undefined,
      activityType: 'status_change',
      previousValue: previousStatus,
      newValue: status,
      comment: comment || `Status updated from ${previousStatus} to ${status}`,
    });

    return ApiResponse.success(res, lead, `Lead moved to ${status}`);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update lead status: ' + error.message, 500);
  }
};

// @desc    Assign lead to representative
// @route   PUT /api/v1/leads/:id/assign
// @access  Private (Admin/CRM)
exports.assignLead = async (req, res) => {
  const { assignedToUserId } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return ApiResponse.error(res, 'Lead not found', 404);
    }

    lead.assignedTo = assignedToUserId;
    lead.assignedAt = new Date();
    await lead.save();

    await LeadActivity.create({
      lead: lead._id,
      performedBy: req.user ? req.user.id : undefined,
      activityType: 'assigned',
      comment: `Lead assigned to representative ID ${assignedToUserId}`,
    });

    return ApiResponse.success(res, lead, 'Lead assigned successfully');
  } catch (error) {
    return ApiResponse.error(res, 'Assignment failed: ' + error.message, 500);
  }
};

// @desc    Add follow-up note to lead
// @route   POST /api/v1/leads/:id/notes
// @access  Private (Agent/Admin/CRM)
exports.addLeadNote = async (req, res) => {
  const { comment, activityType = 'note_added' } = req.body;

  if (!comment) {
    return ApiResponse.error(res, 'Comment is required', 400);
  }

  try {
    const activity = await LeadActivity.create({
      lead: req.params.id,
      performedBy: req.user ? req.user.id : undefined,
      activityType,
      comment,
    });

    return ApiResponse.success(res, activity, 'Note recorded in lead timeline', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to add note: ' + error.message, 500);
  }
};
