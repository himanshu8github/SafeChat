// client/src/components/ChatBox.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import socket from '../utils/socket';
import axios from 'axios';

export default function ChatBox() {
  const { selectedUserId } = useParams();
  const { user } = useAuthStore();
  const currentUserId = user?._id;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!currentUserId || !selectedUserId) return;

    socket.emit('user-join', currentUserId);

    axios
      .get(`/api/chat/history?user1=${currentUserId}&user2=${selectedUserId}`)
      .then((res) => setMessages(res.data.data))
      .catch((err) => console.error("History error:", err));

    socket.on('receiveMessage', ({ senderId, message }) => {
      setMessages((prev) => [...prev, { from: senderId, text: message }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUserId, selectedUserId]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text) return;

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedUserId,
      originalText: text,
      translatedText: text,
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, { from: currentUserId, text }]);
    setInputText('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/chat/send', messageData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-indigo-600 text-white text-lg font-semibold">SafeChat</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.from === currentUserId
                ? 'bg-indigo-500 text-white self-end ml-auto'
                : 'bg-gray-200 text-black self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex p-4 border-t bg-white">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
