import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";
import User from "./user.mjs";
import Task from "./task.mjs";

const Approval = sequelize.define("Approval", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: { type: DataTypes.UUID, allowNull: false },
  approvedBy: { type: DataTypes.UUID, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true },
});

Approval.belongsTo(Task, { foreignKey: "taskId" });
Approval.belongsTo(User, { foreignKey: "approvedBy" });

export default Approval;
