import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { saveEntry, getSavedEntries, logFromSaved } from "../controllers/savedController.js";

const router = Router();

router.get("/", protect, getSavedEntries);        // /api/saved
router.post("/:id", protect, saveEntry);          // /api/saved/:id
router.post("/use/:id", protect, logFromSaved);   // /api/saved/use/:id

export default router;