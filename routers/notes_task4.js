import express from 'express';
import Note from "../models/Note.js";




const notes_task4 = express();



notes_task4.post('/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

notes_task4.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().populate('user', 'name email'); // fetch user info
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

notes_task4.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

notes_task4.get('/users/:userId/notes', async (req, res) => {
    try {
        const notes = await Note.find({ user: req.params.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default notes_task4;