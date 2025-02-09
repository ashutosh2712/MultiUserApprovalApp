import { DataTypes } from "sequelize";
import sequelize from "./db.mjs";

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

export default Approval; // Do not define associations here
