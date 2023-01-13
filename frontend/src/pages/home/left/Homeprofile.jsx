import React, { useContext, useRef } from "react";
import "./HomeProfile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Media from '../../../loader/Loader.js'
import '../../../component/topbar/Topbar.css'
import {useSelector} from 'react-redux'
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

     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }} className="topbar-img-username">
            <img src={(user && user.profilePicture)?user.profilePicture:pf +"DefaultPic.png"} className="topbar-menu-Img" />
          <p className="menu-username">{user&&user.username}</p>
          </Link>
      <hr />
     </div>
     
    <div className="leftmost-desc">

        <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }} className="profile-link-icons">
      <p  className="leftmost-links">View Profile</p>      
     </Link>
       <Link to={`/profile/update`} style={{textDecoration:"none"}} className="profile-link-icons" >
        <div className="setting">
          <p className="leftmost-links">Setting</p>
          <img src="https://img.icons8.com/ios/30/000000/settings--v2.png" className="topbar-setting"/>
          </div>
      </Link>
        <div className="profile-update-menu" id="topbar-logout" onClick={logouthandler}>
         <p className="leftmost-links">Logout</p>
         <img src="https://img.icons8.com/external-sbts2018-blue-sbts2018/38/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
         className="topbar-setting"
         />
          </div> 
        </div>
          <div className='footer-complete-container'> 
         <div className='footer-container'>
              <div className='contact-upper'>
              <p>all rights reserved</p>
              <p>contact us</p>
              </div>
              <div className='contact-text'>
              <a href="mailto:ankitloharshi@gmail.com">  <img src="https://img.icons8.com/ios/50/000000/email-open.png" className='contact-img'/>
             </a>
              <a href="https://github.com/ankitkr437/Handnotes"> <img src="https://img.icons8.com/ios-glyphs/50/000000/github.png" className='contact-img'/></a>
              </div>
         </div>    
   </div>
    </>
  )
}

export default Homeprofile