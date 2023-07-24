import React, { useContext, useRef } from "react";
import "./HomeProfile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Media from '../../../loader/Loader.js'
import '../../../component/topbar/Topbar.css'
import {useSelector} from 'react-redux';
import { Chat,AccountCircle, ExitToApp,Settings,Home} from "@material-ui/icons";
const Homeprofile = () => {

    const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
  
    const {currentUser,isFetching} = useSelector((state)=>state.user)
    const user=currentUser
       
      const logouthandler=()=>{
        console.log("logout")
        localStorage.clear();
        window.location.reload();
      }
   if(isFetching){
    return <Media />
   }

  return (
    <> 
     <div className="leftmost-topbar">

     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none", color:"black" }} className="topbar-img-username">
            <img src={(user && user.profilePicture)?user.profilePicture:pf +"DefaultPic.png"} className="topbar-menu-Img" />
          <p className="menu-username" style={{textAlign:"center"}}>{user?.username}</p>
          </Link>
      
     </div>
     
    <div className="leftmost-desc">

     <Link to={`/`} style={{ textDecoration: "none" }} className="profile-link-icons">
      <div className="menuItem">
      <Home />
      <p className="leftmost-links">Home</p> 
      </div>     
     </Link>
      <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none", color: "#214368" }} className="profile-link-icons">
      <div className="menuItem">
      <AccountCircle />
      <p className="leftmost-links">View Profile</p> 
      </div>     
     </Link>
     <Link to={`/messenger`} style={{textDecoration:"none",color:"#38393b"}} className="profile-link-icons" >
        <div className="menuItem">
           <Chat style={{color:"rgb(43, 68, 97)"}}/>
           <p className="leftmost-links">Chat</p>
        </div>
      </Link>
       <Link to={`/profile/update`} style={{textDecoration:"none"}} className="profile-link-icons" >
        <div className="menuItem">
           <Settings />
           <p className="leftmost-links">Setting</p>
        </div>
      </Link>
        <div className="menuItem" id="topbar-logout" onClick={logouthandler}>
           <ExitToApp />
           <p className="leftmost-links">Logout</p>
          </div> 

   </div>
    </>
  )
}

export default Homeprofile