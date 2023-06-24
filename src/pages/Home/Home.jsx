import React, { useEffect } from "react";
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
import bannerlogin from "../../assets/login_page.png"

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);

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
    <div className="grid grid-cols-3 grid-rows-2 w-full h-full">
      <Slider
        {...settings}
        className="row-start-1 row-end-2 col-start-1 col-end-3"
      >
        {dataBannerHome.map((item) => (
          <div className="layout_banner">
            <div className="banner_desc">
              <h1 style={{ color: `${item.color}` }}>{item.title}</h1>
              <p className="dark:text-[#383838] text-[#F5F5F5]">{item.description}</p>
            </div>
            <div className="banner_img">
              <img src={item.linkImg} alt="images banner" />
            </div>
          </div>
        ))}
      </Slider>
      <div className="row-start-1 row-end-2 col-start-3 col-end-4 w-full -h-full flex justify-center items-center flex-col">
       <h2 className="text-[1.6rem] mb-4 dark:text-[#383838] text-[#F5F5F5]">International University</h2>
        <img
          src={LogoIU}
          alt="Logo_IU"
          className="h-[30%] w-[40%] rounded-full border-solid border-4 border-white "
        />
      <p className="uppercase text-[1.7rem] text-center mt-7 font-semibold text-[#6a5af9] dark:text-[#4cceac]">new learning website</p>
      </div>
      <div className="row-start-2 row-end-3 col-start-1 col-end-4 w-full h-full">
          <img src={bannerlogin} alt="banner_login" className=""/>
      </div>
    </div>
  );
};

export default Home;
