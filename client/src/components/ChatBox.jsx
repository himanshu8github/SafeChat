import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import socket from '../utils/socket';
import axios from 'axios';



const currentUserId = 'user1';     
const selectedUserId = 'user2';     

export default function ChatBox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    socket.emit('user-join', currentUserId);


    socket.on('receiveMessage', ({ senderId, message }) => {
      setMessages((prev) => [...prev, { from: senderId, text: message }]);
    });


    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = (text) => {
 
    socket.emit('sendMessage', {
      senderId: currentUserId,
      receiverId: selectedUserId,
      message: text,
    });

   
    setMessages((prev) => [...prev, { from: currentUserId, text }]);
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

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
