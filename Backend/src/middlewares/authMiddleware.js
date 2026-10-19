const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// Protect routes - requires valid JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return ApiResponse.error(res, 'Not authorized to access this resource. Please log in.', 401);
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'secret_roof_ridge_key_jwt_default';
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return ApiResponse.error(res, 'User associated with this token no longer exists.', 401);
    }

    if (user.status === 'suspended' || user.status === 'deactivated') {
      return ApiResponse.error(res, 'Account is currently inactive or suspended.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 'Session expired or invalid token. Please log in again.', 401);
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Authentication required', 401);
    }

    // superadmin and admin bypass role checks if allowed
    const userRoles = [req.user.role];
    const isAllowed = roles.some((r) => userRoles.includes(r)) || req.user.role === 'admin' || req.user.role === 'superadmin';

    if (!isAllowed) {
      return ApiResponse.error(
        res,
        `Access denied. Role '${req.user.role}' lacks sufficient permissions.`,
        403
      );
    }
    next();
  };
};

// Optional auth: attaches req.user if token present, but doesn't block if not
exports.optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'secret_roof_ridge_key_jwt_default';
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id);
    } catch (e) {
      // Ignore token failure for public routes
    }
  }
  next();
};
