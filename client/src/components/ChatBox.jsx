import { useState } from "react";
import MessageInput from "./MessageInput";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, from: "friend", text: "Hello!" },
    { id: 2, from: "me", text: "Hi, how are you?" },
  ]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { id: Date.now(), from: "me", text }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-indigo-600 text-white text-lg font-semibold">SafeChat</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.from === "me"
                ? "bg-indigo-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
