import { sendOTPEmail, generateOTP } from '../utils/mailer.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

export const signup = async (req, res) => {
try {
const { username, name, email, password, contact, country, state } = req.body;




const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: 'User already exists' });
}

const otp = generateOTP();
const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  username,
  email,
  password: hashedPassword,
  contact,
  name,
  country,
  state,
  otp,
  otpExpiresAt: otpExpiry,
});

await newUser.save();
await sendOTPEmail(email, otp);

return res.status(200).json({
  success: true,
  message: 'OTP sent to email',
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
const { email, otp } = req.body;


const user = await User.findOne({ email });
if (!user) {
  return res.status(404).json({ message: 'User not found' });
}

if (user.otp !== otp || user.otpExpiresAt < new Date()) {
  return res.status(400).json({ message: 'Invalid or expired OTP' });
}

user.otp = undefined;
user.otpExpiresAt = undefined;
await user.save();

return res.status(200).json({
  message: 'OTP verified successfully',
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
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