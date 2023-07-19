import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProducts } from "../../features/productSlice";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataBannerHome } from "./dataImageHome";
import LogoIU from "../../assets/LogoIU.png";
import bannerlogin from "../../assets/login_page.png";
import { FiClock } from "react-icons/fi";
import { BiUserPin , BiDotsVerticalRounded} from "react-icons/bi";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  const user = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [users, setUsers] = useState([]);

  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [showDiv3, setShowDiv3] = useState(false);
  const [showDiv4, setShowDiv4] = useState(false);
  const divRef = useRef(null);


  const targetDivRef = useRef(null);

  const scrollToDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleButtonClick1 = () => {
    setShowDiv1(!showDiv1);
  };
  const handleButtonClick2 = () => {
    setShowDiv2(!showDiv2);
  };
  const handleButtonClick3 = () => {
    setShowDiv3(!showDiv3);
  };
  const handleButtonClick4 = () => {
    setShowDiv4(!showDiv4);
  };



  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const noAdminUser = users.filter(user => !user.isAdmin);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }



  useEffect(() => {
    const currentHour = new Date().getHours();
    let newGreeting;

    if (currentHour >= 0 && currentHour < 12) {
      newGreeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    Speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  return (
    <div>
      {!user.isAdmin && (
        <div className="grid grid-cols-3 grid-rows-2 w-full h-full">
          <Slider
            {...settings}
            className="row-start-1 row-end-2 col-start-1 col-end-3"
          >
            {dataBannerHome.map((item) => (
              <div className="layout_banner">
                <div className="banner_desc">
                  <h1 style={{ color: `${item.color}` }}>{item.title}</h1>
                  <p className="dark:text-[#383838] text-[#F5F5F5]">
                    {item.description}
                  </p>
                </div>
                <div className="banner_img">
                  <img src={item.linkImg} alt="images banner" />
                </div>
              </div>
            ))}
          </Slider>
          <div className="row-start-1 row-end-2 col-start-3 col-end-4 w-full -h-full flex justify-center items-center flex-col">
            <h2 className="text-[1.6rem] mb-4 dark:text-[#383838] text-[#F5F5F5]">
              International University
            </h2>
            <img
              src={LogoIU}
              alt="Logo_IU"
              className="h-[30%] w-[40%] rounded-full border-solid border-4 border-white "
            />
            <p className="uppercase text-[1.7rem] text-center mt-7 font-semibold text-[#6a5af9] dark:text-[#4cceac]">
              new learning website
            </p>
          </div>
          <div className="row-start-2 row-end-3 col-start-1 col-end-4 w-full h-full">
            <img src={bannerlogin} alt="banner_login" className="" />
          </div>
        </div>
      )}
      {user.isAdmin && (
      <div className="h-[200vh]">
        <div className="h-[80px] w-full flex justify-between items-center mb-2">
          <p className="ml-6 text-[2rem] font-semibold text-[#1e1b57]">{greeting}, <span className="text-[#4cceac]">{user.name}</span> !</p>
          <p className="mr-6 text-[2rem] text-[#A9A9A9] flex justify-center items-center"><span className="mr-4 h-fit w-fit p-2 font-medium rounded-2xl flex justify-center items-center"><FiClock className="mr-1"/>{currentTime}</span>{new Date().toDateString()}</p>
        </div>
        <div className="w-full h-[250px] grid grid-cols-4 grid-rows-1 px-6 gap-5">
          <div className="detail_admin-home h-full col-start-1 col-end-2 bg-[#ffffff] rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center relative hover:z-[999]">
              <div className="h-[20%] w-[80%] mt-3 flex justify-between">
                  <BiUserPin className=" text-[2.9rem] mt-6 text-[#1e1b57]"/>
                  <BiDotsVerticalRounded className=" text-[1.5rem] hover:bg-[#E8E8E8] rounded-full cursor-pointer text-[#1e1b57]" onClick={handleButtonClick1}/>
              </div>
              <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
                  <p className="text-[2rem] text-[#1e1b57]">Student</p>
                  <p className="text-[2.5rem] bg-[#4cceac] px-[20px] rounded-full text-[#ffffff]">{noAdminUser.length}</p>
              </div>
              {showDiv1 && (
              <div ref={divRef} className="detail_show-admin absolute bg-[#ffffff] h-[70%] w-[330px] bottom-2 right-[-90%] rounded-3xl z-50 grid grid-cols-1 grid-rows-3">
                <div className="flex items-center border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] hover:rounded-t-3xl text-[#484848] cursor-pointer" onClick={scrollToDiv}>
                  <BarChartIcon className="ml-3 mr-8 text-[#484848]"/>View diagram report
                  </div>
                <div className="flex items-center bg-[#f5f7fb] border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <PeopleIcon className="ml-3 mr-8"/>View details database
                </Link>
                  </div>
                <div className="flex items-center font-semibold hover:bg-[#F5F5F5] hover:rounded-b-3xl text-[#484848]">
                  <Link to="/signup" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <GroupAddIcon className="ml-3 mr-8"/>Create more student
                  </Link>
                </div>
              </div>
              )}
          </div>
          <div className="detail_admin-home h-full col-start-2 col-end-3 bg-[#ffffff] rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center relative hover:z-[999]">
          <div className="h-[20%] w-[80%] mt-3 flex justify-between">
                  <LocalMallIcon className=" text-[2.9rem] mt-6 text-[#1e1b57]"/>
                  <BiDotsVerticalRounded className=" text-[1.5rem] hover:bg-[#E8E8E8] rounded-full cursor-pointer text-[#1e1b57]" onClick={handleButtonClick2}/>
              </div>
              <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
                  <p className="text-[2rem] text-[#1e1b57]">Order</p>
                  <p className="text-[2.5rem] bg-[#4cceac] px-[20px] rounded-full text-[#ffffff]">{noAdminUser.length}</p>
              </div>
              {showDiv2 && (
              <div ref={divRef} className="detail_show-admin absolute bg-[#ffffff] h-[70%] w-[330px] bottom-2 right-[-90%] rounded-3xl z-50 grid grid-cols-1 grid-rows-3">
                <div className="flex items-center border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] hover:rounded-t-3xl text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <BarChartIcon className="ml-3 mr-8"/>View diagram report
                </Link>
                  </div>
                <div className="flex items-center bg-[#f5f7fb] border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <PeopleIcon className="ml-3 mr-8"/>View details database
                </Link>
                  </div>
                <div className="flex items-center font-semibold hover:bg-[#F5F5F5] hover:rounded-b-3xl text-[#484848]">
                  <Link to="/signup" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <GroupAddIcon className="ml-3 mr-8"/>Create more student
                  </Link>
                </div>
              </div>
              )}
          </div>
          <div className="detail_admin-home h-full col-start-3 col-end-4 bg-[#ffffff] rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center relative hover:z-[999]">
          <div className="h-[20%] w-[80%] mt-3 flex justify-between">
                  <LocalLibraryIcon className=" text-[2.9rem] mt-6 text-[#1e1b57]"/>
                  <BiDotsVerticalRounded className=" text-[1.5rem] hover:bg-[#E8E8E8] rounded-full cursor-pointer text-[#1e1b57]" onClick={handleButtonClick3}/>
              </div>
              <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
                  <p className="text-[2rem] text-[#1e1b57]">Library</p>
                  <p className="text-[2.5rem] bg-[#4cceac] px-[20px] rounded-full text-[#ffffff]">{noAdminUser.length}</p>
              </div>
              {showDiv3 && (
              <div ref={divRef} className="detail_show-admin absolute bg-[#ffffff] h-[70%] w-[330px] bottom-2 right-[-90%] rounded-3xl z-50 grid grid-cols-1 grid-rows-3">
                <div className="flex items-center border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] hover:rounded-t-3xl text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <BarChartIcon className="ml-3 mr-8"/>View diagram report
                </Link>
                  </div>
                <div className="flex items-center bg-[#f5f7fb] border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <PeopleIcon className="ml-3 mr-8"/>View details database
                </Link>
                  </div>
                <div className="flex items-center font-semibold hover:bg-[#F5F5F5] hover:rounded-b-3xl text-[#484848]">
                  <Link to="/signup" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <GroupAddIcon className="ml-3 mr-8"/>Create more student
                  </Link>
                </div>
              </div>
              )}
          </div>
          <div className="detail_admin-home h-full col-start-4 col-end-5 bg-[#ffffff] rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center relative hover:z-[999]">
          <div className="h-[20%] w-[80%] mt-3 flex justify-between">
                  <BiUserPin className=" text-[2.9rem] mt-6 text-[#1e1b57]"/>
                  <BiDotsVerticalRounded className=" text-[1.5rem] hover:bg-[#E8E8E8] rounded-full cursor-pointer text-[#1e1b57]" onClick={handleButtonClick4}/>
              </div>
              <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
                  <p className="text-[2rem] text-[#1e1b57]">Student</p>
                  <p className="text-[2.5rem] bg-[#4cceac] px-[20px] rounded-full text-[#ffffff]">{noAdminUser.length}</p>
              </div>
              {showDiv4 && (
              <div ref={divRef} className="detail_show-admin absolute bg-[#ffffff] h-[70%] w-[330px] bottom-2 right-[10%] rounded-3xl z-50 grid grid-cols-1 grid-rows-3">
                <div className="flex items-center border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] hover:rounded-t-3xl text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <BarChartIcon className="ml-3 mr-8"/>View diagram report
                </Link>
                  </div>
                <div className="flex items-center bg-[#f5f7fb] border-b-[2px] border-[#F0F0F0] font-semibold hover:bg-[#F5F5F5] text-[#484848]">
                <Link to="/manageStudent" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <PeopleIcon className="ml-3 mr-8"/>View details database
                </Link>
                  </div>
                <div className="flex items-center font-semibold hover:bg-[#F5F5F5] hover:rounded-b-3xl text-[#484848]">
                  <Link to="/signup" className="text-[#484848]" style={{textDecoration: "none"}}>
                  <GroupAddIcon className="ml-3 mr-8"/>Create more student
                  </Link>
                </div>
              </div>
              )}
          </div>
        </div>
        <div className="w-full h-[500px]" ref={targetDivRef}>
          <p className="mt-4 ml-6 text-[2rem] text-[#1e1b57] font-semibold">Bar chart showing the number of new students every day of the week</p>
          <BarChart />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 w-full h-[400px] mt-[100px]">
          <div className="grid col-start-1 col-end-2 row-start-1 row-end-3">
                <PieChart />
          </div>
          <div className="">
                
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
