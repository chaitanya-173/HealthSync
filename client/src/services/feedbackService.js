import api from "../api/axios";

export const submitFeedback = async (payload) => {
  return await api.post("/api/feedback", payload);
};