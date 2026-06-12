import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getDailyWater,
  getSettings,
  updateDailyWater,
  updateSettings,
} from "../controllers/waterController.js";

const router = Router();

router.get("/settings", protect, getSettings);
router.put("/settings", protect, updateSettings);
router.get("/", protect, getDailyWater);
router.patch("/", protect, updateDailyWater);

export default router;
