import React from 'react'
import '../MessageBox/MessageBox.css'
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
const HomeMessageBox = ({conversationspeople,receiverauthor,currentuser}) => {

  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";

      const [currentconversation,setcurrentconversation]=useState(null)
      const [isfetchcurrentconversation,setisfetchcurrentconversation]=useState(false)
      const [isclicked,setisclicked]=useState(false)
    let navigate = useNavigate();
  useEffect(()=>{
    setcurrentconversation(conversationspeople?.find((x) =>
    JSON.stringify(x.members) === JSON.stringify([currentuser._id,receiverauthor._id]) ||
    JSON.stringify(x.members) === JSON.stringify([receiverauthor._id,currentuser._id])
     ))
  },[receiverauthor._id])
  const navigateHandler= async()=>{
    if( currentuser._id === receiverauthor._id){
      alert('You can not chat with yourself')
    }
    else if(currentconversation===undefined){
     const res=await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/conversations",
     {
       senderId:currentuser._id,
       receiverId:receiverauthor._id
     }) 
     setcurrentconversation(res)
    }
     currentconversation!==undefined && navigate(`/message/${currentconversation?._id}`)
  }


  return (
    <>
   {
     
    <div className='MessageBox-1' onClick={navigateHandler}>
          <div className='MessageBox-1-imgbox'>
               
        <img src={receiverauthor && receiverauthor.profilePicture?receiverauthor.profilePicture: pf + "DefaultPic.png"}  className='MessageBox-1-img'></img>
 

        </div>
        <div className='MessageBox-1-text'>
            <p className='MessageBox-1-text-name'>{receiverauthor && receiverauthor.username}</p>
            <p className='MessageBox-1-text-chat' style={{fontSize:"12px"}}>Ask something</p>
        </div>
        <div className='MessageBox-1-timeagobox'>
        {
          currentconversation!==undefined?
          <div className="start-conversation-1" onClick={navigateHandler}>
                      <div className="button-text">
                      <p>Go</p>
                        <img src="/image/fast-forward-button.png" />
                       </div>
           </div>:
          <div className="start-conversation-1">
                      <div className="button-text">
                      <p>Chat</p>
                        <img src="/image/icons8-chat-bubble-90.png" />
                </div>
           </div>
        }
        </div>
      </div>
    }
    </>
  )
}

export default HomeMessageBox