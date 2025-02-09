import { useState } from "react";
import { createTask } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token:", token);

    try {
      await createTask({ title, description }, token);
      alert("Task created successfully!");
      navigate("/dashboard"); // Redirect to Dashboard after creation
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={handleCreateTask}
        className="bg-gray-900 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>

        <input
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Task Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 mb-4 rounded bg-gray-700"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
