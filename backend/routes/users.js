import express  from "express";
const router = express.Router();
import bcrypt from 'bcrypt'
import User from '../model/Userschema.js'
import Note from '../model/Userschema.js'


//update user
router.put("/:id", async (req, res) => {
    
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    
  });


  //delete
  router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

  //get a user
  router.get("/:id", async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
        //we do not need unnecessaary information about user like password updated at
        //user._doc is basically all object
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});


//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

 

//get all user
router.get("/", async (req, res) => {
  try {
    const data =await User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

//find a user by some keyword
router.get("/findusers/:keyword", async (req, res) => {
  
  try {
    const data =await User.find({$or:[{'username' : new RegExp(req.params.keyword, 'i')},{'firstname' : new RegExp(req.params.keyword, 'i')}]});
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

//GET all featured authors
router.get("/getauthors", async (req, res) => {
  try {
    const data =await User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});


//GET USER STATS

router.get("/stats/authors",  async (req, res) => {
  try {
    const data = await User.aggregate(
      [
          { "$project": {
              "username":1,
              "profilePicture":1,
              "followers_length":{ "$size": "$followers" },
              "institution":1,
              "notes_length": { "$size": "$notes" }
          }},
          { "$sort": { "notes_length": -1 } },
          { "$limit": 10 }
      ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});



export default router;

