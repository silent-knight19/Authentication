/**
 * Seed script for IPL Teams data
 * Run: node scripts/seed-teams.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import TeamDetail from "../models/team-detail.model.js";
import teamsSeedData from "../data/teams.seed.js";
import teamsService from "../services/teams.service.js";

dotenv.config();

async function seedTeams() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Seed teams using the service
    const result = await teamsService.seedTeams(teamsSeedData);

    console.log("\n=== Teams Seeding Complete ===");
    console.log(`Created: ${result.created} teams`);
    console.log(`Updated: ${result.updated} teams`);
    console.log(`Errors: ${result.errors}`);

    if (result.errors > 0) {
      console.log("\nError Details:");
      result.errorDetails.forEach((err) => console.log(`  - ${err.team}: ${err.error}`));
    }

    console.log("\nTeams Summary:");
    const allTeams = await TeamDetail.find().select("name shortName status championships");
    allTeams.forEach((team) => {
      const titles = team.championships.length > 0 ? `(${team.championships.length} titles)` : "";
      console.log(`  - ${team.name} [${team.shortName}] ${team.status} ${titles}`);
    });

    console.log("\nSeeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

// Run seeding
seedTeams();
