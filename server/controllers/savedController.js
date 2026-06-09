import { successResponse, errorResponse } from "../utils/response.js";
import SavedEntry from "../models/SavedEntryModel.js";
import Log from "../models/LogModel.js";

export const saveEntry = async (req, res) => {
  try {
    const log = await Log.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return errorResponse(res, "Log not found", 404);
    }

    const existing = await SavedEntry.findOne({
      userId: req.user._id,
      text: log.text,
    });

    if (existing) {
      return successResponse(res, "Entry already saved", existing);
    }

    const saved = await SavedEntry.create({
      userId: req.user._id,
      title: log.text, // todo : (simple for now)
      text: log.text,
      result: log.result,
    });

    return successResponse(res, "Saved entry created", saved);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getSavedEntries = async (req, res) => {
  try {
    const entries = await SavedEntry.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return successResponse(res, "Saved entries fetched", entries);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateSavedEntry = async (req, res) => {
  try {
    const { text, title } = req.body;

    if (!text && !title) {
      return errorResponse(res, "Text or title is required", 400);
    }

    const saved = await SavedEntry.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!saved) {
      return errorResponse(res, "Saved entry not found", 404);
    }

    if (text) saved.text = text;
    if (title || text) saved.title = title || text;

    await saved.save();

    return successResponse(res, "Saved entry updated", saved);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateSavedMacros = async (req, res) => {
  try {
    const { calories, protein, carbs, fat } = req.body;

    const saved = await SavedEntry.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!saved) {
      return errorResponse(res, "Saved entry not found", 404);
    }

    saved.result.total = {
      ...(saved.result.total || {}),
      calories: calories ?? saved.result.total?.calories ?? 0,
      protein: protein ?? saved.result.total?.protein ?? 0,
      carbs: carbs ?? saved.result.total?.carbs ?? 0,
      fat: fat ?? saved.result.total?.fat ?? 0,
    };

    saved.markModified("result");
    await saved.save();

    return successResponse(res, "Saved macros updated", saved);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteSavedEntry = async (req, res) => {
  try {
    const saved = await SavedEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!saved) {
      return errorResponse(res, "Saved entry not found", 404);
    }

    return successResponse(res, "Saved entry removed");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const logFromSaved = async (req, res) => {
  try {
    const saved = await SavedEntry.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!saved) {
      return errorResponse(res, "Saved entry not found", 404);
    }

    const log = await Log.create({
      userId: req.user._id,
      text: saved.text,
      result: saved.result,
    });

    return successResponse(res, "Log created from saved entry", log);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
