import express from "express";
import { createTask, approveTask } from "../controllers/taskController.mjs";
import authenticatedUser from "../middleware/authenticatedUser.mjs";

const router = express.Router();

router.post("/create", authenticatedUser, createTask);
router.post("/approve", authenticatedUser, approveTask);

export default router;
