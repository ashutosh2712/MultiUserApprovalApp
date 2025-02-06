import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";
import sequelize from "./models/db.mjs";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Set up the server port
const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
