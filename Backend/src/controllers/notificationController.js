const Notification = require('../models/Notification');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get user notifications
// @route   GET /api/v1/notifications
// @access  Private
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({ user: req.user.id, isRead: false });

    return ApiResponse.success(res, { notifications, unreadCount }, 'Notifications retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch notifications: ' + error.message, 500);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
exports.markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    return ApiResponse.success(res, notification, 'Notification marked as read');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update notification: ' + error.message, 500);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/read-all
// @access  Private
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    return ApiResponse.success(res, null, 'All notifications marked as read');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update notifications: ' + error.message, 500);
  }
};
