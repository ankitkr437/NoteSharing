import React, { useContext } from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import './HomepageMessage.css'
import { Link } from "react-router-dom";

import { AuthContext } from '../../../../context/AuthContext.js'
import HomeMessageBox from '../HomeMessageBox/HomeMessageBox.jsx'
function HomepageMessage() {


  const { user } = useContext(AuthContext);
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [conversationspeople, setconversationspeople] = useState([]);
  
  const [allauthor,setallauthor]=useState([])
  const[searchedauthor,setsearchedauthor]=useState("")

  useEffect(() => {
    const fetchallconversationspeople = async () => {
      try {
        const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/conversations/" + user._id);
        setconversationspeople(res.data);
        
      } catch (err) {
        console.log(err)
      }
    }
      const fetchalluser = async () => {
        const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/users/");
        setallauthor(res.data);
      };
    fetchalluser();
    fetchallconversationspeople();
  }, [user._id])

 
  const filteredauthor = searchedauthor &&  allauthor && allauthor.filter(x =>
    x.username && x.username.toLowerCase().includes(searchedauthor &&searchedauthor.toLowerCase()) 
 );
 
  return (
    <>

          {user &&
            <div className='messagebox-1'>

              <div className='messagebox-1-topbar'>
                <p className='messagebox-1-topbar-title'>
                  Message</p>

                <form className='messagebox-1-topbar-form'
                onClick={(e)=>e.preventDefault()}
                >

                  <input
                    type="text"
                    placeholder={`Search for author`}
                    className="messagebox-1-topbar-form-input"
                    onChange={(e)=> setsearchedauthor(e.target.value)}
                  ></input>
                  <label htmlFor="messagebox-1-topbar-form-submit">

                  </label>
                  <button type="submit" id="messagebox-1-topbar-form-submit" style={{ display: "none" }}>
                  </button>

                </form>
              </div>

              <div className='messagebox-1-allmessage'>
                {

                  filteredauthor && filteredauthor.map((author1) => (
                      <div>
                          <HomeMessageBox conversationspeople={conversationspeople}
                              receiverauthor={author1} currentuser={user} 
                               />
                         
                      </div>
                  ))
                }
              </div>
            </div>
          }
    </>
  )
}

export default HomepageMessage