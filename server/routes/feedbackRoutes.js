import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { body } from "express-validator";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.post(
  "/",
  protect,
  [
    body("category")
      .optional()
      .isIn(["bug", "idea", "experience", "other"])
      .withMessage("Invalid feedback category"),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Feedback message is required")
      .isLength({ min: 5, max: 1000 })
      .withMessage("Feedback must be 5-1000 characters"),
  ],
  validate,
  submitFeedback,
);

export default router;
