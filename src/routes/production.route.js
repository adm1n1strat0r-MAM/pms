import { Router } from "express";
const router = Router();

import { verifyToken } from "../middleware/jwt.js";
import { isManager } from "../middleware/isManager.js";

import {
  addCarrugation,
  getAllCarrugationsInfo,
  getCarrugationInfo,
} from "../controller/production.controller.js";

router.post("/carrugation", verifyToken, isManager, addCarrugation);
router.get("/carrugations", verifyToken, isManager, getAllCarrugationsInfo);
router.get("/carrugations/:id", verifyToken, isManager, getCarrugationInfo);

export default router;
