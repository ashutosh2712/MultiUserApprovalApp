import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // Ensure WebSocket connection works
});

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const token = localStorage.getItem("token");
      const { data } = await fetchTasks(token);
      console.log("task data: ", data);
      setTasks(data);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get logged-in user ID
    if (userId) {
      console.log(`✅ Listening for notifications: notify-${userId}`);

      socket.on(`notify-${userId}`, (notification) => {
        console.log("New notification received:", notification);
        setNotifications((prev) => [notification, ...prev]); // ✅ Store in state
      });
    }
    // socket.on("message", (msg) => {
    //   console.log(" Message received from server:", msg);
    // });

    return () => {
      socket.off(`notify-${userId}`);
      //   socket.off("message");
    };
  }, []);

  //   const sendMessage = () => {
  //     socket.emit("message", message);
  //     console.log("Sent message:", message);
  //     setMessage("");
  //   };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>

      {/* ✅ Test Message Input
      <div className="mb-4">
        <input
          type="text"
          className="p-2 rounded bg-gray-700 text-white w-64"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 p-2 rounded hover:bg-blue-600 text-white"
        >
          Send
        </button>
      </div> */}

      {/* Show Notifications */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-white">Notifications</h3>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <p key={index} className="text-green-400">
              {notification.message}
            </p>
          ))
        ) : (
          <p className="text-gray-400">No new notifications</p>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
