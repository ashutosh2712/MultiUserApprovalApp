import { useEffect, useState } from "react";
import { createTask, fetchUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]); // ✅ Store list of users
  const [approvers, setApprovers] = useState([]); // ✅ Store selected approvers
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await fetchUsers(); // ✅ API call to fetch users
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await createTask({ title, description, approvers }, token);
      alert("Task created successfully!");
      navigate("/dashboard");
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
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* ✅ Dropdown to Select Approvers */}
        <label className="block mb-2">
          Select Approvers (3 Users Required):
        </label>
        <select
          multiple
          className="w-full p-2 mb-4 rounded bg-gray-700"
          onChange={(e) => {
            const selectedUsers = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );
            if (selectedUsers.length > 3) {
              alert("You can select only up to 3 approvers.");
              return;
            }
            setApprovers(selectedUsers);
          }}
        >
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

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
