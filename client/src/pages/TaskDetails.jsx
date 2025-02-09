import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskDetails, approveTask } from "../services/api";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");

  useEffect(() => {
    const loadTaskDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await fetchTaskDetails(taskId, token);
        setTask(data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    loadTaskDetails();
  }, [taskId]);

  const handleApprove = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to approve a task.");
      return;
    }

    try {
      const { data } = await approveTask(taskId, token, comment);
      setApprovalMessage(data.message);
    } catch (error) {
      console.error("Error approving task:", error);
      alert(error.response?.data?.message || "Failed to approve task.");
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <p className="text-gray-400">{task.description}</p>
      <p className="text-gray-300">Status: {task.status}</p>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Approvals:</h3>
        {task.approvals.length > 0 ? (
          task.approvals.map((approval) => (
            <p key={approval.id} className="text-green-400">
              ✅ Approved by{" "}
              {approval.approver ? approval.approver.name : "Unknown User"}
            </p>
          ))
        ) : (
          <p className="text-gray-400">No approvals yet.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Add Comment and Approve:</h3>
        <textarea
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Add an optional comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleApprove}
          className="bg-green-500 p-2 rounded hover:bg-green-600"
        >
          Approve Task
        </button>
      </div>

      {approvalMessage && (
        <p className="text-green-400 mt-2">{approvalMessage}</p>
      )}
    </div>
  );
};

export default TaskDetails;
