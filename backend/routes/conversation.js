import express from 'express';
const router =express.Router();
import Conversation from '../model/Conversation.js';

router.post("/", async (req, res) => {
    if(req.body.senderId===req.body.receiverId){
      res.status(200).json("You can not chat with yourself");
    }
    else{
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const conversation = await Conversation.find({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      });
      if(!conversation.length){
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
      }
      else{
        res.status(200).json(conversation);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  });
  
  //get conversation of a pair
   
  router.get("/:senderId/:senderId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.senderId,req.params.receiverId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get conv of a user
  
  router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });


 

  

export default router ;
  