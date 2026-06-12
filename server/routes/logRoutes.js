import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  logEntry,
  updateLog,
  updateMacros,
  updateDateTime,
  deleteLog,
  getWeeklyLogs,
  getLogsByDay,
  getSummary,
  getStreak,
} from "../controllers/logController.js";

const router = Router();

router.post("/", protect, logEntry);
router.put("/:id", protect, updateLog);
router.put("/:id/manual", protect, updateMacros);
router.put("/:id/time", protect, updateDateTime);
router.delete("/:id", protect, deleteLog);

router.get("/weekly-logs", protect, getWeeklyLogs);
router.get("/day", protect, getLogsByDay);
router.get("/summary", protect, getSummary);
router.get("/streak", protect, getStreak);

export default router;
