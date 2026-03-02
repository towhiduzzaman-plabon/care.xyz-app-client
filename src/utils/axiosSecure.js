import axios from "axios";
// Use Vite env variable for API base so the app works both locally and on the deployed site.
// During development we default to http://localhost:3000. In production we *require* a valid
// VITE_API_BASE; pointing at localhost or leaving it empty will result in API calls going to
// the same origin (relative `/api`) instead of the real backend. The production build will log
// a clear error and drop the host so that the browser doesn’t attempt to contact
// http://localhost:3000 (which is commonly blocked by ad‑blockers and fails to reach the server).
let API_BASE = import.meta.env.VITE_API_BASE ?? (import.meta.env.MODE === "development" ? "http://localhost:3000" : "");

if (import.meta.env.MODE === "production") {
  if (!import.meta.env.VITE_API_BASE) {
    // eslint-disable-next-line no-console
    console.error(
      "[CONFIG] VITE_API_BASE is not defined for production. API requests will use relative "/api" and may fail if the backend is hosted on a different domain."
    );
    // force empty so we don’t accidentally use a localhost fallback
    API_BASE = "";
  } else if (API_BASE.includes("localhost")) {
    // eslint-disable-next-line no-console
    console.error(
      "[CONFIG] VITE_API_BASE points at localhost in production; ignoring it and using relative /api."
    );
    API_BASE = "";
  }
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
