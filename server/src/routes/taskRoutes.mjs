import express from "express";
import {
  createTask,
  approveTask,
  addComment,
  getNotifications,
  getAllTasks,
  getTaskById,
} from "../controllers/taskController.mjs";
import authenticatedUser from "../middleware/authenticatedUser.mjs";

const router = express.Router();

router.get("/", authenticatedUser, getAllTasks);
router.get("/:taskId", authenticatedUser, getTaskById);

router.post("/create", authenticatedUser, createTask);
router.post("/approve", authenticatedUser, approveTask);
router.post("/comment", authenticatedUser, addComment);

router.get("/notifications", authenticatedUser, getNotifications);

export default router;
