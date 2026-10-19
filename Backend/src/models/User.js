const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: [
        'user',
        'buyer',
        'tenant',
        'owner',
        'agent',
        'builder',
        'contractor',
        'interior_designer',
        'materials_supplier',
        'service_partner',
        'admin',
        'superadmin',
        'crm_executive',
      ],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    kycStatus: {
      type: String,
      enum: ['not_submitted', 'pending', 'verified', 'rejected'],
      default: 'not_submitted',
    },
    kycDocuments: [
      {
        docType: { type: String },
        docUrl: { type: String },
        verifiedAt: { type: Date },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'suspended', 'deactivated'],
      default: 'active',
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    savedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    city: {
      type: String,
      default: 'Noida',
    },
    address: {
      type: String,
      default: '',
    },
    otp: {
      code: { type: String, select: false },
      expiresAt: { type: Date, select: false },
    },
    googleId: {
      type: String,
    },
    lastLoginAt: {
      type: Date,
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ role: 1 });

module.exports = mongoose.model('User', UserSchema);
