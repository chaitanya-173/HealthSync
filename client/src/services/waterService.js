import api from "../api/axios";

export const getWaterSettings = async () => {
  return await api.get("/api/water/settings");
};

export const updateWaterSettings = async (payload) => {
  return await api.put("/api/water/settings", payload);
};

export const getDailyWater = async (date) => {
  return await api.get(`/api/water?date=${date}`);
};

export const updateDailyWater = async (payload) => {
  return await api.patch("/api/water", payload);
};
