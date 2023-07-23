//login and registering for  a user is done here

import express  from "express";
const router = express.Router();
import User from '../model/Userschema.js';
import bcrypt from 'bcrypt';

//register
router.post('/register', async (req,res)=>{
  
    try{
         //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newuser = new User({
        username:req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password:hashedPassword,
        institution:req.body.institution,
        desc:req.body.desc,
        profilePicture:req.body.profilePicture,
        
    }) 

        const user=await newuser.save();
        res.status(200).json(user);

    } catch(err){
        res.status(500).json(err);
    }
})



//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json(
        {
        "error":"user not found",
        }
        );
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
       res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });

export default router;
