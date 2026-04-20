import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Trophy, 
  Medal, 
  ArrowRight, 
  Shield, 
  Star, 
  Globe, 
  User,
  Zap,
  Target,
  Activity
} from "lucide-react";
import TeamLogo from "../components/team-logo.jsx";
import "../styles/players.css";

const ROLE_FILTERS = [
  { id: "ALL", label: "All Players" },
  { id: "Batsman", label: "Batsmen" },
  { id: "Bowler", label: "Bowlers" },
  { id: "All-rounder", label: "All-rounders" },
  { id: "Wicket-keeper Batsman", label: "Wicket-keepers" },
];

const TEAM_OPTIONS = [
  { code: "", name: "All Teams" },
  { code: "CSK", name: "Chennai Super Kings" },
  { code: "MI", name: "Mumbai Indians" },
  { code: "RCB", name: "Royal Challengers Bangalore" },
  { code: "KKR", name: "Kolkata Knight Riders" },
  { code: "RR", name: "Rajasthan Royals" },
  { code: "SRH", name: "Sunrisers Hyderabad" },
  { code: "DC", name: "Delhi Capitals" },
  { code: "PBKS", name: "Punjab Kings" },
  { code: "LSG", name: "Lucknow Super Giants" },
  { code: "GT", name: "Gujarat Titans" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
};

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [teamFilter, setTeamFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, [roleFilter, teamFilter, search]);

  async function fetchPlayers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "ALL") params.append("role", roleFilter);
      if (teamFilter) params.append("team", teamFilter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/players-detail?${params}`);
      const data = await res.json();

      if (data.success) {
        setPlayers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load players");
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="players-page">
        <div className="empty-state">
          <Activity size={48} color="#ef4444" style={{ marginBottom: "1rem" }} />
          <h3 style={{ color: "#ef4444" }}>Error Connection</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="filter-tab filter-tab--active" style={{ marginTop: "1rem" }}>
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="players-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="page-header" variants={itemVariants}>
        <div className="page-header__title-container">
          <div className="page-header__icon-box">
             <Users size={32} color="#000" />
          </div>
          <h1 className="page-header__title">IPL Legends</h1>
        </div>
        <p className="page-header__subtitle">
          Explore the elite roster of cricketers who define the world's premier T20 league. 
          Career performance, records, and season analytics.
        </p>
      </motion.div>

      {/* Filters Bar */}
      <motion.div className="filter-bar" variants={itemVariants}>
        <div className="filter-tabs">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-tab ${roleFilter === f.id ? "filter-tab--active" : ""}`}
              onClick={() => setRoleFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="team-select"
        >
          {TEAM_OPTIONS.map((team) => (
            <option key={team.code} value={team.code} style={{ background: "#0a1419" }}>
              {team.name}
            </option>
          ))}
        </select>

        <div className="search-box">
          <Search size={18} className="search-box__icon" />
          <input
            type="text"
            className="search-box__input"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Players Grid */}
      {loading ? (
        <div className="players-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="loading-skeleton" style={{ height: "320px" }} />
          ))}
        </div>
      ) : players.length === 0 ? (
        <motion.div className="empty-state" variants={itemVariants}>
          <Search size={64} color="rgba(255,255,255,0.1)" style={{ marginBottom: "1.5rem" }} />
          <h3>No Warriors Found</h3>
          <p style={{ color: "var(--text-ghost)" }}>We couldn't find any players matching your current selection.</p>
        </motion.div>
      ) : (
        <motion.div className="players-grid">
          <AnimatePresence mode="popLayout">
            {players.map((player) => (
              <PlayerCard key={player._id || player.name} player={player} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

function PlayerCard({ player }) {
  const {
    name,
    shortName,
    currentTeam,
    primaryRole,
    isCaptain,
    isOverseas,
    nationality,
    age,
    awards,
    photoUrl,
  } = player;

  // Global team colors
  const teamColors = {
    CSK: ["#FCBF1E", "#1E3A8A"],
    MI: ["#004BA0", "#D1AB3E"],
    RCB: ["#000000", "#EC1C24"],
    KKR: ["#3A225D", "#FDB913"],
    RR: ["#EA1A85", "#254AA5"],
    SRH: ["#000000", "#F26522"],
    DC: ["#0078BC", "#EF1B23"],
    PBKS: ["#D11E34", "#A7A9AC"],
    LSG: ["#00A1E4", "#EFD31A"],
    GT: ["#1B2133", "#D7B679"],
  };

  const colors = teamColors[currentTeam] || ["#00ed64", "#3b82f6"];
  const primaryColor = colors[0];
  const secondaryColor = colors[1];

  // DiceBear avatar fallback
  const fallbackUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(shortName || name)}&backgroundColor=${encodeURIComponent(primaryColor.replace('#', ''))}&textColor=ffffff&size=128`;

  // Use backend photoUrl or fallback to avatar
  const displayPhoto = photoUrl || fallbackUrl;
  const hasRealPhoto = !!photoUrl;

  // Role ID for CSS
  const getRoleBadgeClass = (role) => {
    const r = role?.toLowerCase() || "";
    if (r.includes("batsman")) return "badge--role-batsman";
    if (r.includes("bowler")) return "badge--role-bowler";
    if (r.includes("all-rounder")) return "badge--role-allrounder";
    if (r.includes("wicket-keeper")) return "badge--role-wicketkeeper";
    return "";
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ "--player-color": primaryColor, "--player-secondary": secondaryColor }}
    >
      <Link to={`/players/${encodeURIComponent(name)}`} className="player-card">
        <div className="player-card__header">
          <div className="player-card__photo-container">
            <div className="player-card__photo-glow" />
            <img 
              src={displayPhoto} 
              alt={name} 
              className={`player-card__photo-img ${hasRealPhoto ? 'player-card__photo-img--real' : ''}`}
              onError={(e) => { e.target.src = fallbackUrl; }}
            />
          </div>
          <div className="player-card__title-area">
            <h3 className="player-card__name">{name}</h3>
            <div className="player-card__meta">
              <div className="player-card__team-badge">
                <TeamLogo teamCode={currentTeam} size={18} />
                <span>{currentTeam}</span>
              </div>
              <span>•</span>
              <span>{nationality}</span>
            </div>
          </div>
        </div>

        <div className="player-card__badges">
          <span className={`badge ${getRoleBadgeClass(primaryRole)}`}>
            {primaryRole}
          </span>
          {isCaptain && (
            <span className="badge badge--captain">
              <Shield size={12} /> Captain
            </span>
          )}
          {isOverseas && (
            <span className="badge badge--overseas">
              <Globe size={12} /> Overseas
            </span>
          )}
          {awards?.orangeCaps?.length > 0 && (
            <span className="badge badge--orange" title="Orange Cap Winner">
              <Zap size={12} fill="currentColor" /> Orange Cap
            </span>
          )}
          {awards?.purpleCaps?.length > 0 && (
            <span className="badge badge--purple" title="Purple Cap Winner">
              <Zap size={12} fill="currentColor" /> Purple Cap
            </span>
          )}
        </div>

        <div className="player-card__stats">
          <div className="stat-item">
            <span className="stat-item__value">{age}</span>
            <span className="stat-item__label">Age</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__value">{player.battingStats?.matches || 0}</span>
            <span className="stat-item__label">MTCH</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__value" style={{ color: "var(--accent-base)" }}>
              {player.battingStats?.runs || 0}
            </span>
            <span className="stat-item__label">Runs</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__value" style={{ color: "#9333EA" }}>
              {player.bowlingStats?.wickets || 0}
            </span>
            <span className="stat-item__label">WKTS</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
