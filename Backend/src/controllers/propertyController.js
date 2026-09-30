const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Admin/Dealer)
exports.createProperty = async (req, res) => {
  try {
    // Add user to req.body (assuming auth middleware sets req.user)
    req.body.owner = req.user.id;

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
