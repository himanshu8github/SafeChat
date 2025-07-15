import express from 'express';
import { sendMessage, getMessages } from '../controllers/chat.controller.js';

const router = express.Router();


router.post('/send', sendMessage);
router.get('/history', getMessages);


router.get('/', (req, res) => {
  res.json({ message: 'Chat route is working' });
});

export default router;
