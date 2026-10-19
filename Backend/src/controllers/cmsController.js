const Banner = require('../models/Banner');
const Review = require('../models/Review');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get Banners
// @route   GET /api/v1/cms/banners
// @access  Public
exports.getBanners = async (req, res) => {
  try {
    const { placement = 'home_hero' } = req.query;
    const banners = await Banner.find({ placement, isActive: true }).sort({ displayOrder: 1 });
    return ApiResponse.success(res, banners, 'Banners retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch banners: ' + error.message, 500);
  }
};

// @desc    Create Banner (Admin)
// @route   POST /api/v1/cms/banners
// @access  Private (Admin)
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    return ApiResponse.success(res, banner, 'Banner created', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to create banner: ' + error.message, 400);
  }
};

// @desc    Get Reviews for Property or Partner
// @route   GET /api/v1/cms/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    const query = { status: 'published' };
    if (targetType) query.targetType = targetType;
    if (targetId) query.targetId = targetId;

    const reviews = await Review.find(query).sort({ createdAt: -1 }).limit(20);
    return ApiResponse.success(res, reviews, 'Reviews retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch reviews: ' + error.message, 500);
  }
};

// @desc    Submit Review
// @route   POST /api/v1/cms/reviews
// @access  Private
exports.submitReview = async (req, res) => {
  const { targetType, targetId, rating, reviewTitle, comment } = req.body;

  if (!targetType || !targetId || !rating || !comment) {
    return ApiResponse.error(res, 'targetType, targetId, rating, and comment are required', 400);
  }

  try {
    const review = await Review.create({
      user: req.user.id,
      authorName: req.user.name,
      targetType,
      targetId,
      rating,
      reviewTitle,
      comment,
      status: 'published',
    });

    return ApiResponse.success(res, review, 'Review submitted successfully', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to submit review: ' + error.message, 500);
  }
};
