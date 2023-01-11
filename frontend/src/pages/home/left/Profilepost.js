import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'timeago.js';
import './Profilepost.css'
import { AuthContext } from "../../../context/AuthContext";
const Posttime = ({ x,currentprofileuser}) => {

     
    const { user } = useContext(AuthContext);
    const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
    const [like, setlike] = useState(x.likes.length);
    const [islike, setislike] = useState(false);
    const [isbuy, setisbuy] = useState(true);
    const [isseen, setisseen] = useState(false);
    const [seen,setseen] =useState(x.buy.length);
    const [users, setusers] = useState([])
    // const [isfetchusers, setisfetchusers] = useState(false)
    const [isfetchcomment, setisfetchcomment] = useState();
    const [allcomment, setallcomment] = useState(0)

    const audio= new Audio();
    audio.src = "/music/like.wav";
    const audio1= new Audio();
  audio1.src = "/music/delete.wav";
  const audioerror= new Audio();
  audioerror.src = "/music/error.wav";
    const navigate = useNavigate();
    useEffect(() => {
        setislike(x.likes.includes(user._id));
    }, [user._id, x.likes]);

    useEffect(() => {
        setisseen(x.buy.includes(user._id));
       }, [user._id, x.seen]);
    useEffect(() => {
        // const fetchalluser = async () => {
        //     const res = await axios.get("https://handnoteapi.herokuapp.com/api/users/");
        //     setusers(res.data)
        //     setisfetchusers(true);
        // }
        const fetchComment = async (req, res) => {
            try {
                const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/comments/" + x._id)
                setallcomment(res.data)
                setisfetchcomment(true);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchComment();
        // fetchalluser();
    }, [])

    const likehandler = () => {
        audio.play();
        try {
            axios.put("https://notesharingbackend-ankitkr437.onrender.com/api/notes/" + x._id + "/like", { userId: user._id });
        } catch (err) { }
        setlike(islike ? like - 1 : like + 1);
        setislike(!islike);
    };
    const seenhandler = () => {
        try {
          axios.put("https://notesharingbackend-ankitkr437.onrender.com/api/notes/" +x._id + "/buy", { userId: user._id });
        } catch (err) {}
        setseen(isseen? seen - 1 : seen + 1);
        setisseen(!isseen);
        window.open(x.notefilename, '_blank').focus();
      }; 
    const DeleteNotes= async()=>{
        let response = prompt(`Do you really want to delete this note if yes the type "YES" or type "NO" `);
        console.log(response)
        audio1.play();
        
            try {
                response==="YES" && await axios.delete(`https://notesharingbackend-ankitkr437.onrender.com/api/notes/${x._id}`,{userId:user._id});
                response==="YES" && alert("notes deleted successfully")
             response==="YES" && navigate('/');
            } catch (err) {
              audioerror.play();
              alert("sorry you can not delete this note")
                console.log("unsuccess");
            }
        
      }   
    


    return <>
 <div className="post-container" key={x._id} >
            <div className="post-topbar" style={{lineHeight:"1"}}>
                <Link to={`/profile/${x.userId}`} style={{ textDecoration: "none" }}>
                    <img  src={currentprofileuser && currentprofileuser.profilePicture?currentprofileuser.profilePicture:pf + "DefaultPic.png"} className="post-topbar-img" ></img>
                </Link>
                <div className="post-topbar-desc">
                <Link to={`/profile/${x.userId}`} style={{ textDecoration: "none" }}>
                    <p className="post-topbar-name">{currentprofileuser && currentprofileuser.username}</p>
                    </Link>
                    <div className="post-topbar-follow-ago-container">
                        <p >
                            {currentprofileuser && currentprofileuser.followers.length} Followers  
                        </p>
                        <p>.</p>
                        <p >
                            {format(x.createdAt)}
                        </p>
                    </div>
                </div>
                
               {
                   user && x && (x.userId === user._id) &&
                   <div className="post-topbar-edit-delete-container">
                        <Link to={`/note/update/${x._id}`} style={{ textDecoration: "none" }} className="post-topbar-edit-icon">
                  <img src="/image/icons8-edit-100.png" />
                  </Link>
                  <img src="/image/icons8-delete-90.png" className="post-topbar-delete-icon" onClick={DeleteNotes}/>
                   </div>
               }
            </div>

            <div className="main-post" style={{ height: "57vh" }}>
            
                    <div className="main-post-img-container" onClick={seenhandler}>
                      <img src={x.thumbnailfilename?x.thumbnailfilename:pf+"images-notes.jpg"} alt="note-thumbnail"></img>
                      {/* <Link to={x.notefilename} style={{ textDecoration: "none" }} className="View-pdf"> */}
                      <div className="View-pdf-1" onClick={seenhandler}>
                         <p>View-pdf</p>
                        <img src="/image/icons8-view-50.png"/>
                    </div>
                    {/* </Link> */}
                   </div>
                <div className="main-post-about" style={{lineHeight:"1.4"}}>
                <Link to={`/notes/${x._id}`} style={{ textDecoration: "none" }}>
                    <p className="main-post-notename">{x.notename}</p>
                </Link>
                    <p className="main-post-description">Description:</p>
                    <p className="main-post-desc">
                        {x.desc}
                    </p>
                    {/* <p className="main-post-note-price">Notes Price:{x.price || 0} $</p> */}
                </div>
            </div>
          
          <div className="post-reaction-container">
            <div className="post-reaction">
               { islike?
               <img src="/image/icons8-liked-post.png"  onClick={likehandler} style={{marginTop:"0"}}/>: <img src="/image/icons8-like-post.png"  onClick={likehandler} style={{marginTop:"1vh"}}/>  
               }
                <p style={{marginTop:"5px"}}>{like}</p>
            </div>
            <Link to={`/viewcomment/${x._id}`} className="link-in-comment">
            <div className="post-reaction">
                <img src="/image/icons8-comment-64.png" style={{marginTop:"1vh"}}></img>
                <p>{allcomment.length}</p>
            </div>
            </Link>
            <div className="post-reaction"  >
                <img src="/image/icons8-view-64.png" tyle={{marginTop:"1vh"}}></img>
                <p>{x.buy.length}</p>
            </div>
          </div>
 
        </div>


    </>;
};

export default Posttime;

