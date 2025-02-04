import Task from "../models/task.mjs";
import Approval from "../models/approval.mjs";
import User from "../models/user.mjs";

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
    const existingApproval = await Approval.findOne({
      where: { taskId, approvedBy: req.user.id },
    });

    if (existingApproval)
      return res.status(400).json({ error: "Already approved" });

    await Approval.create({ taskId, approvedBy: req.user.id, comment });

    const approvals = await Approval.count({ where: { taskId } });

    if (approvals >= 3) {
      await Task.update({ status: "approved" }, { where: { id: taskId } });
      console.log("Notify task creator and approvers about final approval");
    }

    res.json({ message: "Approval recorded" });
  } catch (error) {
    res.status(500).json({ error: "Error approving task" });
  }
};
