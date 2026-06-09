import api from "../api/axios";

export const getSummary = async (date) => {
  return await api.get(`/api/log/summary?date=${date}`);
};
