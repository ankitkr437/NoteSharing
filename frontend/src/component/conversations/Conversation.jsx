import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF ="https://notesharingbackend-ankitkr437.onrender.com/images/"
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await publicRequest("/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user && user.profilePicture ? user.profilePicture : PF + "DefaultPic.png"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}