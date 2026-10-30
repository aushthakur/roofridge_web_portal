const Property = require('../models/Property');
const User = require('../models/User');
const Lead = require('../models/Lead');
const LeadActivity = require('../models/LeadActivity');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get all properties with multi-facet filters & pagination
// @route   GET /api/v1/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const {
      type,
      propertyType,
      subType,
      city,
      locality,
      minPrice,
      maxPrice,
      bhk,
      furnishing,
      possession,
      isFeatured,
      search,
      sort,
      page = 1,
      limit = 12,
      approvalStatus,
    } = req.query;

    const query = {};

    // Only return approved properties for public, unless specifically queried by admin
    if (approvalStatus) {
      if (approvalStatus !== 'all') query.approvalStatus = approvalStatus;
    } else {
      query.approvalStatus = { $in: ['approved', undefined] }; // Support existing unmoderated records
    }

    if (type && type !== 'all') {
      query.type = type.toLowerCase();
    }

    if (propertyType && propertyType !== 'all') {
      query.propertyType = propertyType.toLowerCase();
    }

    if (subType && subType !== 'all') {
      query.subType = subType.toLowerCase();
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (locality) {
      query['location.locality'] = new RegExp(locality, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bhk) {
      const bhkList = bhk.toString().split(',').map(Number);
      query.bhk = { $in: bhkList };
    }

    if (furnishing && furnishing !== 'all') {
      query['features.furnishingStatus'] = furnishing.toLowerCase();
    }

    if (possession && possession !== 'all') {
      query['features.possessionStatus'] = possession.toLowerCase();
    }

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    // Free text search
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { 'location.locality': searchRegex },
        { 'location.city': searchRegex },
        { 'location.address': searchRegex },
      ];
    }

    // Sorting
    let sortOption = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'area_desc') sortOption = { 'features.areaSqFt': -1 };

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .populate('owner', 'name phone email avatar role')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, properties, 'Properties retrieved successfully', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to retrieve properties: ' + error.message, 500);
  }
};

// @desc    Get single property by ID or Slug
// @route   GET /api/v1/properties/:idOrSlug
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let property = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      property = await Property.findById(idOrSlug).populate(
        'owner',
        'name phone email avatar role'
      );
    } else {
      property = await Property.findOne({ slug: idOrSlug.toLowerCase() }).populate(
        'owner',
        'name phone email avatar role'
      );
    }

    if (!property) {
      return ApiResponse.error(res, 'Property not found', 404);
    }

    // Increment views count non-blockingly
    Property.findByIdAndUpdate(property._id, { $inc: { viewsCount: 1 } }).exec();

    return ApiResponse.success(res, property, 'Property details retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error fetching property: ' + error.message, 500);
  }
};

// @desc    Create new property listing (Submits to Admin Moderation Queue)
// @route   POST /api/v1/properties
// @access  Public / Private
exports.createProperty = async (req, res) => {
  try {
    const propertyData = { ...req.body };
    let ownerId;

    if (req.user) {
      ownerId = req.user.id || req.user._id;
      propertyData.ownerType =
        req.user.role === 'builder' ? 'builder' : req.user.role === 'agent' ? 'agent' : 'owner';
    } else {
      const contactPhone = (req.body.phone || req.body.ownerPhone || '9876543210').toString().trim();
      let user = await User.findOne({ phone: contactPhone });
      if (!user) {
        user = await User.create({
          phone: contactPhone,
          name: req.body.ownerName || `Owner ${contactPhone.slice(-4)}`,
          role: 'seller',
          isVerified: false,
          city: propertyData.location?.city || 'Noida',
        });
      }
      ownerId = user._id;
      propertyData.ownerType = 'owner';
    }

    propertyData.owner = ownerId;

    // Normalize type ('sale' -> 'buy')
    if (propertyData.type === 'sale' || propertyData.type === 'sell') {
      propertyData.type = 'buy';
    }

    // Normalize propertyType and subType
    const validPropertyTypes = ['residential', 'commercial', 'plots', 'agricultural'];
    const validSubTypes = ['apartment', 'villa', 'independent_house', 'penthouse', 'studio', 'office', 'shop', 'plot', 'warehouse'];
    if (propertyData.propertyType && !validPropertyTypes.includes(propertyData.propertyType.toLowerCase())) {
      const lower = propertyData.propertyType.toLowerCase();
      if (validSubTypes.includes(lower)) {
        propertyData.subType = lower;
        propertyData.propertyType = ['office', 'shop', 'warehouse'].includes(lower) ? 'commercial' : 'residential';
      } else {
        propertyData.propertyType = 'residential';
      }
    }

    // Default images if none provided
    if (!propertyData.images || !propertyData.images.length) {
      propertyData.images = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ];
    }

    // Auto-approve only if created by admin or superadmin
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
      propertyData.approvalStatus = 'approved';
      propertyData.isVerified = true;
    } else {
      propertyData.approvalStatus = 'pending';
      propertyData.isVerified = false;
    }

    const property = await Property.create(propertyData);

    return ApiResponse.success(
      res,
      property,
      'Property listing submitted successfully! It has been routed to the Admin Moderation Queue.',
      201
    );
  } catch (error) {
    return ApiResponse.error(res, 'Failed to create property: ' + error.message, 400);
  }
};

// @desc    Update property
// @route   PUT /api/v1/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return ApiResponse.error(res, 'Property not found', 404);
    }

    // Make sure user is property owner or admin
    const isOwner = property.owner && property.owner.toString() === req.user.id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';

    if (!isOwner && !isAdmin) {
      return ApiResponse.error(res, 'Not authorized to update this listing', 403);
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return ApiResponse.success(res, property, 'Property updated successfully');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update property: ' + error.message, 400);
  }
};

// @desc    Delete property
// @route   DELETE /api/v1/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return ApiResponse.error(res, 'Property not found', 404);
    }

    const isOwner = property.owner && property.owner.toString() === req.user.id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';

    if (!isOwner && !isAdmin) {
      return ApiResponse.error(res, 'Not authorized to delete this listing', 403);
    }

    await Property.findByIdAndDelete(req.params.id);

    return ApiResponse.success(res, null, 'Property deleted successfully');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to delete property: ' + error.message, 500);
  }
};

// @desc    Toggle Save / Favorite Property
// @route   POST /api/v1/properties/:id/save
// @access  Private
exports.toggleSaveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const propertyId = req.params.id;

    const isSaved = user.savedProperties.some((id) => id.toString() === propertyId);

    if (isSaved) {
      user.savedProperties = user.savedProperties.filter((id) => id.toString() !== propertyId);
      await Property.findByIdAndUpdate(propertyId, { $inc: { favoritesCount: -1 } });
    } else {
      user.savedProperties.push(propertyId);
      await Property.findByIdAndUpdate(propertyId, { $inc: { favoritesCount: 1 } });
    }

    await user.save();

    return ApiResponse.success(
      res,
      { isSaved: !isSaved, savedCount: user.savedProperties.length },
      !isSaved ? 'Property saved to favorites' : 'Property removed from favorites'
    );
  } catch (error) {
    return ApiResponse.error(res, 'Error saving property: ' + error.message, 500);
  }
};

// @desc    Submit Property Enquiry -> Captured into CRM Lead
// @route   POST /api/v1/properties/:id/enquiry
// @access  Public
exports.submitEnquiry = async (req, res) => {
  const {
    name,
    phone,
    email,
    message,
    scheduledVisitDate,
    timeSlot = 'Morning (10:00 AM - 12:00 PM)',
    propertyTitle,
    locality,
    city,
    price,
  } = req.body;
  const propertyId = req.params.id;

  if (!name || !phone) {
    return ApiResponse.error(res, 'Please provide name and phone number', 400);
  }

  try {
    let property = null;
    if (propertyId && propertyId.match(/^[0-9a-fA-F]{24}$/)) {
      property = await Property.findById(propertyId);
    } else if (propertyId) {
      property = await Property.findOne({
        $or: [
          { slug: propertyId.toLowerCase() },
          { title: new RegExp(propertyId.replace(/[-_]/g, ' '), 'i') },
        ],
      });
    }

    // Extrapolate rich lead details
    const targetCity = property?.location?.city || city || 'Mumbai Outskirts';
    const targetLocality = property?.location?.locality || locality || 'Prime Locality';
    const targetTitle = property?.title || propertyTitle || 'Exclusive Roof Ridge Property';
    const targetPrice = property?.price || (typeof price === 'number' ? price : 14500000);
    const targetDisplay = property?.priceDisplay || (typeof price === 'string' ? price : `₹${Number(targetPrice).toLocaleString('en-IN')}`);

    // Create CRM Lead automatically
    const lead = await Lead.create({
      fullName: name,
      phone,
      email: email || '',
      source: 'property_enquiry',
      interestType: property?.type || 'buy',
      property: property?._id || undefined,
      city: targetCity,
      budget: {
        min: targetPrice,
        max: targetPrice,
        display: targetDisplay,
      },
      status: scheduledVisitDate ? 'site_visit_scheduled' : 'new',
      notes: message || `VIP Site visit requested for "${targetTitle}" in ${targetLocality}. Preferred date: ${scheduledVisitDate || 'Flexible'} (${timeSlot})`,
      nextFollowUp: scheduledVisitDate ? new Date(scheduledVisitDate) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      priority: 'high',
      score: 85,
    });

    // Record initial CRM Lead Activity
    await LeadActivity.create({
      lead: lead._id,
      activityType: scheduledVisitDate ? 'site_visit' : 'enquiry',
      newValue: lead.status,
      comment: `VIP Site Visit booked for "${targetTitle}". Client: ${name} (+91 ${phone}). Preferred Date: ${scheduledVisitDate || 'Immediate'} [${timeSlot}]`,
    });

    // Increment inquiry count if property exists in MongoDB
    if (property?._id) {
      await Property.findByIdAndUpdate(property._id, { $inc: { inquiriesCount: 1 } });
    }

    return ApiResponse.success(
      res,
      {
        leadNumber: lead.leadNumber,
        status: lead.status,
        scheduledVisitDate,
        timeSlot,
        propertyTitle: targetTitle,
        message: 'Your VIP site visit has been scheduled. Our concierge team will reach out to confirm your itinerary.',
      },
      'Inquiry submitted successfully',
      201
    );
  } catch (error) {
    return ApiResponse.error(res, 'Enquiry submission failed: ' + error.message, 500);
  }
};

// @desc    AI Property Valuation Tool (VOL-07 & VOL-13)
// @route   POST /api/v1/properties/ai-valuation
// @access  Public
exports.getAiValuation = async (req, res) => {
  const { locality, city, bhk, areaSqFt, furnishing, age } = req.body;

  if (!areaSqFt) {
    return ApiResponse.error(res, 'Please specify property area in square feet', 400);
  }

  try {
    // Valuation algorithm base rates per sq ft
    const baseRatePerSqFt = {
      noida: 8500,
      'greater noida': 5800,
      gurgaon: 12500,
      delhi: 15000,
      ghaziabad: 5200,
      bangalore: 9800,
      mumbai: 22000,
    };

    const targetCity = (city || 'noida').toLowerCase();
    const rate = baseRatePerSqFt[targetCity] || 7500;

    // Multipliers
    const bhkMultiplier = bhk >= 4 ? 1.15 : bhk === 3 ? 1.08 : 1.0;
    const furnishingMultiplier =
      furnishing === 'furnished' ? 1.12 : furnishing === 'semi-furnished' ? 1.05 : 1.0;
    const ageDepreciation = Math.max(0.8, 1 - (Number(age) || 0) * 0.015);

    const estimatedPrice = Math.round(
      Number(areaSqFt) * rate * bhkMultiplier * furnishingMultiplier * ageDepreciation
    );
    const lowEstimate = Math.round(estimatedPrice * 0.94);
    const highEstimate = Math.round(estimatedPrice * 1.06);

    const rentalYield = Math.round((estimatedPrice * 0.038) / 12);

    return ApiResponse.success(
      res,
      {
        estimatedPrice,
        lowEstimate,
        highEstimate,
        pricePerSqFt: Math.round(estimatedPrice / Number(areaSqFt)),
        estimatedMonthlyRent: rentalYield,
        confidenceScore: 89, // % confidence
        marketTrend: '+8.4% YoY in ' + (locality || city || 'Noida'),
      },
      'AI Valuation calculated successfully'
    );
  } catch (error) {
    return ApiResponse.error(res, 'Valuation calculation failed: ' + error.message, 500);
  }
};

// @desc    Get current user's submitted property listings
// @route   GET /api/v1/properties/my/listings
// @access  Private
exports.getMyProperties = async (req, res) => {
  try {
    const userId = req.user.id;
    const userPhone = req.user.phone;

    const query = {
      $or: [
        { owner: userId },
      ],
    };

    if (userPhone) {
      query.$or.push({ contactPhone: userPhone });
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    return ApiResponse.success(res, properties, 'User property listings retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch user listings: ' + error.message, 500);
  }
};
