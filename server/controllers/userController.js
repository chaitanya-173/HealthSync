import { successResponse, errorResponse } from "../utils/response.js";

export const getGoals = async (req, res) => {
  try {
    return successResponse(
      res,
      "Goals fetched",
      req.user.nutritionGoals,
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateGoals = async (req, res) => {
  try {
    const {
      calories,
      protein,
      carbs,
      fat,
      waterCups,
    } = req.body;

    const goals = req.user.nutritionGoals;

    if (calories !== undefined) goals.calories = calories;
    if (protein !== undefined) goals.protein = protein;
    if (carbs !== undefined) goals.carbs = carbs;
    if (fat !== undefined) goals.fat = fat;
    if (waterCups !== undefined) goals.waterCups = waterCups;

    await req.user.save();

    return successResponse(
      res,
      "Goals updated",
      req.user.nutritionGoals,
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};