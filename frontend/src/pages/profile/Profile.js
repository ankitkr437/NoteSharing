import React, { useContext } from "react";
import "./Profile.css";
import Profilepost from '../home/center/Profilepost'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import {
  Add, Remove
} from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {follow,unFollow} from "../../redux/userRedux";
const Profile = () => {

  const { userId } = useParams();
  
  const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [user, setuser] = useState({}) 
  const [post, setpost] = useState([])
  const {currentUser:currentuser}=useSelector((state)=>state.user)
  const [isfollow, setisfollow] = useState(
    currentuser?.followings.includes(user?.id)
  )
  const [followerslength, setfollowerslength] = useState(
    user?.followers?.length
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(`https://notesharingbackend-ankitkr437.onrender.com/api/users/${userId}`);
      setuser(res.data);
    }
    const fetchpost = async () => {
      const res = await axios.get(`https://notesharingbackend-ankitkr437.onrender.com/api/notes/profile/${userId}`);
      setpost(res.data);
    }
    fetchuser();
    fetchpost();
  }, [userId])
 
  const FollowHandle = async () => {
    console.log("jhasvdh")
    try {
      if (isfollow) {
        await publicRequest.put(`/users/${user._id}/unfollow`, {
          userId: currentuser._id,
        });
        dispatch(unFollow(user._id));
        setfollowerslength(followerslength-1)
      } else {
        await publicRequest.put(`/users/${user._id}/follow`, {
          userId: currentuser._id,
        });
        dispatch(follow(user._id));
        setfollowerslength(followerslength+1)
      }
      setisfollow(!isfollow)
    } catch (err) {
    }
  };
  const totallikes=post?.reduce((a,v) =>  a = a + v?.likes.length , 0 )
  const totalviews=post?.reduce((a,v) =>  a = a + v?.buy.length , 0 )
   
  return (
    <>
      {
        user && user.username ? (
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
               </div>
              
              <div className="contributions-pc">
              < div className="gain-container">
                 <div className="total-gain">
                 <img src="/image/icons8-microsoft-publisher-50.png" /> 
                 <p className="gain-value">{post && post.length}</p>
                 </div>
                 <p className="gain-desc">Published Notes</p>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-like-64.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{post && totallikes}</p>
                 <p className="gain-desc">Total likes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-view-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{post && totalviews}</p>
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
                 <p className="gain-value">{post && post.length}</p>
                 <p className="gain-desc">Published Notes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-like-64.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{post && totallikes}</p>
                 <p className="gain-desc">Total likes</p>
                 </div>
                </div>

                <div className="gain-container">
                <img src="/image/icons8-view-50.png" /> 
                 <div className="total-gain">
                 <p className="gain-value">{post && totalviews}</p>
                 <p className="gain-desc">Total views</p>
                 </div>
                </div>
            </div>
            <div className="user-timeline">
              <div className="user-post">
                {
                  post ? post.map((y) => (
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
