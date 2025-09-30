import notes from "./routers/notes.js";
import cors from 'cors';
import express from "express";
import notes_task4 from "./routers/notes_task4.js";
import user from "./routers/user.js";
import {connectDB} from "./db.js";
import dotenv from "dotenv";
import auth from "./routers/auth.js";
import project from "./routers/projects.js";
import task from "./routers/task.js";

const app = express();

dotenv.config();

app.use(cors({
    origin: "https://task-tracker-app-steel.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies
}));

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js shubham app!');
});


app.use('/api', notes);
app.use('/api/user', user);
app.use('/api/auth', auth)
app.use('/api/notes_task4', notes_task4);
app.use('/projects', project);
app.use('/tasks', task);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
