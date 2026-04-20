import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * Provides auth state (user, loading) and actions (login, register, logout)
 * to the entire app via React context.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if the user is already logged in by calling /api/auth/me.
   */
  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
      }
    } catch {
      // Not logged in — that's fine
    } finally {
      setLoading(false);
    }
  }

  /**
   * Log in with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>}
   */
  async function login(email, password) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }
    setUser(data.data);
    return data;
  }

  /**
   * Register a new account.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>}
   */
  async function register(name, email, password) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }
    setUser(data.data);
    return data;
  }

  /**
   * Log out the current user.
   */
  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore logout errors
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 * @returns {{ user, setUser, loading, login, register, logout }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
