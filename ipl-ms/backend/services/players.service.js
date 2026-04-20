import PlayerDetail from "../models/player-detail.model.js";
import ApiError from "../utils/api-error.js";

/**
 * Players Service - Business logic for IPL players operations
 */

const playersService = {
  /**
   * Get all players with optional filtering
   * @param {Object} filters - Query filters (team, role, search, status, etc.)
   * @returns {Promise<Array>} List of players
   */
  async getAllPlayers(filters = {}) {
    const query = {}; // Show all players by default (both ACTIVE and RETIRED)

    // Filter by status if provided
    if (filters.status) {
      query.status = filters.status;
    }

    // Filter by team
    if (filters.team) {
      query.currentTeam = { $regex: new RegExp(`^${filters.team}$`, "i") };
    }

    // Filter by role
    if (filters.role) {
      query.primaryRole = { $regex: new RegExp(filters.role, "i") };
    }

    // Filter by overseas/Indian
    if (filters.isOverseas !== undefined) {
      query.isOverseas = filters.isOverseas === "true";
    }

    // Filter by captain
    if (filters.isCaptain !== undefined) {
      query.isCaptain = filters.isCaptain === "true";
    }

    // Search by name or short name
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { shortName: { $regex: filters.search, $options: "i" } },
        { nickname: { $regex: filters.search, $options: "i" } },
      ];
    }

    let players = await PlayerDetail.find(query)
      .select("name shortName currentTeam primaryRole battingStyle isCaptain isOverseas nationality age photoUrl battingStats bowlingStats");

    // Sort players based on role filter
    if (filters.role) {
      const role = filters.role.toLowerCase();
      if (role.includes("bowler")) {
        // Sort bowlers by wickets (descending)
        players.sort((a, b) => (b.bowlingStats?.wickets || 0) - (a.bowlingStats?.wickets || 0));
      } else if (role.includes("batsman") || role.includes("wicket")) {
        // Sort batsmen and wicket-keepers by runs (descending)
        players.sort((a, b) => (b.battingStats?.runs || 0) - (a.battingStats?.runs || 0));
      } else if (role.includes("all-rounder")) {
        // Sort all-rounders by combined impact: runs + (wickets * 20)
        players.sort((a, b) => {
          const scoreA = (a.battingStats?.runs || 0) + ((a.bowlingStats?.wickets || 0) * 20);
          const scoreB = (b.battingStats?.runs || 0) + ((b.bowlingStats?.wickets || 0) * 20);
          return scoreB - scoreA;
        });
      } else {
        // Default alphabetical sort
        players.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      // Default alphabetical sort when no role filter
      players.sort((a, b) => a.name.localeCompare(b.name));
    }

    return players;
  },

  /**
   * Get single player by ID with full details
   * @param {String} playerId - Player ID or name
   * @returns {Promise<Object>} Player details
   */
  async getPlayerById(playerId) {
    let player;

    // Try to find by MongoDB ID first
    if (playerId.match(/^[0-9a-fA-F]{24}$/)) {
      player = await PlayerDetail.findById(playerId);
    }

    // If not found, try name (case insensitive)
    if (!player) {
      player = await PlayerDetail.findOne({
        name: { $regex: new RegExp(playerId, "i") },
      });
    }

    // Try shortName
    if (!player) {
      player = await PlayerDetail.findOne({
        shortName: { $regex: new RegExp(playerId, "i") },
      });
    }

    if (!player) {
      throw ApiError.notFound("Player not found");
    }

    return player;
  },

  /**
   * Get active players list (for dropdowns)
   * @returns {Promise<Array>} List of active players
   */
  async getActivePlayers() {
    const players = await PlayerDetail.find({ status: "ACTIVE" })
      .select("name shortName currentTeam primaryRole isOverseas")
      .sort({ name: 1 });

    return players;
  },

  /**
   * Get players by team
   * @param {String} teamCode - Team short code (e.g., "CSK", "MI")
   * @returns {Promise<Array>} Players in the team
   */
  async getPlayersByTeam(teamCode) {
    const players = await PlayerDetail.find({
      currentTeam: { $regex: new RegExp(`^${teamCode}$`, "i") },
      status: "ACTIVE",
    }).sort({ name: 1 });

    return players;
  },

  /**
   * Get Orange Cap winners
   * @returns {Promise<Array>} Players who won Orange Cap
   */
  async getOrangeCapWinners() {
    const players = await PlayerDetail.find({
      "awards.orangeCaps": { $exists: true, $ne: [] },
    }).select("name shortName currentTeam awards.orangeCaps photoUrl");

    return players;
  },

  /**
   * Get Purple Cap winners
   * @returns {Promise<Array>} Players who won Purple Cap
   */
  async getPurpleCapWinners() {
    const players = await PlayerDetail.find({
      "awards.purpleCaps": { $exists: true, $ne: [] },
    }).select("name shortName currentTeam awards.purpleCaps photoUrl");

    return players;
  },

  /**
   * Get player statistics summary
   * @param {String} playerId - Player ID
   * @returns {Promise<Object>} Player statistics
   */
  async getPlayerStats(playerId) {
    const player = await this.getPlayerById(playerId);

    return {
      battingStats: player.battingStats,
      bowlingStats: player.bowlingStats,
      fieldingStats: player.fieldingStats,
      seasonStats: player.seasonStats,
      awards: player.awards,
    };
  },

  /**
   * Get player records
   * @param {String} playerId - Player ID
   * @returns {Promise<Object>} Player records
   */
  async getPlayerRecords(playerId) {
    const player = await this.getPlayerById(playerId);
    return player.records;
  },

  /**
   * Create new player
   * @param {Object} playerData - Player data
   * @returns {Promise<Object>} Created player
   */
  async createPlayer(playerData) {
    // Check if player with same name already exists
    const existingPlayer = await PlayerDetail.findOne({
      name: { $regex: new RegExp(`^${playerData.name}$`, "i") },
    });

    if (existingPlayer) {
      throw ApiError.conflict("Player with this name already exists");
    }

    const player = new PlayerDetail(playerData);
    await player.save();

    return player;
  },

  /**
   * Update player
   * @param {String} playerId - Player ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated player
   */
  async updatePlayer(playerId, updateData) {
    let player;

    // Try to find by MongoDB ID first
    if (playerId.match(/^[0-9a-fA-F]{24}$/)) {
      player = await PlayerDetail.findById(playerId);
    }

    // If not found, try name
    if (!player) {
      player = await PlayerDetail.findOne({
        name: { $regex: new RegExp(playerId, "i") },
      });
    }

    if (!player) {
      throw ApiError.notFound("Player not found");
    }

    Object.assign(player, updateData);
    await player.save();

    return player;
  },

  /**
   * Delete player
   * @param {String} playerId - Player ID
   * @returns {Promise<Object>} Deleted player
   */
  async deletePlayer(playerId) {
    let player;

    // Try to find by MongoDB ID first
    if (playerId.match(/^[0-9a-fA-F]{24}$/)) {
      player = await PlayerDetail.findById(playerId);
    }

    // If not found, try name
    if (!player) {
      player = await PlayerDetail.findOne({
        name: { $regex: new RegExp(playerId, "i") },
      });
    }

    if (!player) {
      throw ApiError.notFound("Player not found");
    }

    await PlayerDetail.findByIdAndDelete(player._id);
    return player;
  },

  /**
   * Seed players data
   * @param {Array} playersData - Array of player data
   * @returns {Promise<Object>} Seed result
   */
  async seedPlayers(playersData) {
    const results = {
      created: 0,
      updated: 0,
      errors: [],
    };

    for (const playerData of playersData) {
      try {
        const existingPlayer = await PlayerDetail.findOne({
          name: playerData.name,
        });

        if (existingPlayer) {
          // Update existing player
          Object.assign(existingPlayer, playerData);
          await existingPlayer.save();
          results.updated++;
        } else {
          // Create new player
          const newPlayer = new PlayerDetail(playerData);
          await newPlayer.save();
          results.created++;
        }
      } catch (error) {
        results.errors.push({
          name: playerData.name,
          error: error.message,
        });
      }
    }

    return results;
  },
};

export default playersService;
