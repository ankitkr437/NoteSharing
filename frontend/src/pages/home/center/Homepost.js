import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import Post from "../../../component/post/Post";
import { publicRequest } from "../../../requestMethods";
const HomePost = ({ x }) => {
  const [postuser, setpostuser] = useState(null);

  useEffect(() => {
    const fetchuser = async (req, res) => {
      try {
        const res = await publicRequest.get("users/" +x.userId);
        setpostuser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuser();
  }, []);

  return (
    <>
      <Post note={x} postUser={postuser} />
    </>
  );
};

export default HomePost;
