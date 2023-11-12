import { Router } from "express";
const router = Router();
import {
  login,
  logout,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

router.post("/login", login);
router.get("/logout", verifyToken, logout);

export default router;
