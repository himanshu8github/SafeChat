import { useEffect } from "react";
import { socket } from "../services/socket";

export default function useSocket(userId) {
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.emit("join", userId); // Join personal room

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socket;
}
