import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000"; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User Authentication APIs
export const loginUser = (data) => api.post("/api/users/login", data);
export const signupUser = (data) => api.post("/api/users/signup", data);

// Task APIs
export const fetchTasks = (token) =>
  api.get("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createTask = (data, token) =>
  api.post("/api/tasks/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveTask = (taskId, token, comment) =>
  api.post(
    "/api/tasks/approve",
    { taskId, comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const fetchTaskDetails = (taskId, token) =>
  api.get(`/api/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addComment = (taskId, comment, token) =>
  api.post(
    "/api/tasks/comment",
    { taskId, comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const fetchNotifications = (token) =>
  api.get("/api/tasks/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUsers = () => api.get("/api/users");
