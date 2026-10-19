const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      enum: ['Property', 'Partner', 'Booking', 'MaterialProduct'],
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewTitle: String,
    comment: {
      type: String,
      required: true,
    },
    isVerifiedBuyer: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['published', 'flagged', 'hidden'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ targetType: 1, targetId: 1, status: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
