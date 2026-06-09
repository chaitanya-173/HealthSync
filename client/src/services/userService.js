import api from "../api/axios";

// Get nutrition goals
export const getGoals = async () => {
  return await api.get("/api/user/goals");
};

// Update nutrition goals
export const updateGoals = async (payload) => {
  return await api.put("/api/user/goals", payload);
};