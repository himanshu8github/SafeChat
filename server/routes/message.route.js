import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/history", authMiddleware, getMessages);

export default router;