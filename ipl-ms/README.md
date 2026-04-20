# 🏏 IPL Management System

A full-stack web application for managing and exploring Indian Premier League (IPL) data — teams, players, owners, sponsors, and broadcasters. Built with a premium glassmorphic dark UI, Google OAuth integration, and comprehensive cricket analytics.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Deployment](#deployment)
- [Google OAuth Setup](#google-oauth-setup)

---

## Overview

The IPL Management System is a comprehensive cricket analytics platform that provides detailed information about all IPL franchises, player profiles, career statistics, and season-by-season performance data. It features a premium dark-themed UI with glassmorphism, mesh gradients, and smooth Framer Motion animations.

The application supports two authentication methods — email/password registration and Google OAuth 2.0 — with JWT-based session management using httpOnly cookies.

---

## Features

### 🔐 Authentication
- Email/password registration and login
- Google OAuth 2.0 sign-in via Passport.js
- JWT access tokens (15 min) + refresh tokens (7 days)
- Secure httpOnly cookie storage
- Protected route middleware
- Auto session check on page load

### 🏟️ Teams Management
- Browse all 14 IPL franchises (active & defunct)
- Detailed team profiles with:
  - Founding year, home city, home ground
  - Championship history and runners-up records
  - Win/loss statistics and win percentages
  - Season-by-season breakdown (position, points, NRR, top performers)
  - Captain history with match counts and win rates
  - Key players with career highlights
  - Head-to-head rivalry data
  - Individual and team records (highest scores, best bowling, biggest wins)
  - Memorable matches

### 👤 Players Database
- 100+ active IPL player profiles
- Comprehensive player detail pages with:
  - Personal info (nationality, age, birth place, overseas status)
  - Role and playing style (batting/bowling)
  - Current team, jersey number, auction price
  - IPL debut information
  - Career batting stats (matches, innings, runs, average, strike rate, centuries, sixes, etc.)
  - Career bowling stats (wickets, economy, best figures, 4/5-wicket hauls)
  - Fielding stats (catches, run-outs, stumpings)
  - Last 5 seasons breakdown
  - Milestone records (fastest fifty, fastest century, best bowling, most sixes)
  - Awards (Orange Cap, Purple Cap, Player of the Series, championships)
  - International career summary
  - Player photo integration via external APIs

### 📋 Entity Management (CRUD)
- **Owners** — name, company
- **Sponsors** — name
- **Broadcasters** — name
- **Team-Sponsor links** — many-to-many with duplicate prevention
- **Team-Broadcaster links** — many-to-many with duplicate prevention

### 🎨 Premium UI/UX
- Dark theme with glassmorphism and mesh gradients
- Framer Motion spring animations with staggered reveals
- Lucide React icon system
- Sora + Inter typography from Google Fonts
- Responsive grid layouts
- Static sidebar navigation with animated active indicators
- Hover effects and micro-interactions

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| React Router DOM 7 | Client-side routing |
| Framer Motion 12 | Animations and transitions |
| Lucide React | Icon library |
| Vanilla CSS + Tailwind CSS 4 | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | HTTP framework |
| MongoDB + Mongoose 9 | Database and ODM |
| Passport.js | Google OAuth strategy |
| JSON Web Token (jsonwebtoken) | Auth tokens |
| bcryptjs | Password hashing |
| cookie-parser | Cookie handling |
| cors | Cross-origin requests |
| dotenv | Environment variables |

### Dev Tools
| Tool | Purpose |
|---|---|
| Nodemon | Backend hot-reload |
| Concurrently | Run both servers simultaneously |
| ESLint | Frontend linting |

---

## Project Structure

```
ipl-ms/
├── package.json                # Root — concurrent dev script
├── .gitignore
├── GOOGLE_OAUTH_SETUP.md       # Google OAuth setup instructions
│
├── backend/
│   ├── package.json
│   ├── .env                    # Environment variables (git-ignored)
│   ├── src/
│   │   └── index.js            # Express app entry point
│   ├── config/
│   │   ├── env.js              # Dotenv loader (imported first)
│   │   ├── db.js               # MongoDB connection
│   │   └── passport.js         # Google OAuth strategy config
│   ├── routes/
│   │   ├── index.js            # Route aggregator
│   │   ├── auth.routes.js      # Auth endpoints
│   │   ├── team.routes.js      # Team CRUD
│   │   ├── teams-detail.routes.js  # Team detail endpoints
│   │   ├── player.routes.js    # Player CRUD
│   │   ├── players-detail.routes.js # Player detail endpoints
│   │   ├── owner.routes.js     # Owner CRUD
│   │   ├── sponsor.routes.js   # Sponsor CRUD
│   │   ├── broadcaster.routes.js   # Broadcaster CRUD
│   │   ├── team-sponsor.routes.js  # Team-Sponsor links
│   │   └── team-broadcaster.routes.js # Team-Broadcaster links
│   ├── controllers/            # Request handlers
│   ├── services/               # Business logic
│   ├── models/                 # Mongoose schemas
│   │   ├── user.model.js       # User (auth)
│   │   ├── team.model.js       # Team (basic)
│   │   ├── team-detail.model.js # Team (comprehensive)
│   │   ├── player.model.js     # Player (basic)
│   │   ├── player-detail.model.js # Player (comprehensive)
│   │   ├── owner.model.js
│   │   ├── sponsor.model.js
│   │   ├── broadcaster.model.js
│   │   ├── team-sponsor.model.js
│   │   └── team-broadcaster.model.js
│   ├── middleware/
│   │   ├── auth.js             # JWT verification middleware
│   │   └── error-handler.js    # Global error handler
│   ├── utils/
│   │   ├── api-error.js        # Custom ApiError class
│   │   └── api-response.js     # Standardized ApiResponse helper
│   ├── scripts/                # DB seed scripts
│   │   ├── seed-teams.js
│   │   ├── seed-players-with-photos.mjs
│   │   ├── add-photos-to-seed.js
│   │   └── add-photos-to-seed.mjs
│   └── data/                   # Seed data files
│       ├── teams.seed.js
│       ├── players.seed.js
│       └── player-photos.json
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js          # Vite config with API proxy
    ├── vercel.json             # Vercel deployment rewrites
    ├── eslint.config.js
    ├── public/
    └── src/
        ├── main.jsx            # React DOM root
        ├── App.jsx             # Router and route definitions
        ├── api.js              # Fetch wrapper with credentials
        ├── index.css           # Global styles
        ├── context/
        │   └── auth-context.jsx # Auth provider (user, login, register, logout)
        ├── components/
        │   ├── layout.jsx      # Sidebar + main content layout
        │   ├── protected-route.jsx # Auth gate component
        │   ├── entity-page.jsx # Reusable CRUD page component
        │   ├── team-card.jsx   # Team card component
        │   └── team-logo.jsx   # Team logo renderer
        ├── pages/
        │   ├── dashboard.jsx   # Home dashboard
        │   ├── signin.jsx      # Sign in page
        │   ├── signup.jsx      # Sign up page
        │   ├── google-success.jsx # OAuth callback handler
        │   ├── teams.jsx       # Teams listing
        │   ├── team-detail.jsx # Individual team page
        │   ├── players.jsx     # Players listing
        │   ├── player-detail.jsx # Individual player page
        │   ├── owners.jsx      # Owners CRUD
        │   ├── sponsors.jsx    # Sponsors CRUD
        │   ├── broadcasters.jsx # Broadcasters CRUD
        │   ├── team-sponsors.jsx # Team-Sponsor management
        │   └── team-broadcasters.jsx # Team-Broadcaster management
        ├── hooks/
        │   └── use-player-photo.js # Custom hook for player headshots
        ├── utils/
        │   └── player-photo.js  # Player photo URL utilities
        ├── styles/
        │   ├── teams.css       # Teams page styles
        │   ├── players.css     # Players page styles
        │   └── player-detail.css # Player detail page styles
        └── assets/
            ├── hero.png
            ├── react.svg
            └── vite.svg
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster
- **Google Cloud Console** project (optional, for Google OAuth)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ipl-ms.git
cd ipl-ms
```

### 2. Install all dependencies

The root `package.json` includes a convenience script to install everything:

```bash
npm run install:all
```

This runs `npm install` in the root, `backend/`, and `frontend/` directories.

Alternatively, install each manually:

```bash
# Root (concurrently)
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ipl-ms
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 client secret |
| `CLIENT_URL` | Frontend URL for CORS and redirects |
| `SERVER_URL` | Backend URL for OAuth callback |

> **Note:** Google OAuth is optional. The app will log a warning and disable Google sign-in if credentials are not configured.

---

## Running Locally

### Run both servers concurrently (recommended)

From the project root:

```bash
npm run dev
```

This starts:
- **Backend** on `http://localhost:3000`
- **Frontend** on `http://localhost:5173`

The Vite dev server proxies all `/api/*` requests to the backend automatically.

### Run servers individually

```bash
# Terminal 1 — Backend
npm run dev:backend

# Terminal 2 — Frontend
npm run dev:frontend
```

---

## API Reference

All API routes are prefixed with `/api`. Every response follows a standardized format:

```json
{
  "success": true,
  "message": "Description",
  "data": { },
  "timestamp": "2026-04-20T12:00:00.000Z"
}
```

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login with email/password | No |
| `GET` | `/api/auth/google` | Initiate Google OAuth flow | No |
| `GET` | `/api/auth/google/callback` | Google OAuth callback | No |
| `POST` | `/api/auth/refresh` | Refresh access token | No |
| `POST` | `/api/auth/logout` | Logout (clear tokens) | Yes |
| `GET` | `/api/auth/me` | Get current user | Yes |

### Teams

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/teams` | List all teams | Yes |
| `POST` | `/api/teams` | Create a team | Yes |
| `GET` | `/api/teams/:id` | Get team by ID | Yes |
| `PUT` | `/api/teams/:id` | Update a team | Yes |
| `DELETE` | `/api/teams/:id` | Delete a team | Yes |

### Teams Detail (Comprehensive)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/teams-detail` | List all team details | Yes |
| `GET` | `/api/teams-detail/:id` | Get team detail by ID | Yes |
| `POST` | `/api/teams-detail` | Create team detail | Yes |
| `PUT` | `/api/teams-detail/:id` | Update team detail | Yes |
| `DELETE` | `/api/teams-detail/:id` | Delete team detail | Yes |

### Players

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/players` | List all players | Yes |
| `POST` | `/api/players` | Create a player | Yes |
| `GET` | `/api/players/:id` | Get player by ID | Yes |
| `PUT` | `/api/players/:id` | Update a player | Yes |
| `DELETE` | `/api/players/:id` | Delete a player | Yes |

### Players Detail (Comprehensive)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/players-detail` | List all player details | Yes |
| `GET` | `/api/players-detail/:id` | Get player detail by ID | Yes |
| `POST` | `/api/players-detail` | Create player detail | Yes |
| `PUT` | `/api/players-detail/:id` | Update player detail | Yes |
| `DELETE` | `/api/players-detail/:id` | Delete player detail | Yes |
| `GET` | `/api/players-detail/search?q=` | Search players by name | Yes |
| `GET` | `/api/players-detail/team/:team` | Filter players by team | Yes |
| `GET` | `/api/players-detail/role/:role` | Filter players by role | Yes |

### Owners, Sponsors, Broadcasters

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/owners` | List all owners | Yes |
| `POST` | `/api/owners` | Create an owner | Yes |
| `PUT` | `/api/owners/:id` | Update an owner | Yes |
| `DELETE` | `/api/owners/:id` | Delete an owner | Yes |
| `GET` | `/api/sponsors` | List all sponsors | Yes |
| `POST` | `/api/sponsors` | Create a sponsor | Yes |
| `PUT` | `/api/sponsors/:id` | Update a sponsor | Yes |
| `DELETE` | `/api/sponsors/:id` | Delete a sponsor | Yes |
| `GET` | `/api/broadcasters` | List all broadcasters | Yes |
| `POST` | `/api/broadcasters` | Create a broadcaster | Yes |
| `PUT` | `/api/broadcasters/:id` | Update a broadcaster | Yes |
| `DELETE` | `/api/broadcasters/:id` | Delete a broadcaster | Yes |

### Team-Sponsor & Team-Broadcaster Links

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/team-sponsors` | List all team-sponsor links | Yes |
| `POST` | `/api/team-sponsors` | Create a link | Yes |
| `GET` | `/api/team-broadcasters` | List all team-broadcaster links | Yes |
| `POST` | `/api/team-broadcasters` | Create a link | Yes |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health status |

---

## Authentication

The authentication system uses a dual-token strategy:

### Token Flow

1. **Access Token** — Short-lived JWT (15 minutes), stored in an `accessToken` httpOnly cookie. Used for authenticating every protected API request.

2. **Refresh Token** — Long-lived JWT (7 days), stored in a `refreshToken` httpOnly cookie and persisted in the database. Used to issue new access tokens without re-login.

### How It Works

```
┌─────────────┐     POST /auth/login      ┌─────────────┐
│   Browser   │ ───────────────────────── ▶│   Backend   │
│             │◀─── Set-Cookie (httpOnly)──│             │
│             │     accessToken            │             │
│             │     refreshToken           │             │
└─────────────┘                            └─────────────┘

┌─────────────┐     GET /api/teams         ┌─────────────┐
│   Browser   │ ───── Cookie: accessToken──▶│  Middleware  │
│             │◀──── 200 OK + data ────────│  (auth.js)  │
└─────────────┘                            └─────────────┘

┌─────────────┐     POST /auth/refresh     ┌─────────────┐
│   Browser   │ ── Cookie: refreshToken ──▶│   Backend   │
│             │◀── New accessToken ────────│             │
└─────────────┘                            └─────────────┘
```

### Security Features

- **httpOnly cookies** — tokens are not accessible via JavaScript (`document.cookie`)
- **Password hashing** — bcrypt with 12 salt rounds
- **Refresh token rotation** — a new refresh token is issued on every refresh, and the old one is invalidated
- **Token family tracking** — each refresh token contains a random `tokenFamily` identifier
- **Secure flag** — cookies are marked `secure: true` in production (HTTPS only)
- **SameSite** — cookies use `lax` policy to prevent CSRF

---

## Data Models

### User
| Field | Type | Description |
|---|---|---|
| `name` | String | User's display name (2-100 chars) |
| `email` | String | Unique email address |
| `password` | String | Hashed password (select: false) |
| `avatar` | String | Profile picture URL |
| `googleId` | String | Google OAuth identifier |
| `refreshToken` | String | Current refresh token (select: false) |

### Team (Basic)
| Field | Type | Description |
|---|---|---|
| `name` | String | Team name |
| `ownerId` | ObjectId → Owner | Reference to owner |

### Team Detail (Comprehensive)
Stores complete franchise data including:
- Basic info (name, short name, founded year, home city, home ground, team colors, status)
- Overview stats (total seasons, championships, wins, losses, win percentage)
- Captain history with win rates
- Season-by-season history (position, points, NRR, top performers)
- Key players with career highlights
- Rivalry data (head-to-head records, memorable matches)
- Individual records (highest score, best bowling, most runs/wickets in season)
- Team records (highest chase, lowest defended, biggest wins)

### Player (Basic)
| Field | Type | Description |
|---|---|---|
| `name` | String | Player name |
| `role` | Enum | `batsman`, `bowler`, `all-rounder`, `wicket-keeper` |
| `teamId` | ObjectId → Team | Reference to team |

### Player Detail (Comprehensive)
Stores exhaustive player profiles including:
- Identity (name, short name, nickname, nationality, date of birth, age, birth place)
- Role and style (primary role, batting style, bowling style, specializations)
- Current status (current team, jersey number, captain status, auction price)
- Career batting stats (matches, innings, runs, average, SR, 100s, 50s, 4s, 6s, ducks)
- Career bowling stats (wickets, economy, best figures, 4W/5W hauls, dot ball %)
- Fielding stats (catches, run-outs, stumpings)
- Season-by-season breakdown (last 5 seasons)
- Milestone records (fastest fifty, fastest century, best bowling, most sixes)
- Awards (Orange Cap, Purple Cap, Player of the Series, championships)
- International career summary
- Player description and rivalries

### Owner
| Field | Type |
|---|---|
| `name` | String |
| `company` | String |

### Sponsor
| Field | Type |
|---|---|
| `name` | String |

### Broadcaster
| Field | Type |
|---|---|
| `name` | String |

### Team-Sponsor (Junction)
| Field | Type | Description |
|---|---|---|
| `teamId` | ObjectId → Team | Team reference |
| `sponsorId` | ObjectId → Sponsor | Sponsor reference |

Unique compound index on `(teamId, sponsorId)` prevents duplicates.

### Team-Broadcaster (Junction)
| Field | Type | Description |
|---|---|---|
| `teamId` | ObjectId → Team | Team reference |
| `broadcasterId` | ObjectId → Broadcaster | Broadcaster reference |

Unique compound index on `(teamId, broadcasterId)` prevents duplicates.

---

## Deployment

The application is configured for split deployment:

### Frontend → Vercel

The frontend includes a `vercel.json` that rewrites `/api/*` requests to the backend:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://ipl-ms-backend.onrender.com/api/$1"
    }
  ]
}
```

Deploy steps:
1. Import the `frontend/` directory to Vercel
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend → Render

Deploy steps:
1. Create a new **Web Service** on Render
2. Root directory: `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from the [Environment Variables](#environment-variables) section
6. Update `CLIENT_URL` to your Vercel frontend URL
7. Update `SERVER_URL` to your Render backend URL

> **Important:** After deployment, update the Google OAuth authorized origins and redirect URIs in the Google Cloud Console to include your production URLs.

---

## Google OAuth Setup

A detailed step-by-step guide for configuring Google OAuth 2.0 is available in [`GOOGLE_OAUTH_SETUP.md`](./GOOGLE_OAUTH_SETUP.md).

Quick summary:
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Configure the OAuth consent screen
3. Create OAuth 2.0 credentials (Web application type)
4. Add authorized origins (`http://localhost:5173`) and redirect URIs (`http://localhost:3000/api/auth/google/callback`)
5. Copy the Client ID and Client Secret to your `.env` file
6. Restart the backend server

---

## Database Seeding

The project includes seed scripts and data files to populate your database with real IPL data:

```bash
# Seed teams (from backend directory)
node scripts/seed-teams.js

# Seed players with photos
node scripts/seed-players-with-photos.mjs
```

Seed data files are located in `backend/data/`:
- `teams.seed.js` — all 14 IPL franchise profiles with comprehensive historical data
- `players.seed.js` — 100+ player profiles with full career statistics
- `player-photos.json` — player photo URL mappings

---

## Error Handling

The backend uses a centralized error handling system:

- **`ApiError`** — Custom error class with factory methods (`badRequest`, `unauthorized`, `notFound`, `conflict`, `internal`)
- **`ApiResponse`** — Standardized response helper (`success`, `ok`, `created`, `error`)
- **Global error handler middleware** — catches all errors, formats Mongoose validation and cast errors, and suppresses expected 4xx errors from terminal logs

---

## Scripts Reference

| Script | Location | Description |
|---|---|---|
| `npm run dev` | Root | Start both frontend and backend concurrently |
| `npm run dev:backend` | Root | Start only the backend |
| `npm run dev:frontend` | Root | Start only the frontend |
| `npm run install:all` | Root | Install dependencies for root, backend, and frontend |
| `npm run dev` | Backend | Start backend with nodemon (hot-reload) |
| `npm start` | Backend | Start backend (production) |
| `npm run dev` | Frontend | Start Vite dev server |
| `npm run build` | Frontend | Build for production |
| `npm run preview` | Frontend | Preview production build |
| `npm run lint` | Frontend | Run ESLint |
