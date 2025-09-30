import express from 'express';
import fs from "fs";
import path from "path";

const notes = express();

const NOTES_FILE = path.join(process.cwd(), 'notes.json');

function readNotes() {
    const data = fs.readFileSync(NOTES_FILE, 'utf-8');
    return JSON.parse(data);
}


function writeNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

notes.get('/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

notes.post('/notes', (req, res) => {
    const notes = readNotes();
    const {title, content} = req.body;

    if (!title || !content) {
        return res.status(400).json({error: 'Title and content are required'});
    }

    const newNote = {
        id: Date.now(), // simple unique ID
        title, content
    };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json(newNote);
});

notes.delete('/notes/:id', (req, res) => {
    const notes = readNotes();
    const id = parseInt(req.params.id);

    const filteredNotes = notes.filter(note => note.id !== id);

    if (notes.length === filteredNotes.length) {
        return res.status(404).json({error: 'Note not found'});
    }

    writeNotes(filteredNotes);
    res.json({message: 'Note deleted successfully'});
});


export default notes;