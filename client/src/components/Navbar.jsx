import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useAuthStore from "../store/useAuthStore";
import { useTheme } from "../store/useTheme"; // Assuming tu theme toggle ke liye bana raha hai Zustand se

export default function Navbar() {
  const navRef = useRef(null);
  const { isLoggedIn, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`w-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-all duration-300`}
    >
      <Link
        to="/"
        className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
      >
        SafeChat
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-full font-medium transition duration-200 hover:scale-105 hover:ring-2 hover:ring-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800"
        >
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-medium transition duration-200 hover:scale-105 hover:ring-2 hover:ring-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-110 hover:shadow-lg transition duration-300"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600 font-medium transition"
          >
            Logout
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-2 w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-105 transition"
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
