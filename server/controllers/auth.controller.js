import { sendOTPEmail, generateOTP } from '../utils/mailer.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

export const signup = async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    // In production, store OTP in DB or Redis with expiry
    return res.status(200).json({
      success: true,
      message: 'OTP sent to email',
      otp, // remove in prod
      userData: {
        username,
        email,
        contact,
        password,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Signup failed',
      error: err.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { username, email, password, contact, otp } = req.body;

    // Replace this with real OTP check (e.g., DB or Redis)
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      contact,
    });

    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        contact: newUser.contact,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'OTP verification failed',
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
