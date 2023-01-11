import React, { useContext } from "react";
import "./Profile.css";
import Right from '../home/right/Right';
import Profilepost from '../home/left/Profilepost'
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {totallikes} from './Count.js';
import axios from "axios";
import { Spinner } from 'react-bootstrap';

import { AuthContext } from "../../context/AuthContext";
import {
  Add, Remove
} from "@material-ui/icons";
const Profile = () => {

  const { userId } = useParams();

  const pf="https://handnoteapi.herokuapp.com/images/";
  const [user, setuser] = useState({})
  const[totallikes,settotallikes] =useState(0)
  const[totalviews,settotalviews] =useState(0)
  const [isfetchfollowers, setisfetchfollowers] = useState(false);
    const [isfetchfollowings, setisfetchfollowings] = useState(false);
  
    
  const [isfetchuser, setisfetchuser] = useState(false)
  const [isfetchpost, setisfetchpost] = useState(false)
  const [count, setcount] = useState(0)
  const [post, setpost] = useState([])
  const [isfollow, setisfollow] = useState(false)
  const [followerslength, setfollowerslength] = useState(0);
  const [followingslength, setfollowingslength] = useState(0);
  const [conversationspeople,setconversationspeople]=useState([]) 
  const [currentconversation,setcurrentconversation]=useState(null)
      const [isfetchcurrentconversation,setisfetchcurrentconversation]=useState(false)
  const { user: currentuser, dispatch } = useContext(AuthContext);

  console.log(followerslength)
  console.log(followingslength)
  const audio = new Audio();
  audio.src = "/music/follow.wav";


  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(`https://handnoteapi.herokuapp.com/api/users/${userId}`);

      setuser(res.data);
      setisfetchuser(true);
    }
    const fetchpost = async () => {
      const res = await axios.get(`https://handnoteapi.herokuapp.com/api/notes/profile/${userId}`);
      setpost(res.data);
      setisfetchpost(true);
    }

    fetchuser();
    fetchpost();

  }, [userId])
 

  //for chat 

  useEffect(() => {
    const fetchallconversationspeople = async () => {
      try {
        const res = await axios.get(
          "https://handnoteapi.herokuapp.com/api/conversations/" + currentuser._id
        );
        setconversationspeople(res.data.sort((n1, n2) => {
          return new Date(n2.createdAt) - new Date(n1.createdAt)
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchallconversationspeople();
  }, [currentuser._id]);

  let navigate = useNavigate();
  useEffect(()=>{
    setcurrentconversation(conversationspeople?.find((x) =>
    JSON.stringify(x.members) === JSON.stringify([currentuser._id,userId]) ||
    JSON.stringify(x.members) === JSON.stringify([userId,currentuser._id])
     ))
  },[userId])
  const navigateHandler= async()=>{
    if( currentuser._id === userId){
      alert('You can not chat with yourself')
    }
    else if(currentconversation===undefined){
     const res=await axios.post("https://handnoteapi.herokuapp.com/api/conversations",
     {
       senderId:currentuser._id,
       receiverId:userId
     }) 
     setcurrentconversation(res)
    }
     currentconversation!==undefined && navigate(`/message/${currentconversation?._id}`)
  }




  useEffect(() => {
    if(isfetchuser){
    setisfollow(currentuser.followings.includes(userId))
    setfollowerslength(user.followers.length)
    setfollowingslength(user.followings.length)}
  }, [currentuser.followings])

  const FollowHandle = async () => {
    audio.play();
    try {
      if (isfollow) {
        await axios.put(`https://handnoteapi.herokuapp.com/api/users/${userId}/unfollow`, { userId: currentuser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
      else {
        await axios.put(`https://handnoteapi.herokuapp.com/api/users/${userId}/follow`, { userId: currentuser._id });
        dispatch({ type: "FOLLOW", payload: user._id });  
      }
    }
    catch (err) {
      console.log(err);
    }
    setfollowerslength(isfollow?followerslength-1:followerslength+1)
    setisfollow(!isfollow)
  }

   useEffect(()=>{
     post.map((x)=>{
      settotallikes(totallikes+x.likes.length)
      settotalviews(totalviews+x.buy.length)
     })
   },[])
   
  // useEffect(()=>{
    
  // },[])
  return (
    <>
      {
        isfetchuser && user.username ? (
          <div className="profile-container">
            <div className="profile-top">
              <div className="profile-top-img-container">
                <img src={user && user.profilePicture ? user.profilePicture : pf + "DefaultPic.png"} alt="profile picture"></img>
                <p className="username">
                  {user && user.username}
                </p>
              </div>
              <div className="profile-desc">
              { (currentuser._id===userId || (user.firstname&& user.lastname)) && <p className="fullname">
                {( user.firstname && user.lastname)?
                  (user.firstname + " " + user.lastname):
                  (currentuser._id===userId &&
                  <Link to={`/profile/update`}>
                    Fill your fullname
                  </Link>)
                }
                  </p>
               }{(currentuser._id===userId || user.desc) &&
                <p className="desc">{
                   (user.desc)?
                   user.desc:
                    currentuser._id===userId &&
                    <Link to={`/profile/update`}>
                      Fill your headline
                    </Link>
                }</p>
              }
              {(currentuser._id===userId || user.institution) &&
                <div className="institution-container">
                {user.institution &&
                  <img src="https://img.icons8.com/external-fauzidea-glyph-fauzidea/64/undefined/external-college-building-fauzidea-glyph-fauzidea.png" />
                }
                  <p className="institution">
                     {( user.institution)?
                     user && user.institution:
                     (currentuser._id===userId &&
                      <Link to={`/profile/update`}>
                        Fill your institution
                      </Link>)
                    }</p>
                </div>}
                {(currentuser._id===userId || (user.city && user.country)) &&
                <div className="user-resident">
                { user.city && user.country &&
                  <img src="https://img.icons8.com/ios-filled/50/undefined/marker.png" />
                }
                  <p className="residing-second">{
                    ( user.city && user.country)?
                  user.city + "," +user.country:(
                    currentuser._id===userId &&
                    <Link to={`/profile/update`}>
                        Fill your resident
                      </Link>
                  )
                  }</p>
                </div>}
                <div className="followers-followings">
                <p className="number">{user.followers.length || 0}</p>
                <p className="number-below">Followers</p>
                <p>.</p>
                <p className="number">{user.followings.length}</p>
                <p className="number-below">Followings</p>
                </div>
                <div className="follow-chat">
                    {
                      currentuser._id !== userId && (
                        <button className="follow" onClick={FollowHandle} >
                          {isfollow ? "unfollow" : "follow"}
                          {isfollow ? <Remove className="follow-icon" /> : <Add className="follow-icon" />}
                        </button>)
                    }
                    {
                      currentuser._id !== userId && (
                        currentconversation!==undefined?
                        <div className="start-conversation-1" onClick={navigateHandler}>
                      <div className="button-text">
                      <p>Go</p>
                        <img src="/image/fast-forward-button.png" />
                       </div>
                    </div>
                   :
                    <div className="start-conversation-1" onClick={navigateHandler}>
                      <div className="button-text">
                      <p>Chat</p>
                        <img src="/image/icons8-chat-bubble-90.png" />
                      </div>
                    </div>
           )
                    }
                  </div>
              
              <div className="contributions-pc">
              <div className="gain-container">
                  <img src="/image/icons8-microsoft-publisher-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && post.length}</p>
                 <p className="gain-desc">Published Notes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-like-64.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && totallikes}</p>
                 <p className="gain-desc">Total likes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-view-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && totalviews}</p>
                 <p className="gain-desc">Total views</p>
                 </div>
                </div>
              </div>
              </div>         
            </div>
            <div className="contributions-phone">
            <div className="gain-container">
                  <img src="/image/icons8-microsoft-publisher-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && post.length}</p>
                 <p className="gain-desc">Published Notes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-like-64.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && totallikes}</p>
                 <p className="gain-desc">Total likes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-view-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{isfetchpost && totalviews}</p>
                 <p className="gain-desc">Total views</p>
                 </div>
                </div>
            </div>
            <div className="user-timeline">
              <div className="user-post">
                {
                  isfetchpost ? post.map((y) => (
                    <Profilepost x={y} currentprofileuser={user} key={y._id} />

                  )) : <Spinner animation="grow" style={{ width: "20vw", height: "10vw", marginTop: "30vh", color: "yellowgreen", marginLeft: "10vw" }} />}
              </div>
               
            </div>
          </div>

        ) : <Spinner animation="grow" style={{ width: "15vw", height: "15vw", marginTop: "10vh", color: "yellowgreen", marginLeft: "40vw" }} />
      }

    </>
  );
};

export default Profile;
