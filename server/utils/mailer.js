import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS, 
  },
});

export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `SafeChat <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code - SafeChat',
    html: `<h2>Your OTP is <span style="color:blue;">${otp}</span></h2><p>Valid for 5 minutes.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
