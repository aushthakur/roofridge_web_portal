const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['buy', 'rent'],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial'],
    required: true,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    }
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    areaSqFt: Number,
    furnishingStatus: {
      type: String,
      enum: ['furnished', 'semi-furnished', 'unfurnished'],
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'inactive'],
    default: 'available',
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', PropertySchema);
