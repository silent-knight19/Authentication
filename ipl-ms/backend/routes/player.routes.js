import { Router } from "express";
import * as controller from "../controllers/player.controller.js";
const router = Router();

router.post("/", controller.createPlayer);
router.get("/", controller.getAllPlayers);
router.get("/:id", controller.getPlayerById);
router.put("/:id", controller.updatePlayer);
router.delete("/:id", controller.deletePlayer);
router.put("/:id/transfer", controller.transferPlayer);
router.put("/:id/role", controller.updatePlayerRole);

export default router;
