import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { createAdminIfNotExists } from './config/admin.js';
import socketSetup from './socket/socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());


connectDB();
connectDB().then(() => {
  createAdminIfNotExists();
});


app.use('/api/auth', authRoutes);
app.use('/api/chat', authMiddleware, chatRoutes); 


app.get('/', (req, res) => {
  res.send('SafeChat API Running');
});


const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketSetup(io);

app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('sendMessage', (messageData) => {
   
    socket.broadcast.emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
