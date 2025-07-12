import { Outlet } from "react-router-dom";
import { useTheme } from "../store/useTheme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-all duration-300 flex flex-col">
        <Navbar />

        {/* Page content will render here */}
        <div className="flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}
