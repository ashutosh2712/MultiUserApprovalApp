import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";

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

export default Comment; //  Do not define associations here
