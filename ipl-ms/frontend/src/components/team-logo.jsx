import { useState } from "react";

/**
 * Team Logo Component
 * Uses locally stored official IPL team logos from /public folder
 * Reliable - no external dependencies
 */

// Map team codes to local logo files
const TEAM_LOGO_FILES = {
  // Current Teams
  CSK: "/Original Chennai Super Fun Logo PNG - SVG File Download Free Download.webp",
  MI: "/Original Mumbai Indians PNG-SVG File Download Free Download.webp",
  RCB: "/Original Royal Challengers Bangalore PNG-SVG File Download Free Download.webp",
  KKR: "/Original Kolkata Knight Riders PNG-SVG File Download Free Download.webp",
  RR: "/Original Rajasthan Royals Logo PNG-SVG File Download Free Download.webp",
  SRH: "/Original Sunrisers Hyderabad PNG-SVG File Download Free Download.webp",
  DC: "/Original Delhi Capitals Logo PNG-SVG File Download Free Download.webp",
  PBKS: "/Original Punjab Kings PNG-SVG File Download Free Download.webp",
  LSG: "/Original Lucknow Super Giants PNG-SVG File Download Free Download.webp",
  GT: "/Original Gujarat Titans Logo PNG-SVG File Download Free Download.webp",
  
  // Defunct Teams
  PWI: "/Pune_Warriors_India_IPL_Logo.png",
  RPS: "/Rising_Pune_Supergiant.webp",
  GL: "/kisspng-2017-indian-premier-league-gujarat-lions-in-2017-m-cricket-players-5b090005100801.6664161115273164850657.jpg",
  KTK: "/d7f3506ab28ce0c2fdf122ae514eba8f.jpg",
};

// Team color fallbacks for errors
const TEAM_COLORS = {
  CSK: { bg: "#FCBF1E", text: "#1E3A8A" },
  MI: { bg: "#004BA0", text: "#D1AB3E" },
  RCB: { bg: "#000000", text: "#EC1C24" },
  KKR: { bg: "#3A225D", text: "#FDB913" },
  RR: { bg: "#EA1A85", text: "#FFFFFF" },
  SRH: { bg: "#000000", text: "#F26522" },
  DC: { bg: "#0078BC", text: "#FFFFFF" },
  PBKS: { bg: "#D11E34", text: "#FFFFFF" },
  LSG: { bg: "#00A1E4", text: "#FFFFFF" },
  GT: { bg: "#1B2133", text: "#D7B679" },
  PWI: { bg: "#0096D6", text: "#FFFFFF" },
  KTK: { bg: "#E9408C", text: "#FFFFFF" },
  RPS: { bg: "#EC1C24", text: "#FFFFFF" },
  GL: { bg: "#E04F16", text: "#FFFFFF" },
};

export default function TeamLogo({ teamCode, size = 80 }) {
  const [error, setError] = useState(false);
  const code = teamCode?.toUpperCase();
  const logoFile = TEAM_LOGO_FILES[code];
  const colors = TEAM_COLORS[code] || { bg: "#00ed64", text: "#000" };
  
  // For errors or missing files, show initials
  if (!logoFile || error) {
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}dd 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: "800",
        color: colors.text,
        border: "3px solid rgba(255,255,255,0.3)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}>
        {code}
      </div>
    );
  }
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: "#fff",
      padding: "4px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <img 
        src={logoFile}
        alt={`${code} logo`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        onError={() => setError(true)}
      />
    </div>
  );
}
