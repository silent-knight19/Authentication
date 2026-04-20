import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context.jsx";
import {
  Home,
  Shield,
  Users,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

// Navigation items - Dashboard, Teams and Players enabled
const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/teams", label: "Teams", icon: Shield },
  { path: "/players", label: "Players", icon: Users },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/signin", { replace: true });
  }

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ 
      height: "100vh", 
      background: "linear-gradient(135deg, #050505 0%, #0a0a0f 100%)",
      backgroundAttachment: "fixed",
      display: "flex",
      color: "#fff",
      overflow: "hidden"
    }}>
      {/* Sidebar */}
      <aside
        style={{
          position: "relative",
          width: "18rem",
          height: "100vh",
          flexShrink: 0,
          background: "rgba(10, 10, 15, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
          overflowY: "auto"
        }}
      >
        {/* Logo Area */}
        <div style={{ padding: "2.5rem 2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #00ed64 0%, #22c55e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(0, 237, 100, 0.3)",
            }}>
              <Shield size={24} color="#000" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "900", 
                color: "#fff", 
                letterSpacing: "-0.032em",
                fontFamily: "Sora",
                margin: 0,
                lineHeight: 1
              }}>
                IPL
              </h1>
              <p style={{ 
                color: "rgba(255,255,255,0.4)", 
                fontSize: "0.75rem", 
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: "700",
                marginTop: "0.25rem"
              }}>
                Management
              </p>
            </div>
          </div>
        </div>

        {/* User Section - Moved Above Navigation */}
        {user && (
          <div style={{ padding: "0 1rem", marginBottom: "1.5rem" }}>
            <div 
              className="glass-card"
              style={{ 
                padding: "1rem", 
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                display: "flex", 
                alignItems: "center", 
                gap: "1rem",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div style={{ position: "relative" }}>
                 <div style={{ 
                   width: "44px", 
                   height: "44px", 
                   borderRadius: "14px", 
                   background: "linear-gradient(135deg, #00ed64 0%, #3b82f6 100%)", 
                   display: "flex", 
                   alignItems: "center", 
                   justifyContent: "center", 
                   fontSize: "1rem", 
                   fontWeight: "800", 
                   color: "#000" 
                 }}>
                   {user.name.charAt(0).toUpperCase()}
                 </div>
                 <div style={{
                   position: "absolute",
                   bottom: "-2px",
                   right: "-2px",
                   width: "12px",
                   height: "12px",
                   borderRadius: "50%",
                   background: "#00ed64",
                   border: "2px solid #0a0a0f"
                 }} />
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  fontSize: "0.875rem", 
                  fontWeight: "700", 
                  color: "#fff", 
                  whiteSpace: "nowrap", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis",
                  fontFamily: "Sora",
                  margin: 0
                }}>
                  {user.name}
                </p>
                <p style={{ 
                  fontSize: "0.75rem", 
                  color: "rgba(255,255,255,0.4)", 
                  whiteSpace: "nowrap", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis",
                  margin: 0
                }}>
                  Admin Account
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  background: "rgba(255, 255, 255, 0.02)",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
                  e.currentTarget.style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ padding: "0 1rem", flex: 1 }}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "16px",
                    fontSize: "0.9375rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    color: active ? "#fff" : "rgba(255,255,255,0.5)",
                    fontFamily: "Sora",
                    overflow: "hidden"
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="active-nav-bg"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0, 237, 100, 0.1)",
                        border: "1px solid rgba(0, 237, 100, 0.2)",
                        borderRadius: "16px",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon size={20} style={{ 
                    color: active ? "#00ed64" : "rgba(255,255,255,0.4)",
                    filter: active ? "drop-shadow(0 0 8px rgba(0, 237, 100, 0.4))" : "none",
                    transition: "all 0.3s ease"
                  }} />
                  <span style={{ position: "relative" }}>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0, overflow: "auto", position: "relative" }}>
        <div style={{ padding: "2.5rem", maxWidth: "1600px", margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
