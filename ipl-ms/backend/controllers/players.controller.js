import playersService from "../services/players.service.js";
import ApiResponse from "../utils/api-response.js";

/**
 * Players Controller - API handlers for IPL players
 */

const playersController = {
  /**
   * Get all players
   * GET /api/players-detail
   */
  async getAllPlayers(req, res, next) {
    try {
      const filters = {
        team: req.query.team,
        role: req.query.role,
        search: req.query.search,
        isOverseas: req.query.isOverseas,
        isCaptain: req.query.isCaptain,
      };

      const players = await playersService.getAllPlayers(filters);

      res.status(200).json(
        ApiResponse.success("Players retrieved successfully", players)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single player by ID
   * GET /api/players-detail/:id
   */
  async getPlayerById(req, res, next) {
    try {
      const { id } = req.params;
      const player = await playersService.getPlayerById(id);

      res.status(200).json(
        ApiResponse.success("Player retrieved successfully", player)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get active players list
   * GET /api/players-detail/active/list
   */
  async getActivePlayers(req, res, next) {
    try {
      const players = await playersService.getActivePlayers();

      res.status(200).json(
        ApiResponse.success("Active players retrieved successfully", players)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get players by team
   * GET /api/players-detail/team/:teamCode
   */
  async getPlayersByTeam(req, res, next) {
    try {
      const { teamCode } = req.params;
      const players = await playersService.getPlayersByTeam(teamCode);

      res.status(200).json(
        ApiResponse.success(`Players from ${teamCode} retrieved successfully`, players)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get Orange Cap winners
   * GET /api/players-detail/orange-cap
   */
  async getOrangeCapWinners(req, res, next) {
    try {
      const players = await playersService.getOrangeCapWinners();

      res.status(200).json(
        ApiResponse.success("Orange Cap winners retrieved successfully", players)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get Purple Cap winners
   * GET /api/players-detail/purple-cap
   */
  async getPurpleCapWinners(req, res, next) {
    try {
      const players = await playersService.getPurpleCapWinners();

      res.status(200).json(
        ApiResponse.success("Purple Cap winners retrieved successfully", players)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get player statistics
   * GET /api/players-detail/:id/stats
   */
  async getPlayerStats(req, res, next) {
    try {
      const { id } = req.params;
      const stats = await playersService.getPlayerStats(id);

      res.status(200).json(
        ApiResponse.success("Player statistics retrieved successfully", stats)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get player records
   * GET /api/players-detail/:id/records
   */
  async getPlayerRecords(req, res, next) {
    try {
      const { id } = req.params;
      const records = await playersService.getPlayerRecords(id);

      res.status(200).json(
        ApiResponse.success("Player records retrieved successfully", records)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create new player
   * POST /api/players-detail
   */
  async createPlayer(req, res, next) {
    try {
      const player = await playersService.createPlayer(req.body);

      res.status(201).json(
        ApiResponse.success("Player created successfully", player)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update player
   * PUT /api/players-detail/:id
   */
  async updatePlayer(req, res, next) {
    try {
      const { id } = req.params;
      const player = await playersService.updatePlayer(id, req.body);

      res.status(200).json(
        ApiResponse.success("Player updated successfully", player)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete player
   * DELETE /api/players-detail/:id
   */
  async deletePlayer(req, res, next) {
    try {
      const { id } = req.params;
      const player = await playersService.deletePlayer(id);

      res.status(200).json(
        ApiResponse.success("Player deleted successfully", player)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Seed players data
   * POST /api/players-detail/seed
   */
  async seedPlayers(req, res, next) {
    try {
      const playersData = req.body.players || req.body;
      const results = await playersService.seedPlayers(playersData);

      res.status(200).json(
        ApiResponse.success("Players seeded successfully", results)
      );
    } catch (error) {
      next(error);
    }
  },
};

export default playersController;
