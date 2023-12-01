import { Router } from "express";
const router = Router();

import { verifyToken } from "../middleware/jwt.js";
import { isManager } from "../middleware/isManager.js";

import {
  addReel,
  getReels,
  addRolls,
} from "../controller/stock.controller.js";

router.post("/reel", verifyToken, isManager, addReel);
router.get("/reel", verifyToken, isManager, getReels);
router.post("/roll/:id", verifyToken, isManager, addRolls);

export default router;
