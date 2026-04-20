import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.model.js';
import ApiError from '../utils/api-error.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

/**
 * Generate a short-lived access token (15 min).
 * @param {object} user - { id, email }
 * @returns {string}
 */
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });
}

/**
 * Generate a long-lived refresh token (7 days).
 * @param {object} user - { id }
 * @returns {string}
 */
function generateRefreshToken(user) {
  const tokenFamily = crypto.randomBytes(16).toString('hex');
  return jwt.sign({ id: user.id, tokenFamily }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

/**
 * Returns cookie options for httpOnly tokens.
 * @returns {object}
 */
function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };
}

/**
 * Format user object for API responses.
 * @param {object} user - Mongoose user document
 * @returns {object}
 */
function formatUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '',
  };
}

/**
 * Register a new user with email/password.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
async function register(name, email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.badRequest('Email is already registered');
  }

  const user = await User.create({ name, email, password });
  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { user: formatUser(user), accessToken, refreshToken };
}

/**
 * Log in an existing user with email/password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
async function login(email, password) {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { user: formatUser(user), accessToken, refreshToken };
}

/**
 * Handle Google OAuth callback — find or create user.
 * @param {object} profile - Google profile from passport
 * @returns {Promise<object>}
 */
async function handleGoogleOAuth(profile) {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw ApiError.badRequest('Google account has no email');
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: profile.displayName || email.split('@')[0],
      email,
      googleId: profile.id,
      avatar: profile.photos?.[0]?.value || '',
    });
  } else if (!user.googleId) {
    user.googleId = profile.id;
    if (!user.avatar && profile.photos?.[0]?.value) {
      user.avatar = profile.photos[0].value;
    }
    await user.save();
  }

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { user: formatUser(user), accessToken, refreshToken };
}

/**
 * Refresh access and refresh tokens.
 * @param {string} incomingRefreshToken
 * @returns {Promise<object>}
 */
async function refreshTokens(incomingRefreshToken) {
  if (!incomingRefreshToken) {
    throw ApiError.unauthorized('Refresh token is required');
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, JWT_REFRESH_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw ApiError.unauthorized('Refresh token has been revoked');
  }

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { user: formatUser(user), accessToken, refreshToken };
}

/**
 * Logout — clear the stored refresh token.
 * @param {string} userId
 */
async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}

export default {
  register,
  login,
  handleGoogleOAuth,
  refreshTokens,
  logout,
  getCookieOptions,
};
