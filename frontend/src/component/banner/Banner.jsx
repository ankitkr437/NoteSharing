import React, { Component, createContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {Spinner} from 'react-bootstrap';
import "./Banner.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../pages/profile/Profile";
const Banner = () => {
  const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [users, setusers] = useState([]);
  const [notes, setnotes] = useState([]);
  const [len, setlen] = useState(0);
  const [isuser,setisuser]=useState(false)
  const [isnotes,setisnotes]=useState(false);
  const TotalPublishNotes=createContext();
  useEffect(() => {
    const fetchalluser = async () => {
      const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/users/");
      setusers(res.data);
      setisuser(true);
    };
    const fetchallnotes = async () => {
      const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/notes/");
      setnotes(res.data);
      setisnotes(true);
    };
    fetchallnotes();
    fetchalluser();
  }, []);

  const topauthor = [];
  const showauthor = [];
  users.map((x, i) => {
    topauthor[i] = notes.filter(function (obj) {
      return obj.userId == x._id;
    });
  });

  {
    topauthor.sort((a, b) => {
      return b.length - a.length;
    });
  }
  topauthor.map((x, i) => {
    if (x.length > 0) {
      showauthor[i] = x;
    }
  });
  {
    showauthor.sort((a, b) => {
      return b.length - a.length;
    });
  }
   
  return (
    <>
     {
       (isnotes && isuser)?

       <Carousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        autoFocus={true}
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={2500}
        interval={5300}
        className="carousel-container"
      >
        {showauthor.map((x, i) => {
          if (x.length > 0) {
            return (
              <div key={i} className="banner-container">
                <div className="banner-first">
                 <div  className="banner-image-container" >
                 <Link to={`/profile/${x[0].userId}`} style={{textDecoration:"none"}}>

                     
              <img
                src={
                  users.find((obj)=>obj._id==x[0].userId).profilePicture?users.find((obj)=>obj._id==x[0].userId).profilePicture:pf+"DefaultBoy.jpg"
                }
                className="banner-image"
              />
              </Link>
                 </div>
                  <div className="banner-text">
                    <Link
                      to={`/profile/${x[0].userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="banner-name">
                        {i + 1}.
                        {users.find((obj) => obj._id == x[0].userId).username}
                      </p>
                    </Link>
                    <p className="banner-sell">
                      Total published notes :<span>{x.length}</span>
                    </p>
                  </div>
                </div>
               
              </div>
            );
          }
        })}
      </Carousel>
      :<Spinner animation="grow"  style={{width:"10vw",height:"10vw",marginTop:"8vh",color:"yellowgreen",marginLeft:"40vw"}}/>
     }
    </>
  );
};

export default Banner;
 