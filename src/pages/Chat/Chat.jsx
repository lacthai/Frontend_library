import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import WelcomeChat from "../../components/WelcomeChat/WelcomeChat";
import ContactChat from "../../components/ContactChat/ContactChat";
import ChatContainer from "../../components/ChatContainer/ChatContainer";

const Chat = () => {

  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);




  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://chat-real-time-hgic.onrender.com");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className="dark:bg-[#131324] bg-[#fff8dc]">
        <div className="container">
          <ContactChat contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <WelcomeChat />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
};


export default Chat;
