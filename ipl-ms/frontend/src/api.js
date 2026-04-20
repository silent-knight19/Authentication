const BASE = "/api";

/**
 * Wrapper around fetch that adds JSON headers and credentials.
 * @param {string} url - API path relative to /api
 * @param {object} options - fetch options
 * @returns {Promise<object>}
 */
async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "API Error");
  }
  return data;
}

export const api = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: "POST", body: JSON.stringify(body) }),
  put: (url, body) => request(url, { method: "PUT", body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: "DELETE" }),
};

export const authApi = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
  login: (email, password) =>
    api.post("/auth/login", { email, password }),
  logout: () =>
    api.post("/auth/logout"),
  getMe: () =>
    api.get("/auth/me"),
  refresh: () =>
    api.post("/auth/refresh"),
};
