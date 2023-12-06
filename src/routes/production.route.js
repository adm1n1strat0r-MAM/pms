import { Router } from "express";
const router = Router();

import { verifyToken } from "../middleware/jwt.js";
import { isManager } from "../middleware/isManager.js";

import {
  addCorrugation,
  getAllCorrugationsInfo,
  getCorrugationInfo,
  addPastingTemp
} from "../controller/production.controller.js";

router.post("/corrugation", verifyToken, isManager, addCorrugation);
router.get("/corrugations", verifyToken, isManager, getAllCorrugationsInfo);
router.get("/corrugations/:id", verifyToken, isManager, getCorrugationInfo);
router.post("/templates/pasting", verifyToken, isManager, addPastingTemp);

export default router;
