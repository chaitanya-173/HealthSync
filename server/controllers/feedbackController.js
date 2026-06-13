import FeedbackModel from "../models/FeedbackModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const submitFeedback = async (req, res) => {
  try {
    const { category = "experience", message } = req.body;

    const feedback = await FeedbackModel.create({
      user: req.user._id,
      category,
      message,
    });

    return successResponse(res, "Feedback submitted successfully", feedback);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};