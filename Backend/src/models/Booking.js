const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
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
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
    },
    serviceCategory: {
      type: String,
      enum: [
        'interiors',
        'construction',
        'maintenance',
        'repairs',
        'deep_cleaning',
        'electrical',
        'plumbing',
        'painting',
      ],
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      default: '10:00 AM - 12:00 PM',
    },
    address: {
      street: { type: String, default: '' },
      locality: { type: String, default: '' },
      city: { type: String, default: 'Noida' },
      pincode: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cash_on_service'],
      default: 'online',
    },
    assignedVendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
    },
    technicianDetails: {
      name: String,
      phone: String,
    },
    cancellationReason: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ user: 1, createdAt: -1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ assignedVendor: 1 });

BookingSchema.pre('save', function (next) {
  if (!this.bookingNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.bookingNumber = `RR-BKG-${new Date().getFullYear()}-${randomSuffix}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Booking', BookingSchema);
