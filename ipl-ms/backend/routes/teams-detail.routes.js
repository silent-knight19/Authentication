import { Router } from "express";
import teamsController from "../controllers/teams.controller.js";

const router = Router();

/**
 * Teams Detail Routes
 * Comprehensive API for IPL teams with full history and statistics
 */

// Get all teams with filters
router.get("/", teamsController.getAllTeams);

// Get active teams list (for dropdowns)
router.get("/active/list", teamsController.getActiveTeams);

// Get championship history
router.get("/championships/history", teamsController.getChampionshipHistory);

// Get single team by ID
router.get("/:id", teamsController.getTeamById);

// Get team season history
router.get("/:id/seasons", teamsController.getTeamSeasons);

// Get team statistics
router.get("/:id/stats", teamsController.getTeamStats);

// Get team rivalries
router.get("/:id/rivalries", teamsController.getTeamRivalries);

// Create new team (admin only)
router.post("/", teamsController.createTeam);

// Update team
router.put("/:id", teamsController.updateTeam);

// Delete team (admin only)
router.delete("/:id", teamsController.deleteTeam);

export default router;
