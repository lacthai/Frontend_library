import React, { useState, useEffect } from "react";



const ContactChat = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchContact, setSearchContact] = useState("");
  useEffect(() => {
    const currentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    currentUser();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="dark:bg-[#080420] bg-[#909090] contactchat-container">
          <div className="brand">
            <img src="#" alt="logo" />
            <h3 className="dark:text-white text-orange-300">PeaChat</h3>
          </div>
          <div className="searching">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearchContact(e.target.value);
              }}
              className="dark:bg-[#787878] #D8D8D8 dark:text-white text-neutral-600"
            />
          </div>
          <div className="contacts">
            {contacts.filter((val)=> {
              if (searchContact === "") {
                return val;
              }
              else if (val.username.toLowerCase().includes(searchContact.toLowerCase())) {
                return val;
              }
            }).map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`dark:bg-[#ffffff34] bg-[#F5F5F5] min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] 
                              p-[0.4rem] flex gap-[1rem] items-center ease-in-out duration-[0.5s]  ${
                    index === currentSelected ? "dark:bg-[#9370DB] bg-[#ffdab9]" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-[3rem]"
                    />
                  </div>
                  <div className="username">
                    <h3 className="dark:text-white text-black">{contact.username}</h3>
                    <h4>{}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user dark:bg-[#0d0d30] bg-[#D0D0D0]">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2 className="dark:text-white text-[#606060]">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default ContactChat;
