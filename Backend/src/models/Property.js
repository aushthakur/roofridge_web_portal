const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a property description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price in INR'],
      min: [0, 'Price must be positive'],
    },
    priceNegotiable: {
      type: Boolean,
      default: false,
    },
    priceDisplay: {
      type: String,
    },
    type: {
      type: String,
      enum: ['buy', 'rent', 'lease'],
      required: true,
      default: 'buy',
    },
    propertyType: {
      type: String,
      enum: ['residential', 'commercial', 'plots', 'agricultural'],
      required: true,
      default: 'residential',
    },
    subType: {
      type: String,
      enum: [
        'apartment',
        'villa',
        'independent_house',
        'penthouse',
        'studio',
        'office',
        'shop',
        'plot',
        'warehouse',
      ],
      default: 'apartment',
    },
    bhk: {
      type: Number,
      min: 1,
      max: 10,
    },
    location: {
      address: { type: String, default: '' },
      locality: { type: String, default: '' },
      city: { type: String, required: true, default: 'Noida' },
      state: { type: String, default: 'Uttar Pradesh' },
      zipCode: { type: String, default: '' },
      coordinates: {
        lat: { type: Number, default: 28.5355 },
        lng: { type: Number, default: 77.391 },
      },
    },
    features: {
      bedrooms: { type: Number, default: 2 },
      bathrooms: { type: Number, default: 2 },
      balconies: { type: Number, default: 1 },
      areaSqFt: { type: Number, required: true },
      carpetAreaSqFt: { type: Number },
      furnishingStatus: {
        type: String,
        enum: ['furnished', 'semi-furnished', 'unfurnished'],
        default: 'semi-furnished',
      },
      floorNumber: { type: Number, default: 1 },
      totalFloors: { type: Number, default: 10 },
      facing: {
        type: String,
        enum: [
          'east',
          'west',
          'north',
          'south',
          'north-east',
          'north-west',
          'south-east',
          'south-west',
        ],
        default: 'east',
      },
      ageOfProperty: { type: Number, default: 0 },
      possessionStatus: {
        type: String,
        enum: ['ready_to_move', 'under_construction'],
        default: 'ready_to_move',
      },
    },
    amenities: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ownerType: {
      type: String,
      enum: ['owner', 'agent', 'builder'],
      default: 'owner',
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented', 'inactive'],
      default: 'available',
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'changes_requested'],
      default: 'pending',
    },
    moderationNotes: {
      type: String,
      default: '',
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    reraId: {
      type: String,
      default: '',
    },
    isReraVerified: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
      },
    ],
    floorPlans: [
      {
        title: String,
        image: String,
        areaSqFt: Number,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    viewsCount: {
      type: Number,
      default: 0,
    },
    inquiriesCount: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Indexes
PropertySchema.index({ type: 1, 'location.city': 1, status: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ bhk: 1 });
PropertySchema.index({ approvalStatus: 1 });
PropertySchema.index({ isFeatured: 1 });

// Generate slug before saving
PropertySchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    const raw = `${this.title}-${this.location?.locality || this.location?.city || ''}-${(this._id || Date.now()).toString().slice(-6)}`;
    this.slug = raw
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Property', PropertySchema);
