import { Router } from "express";
import * as controller from "../controllers/team-broadcaster.controller.js";
const router = Router();

router.post("/", controller.assignBroadcaster);

export default router;
