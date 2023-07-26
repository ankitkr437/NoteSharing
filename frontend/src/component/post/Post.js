import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ThumbUp,
  ThumbUpAltOutlined,
  Visibility,
  Comment,
  Edit,
  Delete,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import "./Post.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
const Post = ({ note, postUser }) => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [like, setlike] = useState(note.likes.length);
  const [islike, setislike] = useState(false);
  const [isseen, setisseen] = useState(false);
  const [seen, setseen] = useState(note.buy.length);
  const [allcomment, setallcomment] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    setislike(note.likes.includes(user._id));
  }, [user._id, note.likes]);

  useEffect(() => {
    setisseen(note.buy.includes(user._id));
  }, [user._id, note.seen]);
  useEffect(() => {
    const fetchComment = async (req, res) => {
      try {
        const res = await publicRequest.get("comments/" + note._id);
        setallcomment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, []);

  const likehandler = () => {
    try {
      publicRequest.put("notes/" + note._id + "/like", { userId: user._id });
    } catch (err) {}
    setlike(islike ? like - 1 : like + 1);
    setislike(!islike);
  };
  const seenhandler = async () => {
    try {
      await publicRequest.put("notes/" + note._id + "/buy", {
        userId: user._id,
      });
    } catch (err) {}
    setseen(isseen ? seen - 1 : seen + 1);
    setisseen(!isseen);
    window.open(note.notefilename, "_blank").focus();
  };
  const DeleteNotes = async () => {
    let response = prompt(
      `Do you really want to delete this note if yes then type "YES" or type "NO" `
    );
    try {
      response === "YES" &&
        (await publicRequest.delete(`notes/${note._id}`, { userId: user._id }));
      response === "YES" && alert("notes deleted successfully");
      response === "YES" && window.location.reload();
    } catch (err) {
      alert("sorry you can not delete this note");
      console.log("unsuccess");
    }
  };

  return (
    <>
      <div className="post-container" key={note._id}>
        <div className="post-topbar" style={{ lineHeight: "1" }}>
          <Link
            to={`/profile/${note.userId}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                postUser && postUser.profilePicture
                  ? postUser.profilePicture
                  : pf + "DefaultPic.png"
              }
              className="post-topbar-img"
            ></img>
          </Link>
          <div className="post-topbar-desc">
            <Link
              to={`/profile/${note.userId}`}
              style={{ textDecoration: "none" }}
            >
              <p className="post-topbar-name">
                {postUser && postUser.username}
              </p>
            </Link>
            <div className="post-topbar-follow-ago-container">
              <p>{postUser && postUser.followers.length} Followers</p>
              <p style={{marginLeft:"5px"}}>{format(note.createdAt)}</p>
            </div>
          </div>

          {user && note && note.userId === user._id && (
            <div className="post-topbar-edit-delete-container">
              <Link
                to={`/note/update/${note._id}`}
                style={{ textDecoration: "none",color:"black" }}
                className="post-topbar-edit-icon"
              >
                <Edit />
              </Link>
              <Delete onClick={DeleteNotes} className="delete-icon" />
            </div>
          )}
        </div>

        <div className="main-post" style={{ height: "57vh" }}>
          <div className="main-post-img-container" onClick={seenhandler}>
            <img
              src={
                note.thumbnailfilename
                  ? note.thumbnailfilename
                  : pf + "images-notes.jpg"
              }
              alt="note-thumbnail"
            ></img>
            <div className="View-pdf-1" onClick={seenhandler}>
              <p>View-pdf</p>
              <img src="/image/icons8-view-50.png" />
            </div>
          </div>
          <div className="main-post-about" style={{ lineHeight: "1.4" }}>
              <p className="main-post-notename">{note.notename}</p>
            <p className="main-post-description">Description:</p>
            <p className="main-post-desc">{note.desc}</p>
          </div>
        </div>

        <div className="post-reaction-container">
          <div className="post-reaction">
            {islike ? (
              <ThumbUp onClick={likehandler} style={{ color: " #3E8DE3" }} />
            ) : (
              <ThumbUpAltOutlined onClick={likehandler} />
            )}
            <p>{like}</p>
          </div>
          <Link
            to={`/viewcomment/${note._id}`}
            className="link-in-comment"
            style={{ textDecoration: "none",color:"black" }}
          >
            <div className="post-reaction">
              <Comment />
              <p>{allcomment.length}</p>
            </div>
          </Link>
          <div className="post-reaction">
            <Visibility />
            <p>{note.buy.length}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
