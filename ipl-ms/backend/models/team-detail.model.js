import mongoose from "mongoose";

/**
 * Comprehensive Team Model for IPL Teams Feature
 * Stores detailed history, statistics, and records for all IPL teams
 */

const captainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  years: { type: String, required: true },
  matchesAsCaptain: { type: Number, default: 0 },
  winPercentage: { type: Number, default: 0 },
});

const seasonHistorySchema = new mongoose.Schema({
  year: { type: Number, required: true },
  position: { type: Number, required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  nrr: { type: Number, default: 0 },
  playoffStage: {
    type: String,
    enum: ["LEAGUE", "ELIMINATOR", "QUALIFIER_2", "FINAL", "CHAMPION"],
    default: "LEAGUE",
  },
  captain: { type: String },
  topRunScorer: {
    name: { type: String },
    runs: { type: Number },
  },
  topWicketTaker: {
    name: { type: String },
    wickets: { type: Number },
  },
});

const keyPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  years: { type: String, required: true },
  matches: { type: Number, default: 0 },
  runs: { type: Number, default: null },
  wickets: { type: Number, default: null },
  isOverseas: { type: Boolean, default: false },
});

const memorableMatchSchema = new mongoose.Schema({
  description: { type: String, required: true },
  year: { type: Number, required: true },
  result: { type: String, required: true },
});

const rivalrySchema = new mongoose.Schema({
  opponent: { type: String, required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  memorableMatches: [memorableMatchSchema],
});

const individualRecordSchema = new mongoose.Schema({
  player: { type: String, required: true },
  runs: { type: Number },
  wickets: { type: Number },
  opponent: { type: String },
  year: { type: Number },
  figures: { type: String },
});

const teamRecordSchema = new mongoose.Schema({
  target: { type: Number },
  margin: { type: Number },
  against: { type: String },
  year: { type: Number },
});

const scoreRecordSchema = new mongoose.Schema({
  runs: { type: Number, required: true },
  against: { type: String, required: true },
  year: { type: Number, required: true },
  venue: { type: String },
});

const teamDetailSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: [true, "Short name is required"],
      trim: true,
      uppercase: true,
    },
    foundedYear: {
      type: Number,
      required: true,
    },
    defunctYear: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEFUNCT"],
      default: "ACTIVE",
    },
    homeCity: {
      type: String,
      required: true,
    },
    homeGround: {
      type: String,
      required: true,
    },
    teamColors: [{
      type: String,
    }],

    // Overview Stats
    totalSeasons: {
      type: Number,
      default: 0,
    },
    championships: [{
      type: Number,
    }],
    runnersUp: [{
      type: Number,
    }],
    totalMatches: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    noResults: {
      type: Number,
      default: 0,
    },
    winPercentage: {
      type: Number,
      default: 0,
    },

    // Leadership
    captains: [captainSchema],
    currentCoach: {
      type: String,
    },

    // Score Records
    highestTeamScore: scoreRecordSchema,
    lowestTeamScore: scoreRecordSchema,

    // Season-by-Season Data
    seasonHistory: [seasonHistorySchema],

    // Key Players
    keyPlayers: [keyPlayerSchema],

    // Rivalries
    rivalries: [rivalrySchema],

    // Individual Records
    individualRecords: {
      highestIndividualScore: individualRecordSchema,
      bestBowlingFigures: individualRecordSchema,
      mostRunsInSeason: individualRecordSchema,
      mostWicketsInSeason: individualRecordSchema,
    },

    // Team Records
    teamRecords: {
      highestSuccessfulChase: teamRecordSchema,
      lowestDefended: teamRecordSchema,
      biggestWinRuns: teamRecordSchema,
      biggestWinWickets: teamRecordSchema,
    },

    // Additional Info
    description: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    officialWebsite: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
teamDetailSchema.index({ status: 1 });
teamDetailSchema.index({ shortName: 1 });

const TeamDetail = mongoose.model("TeamDetail", teamDetailSchema);

export default TeamDetail;
