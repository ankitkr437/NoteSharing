import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const pf="https://notesharingbackend-ankitkr437.onrender.com/images/";
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={pf + "DefaultPic.png"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}