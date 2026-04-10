import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { saveEntry, getSavedEntries, logFromSaved } from "../controllers/savedController.js";

const router = Router();

router.get("/", protect, getSavedEntries);        
router.post("/:id", protect, saveEntry);          
router.post("/use/:id", protect, logFromSaved);   

export default router;