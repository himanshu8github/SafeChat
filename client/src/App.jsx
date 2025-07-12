import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useTheme } from "./store/useTheme";

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-all duration-300">
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </div>
  );
}
