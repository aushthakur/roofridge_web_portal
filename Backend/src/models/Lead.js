const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    leadNumber: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    source: {
      type: String,
      enum: [
        'hero_quick_finder',
        'property_enquiry',
        'property_detail',
        'home_interiors',
        'construction',
        'maintenance',
        'materials',
        'partner_onboarding',
        'loan_application',
        'legal_consult',
        'whatsapp',
        'ridgebot',
        'direct',
      ],
      default: 'property_enquiry',
    },
    interestType: {
      type: String,
      enum: [
        'buy',
        'rent',
        'interiors',
        'construction',
        'home_services',
        'loan',
        'legal',
        'general',
      ],
      default: 'buy',
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    serviceType: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Noida',
    },
    budget: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      display: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: [
        'new',
        'contacted',
        'site_visit_scheduled',
        'site_visit_done',
        'negotiation',
        'closed_won',
        'closed_lost',
      ],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    score: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedAt: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
    nextFollowUp: {
      type: Date,
    },
    lostReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

LeadSchema.index({ phone: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ assignedTo: 1 });
LeadSchema.index({ createdAt: -1 });

LeadSchema.pre('save', function (next) {
  if (!this.leadNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.leadNumber = `LEAD-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Lead', LeadSchema);
