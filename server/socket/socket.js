const connectedUsers = new Map();

const socketSetup = (io) => {
  io.on('connection', (socket) => {
    socket.on('user-join', (userId) => {
      connectedUsers.set(userId, socket.id);
    });

    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', {
          senderId,
          message,
        });
      }
    });

    socket.on('typing', ({ to }) => {
      const toSocketId = connectedUsers.get(to);
      if (toSocketId) {
        io.to(toSocketId).emit('userTyping');
      }
    });

    socket.on('disconnect', () => {
      for (const [userId, sockId] of connectedUsers.entries()) {
        if (sockId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });
};

export default socketSetup;
