import { create } from "zustand";
import socket from '../utils/socket';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));


export const useLogin = async (user) => {
  socket.emit('user-join', user.id); 
};

export default useAuthStore;
