import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";
import sequelize from "./models/db.mjs";
import cors from "cors";
import setupAssociations from "./models/associations.mjs";
import { Server } from "socket.io";
import http from "http";
// Load environment variables
dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //  Allow frontend to connect
    methods: ["GET", "POST"],
    credentials: true, //  Allow credentials (important for CORS)
  },
});

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Set up the server port
const PORT = process.env.PORT || 3000;
const WS_PORT = 4000;

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    setupAssociations();
    console.log("Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}/`);
      // console.log(`WebSocket server running on port ${PORT}`);
    });

    server.listen(WS_PORT, () => {
      console.log(` WebSocket server running on port ${WS_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id);
  // socket.on("message", (data) => {
  //   console.log(" Message received from client:", data);
  //   //
  //   io.emit("message", data);
  // });
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected:", socket.id);
  });
});

export { io };
