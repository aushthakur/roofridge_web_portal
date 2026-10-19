const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    partnerType: {
      type: String,
      enum: [
        'agent',
        'builder',
        'contractor',
        'interior_designer',
        'materials_supplier',
        'service_partner',
      ],
      required: true,
    },
    gstin: {
      type: String,
      trim: true,
    },
    reraNumber: {
      type: String,
      trim: true,
    },
    operatingCities: [
      {
        type: String,
        default: 'Noida',
      },
    ],
    experienceYears: {
      type: Number,
      default: 1,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verificationNotes: {
      type: String,
      default: '',
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },
    documents: [
      {
        docType: String,
        docUrl: String,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    specializations: [String],
    profileSummary: String,
  },
  {
    timestamps: true,
  }
);

PartnerSchema.index({ partnerType: 1, verificationStatus: 1 });
PartnerSchema.index({ operatingCities: 1 });

module.exports = mongoose.model('Partner', PartnerSchema);
