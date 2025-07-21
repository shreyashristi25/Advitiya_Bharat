// DEPRECATED: This file is not used. All backend logic is in server.js. Do not use this file.
/*
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashed });
        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});
*/

module.exports = router;
