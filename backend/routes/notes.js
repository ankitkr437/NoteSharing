import express from 'express';
const router =express.Router();
import User from '../model/Userschema.js';
import Note from  '../model/Noteschema.js';

//create a post for selling a note

router.post("/", async (req, res) => {
  const newNote = new Note(req.body);
  try {
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a note
// here params id is of one post id created by itself mongo db

router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.userId === req.body.userId) {
      await note.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    // if (note.userId === req.body.userId) {
      await note.deleteOne();
      res.status(200).json("the post has been deleted");
    // } else {
    //   res.status(403).json("you can delete only your post");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

 
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note.likes.includes(req.body.userId)) {
      await note.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The note has been liked");
    } else {
      await note.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The note has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//buy a notes

router.put("/:id/buy", async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note.buy.includes(req.body.userId)) {
        await note.updateOne({ $push: { buy: req.body.userId} });
        res.status(200).json("The note has been selled");
      } else {
        res.status(200).json("You already has been buy this note ");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
//get a post
//here id is notes id
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
// here params userId is a current user of which we have to find all post and also to  find its followings post this is what we create a timeline
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userNotes = await Note.find({ userId: currentUser._id });
      const followingsNotes = await Promise.all(
        currentUser.followings.map((followingsId) => {
          return Note.find({ userId: followingsId });
        })
      );
      res.status(200).json(userNotes.concat(...followingsNotes));
    } catch (err) {
      res.status(500).json(err);
    }
  });
//get user's all posts

router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await Note.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all featured authors
router.get("/", async (req, res) => {
  try {
      const notes= await Note.find();
      res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find a note by some name
router.get("/findnotes/:keyword", async (req, res) => {
  
  try {
    const data =await Note.find({$or:[{'desc' : new RegExp(req.params.keyword, 'i')},{'notename' : new RegExp(req.params.keyword, 'i')}]});
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;



 