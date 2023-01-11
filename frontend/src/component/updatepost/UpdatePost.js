import React, { useContext, useRef } from "react";
import "./UpdatePost.css";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UpdatePost() {
  const {notesid}=useParams();
    const pf="https://handnoteapi.herokuapp.com/images/";
  const { user } = useContext(AuthContext);
  const [notename, setnotename] = useState();
  const [desc, setdesc] = useState();
  const [price,setprice]=useState();
 
  const [noteupdatedphoto, setnoteupdatedphoto] = useState(null);
  const [noteupdatedfile, setnoteupdatedfile] = useState("");
  
  const audio= new Audio();
  audio.src = "/music/update.wav";
  const audioerror= new Audio();
  audioerror.src = "/music/erroe.wav";
  const navigate = useNavigate();


  const UpdateNoteHandler = async(e) => {
    e.preventDefault();
    alert("Updating started...")
    const newNote = {
        userId: user._id,
        notename:notename,
        desc:  desc,
        // price:price,
        notefilename :noteupdatedfile,
      };
      if (noteupdatedphoto) {
        const data = new FormData();
       
      data.append("file", noteupdatedphoto);
      data.append("upload_preset", 'handnoteimages');
      const res=await axios.post("https://api.cloudinary.com/v1_1/dw2fok6if/image/upload",data)
      newNote.thumbnailfilename = await  res.data.secure_url;

        // const data = new FormData();
        // const fileName = Date.now() + noteupdatedphoto.name;
        // data.append("name", fileName);
        // data.append("file", noteupdatedphoto);
        // newNote.thumbnailfilename = fileName;
        // try {
        //   await axios.post("https://handnoteapi.herokuapp.com/api/upload", data);
         
        // } catch (err) {}
      }
      // if(noteupdatedfile){
      //   const data = new FormData();
      //   const fileName = Date.now() + noteupdatedfile.name;
      //   data.append("pdfname", fileName);
      //   data.append("pdffile", noteupdatedfile);
      //   newNote.notefilename = fileName;
  
      //   try {
      //     await axios.post("https://handnoteapi.herokuapp.com/api/upload/pdf", data);
      //   } catch (err) {}
      // }
      try {
        await axios.put(`https://handnoteapi.herokuapp.com/api/notes/${notesid}`,newNote);
        audio.play();
        alert("successfully uploaded...")
        navigate('/');
      } catch (err) {}
    };
  return (
    <>
     <div className="Update-post-container-complete">
     <div className="Update-post-container">
            <p className="Update-post-container-name">
             Update your note
            </p>
            <form onSubmit={UpdateNoteHandler} className="Update-post-container-form" >


              <div className="Update-post-input-box">
                <p className="Update-post-input-heading" >Note name</p>
                <input type="text" placeholder="notename"
                onChange={(e)=>setnotename(e.target.value)}
                 className="Update-post-input-block"  ></input>
              </div>

              
              <div className="Update-post-input-box">
                <p className="Update-post-input-heading" >Descritpion</p>
                <input type="text" placeholder="Descritpion"
                onChange={(e)=>setdesc(e.target.value)}
                 className="Update-post-input-block"  ></input>
              </div>

              
 

              {/* <div className="Update-post-input-box">
                <p className="Update-post-input-heading" >Price</p>
                <input type="text" placeholder="Price in usd"
                onChange={(e)=>setprice(e.target.value)}
                 className="Update-post-input-block"  ></input>
              </div>
                */}
 
              <div className="Update-post-input-box">
                <p  className="Update-post-input-heading">Note file Url</p>
                <input type="text" className="Update-post-input-block"
                placeholder="note file url(file must be in pdf format)"
               onChange={(e)=>setnoteupdatedfile(e.target.value)}
                   
                ></input>
              </div>


              <div className="Update-post-input-box-file">
                <p  className="Update-post-input-heading-file">Thumbnail file</p>
                <input type="file" className="Update-post-input-block-file"
                accept=".png,.jpeg,.jpg"
                onChange={(e)=>setnoteupdatedphoto(e.target.files[0])}
                   
                ></input>
              </div>

              

               
 
              
              <button type="submit"
                className="Update-post-container-form-submit"
              >Update-Note</button>

            </form>
          </div>
          </div>
    </>
  )
}

export default UpdatePost