import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context.jsx";
import { Loader2 } from "lucide-react";

/**
 * Wraps routes that require authentication.
 * Shows a loading spinner while checking auth, then redirects
 * to /signin if not authenticated.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--mdb-dark)",
        }}
      >
        <Loader2
          size={32}
          style={{ color: "var(--mdb-green)", animation: "spin 1s linear infinite" }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
