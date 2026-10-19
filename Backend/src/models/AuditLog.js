const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    adminName: {
      type: String,
      default: 'Admin System',
    },
    adminEmail: {
      type: String,
      default: 'admin@roofridge.com',
    },
    action: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      enum: ['Property', 'Partner', 'Lead', 'User', 'Payment', 'Booking', 'Order', 'CMS', 'System'],
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
  },
  {
    timestamps: true,
  }
);

AuditLogSchema.index({ entityType: 1, entityId: 1 });
AuditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
