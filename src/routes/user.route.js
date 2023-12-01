import { Router } from "express";
const router = Router();

import {
  deleteUser,
  getProfile,
  getUser,
  //   updateUser,
  getAllUsers,
  AddUser,
  // blockUser,
} from "../controller/user.controller.js";

import { verifyToken } from "../middleware/jwt.js";
import { isAdmin } from "../middleware/isAdmin.js";

router.post("/", AddUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);
router.get("/profile", verifyToken, getProfile);
router.get("/:id", verifyToken, isAdmin, getUser);
router.get("/gusers", verifyToken, isAdmin, getAllUsers);
// router.patch("/block/:id", verifyToken, isAdmin, blockUser);
// router.patch("/", verifyToken, updateUser);

export default router;
