const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");


//fetch all notes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send("Internal server error");
  }
});


//Add new note
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).send("Internal server error");
    }
  }
);

//update a note
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorised");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send("Internal server error");
  }
});


//delete a note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not authorised");
      }
  
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({"success":"Note has been deleted"});
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).send("Internal server error");
    }
  });
  

module.exports = router;
