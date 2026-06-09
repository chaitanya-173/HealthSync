import api from "../api/axios";

export const fetchMe = async () => {
  return await api.get("/api/auth/me");
};

export const signup = async (payload) => {
  return await api.post("/api/auth/signup", payload);
};

export const login = async (payload) => {
  return await api.post("/api/auth/login", payload);
};

export const logout = async () => {
  return await api.post("/api/auth/logout");
};