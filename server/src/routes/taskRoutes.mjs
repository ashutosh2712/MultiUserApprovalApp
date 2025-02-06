import express from "express";
import {
  createTask,
  approveTask,
  addComment,
  getNotifications,
} from "../controllers/taskController.mjs";
import authenticatedUser from "../middleware/authenticatedUser.mjs";

const router = express.Router();

router.post("/create", authenticatedUser, createTask);
router.post("/approve", authenticatedUser, approveTask);
router.post("/comment", authenticatedUser, addComment);
router.get("/notifications", authenticatedUser, getNotifications);

export default router;
