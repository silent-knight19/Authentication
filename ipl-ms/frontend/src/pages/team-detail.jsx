import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, ArrowLeft, TrendingUp, MapPin, Calendar, Target, Medal, Activity, Shield, Hash } from "lucide-react";
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
  }
};

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`/api/teams-detail/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setTeam(d.data.team);
        } else {
          setError(d.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="teams-page">
        <div className="loading-skeleton" style={{ height: "60vh", borderRadius: "32px" }} />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="teams-page">
        <div className="page-header">
           <Link to="/teams" className="filter-tab" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
             <ArrowLeft size={18} /> Back to Teams
           </Link>
           <h1 className="page-header__title">Team Not Found</h1>
           <p className="page-header__subtitle">{error || "The team you're looking for doesn't exist in our database."}</p>
        </div>
      </div>
    );
  }

  const { name, shortName, foundedYear, defunctYear, status, homeCity, homeGround, teamColors, championships, runnersUp, totalMatches, wins, losses, winPercentage, totalSeasons, captains, keyPlayers, seasonHistory, description, highestTeamScore, lowestTeamScore, individualRecords, teamRecords } = team;
  const isDefunct = status === "DEFUNCT";
  const primaryColor = teamColors?.[0] || "#00ED64";
  const secondaryColor = teamColors?.[1] || "#1E3A8A";

  const tabs = [
    { id: "overview", label: "Overview", icon: <Shield size={16} /> },
    { id: "history", label: "History", icon: <Calendar size={16} /> },
    { id: "stats", label: "Stats", icon: <TrendingUp size={16} /> },
    { id: "records", label: "Records", icon: <Hash size={16} /> },
  ];

  return (
    <motion.div 
      className="teams-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ "--team-primary": primaryColor, "--team-secondary": secondaryColor }}
    >
      {/* Navigation */}
      <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
        <Link to="/teams" className="filter-tab" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back to Teams
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="team-card" 
        variants={itemVariants}
        style={{ padding: "4rem 3rem", marginBottom: "2.5rem", background: "rgba(15, 15, 25, 0.4)", display: "block" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          <div className="team-card__logo-outer" style={{ width: "160px", height: "160px" }}>
            <div className="team-card__logo-glow" style={{ opacity: 0.4 }} />
            <TeamLogo teamCode={shortName} size={140} />
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
               <h1 style={{ fontSize: "3.5rem", margin: 0 }}>{name}</h1>
               <div className={`team-card__status-badge ${isDefunct ? "team-card__status-badge--defunct" : "team-card__status-badge--active"}`}>
                  {isDefunct ? "Defunct" : "Active"}
               </div>
            </div>
            
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", color: "var(--text-dim)", fontSize: "1.1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} /> {isDefunct ? `${foundedYear} — ${defunctYear}` : `Since ${foundedYear}`}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={18} /> {homeCity}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Target size={18} /> {homeGround}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
             <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", padding: "1.5rem 2rem", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent-base)", fontFamily: "Sora" }}>{championships.length}</div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "700", color: "var(--text-ghost)" }}>Titles</div>
             </div>
             <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", padding: "1.5rem 2rem", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "Sora" }}>{totalMatches}</div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "700", color: "var(--text-ghost)" }}>Matches</div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div className="filter-bar" variants={itemVariants} style={{ justifyContent: "flex-start", marginBottom: "2.5rem" }}>
        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`filter-tab ${activeTab === tab.id ? "filter-tab--active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div layout variants={itemVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && <OverviewTab team={team} />}
            {activeTab === "history" && <HistoryTab seasonHistory={seasonHistory} />}
            {activeTab === "stats" && <StatsTab team={team} />}
            {activeTab === "records" && <RecordsTab team={team} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function OverviewTab({ team }) {
  const { championships, runnersUp, captains, keyPlayers, description } = team;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <section className="glass-card" style={{ padding: "2.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>About the Team</h2>
          <p style={{ color: "var(--text-dim)", lineHeight: "1.8", fontSize: "1.1rem" }}>{description}</p>
        </section>

        <section>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>Key Figures</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {keyPlayers.slice(0, 4).map((player, idx) => (
              <div key={idx} className="team-card" style={{ padding: "1.5rem", gap: "0.5rem" }}>
                <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>{player.name}</div>
                <div style={{ color: "var(--text-ghost)", fontSize: "0.875rem" }}>{player.role} • {player.years}</div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                   {player.runs && (
                     <div className="stat-item">
                       <div className="stat-item__value" style={{ fontSize: "1rem" }}>{player.runs.toLocaleString()}</div>
                       <div className="stat-item__label">Runs</div>
                     </div>
                   )}
                   {player.wickets && (
                     <div className="stat-item">
                       <div className="stat-item__value" style={{ fontSize: "1rem" }}>{player.wickets}</div>
                       <div className="stat-item__label">Wickets</div>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {championships.length > 0 && (
          <section className="glass-card" style={{ padding: "2rem", borderColor: "var(--accent-base)" }}>
             <h3 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
               <Trophy size={20} color="var(--accent-base)" />
               Champions
             </h3>
             <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {championships.map(year => (
                  <div key={year} style={{ padding: "0.75rem 1.25rem", background: "var(--accent-base)", color: "#000", borderRadius: "12px", fontWeight: "800", fontSize: "1rem" }}>
                    {year}
                  </div>
                ))}
             </div>
          </section>
        )}

        <section className="glass-card" style={{ padding: "2rem" }}>
           <h3 style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>Captains</h3>
           <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {captains.map((cap, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <div style={{ fontWeight: "600" }}>{cap.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)" }}>{cap.years}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "var(--accent-base)", fontWeight: "700" }}>{cap.winPercentage}%</div>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", color: "var(--text-ghost)" }}>Win Rate</div>
                  </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}

function HistoryTab({ seasonHistory }) {
  const sortedHistory = [...seasonHistory].sort((a, b) => b.year - a.year);

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Season Timeline</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {sortedHistory.map((season) => (
          <div key={season.year} className="team-card" style={{ padding: "2rem", display: "flex", gap: "2rem", alignItems: "center", borderLeft: season.position === 1 ? "4px solid var(--accent-base)" : "1px solid var(--glass-border)" }}>
            <div style={{ flexShrink: 0, width: "100px" }}>
               <div style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "Sora" }}>{season.year}</div>
               <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)", fontWeight: "600" }}>{season.captain}</div>
            </div>
            
            <div style={{ flex: 1 }}>
               <div style={{ display: "inline-block", padding: "0.4rem 1rem", borderRadius: "100px", background: season.position === 1 ? "var(--accent-base)" : "rgba(255,255,255,0.03)", color: season.position === 1 ? "#000" : "var(--text-main)", fontWeight: "700", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {season.position === 1 ? "CHAMPIONS" : `Finished ${ordinalSuffix(season.position)}`}
               </div>
               
               <div style={{ display: "flex", gap: "2.5rem" }}>
                  <div className="stat-item">
                    <div className="stat-item__value" style={{ fontSize: "1.1rem" }}>{season.wins}-{season.losses}</div>
                    <div className="stat-item__label">W-L Record</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-item__value" style={{ fontSize: "1.1rem" }}>{season.points}</div>
                    <div className="stat-item__label">Points</div>
                  </div>
                  {season.topRunScorer && (
                    <div className="stat-item" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "2.5rem" }}>
                      <div className="stat-item__value" style={{ fontSize: "1rem" }}>{season.topRunScorer.name}</div>
                      <div className="stat-item__label">Top Scorer ({season.topRunScorer.runs})</div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsTab({ team }) {
  const { wins, losses, winPercentage, rivalries } = team;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
       <div>
         <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Performance Analytics</h2>
         <div className="glass-card" style={{ padding: "2.5rem", textAlign: "center" }}>
            <div style={{ position: "relative", width: "200px", height: "200px", margin: "0 auto 2rem" }}>
               {/* Simplified radial visual */}
               <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "10px solid rgba(255,255,255,0.05)" }} />
               <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "10px solid var(--accent-base)", borderBottomColor: "transparent", borderLeftColor: "transparent" }} />
               <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily: "Sora" }}>{winPercentage.toFixed(1)}%</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)", fontWeight: "700" }}>WIN RATE</div>
               </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
               <div>
                 <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--accent-base)" }}>{wins}</div>
                 <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)" }}>WINS</div>
               </div>
               <div>
                 <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#FF4D4D" }}>{losses}</div>
                 <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)" }}>LOSSES</div>
               </div>
            </div>
         </div>
       </div>

       <div>
         <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Major Rivalries</h2>
         <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {rivalries && rivalries.map((rival, idx) => (
              <div key={idx} className="team-card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                   <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>vs {rival.opponent}</div>
                   <div style={{ fontSize: "0.875rem", color: "var(--text-ghost)" }}>{rival.matchesPlayed} Matches Played</div>
                </div>
                <div style={{ textAlign: "right" }}>
                   <div style={{ fontSize: "1.25rem", fontWeight: "800" }}>{rival.wins}W - {rival.losses}L</div>
                   <div style={{ fontSize: "0.75rem", color: rival.wins >= rival.losses ? "var(--accent-base)" : "#FF4D4D", fontWeight: "700" }}>
                     {rival.wins >= rival.losses ? "DOMINANT" : "UNDERDOG"}
                   </div>
                </div>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
}

function RecordsTab({ team }) {
  const { highestTeamScore, lowestTeamScore, individualRecords } = team;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
       <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Team Records</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
             {highestTeamScore && (
               <div className="glass-card" style={{ padding: "2rem", borderTop: "4px solid var(--accent-base)" }}>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-ghost)", marginBottom: "0.75rem", fontWeight: "700" }}>HIGHEST TOTAL</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-base)", fontFamily: "Sora", marginBottom: "0.5rem" }}>
                    {highestTeamScore.runs}/{highestTeamScore.wickets || "X"}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "600" }}>vs {highestTeamScore.against}</div>
                  <div style={{ color: "var(--text-ghost)" }}>Season {highestTeamScore.year}</div>
               </div>
             )}
             {lowestTeamScore && (
               <div className="glass-card" style={{ padding: "2rem", borderTop: "4px solid #FF4D4D" }}>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-ghost)", marginBottom: "0.75rem", fontWeight: "700" }}>LOWEST TOTAL</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#FF4D4D", fontFamily: "Sora", marginBottom: "0.5rem" }}>
                    {lowestTeamScore.runs}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "600" }}>vs {lowestTeamScore.against}</div>
                  <div style={{ color: "var(--text-ghost)" }}>Season {lowestTeamScore.year}</div>
               </div>
             )}
          </div>
       </section>

       <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Individual Hall of Fame</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
             {individualRecords && individualRecords.highestIndividualScore && (
               <div className="team-card" style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)", marginBottom: "1rem", fontWeight: "700" }}>HIGHEST INDIVIDUAL SCORE</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-base)", fontFamily: "Sora", marginBottom: "0.5rem" }}>
                    {individualRecords.highestIndividualScore.runs}*
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>{individualRecords.highestIndividualScore.player}</div>
                  <div style={{ color: "var(--text-ghost)" }}>vs {individualRecords.highestIndividualScore.opponent}, {individualRecords.highestIndividualScore.year}</div>
               </div>
             )}
             {individualRecords && individualRecords.bestBowlingFigures && (
               <div className="team-card" style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-ghost)", marginBottom: "1rem", fontWeight: "700" }}>BEST BOWLING FIGURES</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-base)", fontFamily: "Sora", marginBottom: "0.5rem" }}>
                    {individualRecords.bestBowlingFigures.figures}
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>{individualRecords.bestBowlingFigures.player}</div>
                  <div style={{ color: "var(--text-ghost)" }}>vs {individualRecords.bestBowlingFigures.opponent}, {individualRecords.bestBowlingFigures.year}</div>
               </div>
             )}
          </div>
       </section>
    </div>
  );
}

function ordinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
}
