import React from "react";
import styled from "styled-components";
import { useState,useEffect} from "react";
import './BuildConversation.css';
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../../responsive"
import CircularLoader from '../../component/CircularLoader'
import { publicRequest } from '../../requestMethods'
import {CallMissedSharp, Search,Send} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Navigate, useNavigate } from "react-router";
import SearchedUser from "../SearchedUser/SearchedUser";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color:#3E8DE3;
  border-radius: 10px;
  padding: 10px;
`;
const MessageContainer=styled.div`
      height: 13vh;
      width: 100%;
      display: flex;
      border-radius: 10px;
      flex-direction: column;
      justify-content: center;
      ${mobile({alignItems:"center"})}
      align-items: flex-start;
`
const MessageTitle=styled.div`
      font-size: 30px;
      color: white;
      font-weight: 700;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SearchContainer = styled.form`
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  ${mobile({ width: "80%" })}
  background-color:white;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  border-radius: 10px;
  height: 40px;
  font-size: 15px;
  ${mobile({ height: "30px" })}
  padding: 5px;
`;
const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: white;
`;
const UserWrapper=styled.div`
    background-color:white;
    height: 70vh;
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: column;
`;


const RenderPost = () => {
  
  const [issearching, setissearching] = useState(false);
  const [searchedItem, setsearchedItem] = useState(null);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  
  const searchHandler = async (e) => {
        e.preventDefault();
        setissearching(true)
        const res= await publicRequest.get("users/findusers/"+searchedItem);
        setUsers(res.data);
      setissearching(false)
  };
  return (
    <>
     <Container>
      <MessageContainer>
        <MessageTitle>Chat with users</MessageTitle>
      </MessageContainer>
      <Wrapper>
        <SearchContainer onSubmit={searchHandler}>
          <Input
            placeholder="Search users ..."
            onChange={(e) => setsearchedItem(e.target.value)}
            required
          />
          <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 30 }} />
          </SearchButton>
        </SearchContainer>
      </Wrapper>
    </Container>
    {
      issearching?<CircularLoader item={"users"}/>:
    <UserWrapper>
    {
      users?.length===0 ? <h3 style={{textAlign:"center"}}>Not Found</h3>:
        users?.map((u,i)=>(<SearchedUser receiverUser={u} key={i}/>))
    }
    </UserWrapper>
     }
    </>
  );
};

export default RenderPost;
