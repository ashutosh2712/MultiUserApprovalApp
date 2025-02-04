import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://user:password@localhost:5432/taskdb",
  {
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
