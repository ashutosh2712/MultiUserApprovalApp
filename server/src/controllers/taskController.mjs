import Task from "../models/task.mjs";
import Approval from "../models/approval.mjs";
import User from "../models/user.mjs";
import Comment from "../models/comment.mjs";
import {
  sendApprovalEmail,
  sendApprovingEmail,
} from "../utils/sendApprovalEmail.mjs";
import Notification from "../models/notification.mjs";
import { io } from "../index.mjs";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "creator", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    // console.log("taskId:", taskId);
    const task = await Task.findByPk(taskId, {
      include: [
        { model: User, as: "creator", attributes: ["id", "name", "email"] },
        {
          model: Approval,
          as: "approvals",
          include: [
            { model: User, as: "approver", attributes: ["id", "name"] },
          ], // ✅ Ensure correct alias
        },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "commenter", attributes: ["id", "name"] },
          ],
        },
      ],
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // console.log("Task API Response:", JSON.stringify(task, null, 2));
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, approvers } = req.body;
    // console.log("req.body:", req.body);
    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    if (approvers.length > 0) {
      approvers.forEach(async (email) => {
        await sendApprovingEmail(email, task.title);
      });
      console.log(`✅ Email notifications sent to: ${approvers.join(", ")}`);
    }

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.log("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
};

export const approveTask = async (req, res) => {
  try {
    const { taskId, comment } = req.body;
    const userId = req.user.id;

    // Check if the task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user has already approved
    const existingApproval = await Approval.findOne({
      where: { taskId, approvedBy: userId },
    });
    if (existingApproval) {
      return res
        .status(400)
        .json({ message: "You have already approved this task." });
    }

    // Record the approval
    await Approval.create({ taskId, approvedBy: userId, comment });

    // Notify the task creator that someone signed off
    const notification = await Notification.create({
      userId: task.createdBy,
      taskId,
      message: `User ${req.user.name} approved your task: "${task.title}".`,
    });

    // Send real-time WebSocket notification to the task creator
    io.emit(`notify-${task.createdBy}`, notification); //

    console.log(
      ` Sent notification to notify-${task.createdBy}:`,
      notification
    );

    // Count the number of approvals
    const approvalsCount = await Approval.count({ where: { taskId } });

    // If 3 approvals are reached, update status and notify all
    if (approvalsCount >= 3) {
      await Task.update({ status: "approved" }, { where: { id: taskId } });

      // Fetch all users involved (task creator + approvers)
      const taskCreator = await User.findByPk(task.createdBy);
      const approvers = await Approval.findAll({
        where: { taskId },
        include: [{ model: User, as: "approver" }], // Use the alias
      });

      // Notify all parties via email
      const emailRecipients = [
        taskCreator.email,
        ...approvers.map((a) => a.approver.email), // Use "approver" alias
      ];

      await sendApprovalEmail(emailRecipients, task.title);

      res
        .status(200)
        .json({ message: "Task fully approved and all parties notified!" });
    } else {
      res.status(200).json({ message: "Approval recorded." });
    }
  } catch (error) {
    console.error("Error approving task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { taskId, comment } = req.body;

    if (!taskId || !comment) {
      return res
        .status(400)
        .json({ message: "Task ID and comment are required" });
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Create a new comment
    const newComment = await Comment.create({
      taskId,
      userId: req.user.id,
      comment,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
