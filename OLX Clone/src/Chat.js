import React, { useState } from "react";

function Chat({ userType }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Don't send empty messages
    const newMessageObj = {
      text: newMessage,
      sender: userType, // Buyer or Seller
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "Buyer" ? "buyer" : "seller"
            }`}
          >
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
