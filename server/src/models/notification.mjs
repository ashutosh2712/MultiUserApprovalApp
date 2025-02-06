import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";
import User from "./user.mjs";
import Task from "./task.mjs";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: { type: DataTypes.UUID, allowNull: false }, // Recipient of the notification
  taskId: { type: DataTypes.UUID, allowNull: false }, // Task related to the notification
  message: { type: DataTypes.TEXT, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }, // Mark if notification is read
});

Notification.belongsTo(User, { foreignKey: "userId" });
Notification.belongsTo(Task, { foreignKey: "taskId" });

export default Notification;
