import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  saveEntry,
  getSavedEntries,
  logFromSaved,
  updateSavedEntry,
  updateSavedMacros,
  deleteSavedEntry,
} from "../controllers/savedController.js";

const router = Router();

router.get("/", protect, getSavedEntries);
router.post("/use/:id", protect, logFromSaved);
router.put("/:id/manual", protect, updateSavedMacros);
router.put("/:id", protect, updateSavedEntry);
router.delete("/:id", protect, deleteSavedEntry);
router.post("/:id", protect, saveEntry);

export default router;
