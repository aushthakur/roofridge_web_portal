const mongoose = require('mongoose');

const MaterialProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaterialCategory',
    },
    categoryName: {
      type: String,
      default: 'Building Materials',
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mrp: {
      type: Number,
      min: 0,
    },
    unit: {
      type: String,
      default: 'unit',
    },
    minimumOrderQty: {
      type: Number,
      default: 1,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 100,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
    },
    images: [
      {
        type: String,
      },
    ],
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MaterialProductSchema.index({ category: 1, inStock: 1 });
MaterialProductSchema.index({ brand: 1 });

MaterialProductSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = `${this.brand}-${this.name}-${Date.now().toString().slice(-4)}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('MaterialProduct', MaterialProductSchema);
