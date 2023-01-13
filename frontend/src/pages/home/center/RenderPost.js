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
import {useSelector} from 'react-redux'
const RenderPost = () => {


  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";

  const [users, setusers] = useState([]);
  const [isfetchusers, setisfetchusers] = useState(false)
  const [isfetchtimeline, setisfetchtimeline] = useState(false)
  const [timeline, settimeline] = useState([])
  const [notes, setnotes] = useState([]);
  const [isnotes, setisnotes] = useState(false);

  const {currentUser,searchedValue} = useSelector((state)=>state.user)
  const issearched=searchedValue
  const user=currentUser
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
    x.notename && x.notename.toLowerCase().includes(searchedValue &&searchedValue.toLowerCase()) 
 );
  
  if(!isnotes || !isfetchusers) return (
      <>
        <Media />
      </>
    )
    if(issearched && !filterdnotes.length) return (
      <>
        <h4 style={{textAlign:"center"}}>Not Found</h4>
      </>
    )
  return (
    <>
      { (issearched && !(searchedValue==="")) ? filterdnotes.map((p, i) => (
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
