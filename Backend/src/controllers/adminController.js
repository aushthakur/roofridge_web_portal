const Property = require('../models/Property');
const User = require('../models/User');
const Partner = require('../models/Partner');
const Lead = require('../models/Lead');
const Booking = require('../models/Booking');
const MaterialOrder = require('../models/MaterialOrder');
const AuditLog = require('../models/AuditLog');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get Admin Overview Metrics (VOL-11)
// @route   GET /api/v1/admin/overview
// @access  Private (Admin)
exports.getAdminOverview = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProperties,
      pendingProperties,
      totalLeads,
      totalBookings,
      totalOrders,
      totalPartners,
      recentLeads,
      pendingModerationList,
    ] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Property.countDocuments({ approvalStatus: 'pending' }),
      Lead.countDocuments(),
      Booking.countDocuments(),
      MaterialOrder.countDocuments(),
      Partner.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5).populate('property', 'title location'),
      Property.find({ approvalStatus: 'pending' })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('owner', 'name phone email'),
    ]);

    // Calculate approximate GMV from orders and bookings
    const orderAgg = await MaterialOrder.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const bookingAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const gmv = (orderAgg[0]?.total || 0) + (bookingAgg[0]?.total || 0);

    return ApiResponse.success(
      res,
      {
        metrics: {
          totalUsers,
          totalProperties,
          pendingProperties,
          totalLeads,
          totalBookings,
          totalOrders,
          totalPartners,
          platformGMV: gmv,
        },
        recentLeads,
        pendingModerationList,
      },
      'Admin overview metrics retrieved'
    );
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch admin metrics: ' + error.message, 500);
  }
};

// @desc    Get Properties for Moderation
// @route   GET /api/v1/admin/properties
// @access  Private (Admin)
exports.getModerationProperties = async (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 20 } = req.query;
    const query = {};
    if (status !== 'all') {
      query.approvalStatus = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .populate('owner', 'name phone email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, properties, 'Properties retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch properties: ' + error.message, 500);
  }
};

// @desc    Moderate Property (Approve / Reject / Request changes / Feature / Delete)
// @route   PUT /api/v1/admin/properties/:id/moderate
// @access  Private (Admin)
exports.moderateProperty = async (req, res) => {
  const { action, moderationNotes, rejectionReason, isFeatured, isVerified } = req.body;

  const validActions = [
    'approve',
    'reject',
    'request_changes',
    'toggle_featured',
    'toggle_verified',
    'delete',
  ];

  if (!validActions.includes(action)) {
    return ApiResponse.error(
      res,
      `Invalid action. Must be one of: ${validActions.join(', ')}`,
      400
    );
  }

  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return ApiResponse.error(res, 'Property not found', 404);
    }

    if (action === 'delete') {
      await Property.findByIdAndDelete(req.params.id);
      await AuditLog.create({
        adminUser: req.user ? req.user.id : undefined,
        adminName: req.user ? req.user.name : 'Super Admin',
        adminEmail: req.user ? req.user.email : 'admin@roofridge.com',
        action: 'property_deleted',
        entityType: 'Property',
        entityId: req.params.id,
        details: { title: property.title },
      });
      return ApiResponse.success(res, null, 'Property listing permanently deleted');
    }

    if (action === 'toggle_featured') {
      property.isFeatured = isFeatured !== undefined ? isFeatured : !property.isFeatured;
      await property.save();
      return ApiResponse.success(
        res,
        property,
        `Property featured status updated to ${property.isFeatured}`
      );
    }

    if (action === 'toggle_verified') {
      property.isVerified = isVerified !== undefined ? isVerified : !property.isVerified;
      await property.save();
      return ApiResponse.success(
        res,
        property,
        `Property verification status updated to ${property.isVerified}`
      );
    }

    const statusMap = {
      approve: 'approved',
      reject: 'rejected',
      request_changes: 'changes_requested',
    };

    property.approvalStatus = statusMap[action];
    if (moderationNotes) property.moderationNotes = moderationNotes;
    if (rejectionReason) property.rejectionReason = rejectionReason;
    if (action === 'approve') property.isVerified = true;

    await property.save();

    // Log Audit
    await AuditLog.create({
      adminUser: req.user ? req.user.id : undefined,
      adminName: req.user ? req.user.name : 'Super Admin',
      adminEmail: req.user ? req.user.email : 'admin@roofridge.com',
      action: `property_${property.approvalStatus}`,
      entityType: 'Property',
      entityId: property._id.toString(),
      details: { title: property.title, action, notes: moderationNotes, reason: rejectionReason },
    });

    return ApiResponse.success(res, property, `Property has been ${property.approvalStatus}`);
  } catch (error) {
    return ApiResponse.error(res, 'Moderation failed: ' + error.message, 500);
  }
};

// @desc    Get Partners for KYC Approval
// @route   GET /api/v1/admin/partners
// @access  Private (Admin)
exports.getPartnersForApproval = async (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 20 } = req.query;
    const query = {};
    if (status !== 'all') query.verificationStatus = status;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Partner.countDocuments(query);
    const partners = await Partner.find(query)
      .populate('user', 'name phone email role kycDocuments')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, partners, 'Partners retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch partners: ' + error.message, 500);
  }
};

// @desc    Verify Partner / Reject KYC
// @route   PUT /api/v1/admin/partners/:id/verify
// @access  Private (Admin)
exports.verifyPartner = async (req, res) => {
  const { action, verificationNotes } = req.body;

  if (!['verify', 'reject'].includes(action)) {
    return ApiResponse.error(res, "Action must be 'verify' or 'reject'", 400);
  }

  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return ApiResponse.error(res, 'Partner not found', 404);
    }

    partner.verificationStatus = action === 'verify' ? 'verified' : 'rejected';
    if (verificationNotes) partner.verificationNotes = verificationNotes;
    await partner.save();

    // Update user's KYC status too
    await User.findByIdAndUpdate(partner.user, {
      kycStatus: action === 'verify' ? 'verified' : 'rejected',
    });

    // Log Audit
    await AuditLog.create({
      adminUser: req.user ? req.user.id : undefined,
      adminName: req.user ? req.user.name : 'Super Admin',
      adminEmail: req.user ? req.user.email : 'admin@roofridge.com',
      action: `partner_${partner.verificationStatus}`,
      entityType: 'Partner',
      entityId: partner._id.toString(),
      details: { businessName: partner.businessName, action, notes: verificationNotes },
    });

    return ApiResponse.success(res, partner, `Partner verification set to ${partner.verificationStatus}`);
  } catch (error) {
    return ApiResponse.error(res, 'Partner verification failed: ' + error.message, 500);
  }
};

// @desc    Get Audit Logs
// @route   GET /api/v1/admin/audit-logs
// @access  Private (Admin)
exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await AuditLog.countDocuments();
    const logs = await AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum);

    return ApiResponse.success(res, logs, 'Audit logs retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch logs: ' + error.message, 500);
  }
};

// @desc    Get Platform Users List
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
exports.getAdminUsersList = async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (role && role !== 'all') query.role = role;
    if (status && status !== 'all') query.status = status;

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ name: searchRegex }, { phone: searchRegex }, { email: searchRegex }];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

    return ApiResponse.success(res, users, 'Users retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch users: ' + error.message, 500);
  }
};

// @desc    Update User Status / Role
// @route   PUT /api/v1/admin/users/:id
// @access  Private (Admin)
exports.updateUserStatus = async (req, res) => {
  const { role, status } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    if (role) user.role = role;
    if (status) user.status = status;
    await user.save();

    await AuditLog.create({
      adminUser: req.user ? req.user.id : undefined,
      adminName: req.user ? req.user.name : 'Super Admin',
      action: 'user_modified',
      entityType: 'User',
      entityId: user._id.toString(),
      details: { newRole: role, newStatus: status },
    });

    return ApiResponse.success(res, user, 'User updated successfully');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update user: ' + error.message, 500);
  }
};
