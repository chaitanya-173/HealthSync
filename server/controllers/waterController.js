import WaterLog from "../models/WaterLogModel.js";
import { successResponse, errorResponse } from "../utils/response.js";

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getWaterSettings = (user) => {
  const dailyCups =
    user.waterSettings?.dailyCups ||
    user.nutritionGoals?.waterCups ||
    10;

  return {
    dailyLiters: user.waterSettings?.dailyLiters || dailyCups * 0.25,
    dailyCups,
  };
};

const buildWaterPayload = (log, settings, date) => {
  const cupsConsumed = log?.cups || 0;
  const cupsGoal = log?.goalCups || settings.dailyCups;
  const cupLiters = settings.dailyLiters / Math.max(settings.dailyCups, 1);

  return {
    date,
    cupsConsumed,
    cupsGoal,
    dailyLitersGoal: settings.dailyLiters,
    litersConsumed: Number((cupsConsumed * cupLiters).toFixed(2)),
    cupsRemaining: Math.max(cupsGoal - cupsConsumed, 0),
  };
};

export const getSettings = async (req, res) => {
  try {
    return successResponse(res, "Water settings fetched", getWaterSettings(req.user));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateSettings = async (req, res) => {
  try {
    const dailyLiters = Number(req.body.dailyLiters);
    const dailyCups = Number(req.body.dailyCups);

    if (!dailyLiters || dailyLiters <= 0 || !dailyCups || dailyCups <= 0) {
      return errorResponse(res, "Daily liters and cups must be positive numbers", 400);
    }

    req.user.waterSettings = {
      dailyLiters,
      dailyCups,
    };

    req.user.nutritionGoals.waterCups = dailyCups;

    await req.user.save();

    return successResponse(res, "Water settings updated", getWaterSettings(req.user));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getDailyWater = async (req, res) => {
  try {
    const date = req.query.date || formatLocalDate(new Date());
    const settings = getWaterSettings(req.user);

    let log = await WaterLog.findOne({
      userId: req.user._id,
      date,
    });

    if (log && log.goalCups !== settings.dailyCups) {
      log.goalCups = settings.dailyCups;
      await log.save();
    }

    return successResponse(res, "Water log fetched", buildWaterPayload(log, settings, date));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateDailyWater = async (req, res) => {
  try {
    const date = req.body.date || formatLocalDate(new Date());
    const delta = Number(req.body.delta || 0);
    const settings = getWaterSettings(req.user);

    if (!delta) {
      return errorResponse(res, "Water change is required", 400);
    }

    const log = await WaterLog.findOneAndUpdate(
      {
        userId: req.user._id,
        date,
      },
      {
        $setOnInsert: {
          userId: req.user._id,
          date,
        },
        $set: {
          goalCups: settings.dailyCups,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    log.cups = Math.max((log.cups || 0) + delta, 0);
    await log.save();

    return successResponse(res, "Water log updated", buildWaterPayload(log, settings, date));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
