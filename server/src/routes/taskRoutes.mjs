import express from "express";
import { createTask, approveTask } from "../controllers/taskController.mjs";
import authMiddleware from "../middleware/authenticatedUser.mjs";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.post("/approve", authMiddleware, approveTask);

export default router;
