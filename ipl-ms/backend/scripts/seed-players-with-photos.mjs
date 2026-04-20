import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PlayerDetail from '../models/player-detail.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read seed data
const seedPath = path.join(__dirname, '..', 'data', 'players.seed.js');
const seedContent = fs.readFileSync(seedPath, 'utf8');

// Extract the array from the export
const match = seedContent.match(/const playersSeedData = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not parse seed data');
  process.exit(1);
}

const playersSeedData = eval(match[1]);

async function seedPlayers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ipl_db');
    console.log('Connected to MongoDB');

    // Clear existing players
    await PlayerDetail.deleteMany({});
    console.log('Cleared existing players');

    // Insert updated players with photos
    const result = await PlayerDetail.insertMany(playersSeedData);
    console.log(`Seeded ${result.length} players with photos`);

    // Count how many have photo URLs
    const withPhotos = result.filter(p => p.photoUrl).length;
    console.log(`${withPhotos} players have photo URLs`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error seeding players:', error);
    process.exit(1);
  }
}

seedPlayers();
