import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import path from "path";

// Manually specify the path of .env
dotenv.config({ path: path.resolve("../.env") });

// const sequelize = new Sequelize(
//   "multitask_db",
//   "postgres",
//   "TaskPostgres@123",
//   {
//     host: "db", // Use the service name defined in docker-compose
//     dialect: "postgres",
//     port: 5432,
//     logging: false,
//   }
// );

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  String(process.env.POSTRES_PASSWORD),
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 8016,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
