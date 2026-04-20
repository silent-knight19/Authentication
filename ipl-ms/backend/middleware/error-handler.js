import ApiError from '../utils/api-error.js';

/**
 * Global error handler middleware.
 * Suppresses expected client errors (4xx) from polluting the terminal.
 */
const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError) || err.statusCode >= 500) {
    console.error('Error:', err);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
