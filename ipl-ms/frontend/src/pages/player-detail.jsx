import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Users, Calendar, MapPin, Activity, Award, Medal, Target, TrendingUp } from "lucide-react";
import TeamLogo from "../components/team-logo.jsx";
import "../styles/players.css";

const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "stats", label: "Statistics", icon: TrendingUp },
  { id: "seasons", label: "Season History", icon: Calendar },
  { id: "awards", label: "Awards", icon: Award },
];

export default function PlayerDetailPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  async function fetchPlayer() {
    setLoading(true);
    try {
      const res = await fetch(`/api/players-detail/${encodeURIComponent(id)}`);
      const data = await res.json();

      if (data.success) {
        setPlayer(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load player details");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="player-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading player details...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="player-detail">
        <Link to="/players" className="back-link">
          <ArrowLeft size={18} /> Back to Players
        </Link>
        <div className="error-container">
          <h3>Player not found</h3>
          <p>{error || "This player does not exist"}</p>
        </div>
      </div>
    );
  }

  const {
    name,
    shortName,
    nickname,
    nationality,
    dateOfBirth,
    age,
    birthPlace,
    isOverseas,
    primaryRole,
    battingStyle,
    bowlingStyle,
    currentTeam,
    jerseyNumber,
    isCaptain,
    iplDebut,
    totalIPLSeasons,
    battingStats,
    bowlingStats,
    fieldingStats,
    seasonStats,
    awards,
    description,
    famousFor,
  } = player;

  // Team colors
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
  const initials = shortName?.split(" ").map(n => n[0]).join("").slice(0, 2) || name?.slice(0, 2);

  return (
    <div className="player-detail">
      <Link to="/players" className="back-link">
        <ArrowLeft size={18} /> Back to Players
      </Link>

      {/* Hero Section */}
      <div 
        className="player-detail__hero" 
        style={{ "--player-color": colors[0], "--player-secondary": colors[1] }}
      >
        <div className="player-detail__hero-content">
          <div className="player-detail__photo">
            {initials}
          </div>
          <div className="player-detail__info">
            <h1 className="player-detail__name">{name}</h1>
            {nickname && <p className="player-detail__nickname">"{nickname}"</p>}
            <div className="player-detail__meta">
              <span className="player-detail__meta-item">
                <TeamLogo teamCode={currentTeam} size={16} />
                {currentTeam}
                {isCaptain && " (Captain)"}
              </span>
              <span className="player-detail__meta-item">
                <MapPin size={16} />
                {birthPlace}
              </span>
              <span className="player-detail__meta-item">
                <Calendar size={16} />
                {age} years
              </span>
              {isOverseas && (
                <span className="player-detail__meta-item" style={{ color: "#fbbf24" }}>
                  <Trophy size={16} />
                  Overseas Player
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <span className="player-card__role" style={{ background: colors[0] + "30", color: colors[0] }}>
                {primaryRole}
              </span>
              <span className="player-card__role" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                {battingStyle}
              </span>
              {bowlingStyle && (
                <span className="player-card__role" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                  {bowlingStyle}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="player-detail__tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`player-detail__tab ${activeTab === tab.id ? "player-detail__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <OverviewTab player={player} colors={colors} />
        )}
        {activeTab === "stats" && (
          <StatsTab battingStats={battingStats} bowlingStats={bowlingStats} fieldingStats={fieldingStats} />
        )}
        {activeTab === "seasons" && (
          <SeasonsTab seasonStats={seasonStats} />
        )}
        {activeTab === "awards" && (
          <AwardsTab awards={awards} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ player, colors }) {
  const { description, famousFor, iplDebut, totalIPLSeasons, currentTeam, jerseyNumber, isCaptain } = player;

  return (
    <div>
      {/* Bio */}
      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <h2 className="section-title">
          <Users size={20} color="#00ed64" />
          About
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.7", fontSize: "1rem" }}>
          {description}
        </p>
        {famousFor && (
          <p style={{ marginTop: "1rem", color: "#00ed64", fontStyle: "italic" }}>
            Famous for: {famousFor}
          </p>
        )}
      </div>

      {/* Career Info */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__icon" style={{ background: colors[0] + "20", color: colors[0] }}>
            <Calendar size={24} />
          </div>
          <div className="stat-card__value">{iplDebut?.year || "N/A"}</div>
          <div className="stat-card__label">IPL Debut</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon" style={{ background: colors[1] + "20", color: colors[1] }}>
            <Activity size={24} />
          </div>
          <div className="stat-card__value">{totalIPLSeasons}</div>
          <div className="stat-card__label">Seasons</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon" style={{ background: "rgba(250,204,21,0.2)", color: "#facc15" }}>
            <Trophy size={24} />
          </div>
          <div className="stat-card__value">{isCaptain ? "Yes" : "No"}</div>
          <div className="stat-card__label">Captain</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon" style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa" }}>
            <Target size={24} />
          </div>
          <div className="stat-card__value">{jerseyNumber || "N/A"}</div>
          <div className="stat-card__label">Jersey #</div>
        </div>
      </div>
    </div>
  );
}

function StatsTab({ battingStats, bowlingStats, fieldingStats }) {
  return (
    <div>
      {/* Batting Stats */}
      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <h2 className="section-title">
          <TrendingUp size={20} color="#00ed64" />
          Batting Statistics
        </h2>
        <div className="stats-grid" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--green">{battingStats?.matches || 0}</div>
            <div className="stat-card__label">Matches</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--blue">{battingStats?.runs || 0}</div>
            <div className="stat-card__label">Runs</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{battingStats?.average?.toFixed(2) || "0.00"}</div>
            <div className="stat-card__label">Average</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{battingStats?.strikeRate?.toFixed(2) || "0.00"}</div>
            <div className="stat-card__label">Strike Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--green">{battingStats?.centuries || 0}</div>
            <div className="stat-card__label">100s</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{battingStats?.halfCenturies || 0}</div>
            <div className="stat-card__label">50s</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--blue">{battingStats?.highestScore || 0}</div>
            <div className="stat-card__label">Highest</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{battingStats?.sixes || 0}</div>
            <div className="stat-card__label">Sixes</div>
          </div>
        </div>
      </div>

      {/* Bowling Stats */}
      {bowlingStats && (
        <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 className="section-title">
            <Target size={20} color="#00ed64" />
            Bowling Statistics
          </h2>
          <div className="stats-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-card__value stat-card__value--green">{bowlingStats?.wickets || 0}</div>
              <div className="stat-card__label">Wickets</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">{bowlingStats?.economy?.toFixed(2) || "0.00"}</div>
              <div className="stat-card__label">Economy</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value stat-card__value--blue">{bowlingStats?.average?.toFixed(2) || "N/A"}</div>
              <div className="stat-card__label">Average</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">{bowlingStats?.bestFigures || "-"}</div>
              <div className="stat-card__label">Best</div>
            </div>
          </div>
        </div>
      )}

      {/* Fielding Stats */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h2 className="section-title">
          <Activity size={20} color="#00ed64" />
          Fielding Statistics
        </h2>
        <div className="stats-grid" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--green">{fieldingStats?.catches || 0}</div>
            <div className="stat-card__label">Catches</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{fieldingStats?.runOuts || 0}</div>
            <div className="stat-card__label">Run Outs</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value stat-card__value--blue">{fieldingStats?.stumpings || 0}</div>
            <div className="stat-card__label">Stumpings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeasonsTab({ seasonStats }) {
  const seasons = seasonStats?.filter(s => s.matches > 0) || [];

  if (seasons.length === 0) {
    return (
      <div className="empty-state">
        <h3>No season data available</h3>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
      <table className="season-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Team</th>
            <th>Matches</th>
            <th>Runs</th>
            <th>Avg</th>
            <th>SR</th>
            <th>Wickets</th>
            <th>Eco</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr key={season.year}>
              <td style={{ fontWeight: 600 }}>{season.year}</td>
              <td>{season.team}</td>
              <td>{season.matches}</td>
              <td style={{ color: "#4ade80" }}>{season.runs || "-"}</td>
              <td>{season.average?.toFixed(2) || "-"}</td>
              <td>{season.strikeRate?.toFixed(2) || "-"}</td>
              <td>{season.wickets || "-"}</td>
              <td>{season.economy?.toFixed(2) || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AwardsTab({ awards }) {
  const { orangeCaps, purpleCaps, playerOfMatchTotal, championsIn } = awards || {};

  return (
    <div>
      <div className="awards-grid">
        {/* Orange Cap */}
        <div className="award-card">
          <div className="award-card__icon award-card__icon--orange">
            <Medal size={24} />
          </div>
          <div className="award-card__content">
            <div className="award-card__title">Orange Cap Winner</div>
            <div className="award-card__years">
              {orangeCaps?.length > 0 ? orangeCaps.join(", ") : "None"}
            </div>
          </div>
        </div>

        {/* Purple Cap */}
        <div className="award-card">
          <div className="award-card__icon award-card__icon--purple">
            <Medal size={24} />
          </div>
          <div className="award-card__content">
            <div className="award-card__title">Purple Cap Winner</div>
            <div className="award-card__years">
              {purpleCaps?.length > 0 ? purpleCaps.join(", ") : "None"}
            </div>
          </div>
        </div>

        {/* Player of Match */}
        <div className="award-card">
          <div className="award-card__icon award-card__icon--trophy">
            <Trophy size={24} />
          </div>
          <div className="award-card__content">
            <div className="award-card__title">Player of the Match</div>
            <div className="award-card__years">{playerOfMatchTotal || 0} awards</div>
          </div>
        </div>

        {/* IPL Titles */}
        <div className="award-card">
          <div className="award-card__icon award-card__icon--trophy">
            <Trophy size={24} />
          </div>
          <div className="award-card__content">
            <div className="award-card__title">IPL Championships</div>
            <div className="award-card__years">
              {championsIn?.length > 0 ? championsIn.join(", ") : "None"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
