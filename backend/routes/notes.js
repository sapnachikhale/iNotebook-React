const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../Models/Note')
const { body, validationResult } = require('express-validator');

//ROUTE 1:Get all the notes using:GET api/notes/getuser: login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.json(notes);

   } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal server error");
   }
})

//ROUTE 2:Add new notes using:POST api/notes/addnote: login required

router.post('/addnote', fetchuser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
//if there are error return bad request and error

   try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()
      res.json(savedNote);

   } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal server error");
   }
})

//ROUTE 3:update an existing note using:PUT api/notes/updatenote: login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {

      //create a newnote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      //find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") };

      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed")
      }
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
   } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal server error");
   }
})

//ROUTE 4:delete an existing note using:DELETE api/notes/deletenote: login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      //find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") };

      //allow deletion only if user owns this notes
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed")
      }
      note = await Note.findByIdAndDelete(req.params.id, { new: true })
      res.json({ "Success": "Note has been deleted", note: note });
   } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal server error");
   }
})
module.exports = router