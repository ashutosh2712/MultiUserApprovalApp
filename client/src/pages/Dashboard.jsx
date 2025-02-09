import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const token = localStorage.getItem("token");
      const { data } = await fetchTasks(token);
      console.log("task data: ", data);
      setTasks(data);
    };
    loadTasks();
  }, []);

  return (
    <div className="p-6">
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
