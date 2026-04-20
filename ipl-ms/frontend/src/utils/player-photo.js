/**
 * Fetches player headshot photos from Wikipedia's REST API.
 * Results are cached in localStorage to avoid repeated API calls.
 *
 * Wikipedia's REST API is CORS-enabled and free to use.
 * Endpoint: https://en.wikipedia.org/api/rest_v1/page/summary/{title}
 */

const CACHE_KEY = "ipl_player_photos";
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Known Wikipedia article title overrides for players whose
 * names don't directly match their Wikipedia article title.
 */
const WIKI_TITLE_OVERRIDES = {
  "MS Dhoni": "MS Dhoni",
  "KL Rahul": "KL Rahul",
  "AB de Villiers": "AB de Villiers",
  "Faf du Plessis": "Faf du Plessis",
  "Quinton de Kock": "Quinton de Kock",
  "Dwayne Bravo": "Dwayne Bravo",
  "Andre Russell": "Andre Russell",
  "Sunil Narine": "Sunil Narine",
  "Chris Gayle": "Chris Gayle",
  "Shane Warne": "Shane Warne",
  "Ricky Ponting": "Ricky Ponting",
  "Adam Gilchrist": "Adam Gilchrist",
  "Brendon McCullum": "Brendon McCullum",
  "Matthew Hayden": "Matthew Hayden",
  "Michael Hussey": "Michael Hussey",
  "Shaun Marsh": "Shaun Marsh",
  "Glenn Maxwell": "Glenn Maxwell",
  "Pat Cummins": "Pat Cummins",
  "Mitchell Starc": "Mitchell Starc",
  "Jos Buttler": "Jos Buttler",
  "Trent Boult": "Trent Boult",
  "David Warner": "David Warner (cricketer)",
  "Nicholas Pooran": "Nicholas Pooran",
  "Rashid Khan": "Rashid Khan (cricketer)",
  "Heinrich Klaasen": "Heinrich Klaasen",
  "Virat Kohli": "Virat Kohli",
  "Rohit Sharma": "Rohit Sharma",
  "Sachin Tendulkar": "Sachin Tendulkar",
  "Suresh Raina": "Suresh Raina",
  "Lasith Malinga": "Lasith Malinga",
  "Virender Sehwag": "Virender Sehwag",
  "Mahela Jayawardene": "Mahela Jayawardene",
  "Rahul Dravid": "Rahul Dravid",
  "Harbhajan Singh": "Harbhajan Singh",
  "Anil Kumble": "Anil Kumble",
  "Gautam Gambhir": "Gautam Gambhir",
  "Yuvraj Singh": "Yuvraj Singh",
  "Hardik Pandya": "Hardik Pandya",
  "Jasprit Bumrah": "Jasprit Bumrah",
  "Rishabh Pant": "Rishabh Pant",
  "Shubman Gill": "Shubman Gill",
  "Yuzvendra Chahal": "Yuzvendra Chahal",
  "Kuldeep Yadav": "Kuldeep Yadav",
  "Shreyas Iyer": "Shreyas Iyer",
  "Sanju Samson": "Sanju Samson",
  "Ruturaj Gaikwad": "Ruturaj Gaikwad",
  "Ravindra Jadeja": "Ravindra Jadeja",
  "Suryakumar Yadav": "Suryakumar Yadav",
  "Bhuvneshwar Kumar": "Bhuvneshwar Kumar",
  "Shikhar Dhawan": "Shikhar Dhawan",
  "Arshdeep Singh": "Arshdeep Singh (cricketer)",
  "Yashasvi Jaiswal": "Yashasvi Jaiswal",
  "Rinku Singh": "Rinku Singh (cricketer)",
  "Tilak Varma": "Tilak Varma",
  "Robin Uthappa": "Robin Uthappa",
  "Manish Pandey": "Manish Pandey",
  "Ajinkya Rahane": "Ajinkya Rahane",
  "Kedar Jadhav": "Kedar Jadhav",
  "Shivam Dube": "Shivam Dube",
};

/**
 * Loads the cached photo map from localStorage.
 * @returns {Object} Map of player name → { url, timestamp }
 */
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Saves the photo map to localStorage.
 * @param {Object} cache - Map of player name → { url, timestamp }
 */
function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage might be full; silently fail
  }
}

/**
 * Fetches a player's photo URL from Wikipedia's REST API.
 * Returns null if the player has no image on Wikipedia.
 *
 * @param {string} playerName - Full name of the player (e.g. "Virat Kohli")
 * @returns {Promise<string|null>} Photo URL or null
 */
async function fetchPhotoFromWikipedia(playerName) {
  const wikiTitle = WIKI_TITLE_OVERRIDES[playerName] || playerName;
  const encodedTitle = encodeURIComponent(wikiTitle.replace(/ /g, "_"));
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return null;

    const data = await response.json();

    // Wikipedia returns a thumbnail object with source URL
    if (data.thumbnail && data.thumbnail.source) {
      // Request a larger version by modifying the width in the URL
      return data.thumbnail.source.replace(/\/\d+px-/, "/320px-");
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Gets a player's photo URL. Checks cache first, then fetches from Wikipedia.
 *
 * @param {string} playerName - Full name of the player
 * @returns {Promise<string|null>} Photo URL or null
 */
export async function getPlayerPhoto(playerName) {
  const cache = loadCache();
  const cached = cache[playerName];

  // Return cached URL if it exists and hasn't expired
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY_MS) {
    return cached.url;
  }

  // Fetch from Wikipedia
  const url = await fetchPhotoFromWikipedia(playerName);

  // Cache the result (even if null, to avoid re-fetching)
  cache[playerName] = { url, timestamp: Date.now() };
  saveCache(cache);

  return url;
}

/**
 * Fetches photos for multiple players in parallel (with throttling).
 * Returns a map of player name → photo URL.
 *
 * @param {string[]} playerNames - Array of player names
 * @param {number} concurrency - Max concurrent requests (default: 5)
 * @returns {Promise<Object>} Map of name → URL
 */
export async function getPlayerPhotos(playerNames, concurrency = 5) {
  const results = {};
  const queue = [...playerNames];

  async function processNext() {
    while (queue.length > 0) {
      const name = queue.shift();
      results[name] = await getPlayerPhoto(name);
    }
  }

  // Run with limited concurrency
  const workers = Array.from(
    { length: Math.min(concurrency, queue.length) },
    () => processNext()
  );

  await Promise.all(workers);
  return results;
}
