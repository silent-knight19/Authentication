/**
 * Standardized API response helper
 */
class ApiResponse {
  static success(res, message, data = null, statusCode = 200) {
    const response = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };
    if (data !== null) {
      response.data = data;
    }
    return res.status(statusCode).json(response);
  }

  static ok(res, message, data) {
    return this.success(res, message, data, 200);
  }

  static created(res, message, data) {
    return this.success(res, message, data, 201);
  }

  static error(res, message, statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };
    if (errors !== null) {
      response.errors = errors;
    }
    return res.status(statusCode).json(response);
  }
}

export default ApiResponse;
