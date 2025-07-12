import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    country: "",
    state: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const {
      username,
      name,
      email,
      password,
      confirmPassword,
      contact,
      country,
      state,
    } = formData;

    if (
      !username ||
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !contact ||
      !country ||
      !state
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError("Enter valid 10-digit contact number.");
      return;
    }

    setError("");


    console.log("Signup data:", formData);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {[
        { name: "username", type: "text" },
        { name: "name", type: "text" },
        { name: "email", type: "email" },
        { name: "password", type: "password" },
        { name: "confirmPassword", type: "password" },
        { name: "contact", type: "text" },
        { name: "country", type: "text" },
        { name: "state", type: "text" },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          className="w-full mb-3 px-4 py-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Create Account
      </button>
    </div>
  );
}
