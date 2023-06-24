import React from "react";
import ExpandIcon from "@mui/icons-material/Expand";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Document = () => {
  return (
    <div className="w-full h-[150vh]">
      <div className="grid grid-cols-8 w-full border-t-[1px] border-b-[4px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
        />
        <p className="text-[1.5rem] my-auto capitalize text-[#707070]">#</p>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]  text-[#707070] col-start-3 col-end-5">
          customer
        </h4>
        <h4 className="my-auto text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] uppercase text-[#707070]">
          company
        </h4>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          status <ExpandIcon className="hidden sm:hidden md:block lg:block"/>
        </h4>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          production <ExpandIcon className="hidden sm:hidden md:block lg:block"/>
        </h4>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          value <ExpandIcon className="hidden sm:hidden md:block lg:block"/>
        </h4>
      </div>

    {/* detail table */}

      <div className="grid grid-cols-8 w-full border-b-[1px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
        />
        <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2]">25200</p>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
          <img
            src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="avata"
            className="h-[40px] w-[40px] rounded-full mr-3 hidden sm:hidden md:block lg:block"
          />
          Grey Pentland
        </div>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          TestPrody
        </h4>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] flex items-center">
            <span className="text-[#00563B] bg-[#17B169] p-2 rounded-xl font-bold">saved</span>
        </div>
        <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2]">
          <FiberManualRecordIcon className="text-[#909090]"/> on hold - amount due
        </h4>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          $ 14.00
        </h4>
      </div>

      <div className="grid grid-cols-8 w-full border-b-[1px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
        />
        <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2]">25200</p>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
          <img
            src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="avata"
            className="h-[40px] w-[40px] rounded-full mr-3 hidden sm:hidden md:block lg:block"
          />
          Grey Pentland
        </div>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          TestPrody
        </h4>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] flex items-center">
            <span className="text-[#f27935] bg-[#f9bf3b] p-2 rounded-xl font-bold">saved</span>
        </div>
        <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2]">
          <FiberManualRecordIcon className="text-[#909090]"/> on hold - amount due
        </h4>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          $ 14.00
        </h4>
      </div>

      <div className="grid grid-cols-8 w-full border-b-[1px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
        />
        <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2]">25200</p>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
          <img
            src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="avata"
            className="h-[40px] w-[40px] rounded-full mr-3 hidden sm:hidden md:block lg:block"
          />
          Grey Pentland
        </div>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          TestPrody
        </h4>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] flex items-center">
            <span className="text-[#00563B] bg-[#17B169] p-2 rounded-xl font-bold">saved</span>
        </div>
        <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2]">
          <FiberManualRecordIcon className="text-[#909090]"/> on hold - amount due
        </h4>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          $ 14.00
        </h4>
      </div>

      <div className="grid grid-cols-8 w-full border-b-[1px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
        />
        <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2]">25200</p>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
          <img
            src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="avata"
            className="h-[40px] w-[40px] rounded-full mr-3 hidden sm:hidden md:block lg:block"
          />
          Grey Pentland
        </div>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          TestPrody
        </h4>
        <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] flex items-center">
            <span className="text-[#0076CE] bg-[#00BFFF] p-2 rounded-xl font-bold">saved</span>
        </div>
        <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2]">
          <FiberManualRecordIcon className="text-[#909090]"/> on hold - amount due
        </h4>
        <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
          $ 14.00
        </h4>
      </div>
    </div>
  );
};

export default Document;
