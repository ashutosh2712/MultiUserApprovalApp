import Task from "../models/task.mjs";
import Approval from "../models/approval.mjs";
import User from "../models/user.mjs";
import Comment from "../models/comment.mjs";
import { sendApprovalEmail } from "../utils/sendApprovalEmail.mjs";
import Notification from "../models/notification.mjs";

export const createTask = async (req, res) => {
  try {
    const { title, description, approvers } = req.body;
    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    // Send email notifications to approvers
    console.log(`Notify ${approvers.join(", ")} about task approval`);

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
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
    await Notification.create({
      userId: task.createdBy,
      taskId,
      message: `User ${req.user.name} approved your task: "${task.title}".`,
    });

    // Count the number of approvals
    const approvalsCount = await Approval.count({ where: { taskId } });

    // If 3 approvals are reached, update status and notify all
    if (approvalsCount >= 3) {
      await Task.update({ status: "approved" }, { where: { id: taskId } });

      // Fetch all users involved (task creator + approvers)
      const taskCreator = await User.findByPk(task.createdBy);
      const approvers = await Approval.findAll({
        where: { taskId },
        include: [User],
      });

      // Notify all parties via email
      const emailRecipients = [
        taskCreator.email,
        ...approvers.map((a) => a.User.email),
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
