import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";
import User from "./user.mjs";
import Task from "./task.mjs";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: { type: DataTypes.UUID, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
});

Comment.belongsTo(Task, { foreignKey: "taskId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default Comment;
