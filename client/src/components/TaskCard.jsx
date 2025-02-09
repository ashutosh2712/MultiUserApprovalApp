import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  if (!task) return <p>Loading...</p>;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <Link
        to={`/task/${task.id}`}
        className="text-xl font-bold text-blue-400 hover:underline"
      >
        {task.title}
      </Link>

      <p className="text-gray-400">{task.description}</p>
      <p className="text-gray-300">Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;
