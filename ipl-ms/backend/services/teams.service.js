import TeamDetail from "../models/team-detail.model.js";
import ApiError from "../utils/api-error.js";

/**
 * Teams Service - Business logic for IPL teams operations
 */

const teamsService = {
  /**
   * Get all teams with optional filtering
   * @param {Object} filters - Query filters (status, search, etc.)
   * @returns {Promise<Array>} List of teams
   */
  async getAllTeams(filters = {}) {
    const query = {};

    // Filter by status (ACTIVE or DEFUNCT)
    if (filters.status) {
      query.status = filters.status;
    }

    // Search by name or short name
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { shortName: { $regex: filters.search, $options: "i" } },
      ];
    }

    const teams = await TeamDetail.find(query)
      .select("name shortName foundedYear defunctYear status homeCity championships totalMatches wins winPercentage teamColors")
      .sort({ foundedYear: 1, name: 1 });

    return teams;
  },

  /**
   * Get single team by ID with full details
   * @param {String} teamId - Team ID or short name
   * @returns {Promise<Object>} Team details
   */
  async getTeamById(teamId) {
    let team;

    // Try to find by MongoDB ID first
    if (teamId.match(/^[0-9a-fA-F]{24}$/)) {
      team = await TeamDetail.findById(teamId);
    }

    // If not found, try short name (case insensitive)
    if (!team) {
      team = await TeamDetail.findOne({
        shortName: { $regex: new RegExp(`^${teamId}$`, "i") },
      });
    }

    if (!team) {
      throw ApiError.notFound("Team not found");
    }

    return team;
  },

  /**
   * Get team season history
   * @param {String} teamId - Team ID
   * @returns {Promise<Array>} Season history sorted by year
   */
  async getTeamSeasonHistory(teamId) {
    const team = await this.getTeamById(teamId);
    return team.seasonHistory.sort((a, b) => b.year - a.year);
  },

  /**
   * Get team rivalries/head-to-head records
   * @param {String} teamId - Team ID
   * @returns {Promise<Array>} Rivalry records
   */
  async getTeamRivalries(teamId) {
    const team = await this.getTeamById(teamId);
    return team.rivalries.sort((a, b) => b.matchesPlayed - a.matchesPlayed);
  },

  /**
   * Get team statistics summary
   * @param {String} teamId - Team ID
   * @returns {Promise<Object>} Stats summary
   */
  async getTeamStats(teamId) {
    const team = await this.getTeamById(teamId);

    return {
      overview: {
        totalSeasons: team.totalSeasons,
        championships: team.championships.length,
        runnersUp: team.runnersUp.length,
        totalMatches: team.totalMatches,
        wins: team.wins,
        losses: team.losses,
        winPercentage: team.winPercentage,
      },
      records: {
        highestTeamScore: team.highestTeamScore,
        lowestTeamScore: team.lowestTeamScore,
        individualRecords: team.individualRecords,
        teamRecords: team.teamRecords,
      },
      captains: team.captains,
      keyPlayers: team.keyPlayers.slice(0, 5), // Top 5 players
    };
  },

  /**
   * Create a new team (admin only)
   * @param {Object} teamData - Team data
   * @returns {Promise<Object>} Created team
   */
  async createTeam(teamData) {
    // Check for duplicate short name
    const existing = await TeamDetail.findOne({
      shortName: { $regex: new RegExp(`^${teamData.shortName}$`, "i") },
    });

    if (existing) {
      throw ApiError.conflict(`Team with short name ${teamData.shortName} already exists`);
    }

    const team = await TeamDetail.create(teamData);
    return team;
  },

  /**
   * Update team details
   * @param {String} teamId - Team ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated team
   */
  async updateTeam(teamId, updateData) {
    const team = await TeamDetail.findByIdAndUpdate(
      teamId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!team) {
      throw ApiError.notFound("Team not found");
    }

    return team;
  },

  /**
   * Delete a team (admin only)
   * @param {String} teamId - Team ID
   * @returns {Promise<Boolean>} Success status
   */
  async deleteTeam(teamId) {
    const team = await TeamDetail.findByIdAndDelete(teamId);

    if (!team) {
      throw ApiError.notFound("Team not found");
    }

    return true;
  },

  /**
   * Get all active teams (for quick dropdowns)
   * @returns {Promise<Array>} Active teams list
   */
  async getActiveTeams() {
    return await TeamDetail.find({ status: "ACTIVE" })
      .select("name shortName teamColors")
      .sort({ name: 1 });
  },

  /**
   * Get championship winners by year
   * @returns {Promise<Array>} List of { year, champion, runnerUp }
   */
  async getChampionshipHistory() {
    const teams = await TeamDetail.find({ championships: { $exists: true, $not: { $size: 0 } } })
      .select("name shortName championships runnersUp");

    const championships = [];

    for (const team of teams) {
      for (const year of team.championships) {
        championships.push({
          year,
          champion: team.name,
          championShort: team.shortName,
        });
      }
    }

    return championships.sort((a, b) => b.year - a.year);
  },

  /**
   * Seed teams data (bulk insert/update)
   * @param {Array} teamsData - Array of team objects
   * @returns {Promise<Object>} Result stats
   */
  async seedTeams(teamsData) {
    let created = 0;
    let updated = 0;
    let errors = [];

    for (const teamData of teamsData) {
      try {
        // Check if team exists by short name
        const existing = await TeamDetail.findOne({
          shortName: { $regex: new RegExp(`^${teamData.shortName}$`, "i") },
        });

        if (existing) {
          // Update existing
          await TeamDetail.findByIdAndUpdate(existing._id, { $set: teamData });
          updated++;
        } else {
          // Create new
          await TeamDetail.create(teamData);
          created++;
        }
      } catch (error) {
        errors.push({ team: teamData.name, error: error.message });
      }
    }

    return { created, updated, errors: errors.length, errorDetails: errors };
  },
};

export default teamsService;
