import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Project from "../models/Project.js";

const project = express.Router();

project.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.userId });
        res.json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


project.get("/all", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


project.post("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;
        console.log(title);
        if (!title) return res.status(400).json({ success: false, error: "Title is required" });

        const project = await Project.create({ title, user: req.userId });
        console.log(project);
        res.status(201).json({ success: true, project });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

project.put("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ project });
    } catch (err) {
        res.status(500).json({ message: "Error updating project", error: err.message });
    }
});

project.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!project) return res.status(404).json({ success: false, error: "Project not found" });
        res.json({ success: true, message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default project;
