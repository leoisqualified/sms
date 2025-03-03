import React, { useState } from "react";
import "./Messages.css";

const Messages = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Message Sent:", message);
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messages;
