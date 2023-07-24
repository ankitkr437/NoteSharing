import React, { useContext, useEffect, useRef,Component } from "react";
import "./Topbar.css";
import { Link} from "react-router-dom";
import {
  LibraryBooksTwoTone,
  CloseRounded,
} from "@material-ui/icons";
import { useState } from "react";
 
import {publicRequest} from'../../requestMethods'
import {useSelector,useDispatch} from 'react-redux'
import {logout,search} from "../../redux/userRedux";
const Topbar = () => {
  const {curreUser:user,searchedValue} =useSelector((state)=>state.user)
  const [searchedItem,setsearch] =useState("");
  const menu=useRef();
  const [placeholder, setplaceholder] = useState("..");
  const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
  const dispatch=useDispatch();
  const MenuClickHandler=()=>{
    if(menu.current.style.display=="flex" )
    {
      menu.current.style.display="none";
    }
    else if(menu.current.style.display="none" && user._id)
        menu.current.style.display="flex";
   }
      
  const logouthandler=()=>{
    dispatch(logout());
  }

   const searchsubmit=(e)=>{
    e.preventDefault();
    dispatch(search(searchedItem));
   }
   useEffect(()=>{
    dispatch(search(null));
  },[])
  
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-left-icon">
            <LibraryBooksTwoTone />{" "}
          </span>
          <Link to='/' style={{ textDecoration: "none" }}>
            <p className="topbar-title">HandNotes</p>
          </Link>
          <Link to={`/`} style={{ textDecoration: "none",width:"50%",justifyContent:"center"}} className="topbar-right-Img-left-link">
            <img src={(user && user.profilePicture)?user.profilePicture:pf+"DefaultPic.png"} className="topbar-right-Img-left" onClick={MenuClickHandler}  />
          </Link>
        </div>
        <div className="topbar-center">
        <form className="search-form" onSubmit={searchsubmit}>
        <input
            type="text"
            placeholder={`Search for notes ${placeholder}`}
            className="topbar-center-input"
           onChange={(e)=>setsearch(e.target.value)}
          ></input>
          <label htmlFor="sub">
          <img src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
          className="topbar-center-icon"
          /> 
           </label>
         
          <button type="submit" id="sub" style={{display:"none"}}>
          </button>
         
        </form>
        </div>
        <div className="topbar-right">
         { user &&
        <Link to={`/message`} style={{ textDecoration: "none",width:"50%",display:"flex",justifyContent:"end"}}>
        <img src="https://img.icons8.com/color/48/undefined/facebook-messenger--v1.png" className="messenger-icon"/>
        </Link>
          }
        </div>
      </div>


      <div className="menu" ref={menu} style={{height:"100vh"}}>
       <div className="profile">
     <div className="menu-img">
     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }}>
            <img src={(user && user.profilePicture)?user.profilePicture:pf +"DefaultPic.png"} className="topbar-menu-Img" />
          </Link>
     </div>
    <div className="menu-desc">

    <div>
     <p className="menu-username">{user?user.username:"Not Available"}</p>
     </div>

     <div>
     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none", color: "#3E8DE3" }}>
      <p  className="menu-view-profile" onClick={MenuClickHandler}>View Profile</p>      
     </Link>
     </div>

    </div>

    <div className="menu-cut">
       <CloseRounded className="menu-cut-icon" onClick={MenuClickHandler} style={{fontSize:"55px"}} />
    </div>
       </div>
        <hr />
       <Link to={`/profile/update`} style={{textDecoration:"none",color: "#3E8DE3"}} className="profile-update-menu" onClick={MenuClickHandler}>
          <p className="profile-update-link-tag">Setting</p>
          <img src="https://img.icons8.com/ios/30/000000/settings--v2.png" className="topbar-setting"/>
            </Link>
        <div className="profile-update-menu" id="topbar-logout" onClick={logouthandler}>
         <p className="profile-update-link-tag">Logout</p>
         <img src="https://img.icons8.com/external-sbts2018-blue-sbts2018/38/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
         className="topbar-setting"
         />
          </div> 
           
      </div>
     

    </>
  );
};

export default Topbar;
