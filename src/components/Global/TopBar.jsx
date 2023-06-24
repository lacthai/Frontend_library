import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { logout, resetNotifications } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiUserCircle, BiPowerOff } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./TopBar.css";
import useDarkMode from "../useDarkMode/useDarkMode";

const Topbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef(null);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const handleDropDown = () => {
    setDropdown(!dropdown)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Box className="flex justify-end bg-[#141b2d] dark:bg-white relative"  p={2} ref={ref}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          {isDarkMode ? (
            <LightModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#383838]"/>
          ) : (
            <DarkModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#E0E0E0]"/>
          )}
        </IconButton>
        <IconButton>
          <Link to="/notifications">
          <NotificationsOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
          </Link>
        </IconButton>
        <IconButton onClick={handleDropDown}>
          <SettingsOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
        </IconButton>
        <div className={`${dropdown ? "block" : "hidden"} absolute h-[100px] w-[130px] backdrop-opacity-10 backdrop-invert bg-white/30 bottom-[-90px] right-3 z-50 rounded-xl overflow-hidden`}>
          <Link to="/update-profile" style={{textDecoration: "none"}}><div className="flex justify-center items-center h-[60%] dark:text-[#383838] text-[#E0E0E0] capitalize">
            <PersonOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0] mr-2"/>
          profile
          </div>
          </Link>
          <div className="flex justify-center items-center h-[40%]">
          <Button
              variant="danger"
              onClick={handleLogout}
            >
              <BiPowerOff />
            </Button>
          </div>
        
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
