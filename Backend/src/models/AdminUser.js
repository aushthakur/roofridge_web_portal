const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    adminRole: {
      type: String,
      enum: [
        'super_admin',
        'moderator',
        'crm_manager',
        'finance_manager',
        'support_executive',
      ],
      default: 'moderator',
    },
    permissions: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdminUser', AdminUserSchema);
