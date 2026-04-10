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