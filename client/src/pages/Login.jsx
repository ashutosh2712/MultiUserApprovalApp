import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
