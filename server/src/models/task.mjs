import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";
import User from "./user.mjs";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("pending", "approved"),
    defaultValue: "pending",
  },
  createdBy: { type: DataTypes.UUID, allowNull: false },
});

Task.belongsTo(User, { foreignKey: "createdBy" });

export default Task;
