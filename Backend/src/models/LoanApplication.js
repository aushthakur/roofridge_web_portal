const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    applicantPhone: {
      type: String,
      required: true,
      trim: true,
    },
    applicantEmail: {
      type: String,
      trim: true,
    },
    loanType: {
      type: String,
      enum: [
        'home_loan',
        'plot_loan',
        'loan_against_property',
        'home_renovation_loan',
      ],
      default: 'home_loan',
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 100000,
    },
    tenureYears: {
      type: Number,
      default: 20,
    },
    employmentType: {
      type: String,
      enum: ['salaried', 'self_employed', 'business_owner'],
      default: 'salaried',
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      default: 'Noida',
    },
    preferredBank: {
      type: String,
      default: 'HDFC Bank',
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    status: {
      type: String,
      enum: [
        'applied',
        'document_verification',
        'in_review',
        'sanctioned',
        'disbursed',
        'rejected',
      ],
      default: 'applied',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

LoanApplicationSchema.index({ user: 1, createdAt: -1 });
LoanApplicationSchema.index({ status: 1 });

LoanApplicationSchema.pre('save', function (next) {
  if (!this.applicationNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.applicationNumber = `LOAN-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);
