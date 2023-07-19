import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";


export const LayoutApp = ({ children }) => {

  const [isSidebar, setIsSidebar] = useState(true);
  

  return (
    <>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar}/>
            <main className="content bg-[#141b2d] dark:bg-[#f8fafb] ">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
      </>
  );
};