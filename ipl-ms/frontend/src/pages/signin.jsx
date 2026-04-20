import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Lock, LogIn, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../context/auth-context.jsx";
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    window.location.href = "/api/auth/google";
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(225deg, #050505 0%, #0a0a0f 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "2rem"
    }}>
      {/* Background Animated Glows */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "50%",
        height: "50%",
        background: "radial-gradient(circle, rgba(0, 237, 100, 0.08) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        right: "-10%",
        width: "50%",
        height: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none"
      }} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: "100%", maxWidth: "450px", position: "relative", zIndex: 1 }}
      >
        {/* Logo Area */}
        <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex",
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #00ed64 0%, #22c55e 100%)",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(0, 237, 100, 0.2)",
            marginBottom: "1.5rem"
          }}>
            <Shield size={32} color="#000" />
          </div>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "900", 
            color: "#fff", 
            letterSpacing: "-0.04em",
            fontFamily: "Sora",
            margin: 0
          }}>
            Welcome Back
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", fontSize: "1rem" }}>
            Sign in to access the IPL Portal
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div 
          className="glass-card"
          variants={itemVariants}
          style={{ padding: "3rem", borderRadius: "32px" }}
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                marginBottom: "2rem",
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                fontSize: "0.875rem",
                fontWeight: "600",
                display: "flex",
                gap: "0.75rem"
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <AlertCircle size={18} />
              </div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="team-card"
                  style={{ 
                    width: "100%", 
                    padding: "1rem 1.25rem 1rem 3.5rem", 
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="team-card"
                  style={{ 
                    width: "100%", 
                    padding: "1rem 1.25rem 1rem 3.5rem", 
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#00ed64",
                color: "#000",
                padding: "1.125rem",
                borderRadius: "16px",
                border: "none",
                fontSize: "1.1rem",
                fontWeight: "800",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                fontFamily: "Sora",
                boxShadow: "0 8px 25px rgba(0, 237, 100, 0.2)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 237, 100, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 237, 100, 0.2)";
                }
              }}
            >
              {loading ? "Authenticating..." : (
                <>
                  Enter Portal <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", fontWeight: "800", textTransform: "uppercase" }}>Or secure login</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
          </div>

          <button
            onClick={handleGoogleSignIn}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              background: "rgba(255,255,255,0.03)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}
        >
          New to the platform?{" "}
          <Link to="/signup" style={{ color: "#00ed64", textDecoration: "none", fontWeight: "700" }}>
            Create Account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
