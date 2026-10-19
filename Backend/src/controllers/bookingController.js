const Booking = require('../models/Booking');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create new service booking
// @route   POST /api/v1/bookings
// @access  Private (or authenticated guest)
exports.createBooking = async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    serviceCategory,
    serviceName,
    scheduledDate,
    timeSlot,
    address,
    totalAmount,
    paymentMethod,
    notes,
  } = req.body;

  if (!serviceCategory || !serviceName || !scheduledDate) {
    return ApiResponse.error(
      res,
      'Service category, service name, and scheduled date are required',
      400
    );
  }

  try {
    const booking = await Booking.create({
      user: req.user ? req.user.id : undefined,
      customerName: customerName || (req.user ? req.user.name : 'Customer'),
      customerPhone: customerPhone || (req.user ? req.user.phone : ''),
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      serviceCategory,
      serviceName,
      scheduledDate,
      timeSlot: timeSlot || '10:00 AM - 12:00 PM',
      address: address || {},
      totalAmount: totalAmount || 0,
      paymentMethod: paymentMethod || 'online',
      status: 'pending',
      notes,
    });

    return ApiResponse.success(res, booking, 'Service booking placed successfully', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to create booking: ' + error.message, 500);
  }
};

// @desc    Get user bookings
// @route   GET /api/v1/bookings/my
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const query = {
      $or: [{ user: req.user.id }],
    };
    if (req.user.phone) {
      query.$or.push({ customerPhone: req.user.phone });
    }
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return ApiResponse.success(res, bookings, 'User bookings retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error retrieving bookings: ' + error.message, 500);
  }
};

// @desc    Get all bookings (Admin / Ops desk)
// @route   GET /api/v1/bookings
// @access  Private (Admin / Ops)
exports.getAllBookings = async (req, res) => {
  try {
    const { status, serviceCategory, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status && status !== 'all') query.status = status;
    if (serviceCategory && serviceCategory !== 'all') query.serviceCategory = serviceCategory;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name phone email')
      .populate('assignedVendor', 'businessName partnerType rating')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, bookings, 'Bookings retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Error retrieving bookings: ' + error.message, 500);
  }
};

// @desc    Update booking status / technician
// @route   PUT /api/v1/bookings/:id/status
// @access  Private (Admin / Ops)
exports.updateBookingStatus = async (req, res) => {
  const { status, assignedVendor, technicianDetails, cancellationReason } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return ApiResponse.error(res, 'Booking not found', 404);
    }

    if (status) booking.status = status;
    if (assignedVendor) booking.assignedVendor = assignedVendor;
    if (technicianDetails) booking.technicianDetails = technicianDetails;
    if (cancellationReason) booking.cancellationReason = cancellationReason;

    await booking.save();

    return ApiResponse.success(res, booking, 'Booking updated successfully');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update booking: ' + error.message, 500);
  }
};
