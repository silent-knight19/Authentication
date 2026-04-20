import authService from '../services/auth.service.js';
import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';

/**
 * Handles user registration with email/password.
 * Sets httpOnly cookies for access and refresh tokens.
 */
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw ApiError.badRequest('Name, email, and password are required');
    }

    const result = await authService.register(name, email, password);

    const cookieOptions = authService.getCookieOptions();
    res.cookie('accessToken', result.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return ApiResponse.created(res, 'Account created successfully', result.user);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles user login with email/password.
 * Sets httpOnly cookies for access and refresh tokens.
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw ApiError.badRequest('Email and password are required');
    }

    const result = await authService.login(email, password);

    const cookieOptions = authService.getCookieOptions();
    res.cookie('accessToken', result.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return ApiResponse.ok(res, 'Logged in successfully', result.user);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the Google OAuth callback after successful authentication.
 * Sets cookies and redirects to the frontend success page.
 */
async function googleCallback(req, res, next) {
  try {
    const result = await authService.handleGoogleOAuth(req.user);

    const cookieOptions = authService.getCookieOptions();
    res.cookie('accessToken', result.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/google/success`);
  } catch (error) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    console.error('Google OAuth callback error:', error);
    return res.redirect(`${clientUrl}/signin?error=google_auth_failed`);
  }
}

/**
 * Refreshes the access token using the refresh token cookie.
 */
async function refreshToken(req, res, next) {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    const result = await authService.refreshTokens(incomingRefreshToken);

    const cookieOptions = authService.getCookieOptions();
    res.cookie('accessToken', result.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return ApiResponse.ok(res, 'Token refreshed successfully', result.user);
  } catch (error) {
    next(error);
  }
}

/**
 * Logs out the user by clearing tokens from DB and cookies.
 */
async function logout(req, res, next) {
  try {
    await authService.logout(req.user.id);

    const cookieOptions = authService.getCookieOptions();
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    return ApiResponse.ok(res, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
}

/**
 * Returns the currently authenticated user's info.
 */
async function getMe(req, res, next) {
  try {
    return ApiResponse.ok(res, 'User fetched successfully', req.user);
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  googleCallback,
  refreshToken,
  logout,
  getMe,
};
