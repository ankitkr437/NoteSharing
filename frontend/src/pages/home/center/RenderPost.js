import React, { useContext } from "react";
import HomePost from "./Homepost.js";
import styled from "styled-components";
import axios from "axios";
import { Search } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { search } from "../../../redux/userRedux";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../../../responsive";
import Media from "../../../loader/Loader.js";

const Container = styled.div`
  padding: 20px;
  ${mobile({ padding: "0px" })}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  margin-bottom: 3vh;
  ${mobile({ marginTop: "1vh"})}
`;
const SearchContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 500px;
  height: 40px;
  font-size: 16px;
  ${mobile({ height: "30px" })}
  padding: 5px;
`;
const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: white;
`;

const RenderPost = () => {
  const { currentUser, searchedValue } = useSelector((state) => state.user);
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [notes, setnotes] = useState([]);
  const [isnotes, setisnotes] = useState(false);
  const [searchedItem, setsearchedItem] = useState(searchedValue);
  const dispatch = useDispatch();
  const issearched = searchedValue;
  const user = currentUser;
  useEffect(() => {
    const fetchallnotes = async () => {
      const res = await axios.get(
        "https://notesharingbackend-ankitkr437.onrender.com/api/notes/"
      );
      setnotes(
        res.data.sort((n1, n2) => {
          return new Date(n2.createdAt) - new Date(n1.createdAt);
        })
      );
      setisnotes(true);
    };
    fetchallnotes();
  }, [user._id]);

  const filterdnotes =
    isnotes &&
    issearched &&
    notes.filter(
      (x) =>
        x.notename &&
        x.notename
          .toLowerCase()
          .includes(searchedValue && searchedValue.toLowerCase())
    );
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(search(searchedItem));
  };
  useEffect(() => {
    dispatch(search(null));
  }, []);
  if (!isnotes) return <Media />;
  return (
    <>
      <Wrapper>
        <SearchContainer onSubmit={searchHandler}>
          <Input
            placeholder="Search notes..."
            onChange={(e) => setsearchedItem(e.target.value)}
          />
          <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 30 }} />
          </SearchButton>
        </SearchContainer>
      </Wrapper>
      {issearched && !filterdnotes.length ? (
        <h4 style={{ textAlign: "center" }}>Not Found</h4>
      ) : issearched && !(searchedValue === "") ? (
        filterdnotes.map((p, i) => <HomePost x={p} key={i} />)
      ) : (
        notes.map((p, i) => <HomePost x={p} key={i} />)
      )}
    </>
  );
};

export default RenderPost;
