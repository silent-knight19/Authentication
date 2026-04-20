import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

/**
 * Configures Google OAuth strategy for passport.
 * Requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment.
 */
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const serverUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`;

if (clientId && clientId !== 'your_google_client_id_here') {
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: `${serverUrl}/api/auth/google/callback`,
        state: false,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  console.log('Google OAuth strategy registered');
} else {
  console.warn('Google OAuth credentials not configured — Google sign-in disabled');
}

export default passport;
