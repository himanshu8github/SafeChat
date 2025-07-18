import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios"; 
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuthStore(); 

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      const userData = res.data.user;
      const token = res.data.token;

   
      localStorage.setItem("token", token);

   
      login(userData);

      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Login
      </button>
    </div>
  );
}
