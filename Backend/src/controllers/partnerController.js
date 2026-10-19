const Partner = require('../models/Partner');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Onboard as B2B Partner (VOL-10)
// @route   POST /api/v1/partners/onboard
// @access  Private
exports.onboardPartner = async (req, res) => {
  const {
    businessName,
    partnerType,
    gstin,
    reraNumber,
    operatingCities = ['Noida'],
    experienceYears = 1,
    specializations = [],
    profileSummary = '',
  } = req.body;

  if (!businessName || !partnerType) {
    return ApiResponse.error(res, 'Business name and partner type are required', 400);
  }

  try {
    let existingPartner = await Partner.findOne({ user: req.user.id });
    if (existingPartner) {
      return ApiResponse.error(res, 'Partner profile already exists for this account', 400);
    }

    const partner = await Partner.create({
      user: req.user.id,
      businessName,
      partnerType,
      gstin,
      reraNumber,
      operatingCities,
      experienceYears,
      specializations,
      profileSummary,
      verificationStatus: 'pending',
    });

    // Update user role to the corresponding partner type
    await User.findByIdAndUpdate(req.user.id, { role: partnerType });

    return ApiResponse.success(res, partner, 'Partner application submitted for review', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Partner onboarding failed: ' + error.message, 500);
  }
};

// @desc    Get Partner Directory (Public / Verified)
// @route   GET /api/v1/partners
// @access  Public
exports.getPartners = async (req, res) => {
  try {
    const { partnerType, city, search, page = 1, limit = 20 } = req.query;

    const query = { verificationStatus: { $in: ['verified', 'pending'] } };

    if (partnerType && partnerType !== 'all') {
      query.partnerType = partnerType;
    }

    if (city) {
      query.operatingCities = new RegExp(city, 'i');
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ businessName: searchRegex }, { specializations: searchRegex }];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Partner.countDocuments(query);
    const partners = await Partner.find(query)
      .populate('user', 'name phone email avatar')
      .sort({ rating: -1, projectsCompleted: -1 })
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

// @desc    Get Current Partner Profile
// @route   GET /api/v1/partners/me
// @access  Private
exports.getMyPartnerProfile = async (req, res) => {
  try {
    const partner = await Partner.findOne({ user: req.user.id }).populate('user', 'name phone email avatar');
    if (!partner) {
      return ApiResponse.error(res, 'No partner profile found for this account', 404);
    }
    return ApiResponse.success(res, partner, 'Partner profile retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to retrieve profile: ' + error.message, 500);
  }
};
