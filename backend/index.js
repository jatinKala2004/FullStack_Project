const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET all notes
app.get("/api/notes", (req, res) => {
  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading notes." });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST a new note
app.post("/api/notes", (req, res) => {
  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading notes." });
    }

    const notes = JSON.parse(data);

    const newNote = {
      id: Date.now(),
      title: req.body.title,
      content: req.body.content,
    };

    notes.push(newNote);

    fs.writeFile("notes.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving note." });
      }

      res.status(201).json(newNote);
    });
  });
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("notes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading notes." });
    }

    const notes = JSON.parse(data);

    const noteId = Number(req.params.id);

    const updatedNotes = notes.filter(note => note.id !== noteId);

    fs.writeFile("notes.json", JSON.stringify(updatedNotes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting note." });
      }

      res.json({ message: "Note deleted successfully." });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});