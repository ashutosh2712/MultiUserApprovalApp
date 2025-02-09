import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Task Approval App</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/create-task" className="hover:text-blue-400">
          Create Task
        </Link>
        <Link to="/login" className="hover:text-blue-400">
          Logout
        </Link>
      </div>
    </nav>
  );
}
