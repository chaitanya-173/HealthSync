import groq from "../config/groq.js";
import { successResponse, errorResponse } from "../utils/response.js";
import Log from "../models/LogModel.js";
import WaterLog from "../models/WaterLogModel.js";

const buildPrompt = (text) => `
You are a nutrition and fitness assistant.

User input: "${text}"

Tasks:
1. Identify food items and physical activities.
2. If input is NOT related to food or activity, return:
{
  "is_valid": false
}

3. If valid, return STRICT JSON:
{
  "is_valid": true,
  "items": [
    {
      "name": "",
      "type": "food" or "activity",
      "quantity": "",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
    }
  ],
  "total": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },
  "analysis": "short health insight"
}

Rules:
- Each item MUST have its own type
- Food and activity can appear together in the same input
- Activity items should have protein/carbs/fat = 0 unless explicitly known
- Total values should be simple sum of all item values
- Only JSON, no extra text
- Do not wrap in markdown
- Use realistic Indian food values
- If unsure, make best estimate
`;

const parseLocalDate = (value = "") => {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return new Date(value);
  }

  return new Date(year, month - 1, day);
};

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const logEntry = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return errorResponse(res, "Text is required", 400);
    }

    const prompt = buildPrompt(text);

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
    });

    const textResponse = response.choices?.[0]?.message?.content || "";

    const cleanText = textResponse.replace(/```json|```/g, "").trim();

    let data;

    try {
      data = JSON.parse(cleanText);
    } catch (err) {
      return errorResponse(res, "AI response parsing failed", 500);
    }

    if (!data.is_valid) {
      return errorResponse(res, "Please enter valid food or activity", 400);
    }

    const log = await Log.create({
      userId: req.user._id,
      text,
      result: data,
    });

    return successResponse(res, "Log saved", log);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateLog = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return errorResponse(res, "Text is required", 400);
    }

    const log = await Log.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return errorResponse(res, "Log not found", 404);
    }

    const prompt = buildPrompt(text);

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt.replace("${text}", text) }],
    });

    const textResponse = response.choices?.[0]?.message?.content || "";
    const cleanText = textResponse.replace(/```json|```/g, "").trim();

    let data;

    try {
      data = JSON.parse(cleanText);
    } catch (err) {
      return errorResponse(res, "AI response parsing failed", 500);
    }

    if (!data.is_valid) {
      return errorResponse(res, "Invalid input", 400);
    }

    // update log
    log.text = text;
    log.result = data;

    await log.save();

    return successResponse(res, "Log updated", log);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateMacros = async (req, res) => {
  try {
    const { calories, protein, carbs, fat } = req.body;

    const log = await Log.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return errorResponse(res, "Log not found", 404);
    }

    // update only totals
    log.result.total.calories = calories ?? log.result.total.calories;
    log.result.total.protein = protein ?? log.result.total.protein;
    log.result.total.carbs = carbs ?? log.result.total.carbs;
    log.result.total.fat = fat ?? log.result.total.fat;

    log.markModified("result");
    await log.save();

    return successResponse(res, "Macros updated", log);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateDateTime = async (req, res) => {
  try {
    const { date } = req.body; // ISO format expected

    if (!date) {
      return errorResponse(res, "Date is required", 400);
    }

    const log = await Log.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return errorResponse(res, "Log not found", 404);
    }

    // update createdAt
    log.createdAt = new Date(date);

    await log.save();

    return successResponse(res, "Date & time updated", log);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteLog = async (req, res) => {
  try {
    const log = await Log.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return errorResponse(res, "Log not found", 404);
    }

    return successResponse(res, "Log deleted");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getWeeklyLogs = async (req, res) => {
  try {
    const today = new Date();
    const last7Days = new Date();

    last7Days.setDate(today.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    const logs = await Log.find({
      userId: req.user._id,
      createdAt: { $gte: last7Days },
    }).sort({ createdAt: 1 });

    const waterLogs = await WaterLog.find({
      userId: req.user._id,
      date: {
        $gte: formatLocalDate(last7Days),
        $lte: formatLocalDate(today),
      },
    });

    const grouped = {};

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const key = formatLocalDate(d);

      grouped[key] = {
        date: key,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        meals: 0,
        waterCups: 0,
        waterGoalCups: req.user.nutritionGoals?.waterCups || 10,
        logs: [],
      };
    }

    logs.forEach((log) => {
      const key = formatLocalDate(new Date(log.createdAt));

      if (!grouped[key]) return;

      const total = log.result?.total;

      if (!total) return;

      const logType =
        log.result?.type || log.result?.items?.[0]?.type || "food";

      if (logType === "activity") {
        grouped[key].calories -= total.calories || 0;
      } else {
        grouped[key].calories += total.calories || 0;
        grouped[key].protein += total.protein || 0;
        grouped[key].carbs += total.carbs || 0;
        grouped[key].fat += total.fat || 0;
      }

      grouped[key].meals += 1;
      grouped[key].logs.push(log);
    });

    waterLogs.forEach((log) => {
      if (grouped[log.date]) {
        grouped[log.date].waterCups = log.cups || 0;
        grouped[log.date].waterGoalCups =
          log.goalCups ||
          req.user.waterSettings?.dailyCups ||
          req.user.nutritionGoals?.waterCups ||
          10;
      }
    });

    const days = Object.values(grouped).map((day) => ({
      ...day,
      calories: Math.round(day.calories),
      protein: Math.round(day.protein),
      carbs: Math.round(day.carbs),
      fat: Math.round(day.fat),
    }));

    return successResponse(res, "Weekly logs fetched", days);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getStreak = async (req, res) => {
  try {
    const today = new Date();
    const lookbackStart = new Date(today);
    lookbackStart.setDate(today.getDate() - 365);
    lookbackStart.setHours(0, 0, 0, 0);

    const logs = await Log.find({
      userId: req.user._id,
      createdAt: { $gte: lookbackStart },
    }).select("createdAt");

    const loggedDates = new Set(
      logs.map((log) => formatLocalDate(new Date(log.createdAt))),
    );

    let streak = 0;
    const cursor = new Date(today);
    cursor.setHours(0, 0, 0, 0);

    while (loggedDates.has(formatLocalDate(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return successResponse(res, "Streak fetched", { streak });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getLogsByDay = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return errorResponse(res, "Date is required", 400);
    }

    const start = parseLocalDate(date);
    start.setHours(0, 0, 0, 0);

    const end = parseLocalDate(date);
    end.setHours(23, 59, 59, 999);

    const logs = await Log.find({
      userId: req.user._id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: -1 });

    return successResponse(res, "Logs fetched for day", logs);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getLoggedDates = async (req, res) => {
  try {
    const { year, month } = req.query;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const logs = await Log.find({
      userId: req.user._id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).select("createdAt");

    const dates = [
      ...new Set(
        logs.map((log) => formatLocalDate(new Date(log.createdAt)))
      ),
    ];

    return successResponse(res, "Logged dates fetched", dates);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getSummary = async (req, res) => {
  try {
    const { date } = req.query;

    const targetDate = date ? parseLocalDate(date) : new Date();

    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    const logs = await Log.find({
      userId: req.user._id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    logs.forEach((log) => {
      const total = log.result?.total;

      if (!total) return;

      const logType =
        log.result?.type || log.result?.items?.[0]?.type || "food";

      if (logType === "activity") {
        totalCalories -= total.calories || 0;
      } else {
        totalCalories += total.calories || 0;
        totalProtein += total.protein || 0;
        totalCarbs += total.carbs || 0;
        totalFat += total.fat || 0;
      }
    });

    return successResponse(res, "Summary fetched", {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      count: logs.length,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
