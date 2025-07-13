import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, originalText, translatedText } = req.body;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      originalText,
      translatedText,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get messages",
      error: error.message,
    });
  }
};
