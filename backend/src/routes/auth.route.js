import express from "express";

import {
  login,
  logout,
  createUser,
  updateUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/user", createUser);
router.put("/user", protectRoute, updateUser);
router.get("/user", protectRoute, getCurrentUser);

router.post("/login", login);
router.post("/logout", logout);

export default router;
