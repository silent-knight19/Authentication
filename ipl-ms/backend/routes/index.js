import { Router } from 'express';
import authRoutes from './auth.routes.js';
import ownerRoutes from './owner.routes.js';
import teamRoutes from './team.routes.js';
import teamDetailRoutes from './teams-detail.routes.js';
import playerRoutes from './player.routes.js';
import sponsorRoutes from './sponsor.routes.js';
import broadcasterRoutes from './broadcaster.routes.js';
import teamSponsorRoutes from './team-sponsor.routes.js';
import teamBroadcasterRoutes from './team-broadcaster.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/owners', ownerRoutes);
router.use('/teams', teamRoutes);
router.use('/teams-detail', teamDetailRoutes);
router.use('/players', playerRoutes);
router.use('/sponsors', sponsorRoutes);
router.use('/broadcasters', broadcasterRoutes);
router.use('/team-sponsors', teamSponsorRoutes);
router.use('/team-broadcasters', teamBroadcasterRoutes);

export default router;
