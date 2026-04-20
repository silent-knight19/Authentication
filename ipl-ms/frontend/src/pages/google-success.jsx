import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context.jsx";

/**
 * Intermediate page after Google OAuth redirect.
 * Fetches the authenticated user via /api/auth/me (cookies are set by the backend)
 * and updates the auth context before navigating to the dashboard.
 */
export default function GoogleSuccess() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          navigate("/", { replace: true });
        } else {
          throw new Error("Failed to load user");
        }
      } catch {
        setError(true);
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 2000);
      }
    }

    loadUser();
  }, [navigate, setUser]);

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--mdb-dark)",
          gap: "1rem",
        }}
      >
        <p style={{ color: "var(--mdb-error)", fontSize: "0.9375rem" }}>
          Google sign-in failed. Redirecting to sign in...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--mdb-dark)",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "3px solid var(--mdb-border)",
          borderTopColor: "var(--mdb-green)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ color: "var(--mdb-text-muted)", fontSize: "0.875rem" }}>
        Completing sign in...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
