import React, { useContext, useRef } from 'react';
import './Dot.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import {
  DeleteRounded,UpdateRounded,MoreHoriz,MoreVertRounded
} from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';


const Dot = ({x}) => {
      const DotContainerItem =useRef();
      const {user:currentuser} = useContext(AuthContext);
      const ShowItem=()=>{
        DotContainerItem.current.style.display === "flex"?DotContainerItem.current.style.display = "none":DotContainerItem.current.style.display = "flex"
      }

      const audio= new Audio();
      audio.src = "/music/delete.wav";
      const audioerror= new Audio();
      audioerror.src = "/music/error.wav";
  const DeleteNotes= async()=>{
    audio.play();
        try {
         await axios.delete(`http://localhost:8000/api/notes/${x._id}`,{userId:currentuser._id});
         alert("notes deleted successfully")
         window.location.reload();
        } catch (err) {
          audioerror.play();
          alert("sorry you can not delete this note")
            console.log("unsuccess");
        }
        console.log(x,currentuser._id)
  }    
    return <>
      <div className='dot-container-post'>
      <ul className='dot-container-item' ref={DotContainerItem}>
               <li className='dot-container-item-1' onClick={DeleteNotes}>
               Delete
               <DeleteRounded ></DeleteRounded>
               </li>
               <li className='dot-container-item-2'>
               Update
               <UpdateRounded />
               </li>
           </ul>
       <div className="dot-container" onClick={ShowItem}>
       <img src="https://img.icons8.com/color/30/000000/dots-loading--v3.png"/>
      
       </div>
      </div>
    </>;
};

export default Dot;






 