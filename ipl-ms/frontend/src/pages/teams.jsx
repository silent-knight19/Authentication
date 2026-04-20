import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Search, Shield, ArrowRight, Activity, TrendingUp } from "lucide-react";
import TeamLogo from "../components/team-logo.jsx";
import "../styles/teams.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
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

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/teams-detail")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setTeams(d.data.teams || []);
        } else {
          setError(d.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTeams = teams.filter((team) => {
    const matchesFilter = filter === "ALL" || team.status === filter;
    const matchesSearch = team.name.toLowerCase().includes(search.toLowerCase()) ||
                         team.shortName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="teams-page">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "2.5rem" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="loading-skeleton" style={{ height: "420px" }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teams-page">
        <div className="empty-state">
          <p style={{ color: "#ef4444", fontSize: "1.2rem", fontWeight: "600" }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="teams-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="page-header" variants={itemVariants}>
        <h1 className="page-header__title">
          IPL Teams Through History
        </h1>
        <p className="page-header__subtitle">
          Explore the evolution of franchises from 2008 to 2024. From legendary giants to rising stars.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div className="filter-bar" variants={itemVariants}>
        <div className="filter-tabs">
          {["ALL", "ACTIVE", "DEFUNCT"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-tab ${filter === f ? "filter-tab--active" : ""}`}
            >
              {f === "ALL" ? "All Teams" : f === "ACTIVE" ? "Current" : "Defunct"}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={18} className="search-box__icon" />
          <input
            type="text"
            placeholder="Search team name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box__input"
          />
        </div>
      </motion.div>

      {/* Teams Grid */}
      <motion.div className="teams-grid">
        <AnimatePresence mode="popLayout">
          {filteredTeams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTeams.length === 0 && (
        <motion.div 
          className="empty-state"
          variants={itemVariants}
        >
          <div className="empty-state__icon" style={{ opacity: 0.1 }}>
            <Search size={80} />
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--text-ghost)" }}>
            No teams match your current filters or search query.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function TeamCard({ team }) {
  const { name, shortName, foundedYear, defunctYear, status, championships, totalMatches, winPercentage, teamColors } = team;
  const isDefunct = status === "DEFUNCT";
  
  // Team colors with fallbacks
  const primaryColor = teamColors?.[0] || "#00ED64";
  const secondaryColor = teamColors?.[1] || "#1E3A8A";

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ "--team-primary": primaryColor, "--team-secondary": secondaryColor }}
    >
      <Link
        to={`/teams/${shortName.toLowerCase()}`}
        className="team-card"
      >
        <div className="team-card__top">
          <div className="team-card__logo-outer">
            <div className="team-card__logo-glow" />
            <TeamLogo teamCode={shortName} size={85} />
          </div>
          <div className={`team-card__status-badge ${isDefunct ? "team-card__status-badge--defunct" : "team-card__status-badge--active"}`}>
            {isDefunct ? "Defunct" : "Active"}
          </div>
        </div>

        <div className="team-card__content">
          <h3 className="team-card__name">{name}</h3>
          <p className="team-card__years">
            {isDefunct ? `${foundedYear} — ${defunctYear}` : `Est. ${foundedYear}`}
          </p>
          
          {championships.length > 0 && (
            <div className="team-card__champs">
              {championships.map((year) => (
                 <div key={year} className="champ-token" title={`Champions ${year}`}>
                    <Trophy size={14} />
                 </div>
              ))}
            </div>
          )}
        </div>

        <div className="team-card__stats">
          <div className="stat-item">
            <div className="stat-item__value">
              {totalMatches}
            </div>
            <div className="stat-item__label">Matches</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-item__value" style={{ color: winPercentage >= 50 ? "var(--accent-base)" : "inherit" }}>
              {winPercentage.toFixed(1)}%
            </div>
            <div className="stat-item__label">Win Rate</div>
          </div>

          <div className="stat-item">
            <div className="stat-item__value" style={{ color: "var(--accent-base)" }}>
              {championships.length}
            </div>
            <div className="stat-item__label">Titles</div>
          </div>
        </div>

        <div className="team-card__action">
          View Detailed Analytics
          <ArrowRight size={18} />
        </div>
      </Link>
    </motion.div>
  );
}
