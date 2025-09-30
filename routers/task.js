import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const task = express.Router();

task.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }).populate("project", "title");
        res.json({ success: true, tasks: tasks || [] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

task.post("/", authMiddleware, async (req, res) => {
    try {
        console.log(req.body);
        const { title, project } = req.body;
        if (!title || !project) return res.status(400).json({ success: false, error: "Title and project are required" });

        // Ensure the project belongs to the user
        const existingProject = await Project.findOne({ _id: project, user: req.userId });
        if (!existingProject) return res.status(404).json({ success: false, error: "Project not found" });

        const task = await Task.create({ title, project, user: req.userId });
        res.status(201).json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

task.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!task) return res.status(404).json({ success: false, error: "Task not found" });
        res.json({ success: true, message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

task.patch("/:id/toggle", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.userId });
        if (!task) return res.status(404).json({ success: false, error: "Task not found" });

        task.completed = !task.completed;
        await task.save();
        res.json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default task;