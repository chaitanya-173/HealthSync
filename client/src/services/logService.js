import api from "../api/axios";

// Create log
export const createLog = async (payload) => {
  return await api.post("/api/log", payload);
};

// Get logs for selected day
export const getLogsByDay = async (date) => {
  return await api.get(`/api/log/day?date=${date}`);
};

// Get summary for selected day
export const getSummary = async (date) => {
  return await api.get(`/api/log/summary?date=${date}`);
};

// Get weekly logs
export const getWeeklyLogs = async () => {
  return await api.get("/api/log/weekly-logs");
};

// Get current food logging streak
export const getStreak = async () => {
  return await api.get("/api/log/streak");
};

// Update AI log
export const updateLog = async (id, payload) => {
  return await api.put(`/api/log/${id}`, payload);
};

// Update macros manually
export const updateMacros = async (id, payload) => {
  return await api.put(`/api/log/${id}/manual`, payload);
};

// Update date/time
export const updateDateTime = async (id, payload) => {
  return await api.put(`/api/log/${id}/time`, payload);
};

// Delete log
export const deleteLog = async (id) => {
  return await api.delete(`/api/log/${id}`);
};
