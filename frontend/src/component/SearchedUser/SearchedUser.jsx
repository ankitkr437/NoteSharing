import React from "react";
import styled from "styled-components";
import { useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../../responsive"
import { publicRequest } from '../../requestMethods'
import {Send} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Navigate, useNavigate } from "react-router";
import Loader from "../CircularLoader";
const UserOne=styled.div`
    width: 100%;
    background-color:#99c9f9;
    height: 12vh;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    margin-bottom: 2vh;
    cursor: pointer;
`
const UserLeft=styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 70%;
`
const UserRight=styled.div`
   display: flex;
   justify-content: end;
    align-items: center;
    padding-right: 8px;
    width: 30%;
`
const UserImg=styled.img`
     height: 44px;
     width: 44px;
     border-radius: 50%;
     object-fit: cover;
`
const UserName=styled.div`
      margin-left: 5px;
      font-size: 17px;
`
const useStyles = makeStyles(theme => ({
    sendIcon: {
      color:"#2a6bb0",
      fontSize:"2.5rem",
    }
  }));

const SearchedUser = ({receiverUser}) => {
    // console.log(receiverUser)
    const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
    const { currentUser:user} = useSelector((state) => state.user);
    const classes =useStyles();
    const [isbuilding ,setisbuilding] =useState(false)
    const [receiverId,setreceiverId]=useState(receiverUser?._id)
    const navigate=useNavigate();
    const buildConversationHandler= async({u})=>{
        console.log({ senderId:user?._id,
            receiverId})
          setisbuilding(true)
         try{
            const res= await publicRequest.post("conversations",{
              senderId:user?._id,
              receiverId
            })
            console.log(res.data)
            setisbuilding(false)
            navigate('/messenger')
         }
         catch(err){
          console.log(err);
         }
    }
  return (
    <>
    {
    isbuilding?<Loader item={"redirecting"}/>:
    <UserOne onClick={buildConversationHandler}>
    <UserLeft>
     <UserImg src={
         receiverUser && receiverUser.profilePicture
           ? receiverUser.profilePicture
           : pf + "DefaultPic.png"
       } />
       <UserName>{receiverUser?.username}</UserName>
    </UserLeft>
    <UserRight>
       <Send className={classes.sendIcon}/>
    </UserRight>
</UserOne>
      }
      </>
  )
}

export default SearchedUser