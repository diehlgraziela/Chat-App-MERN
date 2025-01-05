import express from "express";

import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/:id", protectRoute, sendMessage);

export default router;
