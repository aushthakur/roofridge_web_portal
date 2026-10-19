/**
 * Standard API Response Envelope for Roof Ridge Platform
 * Blueprint reference: VOL-01 Section 4, VOL-04 Section 2
 */

class ApiResponse {
  /**
   * Send a successful response
   * @param {Object} res Express response object
   * @param {*} data Payload data
   * @param {string} message Human readable message
   * @param {number} statusCode HTTP Status code
   * @param {Object} meta Pagination or extra metadata
   */
  static success(res, data = null, message = 'Operation successful', statusCode = 200, meta = null) {
    const payload = {
      success: true,
      statusCode,
      message,
      data,
    };

    if (meta) {
      payload.meta = meta;
    }

    return res.status(statusCode).json(payload);
  }

  /**
   * Send a formatted error response
   * @param {Object} res Express response object
   * @param {string} message Error message
   * @param {number} statusCode HTTP Status code
   * @param {*} details Error details/validation array
   */
  static error(res, message = 'An error occurred', statusCode = 500, details = null) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: null,
      error: details || message,
    });
  }
}

module.exports = ApiResponse;
