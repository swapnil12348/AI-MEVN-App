const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get current user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { username, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { username, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's conversations
router.get('/conversations', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('conversations');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

