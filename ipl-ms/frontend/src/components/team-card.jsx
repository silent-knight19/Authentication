import { Link } from "react-router-dom";
import { Trophy, TrendingUp, Users } from "lucide-react";

/**
 * TeamCard Component
 * Displays a team card with visual representation of team data
 */
export default function TeamCard({ team }) {
  const {
    _id,
    name,
    shortName,
    foundedYear,
    defunctYear,
    status,
    championships,
    totalMatches,
    wins,
    winPercentage,
    teamColors,
  } = team;

  const isDefunct = status === "DEFUNCT";
  const activeColor = isDefunct ? "#6B7280" : teamColors?.[0] || "#00ED64";
  const secondaryColor = teamColors?.[1] || "#1E3A8A";

  return (
    <Link
      to={`/teams/${shortName.toLowerCase()}`}
      style={{
        display: "block",
        backgroundColor: "var(--mdb-card)",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--mdb-border)",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s ease",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = activeColor;
        e.currentTarget.style.boxShadow = `0 8px 24px ${activeColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--mdb-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header with team colors gradient */}
      <div
        style={{
          height: "80px",
          background: `linear-gradient(135deg, ${activeColor} 0%, ${secondaryColor} 100%)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Team Logo Placeholder */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: activeColor,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          {shortName}
        </div>

        {/* Status Badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.6875rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            backgroundColor: isDefunct ? "#EF4444" : "#22C55E",
            color: "#FFFFFF",
          }}
        >
          {isDefunct ? "Defunct" : "Active"}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem" }}>
        {/* Team Name */}
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "var(--mdb-text)",
            marginBottom: "0.25rem",
            lineHeight: 1.3,
          }}
        >
          {name}
        </h3>

        {/* Years Active */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--mdb-text-muted)",
            marginBottom: "1rem",
          }}
        >
          {isDefunct
            ? `${foundedYear} - ${defunctYear}`
            : `Founded: ${foundedYear}`}
        </p>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          {/* Championships */}
          <div
            style={{
              textAlign: "center",
              padding: "0.75rem 0.5rem",
              backgroundColor: championships.length > 0 ? `${activeColor}15` : "var(--mdb-dark)",
              borderRadius: "8px",
              border: championships.length > 0 ? `1px solid ${activeColor}40` : "1px solid var(--mdb-border)",
            }}
          >
            <Trophy
              size={16}
              color={championships.length > 0 ? activeColor : "var(--mdb-text-muted)"}
              style={{ marginBottom: "0.25rem" }}
            />
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: championships.length > 0 ? activeColor : "var(--mdb-text-muted)",
              }}
            >
              {championships.length}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--mdb-text-muted)" }}>
              Titles
            </div>
          </div>

          {/* Matches */}
          <div
            style={{
              textAlign: "center",
              padding: "0.75rem 0.5rem",
              backgroundColor: "var(--mdb-dark)",
              borderRadius: "8px",
              border: "1px solid var(--mdb-border)",
            }}
          >
            <Users
              size={16}
              color="var(--mdb-text-muted)"
              style={{ marginBottom: "0.25rem" }}
            />
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "var(--mdb-text)",
              }}
            >
              {totalMatches}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--mdb-text-muted)" }}>
              Matches
            </div>
          </div>

          {/* Win % */}
          <div
            style={{
              textAlign: "center",
              padding: "0.75rem 0.5rem",
              backgroundColor: "var(--mdb-dark)",
              borderRadius: "8px",
              border: "1px solid var(--mdb-border)",
            }}
          >
            <TrendingUp
              size={16}
              color="var(--mdb-text-muted)"
              style={{ marginBottom: "0.25rem" }}
            />
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: winPercentage >= 50 ? "#22C55E" : "var(--mdb-text)",
              }}
            >
              {winPercentage.toFixed(1)}%
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--mdb-text-muted)" }}>
              Win Rate
            </div>
          </div>
        </div>

        {/* Championship Years */}
        {championships.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--mdb-text-muted)" }}>
              Champions:
            </span>
            {championships.map((year) => (
              <span
                key={year}
                style={{
                  padding: "2px 8px",
                  backgroundColor: `${activeColor}20`,
                  color: activeColor,
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                {year}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer - View Details */}
      <div
        style={{
          padding: "0.75rem 1.25rem",
          borderTop: "1px solid var(--mdb-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.875rem",
          color: "var(--mdb-green)",
        }}
      >
        <span>View Details</span>
        <span style={{ transition: "transform 0.2s ease" }}>→</span>
      </div>
    </Link>
  );
}
