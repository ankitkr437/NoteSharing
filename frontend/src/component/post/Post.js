import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'timeago.js';
import './Post.css'
import {useSelector} from 'react-redux'
import { publicRequest } from "../../requestMethods";
const Post = ({note,postUser}) => {
     
    const {currentUser } = useSelector((state)=>state.user)
    const user=currentUser
    const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
    const [like, setlike] = useState(note.likes.length);
    const [islike, setislike] = useState(false);
    const [isseen, setisseen] = useState(false);
    const [seen,setseen] =useState(note.buy.length);
    const [allcomment, setallcomment] = useState(0)

    
    const navigate = useNavigate();
    useEffect(() => {
        setislike(note.likes.includes(user._id));
    }, [user._id, note.likes]);

    useEffect(() => {
        setisseen(note.buy.includes(user._id));
       }, [user._id, note.seen]);
    useEffect(() => {
        const fetchComment = async (req, res) => {
            try {
                const res = await publicRequest.get("comments/" + note._id)
                setallcomment(res.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchComment();

    }, [])

    const likehandler = () => {
        try {
            publicRequest.put("notes/" + note._id + "/like", { userId: user._id });
        } catch (err) { }
        setlike(islike ? like - 1 : like + 1);
        setislike(!islike);
    };
    const seenhandler = async () => {
        try {
          await publicRequest.put("notes/" +note._id + "/buy", { userId: user._id });
        } catch (err) {}
        setseen(isseen? seen - 1 : seen + 1);
        setisseen(!isseen);
        window.open(note.notefilename, '_blank').focus();
      }; 
    const DeleteNotes= async()=>{
        let response = prompt(`Do you really want to delete this note if yes the type "YES" or type "NO" `);
            try {
                response==="YES" && await publicRequest.delete(`notes/${note._id}`,{userId:user._id});
                response==="YES" && alert("notes deleted successfully")
             response==="YES" && navigate('/');
            } catch (err) {
              alert("sorry you can not delete this note")
                console.log("unsuccess");
            }
        
      }   
    


    return <>
 <div className="post-container" key={note._id} >
            <div className="post-topbar" style={{lineHeight:"1"}}>
                <Link to={`/profile/${note.userId}`} style={{ textDecoration: "none" }}>
                    <img  src={postUser && postUser.profilePicture?postUser.profilePicture:pf + "DefaultPic.png"} className="post-topbar-img" ></img>
                </Link>
                <div className="post-topbar-desc">
                <Link to={`/profile/${note.userId}`} style={{ textDecoration: "none" }}>
                    <p className="post-topbar-name">{postUser && postUser.username}</p>
                    </Link>
                    <div className="post-topbar-follow-ago-container">
                        <p >
                            {postUser && postUser.followers.length} Followers  
                        </p>
                        <p>.</p>
                        <p >
                            {format(note.createdAt)}
                        </p>
                    </div>
                </div>
                
               {
                   user && note && (note.userId === user._id) &&
                   <div className="post-topbar-edit-delete-container">
                        <Link to={`/note/update/${note._id}`} style={{ textDecoration: "none" }} className="post-topbar-edit-icon">
                  <img src="/image/icons8-edit-100.png" />
                  </Link>
                  <img src="/image/icons8-delete-90.png" className="post-topbar-delete-icon" onClick={DeleteNotes}/>
                   </div>
               }
            </div>

            <div className="main-post" style={{ height: "57vh" }}>
            
                    <div className="main-post-img-container" onClick={seenhandler}>
                      <img src={note.thumbnailfilename?note.thumbnailfilename:pf+"images-notes.jpg"} alt="note-thumbnail"></img>
                      <div className="View-pdf-1" onClick={seenhandler}>
                         <p>View-pdf</p>
                        <img src="/image/icons8-view-50.png"/>
                    </div>
                   </div>
                <div className="main-post-about" style={{lineHeight:"1.4"}}>
                <Link to={`/notes/${note._id}`} style={{ textDecoration: "none" }}>
                    <p className="main-post-notename">{note.notename}</p>
                </Link>
                    <p className="main-post-description">Description:</p>
                    <p className="main-post-desc">
                        {note.desc}
                    </p>
                </div>
            </div>
          
          <div className="post-reaction-container">
            <div className="post-reaction">
               { islike?
               <img src="/image/icons8-liked-post.png"  onClick={likehandler} style={{marginTop:"0"}}/>: <img src="/image/icons8-like-post.png"  onClick={likehandler} style={{marginTop:"1vh"}}/>  
               }
                <p style={{marginTop:"5px"}}>{like}</p>
            </div>
            <Link to={`/viewcomment/${note._id}`} className="link-in-comment">
            <div className="post-reaction">
                <img src="/image/icons8-comment-64.png" style={{marginTop:"1vh"}}></img>
                <p>{allcomment.length}</p>
            </div>
            </Link>
            <div className="post-reaction"  >
                <img src="/image/icons8-view-64.png" tyle={{marginTop:"1vh"}}></img>
                <p>{note.buy.length}</p>
            </div>
          </div>
 
        </div>


    </>;
};

export default Post;

