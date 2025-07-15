import { create } from "zustand";
import socket from "../utils/socket";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("user"),

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    socket.emit("user-join", userData._id);
    set({ user: userData, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
