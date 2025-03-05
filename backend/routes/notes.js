// const express= require('express');
// const router =express.Router();
// const fetchuser= require('../middleware/fetchuser');
// const Note = require('../models/Note');
// const { body, validationResult } = require('express-validator');


// // GET "/api/auth/fetchallnotes". Login required.

// router.get('/fetchallnotes', fetchuser, async (req, res) =>{
// try {
//     const notes =await Note.find({user:req.user.id});
//     res.json(notes)
// }catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error");
// }




  
// })

// //add a new notes using: POST"/api/auth/addnote". login required
// router.post('/addnote',fetchuser ,[
//        body('title','Enter a valid Title').isLength({min:5}),
//         body('description','Enter a Valid Description').isLength({min:5}),],async (req,res)=>{
//             try {
//                 const {title,description,tag}=req.body;
//                 const errors =validationResult(req);
//                 if(!errors.isEmpty()){
//                     return res.status(400).json({errors:errors.array()});
//                 }
//                 const note =new Note({
//                     title,description,tag,user:req.user.id
//                 })
//                 const savedNote =await note.save()
//                 res.json(savedNote)
//                }catch (error) {
//                 console.error(error.message);
//                 res.status(500).send("Internal server error");
//             }
            
            
            
    
  
//  })
 


// module.exports=router;


const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// GET "/api/notes/fetchallnotes" - Fetch all notes of the logged-in user (Login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST "/api/notes/addnote" - Add a new note (Login required)
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 5 characters long').isLength({ min: 5 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag = "" } = req.body; // Default tag to an empty string if not provided
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error("Error adding note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT "/api/notes/updatenote/:id" - Update an existing note (Login required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a new object with updated fields
        const updatedNote = {};
        if (title) updatedNote.title = title;
        if (description) updatedNote.description = description;
        if (tag) updatedNote.tag = tag;

        // Find the note by ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Check if the logged-in user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized action" });
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: updatedNote }, { new: true });
        res.json({ message: "Note updated successfully", note });
    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE "/api/notes/deletenote/:id" - Delete an existing note (Login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note by ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Check if the logged-in user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized action" });
        }

        // Delete the note
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
