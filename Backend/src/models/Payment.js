const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    paymentNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    purpose: {
      type: String,
      enum: [
        'property_listing_package',
        'featured_boost',
        'material_order',
        'service_booking',
        'legal_consultation',
        'subscription',
      ],
      required: true,
    },
    referenceId: {
      type: String,
      default: '',
    },
    gateway: {
      type: String,
      enum: ['razorpay', 'cash', 'wallet', 'bank_transfer'],
      default: 'razorpay',
    },
    gatewayOrderId: String,
    gatewayPaymentId: String,
    gatewaySignature: String,
    status: {
      type: String,
      enum: ['initiated', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'initiated',
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({ user: 1, createdAt: -1 });
PaymentSchema.index({ gatewayPaymentId: 1 });
PaymentSchema.index({ status: 1 });

PaymentSchema.pre('save', function (next) {
  if (!this.paymentNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.paymentNumber = `PAY-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
