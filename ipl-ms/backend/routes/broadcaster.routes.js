import { Router } from "express";
import * as controller from "../controllers/broadcaster.controller.js";
const router = Router();

router.post("/", controller.createBroadcaster);
router.get("/", controller.getAllBroadcasters);
router.get("/:id", controller.getBroadcasterById);
router.put("/:id", controller.updateBroadcaster);
router.delete("/:id", controller.deleteBroadcaster);

export default router;
