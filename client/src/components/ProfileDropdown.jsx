import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setOpen(false);
    navigate("/profile");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center focus:outline-none"
      >
        P
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg p-2 z-50">
          <button
            onClick={handleProfileClick}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
