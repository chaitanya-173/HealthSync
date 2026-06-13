import { Router } from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email")
      .toLowerCase(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Za-z]/)
      .withMessage("Password must contain at least one letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),
  ],
  validate,
  signup,
);

router.post(
  "/login",
  [
    body("email").trim().notEmpty().withMessage("Email is required"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login,
);

router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

export default router;
