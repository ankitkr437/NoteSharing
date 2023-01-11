import express from 'express';
const router =express.Router();

import User from '../model/Userschema.js';
import Note from  '../model/Noteschema.js';
import Comment from '../model/Commentschema.js';



//create a comment for  a note
//here id is note id 
router.post("/:id", async (req, res) => {
    const commentinfo={
        userId:req.body.userId,
        noteId:req.params.id,
        text:req.body.text,
    }
    
  const newComment = new Comment(commentinfo);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


//for getting all the comment for a note
//here a  id is noteid
router.get('/:id', async (req,res)=>{

    try{
    const comment =await Comment.find({ noteId: req.params.id });
    res.status(200).json(comment);
    }catch (err) {
        res.status(500).json(err);
      }
})
 
export default router;