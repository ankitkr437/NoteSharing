import React from 'react'
import './ConversationBox.css'
import {format} from 'timeago.js'
const ConversationBox = ({onechat,my}) => {
    const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
     
  return (
    <>
    <div className={my?"conversationbox-1 my":"conversationbox-1"}>
        <div className='conversationbox-1-top'>
        <img src={pf + "DefaultPic.png"}  className='conversationbox-1-img'></img>
        <p className={my?'conversationbox-1-text text':'conversationbox-1-text'}>
             {onechat ? onechat.text :""}
        </p>
        </div>
        <div className='conversationbox-1-timeago'>
          {format(onechat.createdAt)}
        </div>
    </div>
    </>
  )
}

export default ConversationBox