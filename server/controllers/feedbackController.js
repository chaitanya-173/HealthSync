import FeedbackModel from "../models/FeedbackModel.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const submitFeedback = async (req, res) => {
  try {
    const { category = "experience", message } = req.body;

    const feedback = await FeedbackModel.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      category,
      message,
    });

    return successResponse(
      res,
      `Thanks, we've received your feedback and will review it soon !`,
      feedback,
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
