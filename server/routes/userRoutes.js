import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getGoals,
  updateGoals,
} from "../controllers/userController.js";

const router = Router();

router.get("/goals", protect, getGoals);
router.put("/goals", protect, updateGoals);

export default router;