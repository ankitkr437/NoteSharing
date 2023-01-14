import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../Conversation/Conversation.css";
import "../HomepageMessageBox/HomepageMessage.css";
import MessageBox from "../MessageBox/MessageBox.jsx";
import ConversationBox from "../ConversationBox/ConversationBox.jsx";
import OnlineAuthor from "../OnlineAuthor/OnlineAuthor.jsx";
import HomepageMessage from "../HomepageMessageBox/HomepageMessage";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Navbar from '../../../../component/Navbar'

const Chat = () => {
  const [messages, setmessages] = useState([]);
  const [newchat, setnewchat] = useState();
  const [arrivalmessage, setarrivalmessage] = useState(null);
  const [onlineusers, setonlineusers] = useState([]);
  const [iscurrentchat, setiscurrentchat] = useState(false);
  const { currentUser:user } = useSelector((state)=>state.user)
  const pf = "https://notesharingbackend-ankitkr437.onrender.com/images/";
  const [conversationspeople, setconversationspeople] = useState([]);
  const [isfetchconversationspeople, setisfetchconversationspeople] =
 useState(false);
  const { currentchatId } = useParams();
  const takedown = useRef();
  const pastConversation = useRef();
  const allchat = useRef(); 
  const pastConversationButton=useRef();
  const authorsearch = useRef();
   const conversationtitle=useRef();
  const socket = useRef();

  // because connection is making multiple times due to the multiple time reredering of this component so avoiding this we will use useEffect
  useEffect(() => {
    // https://handnotesocket.herokuapp.com/
     
    socket.current = io("ws://notesharingbackend-ankitkr437.onrender.com");
    // socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setarrivalmessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  //    const currentconversation=
     
  const currentconversation = conversationspeople?.find(
    (x) => x._id == currentchatId
  );
  console.log(currentconversation);
  useEffect(() => {
    arrivalmessage &&
      currentconversation.members.includes(arrivalmessage.sender) &&
      setmessages((prev) => [...prev, arrivalmessage]);
  }, [arrivalmessage, currentconversation]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setonlineusers(users);
    });
  }, [user]);
  console.log("onlineuser are" ,onlineusers)
  useEffect(() => {
    const fetchallconversationspeople = async () => {
      try {
        const res = await axios.get(
          "https://notesharingbackend-ankitkr437.onrender.com/api/conversations/" + user._id
        );
        setconversationspeople(res.data.sort((n1, n2) => {
          return new Date(n2.createdAt) - new Date(n1.createdAt)
        }));
        setisfetchconversationspeople(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchallconversationspeople();
    //    isfetchconversationspeople && conversationspeople && setcurrentconversation(conversationspeople?.find((x)=>x._id==currentchatId))
  }, [user._id]);
   
 
  useEffect(() => {
    const fetchallMessages = async () => {
      try {
        const res = await axios.get(
          "https://notesharingbackend-ankitkr437.onrender.com/api/messages/" + currentchatId
        );
        setmessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchallMessages();
  }, [currentchatId]);

  useEffect(() => {
    takedown.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 

  const chathandler = async (e) => {
    e.preventDefault();

    const chat = {
      sender: user._id,
      text: newchat,
      conversationId: currentchatId,
    };
    const receiverId = currentconversation.members.find((x) => x !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newchat,
    });
    const res = await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/messages", chat);
    console.log(res.data);
    setmessages([...messages, res.data]);
    setnewchat("");
  };

 const toggle=()=>{
  if(pastConversation.current.style.display==="none")
  {
    pastConversation.current.style.display="flex";
  }
  else{
    pastConversation.current.style.display="none";
  }
  allchat.current.style.display="flex";
  conversationtitle.current.style.display="none";
 }
  // const pastConversationDisplay=()=>{
  //   pastConversation.current.style.display="flex";
  //   allchat.current.style.display="none";
  //   pastConversationButton.current.style.display="none";
  // }
  // console.log(currentchatId)
  return (
    <>
      <Navbar />
      <div className="chat-1">
        <div className="chat-1-search" ref={pastConversation}>
          {user && isfetchconversationspeople && (
            <div className="messagebox-1">
              <div className="messagebox-1-topbar">
                <p className="messagebox-1-topbar-title">
                  Your past conversations
                </p>

                <form className="messagebox-1-topbar-form">
                  <input
                    type="text"
                    placeholder={`Search your conersation`}
                    className="messagebox-1-topbar-form-input"
                  ></input>
                  <label htmlFor="messagebox-1-topbar-form-submit"></label>
                  <button
                    type="submit"
                    id="messagebox-1-topbar-form-submit"
                    style={{ display: "none" }}
                  ></button>
                </form>
              </div>

              <div className="messagebox-1-allmessage">
                {conversationspeople &&
                  conversationspeople.map((conversationone) => (
                    // onClick={() => setcurrentchat(conversationone)}
                    <div>
                      <Link
                        to={`/message/${conversationone._id}`}
                        style={{ textDecoration: "none" }}
                        onClick={toggle}
                      >
                        <MessageBox
                          conversationone={conversationone}
                          currentuser={user}
                          onlineusers={onlineusers}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="chat-1-inbox" ref={allchat}>
          {/* <div className="past-conversation-button" ref={pastConversationButton}
          onClick={pastConversationDisplay}>
            <p>Past-Conversation</p>
            </div> */}
          <div className="conversation-1">
            <div className="conversation-1-boxes">
              {messages.length!=0 ?
                messages.map((onechat) => (
                  <div ref={takedown}>
                    <ConversationBox
                      onechat={onechat}
                      my={onechat.sender === user._id}
                    />
                  </div>
                ))
               :
                <p className="conversation-1-title" style={{paddingTop:"12vh",color:"darkgray"}} ref={conversationtitle}>
                     Select conversation to start chat
                 </p>
              }
             
            </div>
            <form className="conversation-1-form" onSubmit={chathandler}>
              <input
                type="text"
                placeholder="Enter your message here"
                className="conversation-1-input"
                onChange={(e) => setnewchat(e.target.value)}
                value={newchat}
              ></input>
              <button type="submit" className="conversation-1-submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="chat-1-online" ref={authorsearch}>
          <HomepageMessage />
        </div>
      </div>
    </>
  );
};

export default Chat;
