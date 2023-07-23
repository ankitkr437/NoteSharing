import React, { Component, createContext } from "react";
import "./Author.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {publicRequest} from '../../requestMethods'
import CircularLoader from '../CircularLoader'
const Author = () => {
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [authors, setauthors] = useState([]);
  const [isauthors, setisauthors] = useState(false);
  const TotalPublishNotes = createContext();
  useEffect(() => {
    const fetchAllFeaturedAuthor = async () => {
      const res = await publicRequest.get("users/stats/authors");
      setauthors(res.data);
      setisauthors(true);
    };
    fetchAllFeaturedAuthor();
  }, []);

   
  return (
    <>
      
      <p className="featured-author">Featured Authors</p>
      {!(isauthors)?
      <CircularLoader item={"featured author"}/>:
      <div className="author-container">
        {isauthors &&
          authors.map((author, i) => {
           
              return (
               
                  <div className="author-card">
                     <Link
                  to={`/profile/${author._id}`}
                  style={{ textDecoration: "none",textAlign:"center" }}
                >
                    <img
                      src={
                        author.profilePicture
                          ? author.profilePicture
                          : pf + "DefaultBoy.jpg"
                      }
                      className="author-image"
                    />
                    <p className="author-name">
                    { author.username }
                    </p>
                    </Link>
                    <div className="author-notes-followers-container">
                      <div className="author-notes-followers">
                        <p className="author-notes-followers-count">
                          {author.notes_length}
                        </p>
                        <p className="author-notes-followers-text">Notes</p>
                      </div>
                      <img src="/image/icons8-vertical-line.png" className="seperation-image"></img>
                      <div className="author-notes-followers">
                        <p className="author-notes-followers-count">
                          {
                            author.followers_length
                          }
                        </p>
                        <p className="author-notes-followers-text">Followers</p>
                      </div>
                    </div>
                    {/* {author.institution &&
                     <p className="author-institution">{author.institution}</p>
                    } */}
                  </div>
                 
              );
            
          })}
      </div>
     }
    </>
  );
};

export default Author;
