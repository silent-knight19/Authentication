import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../utils/api-error.js';

/**
 * Middleware to protect routes.
 * Reads the accessToken from httpOnly cookies, verifies the JWT,
 * and attaches the user object to req.user.
 */
async function auth(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.unauthorized('Please log in to access this resource');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw ApiError.unauthorized('Session expired. Please log in again.');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized('User no longer exists');
    }

    req.user = { id: user._id, name: user.name, email: user.email, avatar: user.avatar };
    next();
  } catch (error) {
    next(error);
  }
}

export default auth;
