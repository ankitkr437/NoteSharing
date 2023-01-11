import React, { useContext } from "react";
import HomePost from "./Homepost.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState,useEffect} from "react";
import { format } from 'timeago.js';
import {
  Search,
} from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import Media from "../../../loader/Loader.js";
import { AuthContext } from "../../../context/AuthContext";
const RenderPost = () => {


  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";

  const [users, setusers] = useState([]);
  const [isfetchusers, setisfetchusers] = useState(false)
  const [isfetchtimeline, setisfetchtimeline] = useState(false)
  const [timeline, settimeline] = useState([])
  const [notes, setnotes] = useState([]);
  const [isnotes, setisnotes] = useState(false);


  const { user ,searchedvalue,issearched} = useContext(AuthContext);
 

 
  const User = user;
 
   

  
 
  useEffect(() => {
    const fetchallusers = async () => {
      const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/users/");
      setusers(res.data);
      setisfetchusers(true)
    }

    const fetchallnotes = async () => {
      const res = await axios.get("https://notesharingbackend-ankitkr437.onrender.com/api/notes/");
      setnotes(res.data.sort((n1, n2) => {
        return new Date(n2.createdAt) - new Date(n1.createdAt)
      }));
      setisnotes(true);
    }

    fetchallnotes();
    fetchallusers();

  }, [user._id])
 
 
   const filterdnotes = (isnotes && issearched) && notes.filter(x =>
    x.notename && x.notename.toLowerCase().includes(searchedvalue &&searchedvalue.toLowerCase()) 
 );
  
 
   console.log(filterdnotes)
  
  
    if(!isnotes || !isfetchusers) return (
      <>
            <Media />
        </>
    )
   
  return (
    <>
      { (issearched && !(searchedvalue==="")) ? filterdnotes.map((p, i) => (
        <HomePost x={p} key={i} />
      ))
      :notes.map((p, i) => (
        <HomePost x={p} key={i} />
      ))
    }
    </>
  );
};

export default RenderPost;
