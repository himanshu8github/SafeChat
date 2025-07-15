import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import useAuthStore from "../store/useAuthStore";

export default function Chat() {
  const { user, isLoggedIn } = useAuthStore();
  const socket = useSocket(user?._id);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!input.trim() || !user?._id || !socket) return;

    const messageObj = {
      senderId: user._id,
      text: input.trim(),
      timestamp: new Date(),
    };

    socket.emit("send_message", messageObj);
    setMessages((prev) => [...prev, messageObj]);
    setInput("");
  };

  if (!user || !isLoggedIn) {
    return (
      <div className="p-4 text-red-500 font-semibold">
        Please log in to start chatting.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 font-bold text-xl text-indigo-700">
        Welcome to SafeChat
      </div>

      <div className="h-[60vh] overflow-y-auto border rounded p-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong>{m.senderId === user._id ? "You" : "Friend"}:</strong>{" "}
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
