import React, { useContext, useRef } from "react";
import "./Update.css";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CloseRounded } from "@material-ui/icons";
import { Spinner, Form, Button } from 'react-bootstrap';
const Update = () => {

  const pf="https://handnoteapi.herokuapp.com/images/";
  const { user } = useContext(AuthContext);

  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [institution, setinstitution] = useState();
  const [interested, setinterested] = useState();
  const [desc, setdesc] = useState();
  const [photo, setphoto] = useState(null);
  const [password, setpassword] = useState();
  const [Loading,setLoading] =useState(false);
  const [image,setimage] =useState("");
  const buttonupdate  =useRef();


  const audio= new Audio();
  audio.src = "/music/update.wav";
  const audioerror= new Audio();
  audioerror.src = "/music/erroe.wav";
  const navigate = useNavigate();


  const UpdateFormHandler = async(e) => {
    e.preventDefault();
   
    const newUser = {
      userId: user._id,
      firstname:firstname,
      lastname:lastname,
      country:country ,
      interested:interested,
      desc:desc,
      city:city,
      institution:institution,
      password:password,
    };
    if (photo) {
      const data = new FormData();
      // const fileName = Date.now() + photo.name;
      // data.append("name", fileName);
      data.append("file", photo);
      data.append("upload_preset", 'handnoteimages');
      const res=await axios.post("https://api.cloudinary.com/v1_1/dw2fok6if/image/upload",data)
      newUser.profilePicture = await  res.data.secure_url;
      // try {
      //   await axios.post("https://handnoteapi.herokuapp.com/api/upload", data);
      //   alert("successfully uploaded...")
      //   navigate('/');
      // } catch (err) {
      //   audioerror.play();
      // }
      
      console.log(res.data.secure_url);
      console.log(newUser.profilePicture)
    }
    try{
        await axios.put(`https://handnoteapi.herokuapp.com/api/users/${user._id}`,newUser);
        audio.play();
        alert("successfully uploaded...")
        navigate('/');
      }
      catch(err){
       console.log(err);
       audioerror.play();
      }
  }

  return (
    <>
      <div className="Update-container">
        <div className="Update-profile-container">

          <div className="Update-profile-container-left">

            <div className="Update-profile-container-left-top">

              <img src={user.profilePicture?user.profilePicture:pf +"DefaultPic.png"}className="Update-profile-container-left-top-img"></img>

              <div className="Update-profile-container-left-top-user-desc">
                <p className="Update-profile-container-left-top-name">
                  <span>{user.firstname}</span> <span>{user.lastname} </span>
                </p>
                <p className="Update-profile-container-left-top-username">
                  {user.username}
                </p>

              </div>

            </div>

          </div>

          <div className="Update-profile-container-right">
            <p className="Update-profile-container-right-heading">
              Your Personal Profile Info
            </p>
            <form onSubmit={UpdateFormHandler} className="Update-profile-container-right-form" >


              <div className="input-box">
                <p className="input-heading" >first name</p>
                <input type="text" placeholder="firstname"
                onChange={(e)=>setfirstname(e.target.value)}
                 className="input-block"  ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">last name</p>
                <input type="text" placeholder="lastname" 
                onChange={(e)=>setlastname(e.target.value)}
                className="input-block"  ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Country</p>
                <input type="text" placeholder="country" 
                onChange={(e)=>setcountry(e.target.value)}
                className="input-block"></input>
              </div>

              <div className="input-box">
                <p className="input-heading">City</p>
                <input type="text" placeholder="city"
                onChange={(e)=>setcity(e.target.value)}
                 className="input-block"></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Institution</p>
                <input type="text" placeholder="institution"
                onChange={(e)=>setinstitution(e.target.value)}
                 className="input-block"></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Interested field</p>
                <input type="text" placeholder="eg. physics,coding,biology..." onChange={(e)=>setinterested(e.target.value)}
                className="input-block"></input>
              </div>



              <div className="input-box">
                <p className="input-heading">Say about yourself</p>
                <input type="text" placeholder="description"
                onChange={(e)=>setdesc(e.target.value)}
                 className="input-block" ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Update your password</p>
                <input type="password" placeholder="not required"
                onChange={(e)=>setpassword(e.target.value)}
                minLength="6"
                 className="input-block"></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Profile picture</p>
                <input type="file" className="input-block"
                id="input-bloack-file"
                accept=".png,.jpeg,.jpg"
                onChange={(e)=>setphoto(e.target.files[0])}
                  style={{ border: "none", borderRadius: "0%" }}
                ></input>
              </div>

              <button type="submit"
                className="Update-profile-container-right-form-submit"
                 
              >Update-profile</button>

            </form>
          </div>
        </div>
      </div>
    </>
  );

};

export default Update;

{/* 

          </div> */}
