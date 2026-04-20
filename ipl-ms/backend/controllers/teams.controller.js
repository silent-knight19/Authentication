import teamsService from "../services/teams.service.js";
import ApiResponse from "../utils/api-response.js";

/**
 * Teams Controller - HTTP request handlers for teams API
 */

const teamsController = {
  /**
   * GET /api/teams - Get all teams with optional filters
   */
  async getAllTeams(req, res, next) {
    try {
      const { status, search } = req.query;
      const filters = {};

      if (status) filters.status = status.toUpperCase();
      if (search) filters.search = search;

      const teams = await teamsService.getAllTeams(filters);
      res.status(200).json(ApiResponse.ok("Teams fetched successfully", { teams, count: teams.length }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/:id - Get single team by ID
   */
  async getTeamById(req, res, next) {
    try {
      const { id } = req.params;
      const team = await teamsService.getTeamById(id);
      res.status(200).json(ApiResponse.ok("Team fetched successfully", { team }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/:id/seasons - Get team season history
   */
  async getTeamSeasons(req, res, next) {
    try {
      const { id } = req.params;
      const seasons = await teamsService.getTeamSeasonHistory(id);
      res.status(200).json(ApiResponse.ok("Team seasons fetched successfully", { seasons }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/:id/stats - Get team statistics summary
   */
  async getTeamStats(req, res, next) {
    try {
      const { id } = req.params;
      const stats = await teamsService.getTeamStats(id);
      res.status(200).json(ApiResponse.ok("Team stats fetched successfully", { stats }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/:id/rivalries - Get team rivalries
   */
  async getTeamRivalries(req, res, next) {
    try {
      const { id } = req.params;
      const rivalries = await teamsService.getTeamRivalries(id);
      res.status(200).json(ApiResponse.ok("Team rivalries fetched successfully", { rivalries }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/teams - Create new team (admin only)
   */
  async createTeam(req, res, next) {
    try {
      const team = await teamsService.createTeam(req.body);
      res.status(201).json(ApiResponse.created("Team created successfully", { team }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/teams/:id - Update team
   */
  async updateTeam(req, res, next) {
    try {
      const { id } = req.params;
      const team = await teamsService.updateTeam(id, req.body);
      res.status(200).json(ApiResponse.ok("Team updated successfully", { team }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/teams/:id - Delete team (admin only)
   */
  async deleteTeam(req, res, next) {
    try {
      const { id } = req.params;
      await teamsService.deleteTeam(id);
      res.status(200).json(ApiResponse.ok("Team deleted successfully"));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/active/list - Get active teams list (for dropdowns)
   */
  async getActiveTeams(req, res, next) {
    try {
      const teams = await teamsService.getActiveTeams();
      res.status(200).json(ApiResponse.ok("Active teams fetched successfully", { teams }));
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/championships/history - Get championship history
   */
  async getChampionshipHistory(req, res, next) {
    try {
      const championships = await teamsService.getChampionshipHistory();
      res.status(200).json(ApiResponse.ok("Championship history fetched successfully", { championships }));
    } catch (error) {
      next(error);
    }
  },
};

export default teamsController;
