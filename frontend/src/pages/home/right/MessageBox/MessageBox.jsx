import React , { useContext } from 'react'
import axios from 'axios';
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import './MessageBox.css'
function MessageBox({conversationone,currentuser,onlineusers}) {
    const pf="https://handnoteapi.herokuapp.com/images/";
    const [conversationdetails,setconversationdetails]=useState();
    const [isonline,setisonline]=useState(false);
    const [isconversationdetails,issetconversationdetails]=useState(false);
     useEffect( async()=>{
      const authorId=  conversationone.members.find((x)=> x!==currentuser._id);
      try{
         const res = await axios.get("https://handnoteapi.herokuapp.com/api/users/"+authorId);
         setconversationdetails(res.data);
         issetconversationdetails(true)
      }catch(err)
      {
        console.log(err)  
      }
      setisonline(onlineusers.find((x)=> x.userId===authorId))
     },[conversationone,currentuser])
      

  return (
    <>
      <div className='MessageBox-1'>
          <div className='MessageBox-1-imgbox'>

          {/* <Link to={`/profile/${conversationspeople && conversationspeople._id}`} style={{ textDecoration: "none" }}> */}
               
        <img src={isconversationdetails && conversationdetails.profilePicture?conversationdetails.profilePicture: pf + "DefaultPic.png"}  className='MessageBox-1-img'></img>

        {/* </Link> */}

        </div>
        <div className='MessageBox-1-text'>
            <p className='MessageBox-1-text-name'>{isconversationdetails && conversationdetails.username}</p>
            <p className='MessageBox-1-text-chat'>Ask something</p>
        </div>
        <div className='MessageBox-1-timeagobox'>
           <p className='MessageBox-1-timeago'>last seen</p>
           {
             isonline && 
             <img src="https://img.icons8.com/emoji/48/undefined/green-circle-emoji.png" style={{height:"23px",width:"23px"}}/>
           }
        </div>

      </div>
    </>
  )
}

export default MessageBox