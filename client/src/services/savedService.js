import api from "../api/axios";

// Get saved entries
export const getSavedEntries = async () => {
  return await api.get("/api/saved");
};

// Save a log
export const saveEntry = async (logId) => {
  return await api.post(`/api/saved/${logId}`);
};

// Create log from saved entry
export const createLogFromSavedEntry = async (savedId) => {
  return await api.post(`/api/saved/use/${savedId}`);
};

// Update saved entry text/title
export const updateSavedEntry = async (savedId, payload) => {
  return await api.put(`/api/saved/${savedId}`, payload);
};

// Update saved entry macros
export const updateSavedMacros = async (savedId, payload) => {
  return await api.put(`/api/saved/${savedId}/manual`, payload);
};

// Remove saved entry
export const deleteSavedEntry = async (savedId) => {
  return await api.delete(`/api/saved/${savedId}`);
};
