import Message from '../models/Message.js';
import nodemailer from 'nodemailer';

const sendEmailNotification = async (msg) => {
  // Only send email if Gmail credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${msg.name} — Hibah Mehendi Store`,
    html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${msg.name}</p>
      <p><b>Email:</b> ${msg.email}</p>
      <p><b>Mobile:</b> ${msg.mobile || 'Not provided'}</p>
      <p><b>Subject:</b> ${msg.subject}</p>
      <hr/>
      <p><b>Message:</b></p>
      <p>${msg.message}</p>
    `,
  });
};

// Submit contact form (public)
export const submitMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const newMessage = await Message.create({ name, email, mobile, subject, message });

    // Send email notification (non-blocking — don't fail if email fails)
    sendEmailNotification(newMessage).catch((err) =>
      console.error('Email notification failed:', err.message)
    );

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages (admin only)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read (admin only)
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message (admin only)
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
