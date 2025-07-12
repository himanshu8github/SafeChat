import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import useAuthStore from "../store/useAuthStore";

export default function Chat() {
  const { user } = useAuthStore();
  const socket = useSocket(user?._id);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const sendMessage = (msg) => {
    const messageObj = {
      senderId: user._id,
      text: msg,
      timestamp: new Date(),
    };

    socket.emit("send_message", messageObj);
    setMessages((prev) => [...prev, messageObj]);
  };

  return (
    <div className="p-4">
      {messages.map((m, i) => (
        <div key={i} className="mb-2">
          <strong>{m.senderId === user._id ? "You" : "Friend"}:</strong> {m.text}
        </div>
      ))}

      <input
        type="text"
        className="border px-4 py-2 rounded w-full mt-4"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage(e.target.value);
        }}
      />
    </div>
  );
}
