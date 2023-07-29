const fetchuser = require("./middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

express = require("express");
const router = express.Router();

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err.message);
  }

});
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err.message);
    }
  }
);

router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if(title){
        newNote.title = title
      }
      if(description){
        newNote.description = description
      }
      if(tag){
        newNote.tag = tag
      }
      let note = await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Not found"); 
      }
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
      res.json(note);

    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err.message);
    }
  }
);

router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      let note = await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Not found"); 
      }
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({msg: "Note deleted successfully"});

    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err.message);
    }
  }
);

module.exports = router;
