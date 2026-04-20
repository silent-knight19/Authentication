import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/auth.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/signin?error=google_auth_failed`,
  }),
  authController.googleCallback
);

router.post('/refresh', authController.refreshToken);
router.post('/logout', auth, authController.logout);
router.get('/me', auth, authController.getMe);

export default router;
