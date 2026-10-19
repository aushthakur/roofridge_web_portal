const mongoose = require('mongoose');

const LeadActivitySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    activityType: {
      type: String,
      enum: [
        'status_change',
        'note_added',
        'call_logged',
        'whatsapp_sent',
        'email_sent',
        'site_visit',
        'site_visit_scheduled',
        'enquiry',
        'assigned',
      ],
      required: true,
    },
    previousValue: {
      type: String,
      default: '',
    },
    newValue: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

LeadActivitySchema.index({ lead: 1, createdAt: -1 });

module.exports = mongoose.model('LeadActivity', LeadActivitySchema);
