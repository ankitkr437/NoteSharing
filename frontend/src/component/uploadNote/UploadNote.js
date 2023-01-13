import React, { useContext, useRef } from "react";
import "./UploadNote.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import "./UploadNoteForm.css";
import Topbar from "../topbar/Topbar";
const UploadNote = () => {
  const {currentUser } = useSelector((state)=>state.user)
  const user=currentUser
  const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";

  const ShowForm = useRef();
  const notename = useRef();
  const descritpion = useRef();
  const price = useRef();
  const [notefile,setnotefile]=useState(null)
  const [fileurl,setfileurl]=useState("")
  const [fileimg,setfileimg]=useState(null)
  const ShowFormHandler = () => {
    if ((ShowForm.current.style.display = "flex"))
      ShowForm.current.style.display = "none";
  };
  const audio= new Audio();
  audio.src = "/music/update.wav";
  const SellFormSubmitHandler = async (e) => {

     alert("notes uploading started...")
     e.preventDefault();
     audio.play();
    
    const newNote = {
      userId: user._id,
      desc: descritpion.current.value,
      notename:notename.current.value,
      notefilename :fileurl,
    };
    if (fileimg) {
      const data = new FormData();
      data.append("file", fileimg);
      data.append("upload_preset", 'handnoteimages');
      const res=await axios.post("https://api.cloudinary.com/v1_1/dw2fok6if/image/upload",data)
      newNote.thumbnailfilename = await  res.data.secure_url;
      
    }
    try {
      await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/notes", newNote);
      window.location.reload();
      alert("successfully uploaded notes")
    } catch (err) {}
  };

  const UpFormHandler = () => {
    if (ShowForm.current.style.display == "none")
      ShowForm.current.style.display = "flex";
  };
  return (
    <>
      <div className="sell-container-home">
        <div className="sell-img-home">
          <img
           src={user.profilePicture?user.profilePicture:pf +"DefaultBoy.jpg"}
          ></img>
        </div>
        <div className="sell-post-home" onClick={UpFormHandler}>
          <p onClick={UpFormHandler} className="sell-post-home-text">
            Upload a Note
          </p>
        </div>
        <div className="sell-form-container" ref={ShowForm}>
        <img src="https://img.icons8.com/ios-filled/50/000000/delete-sign--v2.png"
         className="sell-form-cut-icon"
         onClick={ShowFormHandler}
        />

          <form onSubmit={SellFormSubmitHandler} className="sell-form">
            <input
              type="text"
              placeholder="Notename(not more than 30 character)"
              className="sell-form-note-name"
              ref={notename}
              maxLength="30"
              required
            ></input>
            <input
              type="text"
              placeholder="Descritpion(not more than 300 character)"
              className="sell-form-descritpion"
              ref={descritpion}
              maxLength="300"
              required
            ></input>
            <input
              type="text"
              id="pdf-file-upload"
              onChange={(e)=>setfileurl(e.target.value)}
              placeholder="Url of note(file must be in pdf format)"
              required
            ></input>
            <label for="thumbnail-file-upload" class="custom-file-upload">
             Thumbnail for notes
            </label>
            <input
              type="file"
              id="thumbnail-file-upload"
             accept=".png,.jpeg,.jpg"
             //for uploading just single file i have done files[0]
             onChange={(e)=>setfileimg(e.target.files[0])}
            >
            </input>
            <button type="submit" className="sellform-submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadNote;
