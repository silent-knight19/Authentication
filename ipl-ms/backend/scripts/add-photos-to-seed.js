const fs = require('fs');
const path = require('path');

// Read player photos mapping
const photosPath = path.join(__dirname, '..', 'data', 'player-photos.json');
const photosData = JSON.parse(fs.readFileSync(photosPath, 'utf8'));

// Read seed file
const seedPath = path.join(__dirname, '..', 'data', 'players.seed.js');
let seedContent = fs.readFileSync(seedPath, 'utf8');

// Replace photoUrl values for each player
for (const [playerName, photoUrl] of Object.entries(photosData)) {
  // Find the player object and update photoUrl
  const pattern = new RegExp(
    `("name": "${playerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)"photoUrl": (null|"[^"]*")`,
    'g'
  );
  
  seedContent = seedContent.replace(pattern, (match, prefix, currentValue) => {
    return `${prefix}"photoUrl": "${photoUrl}"`;
  });
}

// Write updated seed file
fs.writeFileSync(seedPath, seedContent);
console.log('Updated player seed data with photo URLs');
console.log(`Added photos for ${Object.keys(photosData).length} players`);
