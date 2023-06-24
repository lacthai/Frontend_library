import React, { useState, useEffect } from "react";

import Hello from "../../assets/hello.gif";


const WelcomeChat = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setName =  async () => {
        setUserName(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          ).username
        );
    }
    setName();
  }, []);
  return (
    <div className="flex justify-center items-center text-[#ffffff] flex-col">
      <img src={Hello} alt="" className="h-[20rem]"/>
      <h2>
        Welcome, <span className="dark:text-[#4e0eff] text-[#eedc82]">{userName}!</span>
      </h2>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}


export default WelcomeChat;