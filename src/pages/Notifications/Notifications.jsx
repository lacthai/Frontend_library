import React from "react";
import "./Notifications.css";
import { MdNotificationImportant } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai"; 


const dataNotification = [
  {
    id: 1,
    product: "science",
    time: "just now",
  },
  {
    id: 2,
    product: "food",
    time: "3 hour ago",
  },
  {
    id: 3,
    product: "history",
    time: "a week ago",
  },
  {
    id: 4,
    product: "science & computer",
    time: "a month ago",
  },
];

const Notifications = () => {
  return (
    <div className="h-[120vh] flex justify-center">
      <div className="conatiner-notifications w-[90%] h-fit rounded-lg flex justify-center items-center flex-col">
        <p className=" font-semibold m-6 text-[#ffffff] dark:text-black">
          Check your messages and pay attention to the return deadlines
        </p>
        {dataNotification.map((key) => (
          <>
            <div className="conatiner-detail_notifications h-[60px] w-[95%] rounded-lg border-[1px] border-[#dcdddf] flex items-center justify-between mb-7 relative z-[999]">
              <div className="ml-[2%] h-[85%] w-[60px] bg-[#F08080] flex justify-center items-center rounded-xl">
                <MdNotificationImportant className="text-[1.3rem] text-[#C60C30]" />
              </div>
              <div className="h-[100%] ml-[4rem] flex justify-center items-center">
                <p className="mr-5 text-[#ffffff] dark:text-black">ID: {key.id}</p>
                <p className="text-[#ffffff] dark:text-black">{key.product}</p>
              </div>
              <p className="text-[#B8B8B8] mr-2">{key.time}</p>
              <div className=" absolute h-[50px] bg-[#dcdddf] w-[2px] left-[5%] bottom-[0px] translate-y-full z-[-1]">
              </div>
            <AiFillPlusCircle className=" absolute top-full text-[2rem] left-[3.5%] bottom-[0px] translate-y-full z-[-1] text-[#2c6eff]"/>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
