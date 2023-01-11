import React, { Component, createContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Spinner } from "react-bootstrap";
import "./Author.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../pages/profile/Profile";

const Author = () => {
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [users, setusers] = useState([]);
  const [notes, setnotes] = useState([]);
  const [len, setlen] = useState(0);
  const [isuser, setisuser] = useState(false);
  const [isnotes, setisnotes] = useState(false);
  const TotalPublishNotes = createContext();
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
  console.log(showauthor);

  return (
    <>
      <div className="author-container">
        {isnotes &&
          isuser &&
          showauthor.map((x, i) => {
            if (x.length > 0) {
              return (
                <Link
                  to={`/profile/${x[0].userId}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="author-card">
                    <img
                      src={
                        users.find((obj) => obj._id == x[0].userId)
                          .profilePicture
                          ? users.find((obj) => obj._id == x[0].userId)
                              .profilePicture
                          : pf + "DefaultBoy.jpg"
                      }
                      className="author-image"
                    />
                    <p className="author-name">
                      {users.find((obj) => obj._id == x[0].userId).username}
                    </p>
                    {/* <p className="author-desc"> {users.find((obj) => obj._id == x[0].userId).desc}</p> */}
                    <div className="author-notes-followers-container">
                      <div className="author-notes-followers">
                        <p className="author-notes-followers-count">
                          {x.length}
                        </p>
                        <p className="author-notes-followers-text">Notes</p>
                      </div>
                      <img src="/image/icons8-vertical-line.png" className="seperation-image"></img>
                      <div className="author-notes-followers">
                        <p className="author-notes-followers-count">
                          {
                            users.find((obj) => obj._id == x[0].userId)
                              .followers.length
                          }
                        </p>
                        <p className="author-notes-followers-text">Followers</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </>
  );
};

export default Author;
