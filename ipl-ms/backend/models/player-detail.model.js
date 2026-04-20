import mongoose from "mongoose";

/**
 * Comprehensive Player Model for IPL Players Feature
 * Stores detailed player profiles, statistics, and career data
 */

// Sub-schemas for nested data
const seasonStatSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  team: { type: String, required: true },
  role: { type: String, required: true },
  matches: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  average: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
  centuries: { type: Number, default: 0 },
  halfCenturies: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  wickets: { type: Number, default: null },
  economy: { type: Number, default: null },
  bestFigures: { type: String, default: null },
  playerOfMatchAwards: { type: Number, default: 0 },
  wasTeamCaptain: { type: Boolean, default: false },
});

const recordSchema = new mongoose.Schema({
  balls: { type: Number, required: true },
  against: { type: String, required: true },
  year: { type: Number, required: true },
});

const bowlingRecordSchema = new mongoose.Schema({
  figures: { type: String, required: true },
  against: { type: String, required: true },
  year: { type: Number, required: true },
});

const partnershipSchema = new mongoose.Schema({
  runs: { type: Number, required: true },
  partner: { type: String, required: true },
  against: { type: String, required: true },
  year: { type: Number, required: true },
});

const sixesRecordSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  against: { type: String, required: true },
  year: { type: Number, required: true },
});

// Main Player Schema
const playerDetailSchema = new mongoose.Schema(
  {
    // ── IDENTITY ──────────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Player name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    shortName: {
      type: String,
      required: [true, "Short name is required"],
      trim: true,
    },
    nickname: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    age: {
      type: Number,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    isOverseas: {
      type: Boolean,
      default: false,
    },

    // ── ROLE & STYLE ──────────────────────────────────────────────────
    primaryRole: {
      type: String,
      required: [true, "Primary role is required"],
      enum: ["Batsman", "Bowler", "All-rounder", "Wicket-keeper Batsman"],
    },
    battingStyle: {
      type: String,
      required: true,
      enum: ["Right-handed", "Left-handed"],
    },
    bowlingStyle: {
      type: String,
      default: null,
    },
    specializations: [{
      type: String,
    }],

    // ── CURRENT STATUS ────────────────────────────────────────────────
    currentTeam: {
      type: String,
      required: [true, "Current team is required"],
    },
    jerseyNumber: {
      type: Number,
      default: null,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    retainedIn: {
      type: Number,
      default: null,
    },
    auctionPrice: {
      type: Number,
      default: null,
    },
    auctionYear: {
      type: Number,
      default: null,
    },

    // ── IPL CAREER OVERVIEW ───────────────────────────────────────────
    iplDebut: {
      year: { type: Number, required: true },
      match: { type: String, required: true },
    },
    totalIPLSeasons: {
      type: Number,
      required: true,
    },

    // ── BATTING CAREER STATS ─────────────────────────────────────────
    battingStats: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      notOuts: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      highestScore: { type: Number, default: 0 },
      highestScoreNotOut: { type: Boolean, default: false },
      average: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      centuries: { type: Number, default: 0 },
      halfCenturies: { type: Number, default: 0 },
      fours: { type: Number, default: 0 },
      sixes: { type: Number, default: 0 },
      ducks: { type: Number, default: 0 },
    },

    // ── BOWLING CAREER STATS ─────────────────────────────────────────
    bowlingStats: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      overs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      bestFigures: { type: String, default: "" },
      economy: { type: Number, default: 0 },
      average: { type: Number, default: null },
      strikeRate: { type: Number, default: null },
      fourWicketHauls: { type: Number, default: 0 },
      fiveWicketHauls: { type: Number, default: 0 },
      dotBallPercentage: { type: Number, default: 0 },
    },

    // ── FIELDING STATS ────────────────────────────────────────────────
    fieldingStats: {
      catches: { type: Number, default: 0 },
      runOuts: { type: Number, default: 0 },
      stumpings: { type: Number, default: 0 },
    },

    // ── LAST 5 SEASONS BREAKDOWN ─────────────────────────────────────
    seasonStats: [seasonStatSchema],

    // ── MILESTONE RECORDS ────────────────────────────────────────────
    records: {
      fastestFifty: { type: recordSchema, default: null },
      fastestCentury: { type: recordSchema, default: null },
      bestBowlingInning: { type: bowlingRecordSchema, default: null },
      mostSixesInInning: { type: sixesRecordSchema, default: null },
      highestPartnershipAs: { type: partnershipSchema, default: null },
    },

    // ── AWARDS & RECOGNITION ─────────────────────────────────────────
    awards: {
      orangeCaps: [{ type: Number }],
      purpleCaps: [{ type: Number }],
      playerOfTheSeries: [{ type: Number }],
      playerOfMatchTotal: { type: Number, default: 0 },
      championsIn: [{ type: Number }],
    },

    // ── INTERNATIONAL CAREER ──────────────────────────────────────────
    internationalCareer: {
      country: { type: String, required: true },
      testsPlayed: { type: Number, default: null },
      odisPlayed: { type: Number, default: null },
      t20IsPlayed: { type: Number, default: null },
      isCurrentlyActive: { type: Boolean, default: true },
      debutYear: { type: Number, default: null },
    },

    // ── PERSONAL & SOCIAL ────────────────────────────────────────────
    description: {
      type: String,
      required: true,
    },
    famousFor: {
      type: String,
      required: true,
    },
    rivalries: [{
      type: String,
    }],
    mentors: [{
      type: String,
    }],

    // ── META ─────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["ACTIVE", "RETIRED"],
      default: "ACTIVE",
    },
    photoUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
playerDetailSchema.index({ status: 1 });
playerDetailSchema.index({ currentTeam: 1 });
playerDetailSchema.index({ primaryRole: 1 });
playerDetailSchema.index({ name: "text", shortName: "text" });
playerDetailSchema.index({ "awards.orangeCaps": 1 });
playerDetailSchema.index({ "awards.purpleCaps": 1 });

const PlayerDetail = mongoose.model("PlayerDetail", playerDetailSchema);

export default PlayerDetail;
