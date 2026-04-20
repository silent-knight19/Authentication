/**
 * Standardized API response helper
 */
class ApiResponse {
  static success(message, data = null) {
    const response = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };
    if (data !== null) {
      response.data = data;
    }
    return response;
  }

  static ok(message, data) {
    return this.success(message, data);
  }

  static created(message, data) {
    return this.success(message, data);
  }

  static error(message, errors = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };
    if (errors !== null) {
      response.errors = errors;
    }
    return response;
  }
}

export default ApiResponse;
