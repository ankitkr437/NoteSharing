import React, { useContext } from "react";
import "./Sell.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const Sell = () => {
    const {user}=useContext(AuthContext);
    const pf="https://handnoteapi.herokuapp.com/images/";
  return <>
      <div className="sell-container">
         <div className="sell-img">
      <img src={user.profilePicture?user.profilePicture:pf +"DefaultBoy.jpg"}></img>
         </div>
         <div className="sell-post">
           <p>Upload a Note</p>
           <img src="https://img.icons8.com/dotty/50/000000/note.png"/>
         </div>
      </div>
  </>;
};

export default Sell;
