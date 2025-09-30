import jwt from 'jsonwebtoken';
import express from "express";
import User from "../models/User.js";
import connectDB from "../db.js";


const auth = express.Router();

auth.post('/signup', async (req, res) => {
    try {
        await connectDB(); // connect to MongoDB

        console.log(req.body);
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


auth.post('/login', async (req, res) => {
    await connectDB(); // connect to MongoDB
    const { email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

export default auth;