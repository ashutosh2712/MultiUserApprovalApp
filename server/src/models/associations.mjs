import Task from "./task.mjs";
import User from "./user.mjs";
import Approval from "./approval.mjs";
import Comment from "./comment.mjs";

// Define all associations
function setupAssociations() {
  // Task associations
  Task.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
  Task.hasMany(Approval, { foreignKey: "taskId", as: "approvals" });
  Task.hasMany(Comment, { foreignKey: "taskId", as: "comments" });

  Approval.belongsTo(Task, { foreignKey: "taskId" });
  Approval.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });

  Comment.belongsTo(Task, { foreignKey: "taskId" });
  Comment.belongsTo(User, { foreignKey: "userId", as: "commenter" });

  console.log("Associations have been set up!");
}

export default setupAssociations; // Now we only export the function
