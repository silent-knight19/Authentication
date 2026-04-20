import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context.jsx";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, BookOpen, CheckCircle, Trophy, Activity, Users, Star } from "lucide-react";
import "../styles/teams.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  const features = [
    {
      path: "/teams",
      label: "Franchise Hub",
      description: "Explore all 14 IPL teams with detailed history, statistical analytics, and legendary records.",
      icon: Shield,
      color: "#00ED64",
      tag: "CORE"
    },
    {
      path: "/players",
      label: "Player Database",
      description: "Browse 100+ active IPL player profiles with career stats, records, and season-by-season performance.",
      icon: Users,
      color: "#3b82f6",
      tag: "PLAYERS"
    },
    {
      path: "/teams",
      label: "Performance Metrics",
      description: "Analyze season-by-season performance data and individual player milestones.",
      icon: Activity,
      color: "#a855f7",
      tag: "STATS"
    }
  ];

  const quickStats = [
    { label: "Total Franchises", value: 14, color: "#00ED64", icon: Shield },
    { label: "Active Players", value: 100, color: "#3b82f6", icon: Users },
    { label: "IPL Champions", value: 17, color: "#fbbf24", icon: Trophy },
  ];

  return (
    <motion.div 
      className="teams-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ padding: 0 }}
    >
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants}
        className="team-card" 
        style={{ 
          padding: "4rem 3rem", 
          marginBottom: "3rem",
          background: "linear-gradient(225deg, rgba(0, 237, 100, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(0, 0, 0, 0) 100%)",
          position: "relative",
          overflow: "hidden",
          display: "block"
        }}
      >
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0, 237, 100, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #00ed64 0%, #22c55e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(0, 237, 100, 0.4)",
            }}>
              <Trophy size={32} color="#000" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: "3.5rem", 
                fontWeight: "900", 
                color: "#fff",
                letterSpacing: "-0.04em",
                fontFamily: "Sora",
                margin: 0,
                lineHeight: 1
              }}>
                Welcome back, {user?.name?.split(" ")[0] || "Champion"}!
              </h1>
              <p style={{ 
                color: "#00ed64", 
                fontSize: "0.875rem", 
                fontWeight: "700", 
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: "0.5rem"
              }}>
                System Administrator Portal
              </p>
            </div>
          </div>
          
          <p style={{ 
            fontSize: "1.25rem", 
            color: "rgba(255,255,255,0.6)",
            maxWidth: "700px",
            lineHeight: "1.7",
            fontFamily: "Inter"
          }}>
            Experience the ultimate IPL analytics platform. Dive into the deep history of 
            cricket's most prestigious league, manage franchise data, and explore 
            legendary achievements.
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "2rem",
        marginBottom: "4rem",
      }}>
        {quickStats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="team-card"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{ 
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              borderTop: `4px solid ${stat.color}`
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: `${stat.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: stat.color,
              flexShrink: 0
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: "900", 
                color: "#fff",
                fontFamily: "Sora",
                lineHeight: 1,
                marginBottom: "0.25rem"
              }}>
                {stat.value}
              </div>
              <div style={{ 
                color: "rgba(255,255,255,0.4)", 
                fontSize: "0.8125rem",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "2.5rem" }}>
        {/* Feature Cards */}
        <section>
          <motion.h2 
            variants={itemVariants}
            style={{ 
              fontSize: "1.5rem", 
              fontWeight: "800", 
              color: "#fff", 
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "Sora"
            }}
          >
            <Activity size={24} color="#00ed64" />
            Intelligence Modules
          </motion.h2>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "1.5rem",
          }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div variants={itemVariants} key={feature.label}>
                  <Link
                    to={feature.path}
                    className="team-card"
                    style={{
                      padding: "2rem",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "24px",
                      background: `${feature.color}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: `1px solid ${feature.color}20`
                    }}>
                      <Icon size={36} color={feature.color} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                        <h3 style={{ 
                          fontSize: "1.5rem", 
                          fontWeight: "800", 
                          color: "#fff",
                          fontFamily: "Sora",
                          margin: 0
                        }}>
                          {feature.label}
                        </h3>
                        <span style={{ 
                          padding: "0.25rem 0.75rem", 
                          borderRadius: "100px", 
                          background: "rgba(255,255,255,0.05)", 
                          fontSize: "0.7rem", 
                          fontWeight: "800",
                          color: feature.color,
                          letterSpacing: "0.1em"
                        }}>
                          {feature.tag}
                        </span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", margin: 0, maxWidth: "500px" }}>
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="team-card__button" style={{ 
                      opacity: 1, 
                      position: "static", 
                      width: "60px", 
                      height: "60px",
                      transform: "none"
                    }}>
                      <ArrowRight size={24} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How to Use Guide */}
        <section>
          <motion.h2 
            variants={itemVariants}
            style={{ 
              fontSize: "1.5rem", 
              fontWeight: "800", 
              color: "#fff", 
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "Sora"
            }}
          >
            <BookOpen size={24} color="#00ed64" />
            Quick Guide
          </motion.h2>
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ 
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
              {[
                { text: "Access full franchise rosters and historical data", icon: Shield },
                { text: "Filter teams by active or defunct status", icon: Activity },
                { text: "Analyze deep-dive statistics and win percentages", icon: Star },
                { text: "Explore season-by-season championship records", icon: Trophy },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: "flex", 
                    alignItems: "start", 
                    gap: "1rem",
                  }}
                >
                  <div style={{ 
                    marginTop: "0.25rem",
                    color: "#00ed64",
                    background: "rgba(0, 237, 100, 0.1)",
                    padding: "0.5rem",
                    borderRadius: "10px"
                  }}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "600", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Step 0{idx + 1}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: "1.5" }}>
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{
              width: "100%",
              marginTop: "2.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              color: "#fff",
              padding: "1rem",
              borderRadius: "14px",
              fontWeight: "700",
              fontSize: "0.9375rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "Sora"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00ed64";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.color = "#fff";
            }}
            >
              System Documentation
            </button>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
