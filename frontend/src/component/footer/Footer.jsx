import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const currentUser= useSelector(state=>state.user.currentUser)
  return (
    <>
      <div className="footer-container">
        <div className="about-footer">
           
          <p className="logo">
             NoteSharing
          </p>
          
          <div className="about-content-container">
            <p className="about-us-title">ABOUT US</p>
            <p className="about-content">
              A website which allows to get any desired notes.
              <br />
              Users can upload own notes or view/search for any notes, can create own awesome profile or can chat with any other users 
            </p>
          </div>

          <div className="Contact-contribute-container">
              <a href="mailto:ankitloharshi@gmail.com" className="about-us-title" target="blank">Contact Us</a>   
              <a href="https://github.com/ankitkr437/NoteSharing" className="about-us-title" target="blank">Want to contribute</a>   
          </div>
          </div>

          <div className="footer-bottom-container">
            <p className="copyright">
            Copyright © 2023 NoteSharing. All Rights Reserved
            </p>
            <div className="footer-link">
              <Link to="/" className="footer-link-item" style={{textDecoration:"none"}}>
                Home
              </Link>
              <Link to={"/profile/"+currentUser._id} className="footer-link-item" style={{textDecoration:"none"}}>
                Profile
              </Link>
              <Link to="/searchuser" className="footer-link-item" style={{textDecoration:"none"}}>
                 Chat
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
