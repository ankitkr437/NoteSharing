import React, {useRef} from 'react';
import './Comment.css';
import {useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentBox from './CommentBox';
import {publicRequest} from '../../requestMethods'
import Loader from '../../loader/Loader';
import {useSelector} from 'react-redux'
import {
  ArrowForward,
} from "@material-ui/icons";
import Navbar from '../Navbar';
const Comment = () => {

  const {currentUser:user}=useSelector((state)=>state.user)
  const {notesid}=useParams();
  const [commenttext,setcommenttext] =useState();
  const [allcomment,setallcomment] =useState([]);
  const [isfetchcomment,setisfetchcomment] =useState(false);
  const takedown=useRef(); 

  useEffect(()=>{
    const fetchComment =async(req,res)=>{
     try{
        const res = await publicRequest.get("comments/" + notesid)
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
        try {
           const res= await publicRequest.post("comments/" + notesid, { 
                userId:user._id,
                text:commenttext,
             });
            setallcomment([...allcomment,res.data])
            setcommenttext("")
          } catch (err) {console.log(err)}
      }
     
    
  return <>
  <Navbar />
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
          :<Loader />
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
