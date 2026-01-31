import axios from "axios";
// Use Vite env variable for API base so the app works both locally and on the deployed site.
// In development we default to http://localhost:3000; in production we warn if VITE_API_BASE is missing or points to localhost.
const API_BASE = import.meta.env.VITE_API_BASE ?? (import.meta.env.MODE === "development" ? "http://localhost:3000" : "");

if (import.meta.env.MODE === "production" && (!API_BASE || API_BASE.includes("localhost"))) {
  // eslint-disable-next-line no-console
  console.error(
    "[CONFIG] VITE_API_BASE is not set or points to localhost in production. Set VITE_API_BASE to your backend URL in your hosting provider (e.g., Vercel) and rebuild the app."
  );
}

const axiosSecure = axios.create({
  // Use explicit `/api` when API_BASE is set, otherwise fall back to relative `/api` so requests go to the same origin.
  baseURL: API_BASE ? `${API_BASE}/api` : "/api",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export { API_BASE };
export default axiosSecure;
