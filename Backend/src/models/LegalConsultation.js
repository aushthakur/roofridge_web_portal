const mongoose = require('mongoose');

const LegalConsultationSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientPhone: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: [
        'title_verification',
        'agreement_drafting',
        'rera_complaint',
        'property_registration',
        'dispute_resolution',
        'legal_opinion',
      ],
      required: true,
    },
    propertyDetails: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: 'Noida',
    },
    status: {
      type: String,
      enum: [
        'requested',
        'lawyer_assigned',
        'document_review',
        'opinion_drafted',
        'completed',
        'closed',
      ],
      default: 'requested',
    },
    assignedLawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
    },
    fee: {
      type: Number,
      default: 2999,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

LegalConsultationSchema.index({ user: 1, createdAt: -1 });
LegalConsultationSchema.index({ status: 1 });

LegalConsultationSchema.pre('save', function (next) {
  if (!this.caseNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.caseNumber = `LEG-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('LegalConsultation', LegalConsultationSchema);
