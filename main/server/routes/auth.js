const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
    
        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    // Login Route
    router.post('/login', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        // Find user
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    module.exports = router;