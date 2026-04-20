import { Router } from "express";
import playersController from "../controllers/players.controller.js";

const router = Router();

/**
 * Players Detail Routes
 * Comprehensive API for IPL players with full profiles and statistics
 */

// Get all players with filters
router.get("/", playersController.getAllPlayers);

// Get active players list (for dropdowns)
router.get("/active/list", playersController.getActivePlayers);

// Get Orange Cap winners
router.get("/orange-cap", playersController.getOrangeCapWinners);

// Get Purple Cap winners
router.get("/purple-cap", playersController.getPurpleCapWinners);

// Get players by team
router.get("/team/:teamCode", playersController.getPlayersByTeam);

// Seed players data
router.post("/seed", playersController.seedPlayers);

// Get single player by ID
router.get("/:id", playersController.getPlayerById);

// Get player statistics
router.get("/:id/stats", playersController.getPlayerStats);

// Get player records
router.get("/:id/records", playersController.getPlayerRecords);

// Create new player (admin only)
router.post("/", playersController.createPlayer);

// Update player
router.put("/:id", playersController.updatePlayer);

// Delete player (admin only)
router.delete("/:id", playersController.deletePlayer);

export default router;
