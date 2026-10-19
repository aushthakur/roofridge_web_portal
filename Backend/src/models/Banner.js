const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    badgeText: String,
    imageUrl: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      default: 'Explore Now',
    },
    ctaLink: {
      type: String,
      default: '/properties',
    },
    placement: {
      type: String,
      enum: ['home_hero', 'home_middle', 'properties_sidebar', 'interiors_hero', 'materials_hero'],
      default: 'home_hero',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Banner', BannerSchema);
