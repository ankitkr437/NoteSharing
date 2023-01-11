import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import axios from 'axios'
import './Note.css';
import {Spinner} from 'react-bootstrap';
 
const Note = () => {
  
  const pfpdf="https://handnoteapi.herokuapp.com/images/";
   
    
    const {notesid} =useParams();
    const[isfetchnoteone,setisfetchnoteone]=useState(false)
    const[noteone,setnoteone]=useState({})
    useEffect(()=>{
        const fetchnoteone = async ()=>{
          try{
            const res = await axios.get(`https://handnoteapi.herokuapp.com/api/notes/${notesid}`)
            setnoteone(res.data);
            setisfetchnoteone(true)
          }
          catch(err){
              console.log(err)
          }
        }
        fetchnoteone();
    },[notesid])
    
    // var url = pfpdf+"notepdfs/";
    
    return (
        <>
        {
            isfetchnoteone?
            <div className='notefile-note-container'>

         <div className='notefile-note-complete-desc-image-container'>


           <div className='notefile-note-complete-desc-container'>


           <div className='notefile-note-name-container'>
            <p className='notefile-note-name-logo' >Name:-</p>
            <p className='notefile-note-name'>{noteone.notename?noteone.notename:"Not Available"}</p>
          </div>
          
          <div className='notefile-note-seen-container'>
          <p className='notefile-note-seen-logo'>Total seen:-</p>
          <p className='notefile-note-seen'>{noteone.buy.length}</p>
          </div>

        <div className='notefile-note-desc-container'>
        <p className='notefile-note-Desc-logo'>Descritpion:-</p>
           <p className='notefile-note-desc'>{noteone.desc?noteone.desc:"Not Available"}</p>
         </div>   
         <div className='notefile-note-url-container'>
        <p className='notefile-note-url-logo'>Url of pdf:-</p>
           <a className='notefile-note-url' href={noteone.notefilename&&noteone.notefilename}>Click here to view the pdf</a>
         </div>
           </div>

            
           <div className='notefile-note-image-container'>
           <img src={noteone.thumbnailfilename?noteone.thumbnailfilename:pfpdf+"images-notes.jpg"} className="notefile-note-thumbnail-image" alt='thumbnailfilename.jpg'></img>
           </div>
         </div>


         <div className='notefile-note-pdf'>
        {
           noteone.notefilename?
           <iframe src={noteone.notefilename&&noteone.notefilename} className='notefile-iframe' title='myframe'>
          </iframe>
           :
           <p style={{textAlign:"center"}}>Not Available</p>
        }
         {/* <embed src={noteone.notefilename?noteone.notefilename:url+"1.pdf"}
         /> */}
        
         </div>
        </div>
        :<Spinner animation="grow"  style={{width:"20vw",height:"20vw",marginTop:"10vh",color:"yellowgreen",marginLeft:"40vw"}}/>
        }
        </>
    )
}

export default Note
