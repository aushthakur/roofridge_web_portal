const mongoose = require('mongoose');

const MaterialOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MaterialProduct',
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        pricePerUnit: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        unit: { type: String, default: 'unit' },
      },
    ],
    deliveryFee: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: { type: String, default: 'Noida' },
      state: { type: String, default: 'Uttar Pradesh' },
      pincode: String,
    },
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
      default: 'placed',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cash_on_delivery', 'credit_terms'],
      default: 'online',
    },
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

MaterialOrderSchema.index({ user: 1, createdAt: -1 });
MaterialOrderSchema.index({ status: 1 });

MaterialOrderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('MaterialOrder', MaterialOrderSchema);
