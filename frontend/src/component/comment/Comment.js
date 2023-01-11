import React, { useContext,useRef} from 'react';
import './Comment.css';
import {Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentBox from './CommentBox';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
 
import {
  ArrowForward,
} from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';
const Comment = () => {


  
const audio= new Audio();
audio.src = "/music/comment.wav";
  const {user}=useContext(AuthContext);
  const {notesid}=useParams();
  const [commenttext,setcommenttext] =useState();
  const [allcomment,setallcomment] =useState([]);
  const [isfetchcomment,setisfetchcomment] =useState(false);
  const takedown=useRef(); 

  useEffect(()=>{
    const fetchComment =async(req,res)=>{
     try{
        const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/comments/" + notesid)
        setallcomment(res.data)
        setisfetchcomment(true);
     }
     catch(err){
       console.log(err);
     }
    }
    fetchComment();
  },[notesid])

  useEffect(()=>{
    takedown.current?.scrollIntoView({behavior:"smooth"})
  },[allcomment,notesid]) 

  const CommentHandler = async(e)=>{
        e.preventDefault();
        audio.play();
        try {
           const res= await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/comments/" + notesid, { 
                userId:user._id,
                text:commenttext,
             });
            setallcomment([...allcomment,res.data])
            setcommenttext("")
          } catch (err) {}
          console.log("ajjkk")
      }
     
    
  return <>
  <div className='comment-container'>
     
        <div className='comment-info-container'>
        {
          isfetchcomment?allcomment.map((x,i)=>{
            return(
              <div ref={takedown}>
                <CommentBox userinfo={x.userId} text={x.text} key={i} /> 
                </div>
            )
          })
          :<Spinner animation="grow"  style={{width:"20vw",height:"10vw",marginTop:"30vh",color:"yellowgreen",marginLeft:"10vw"}}/>
        }
       </div>
        <form className="comment-form" onSubmit={CommentHandler}>
                   <input
                        className="comment-input"
                        type="text"
                       placeholder="Add a comment"
                       onChange={(e)=>setcommenttext(e.target.value)}
                       value={commenttext}
                       required
                    ></input>
                     <label for="submit-comment-form"
                      className="comment-submit-icon-form"> 
                      < ArrowForward
                   className="icon-arrow-comment"
                    />
                    </label>
                    <input type="submit" id="submit-comment-form"></input>
                   </form>
         </div>
         </>;
};

export default Comment;
