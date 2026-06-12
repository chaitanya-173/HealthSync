import axios from "axios";

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (typeof window === "undefined") {
    return envUrl || "http://localhost:5000";
  }

  const { hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  if (envUrl && (isLocalhost || !envUrl.includes("localhost"))) {
    return envUrl;
  }

  return `http://${hostname}:5000`;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true, // IMPORTANT for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
