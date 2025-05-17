import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/config.js';

const router = express.Router();

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
};

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Pass plain password, model middleware hashes it automatically
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password: '******' });  // hide password in logs

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password incorrect for user:", email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
