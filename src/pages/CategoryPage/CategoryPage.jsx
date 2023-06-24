import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../../components/Pagination/Pagination";
import Slider from "react-slick";
import { dataBannerCategory, iconCategory } from "./dataBannerCategory";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
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
    setLoading(true);
    const deBounce =  setTimeout(() => {
      axios
        .get(`/products/category/${category}`)
        .then(({ data }) => {
          console.log(data)
          setLoading(false);
          setProducts(data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.message);
    })
      }, 1000);
      return () => clearTimeout(deBounce);
  }, [category]);

  if (loading) {
    <Loading />;
  }

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function ProductSearch({ _id, category, name, pictures}) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
      />
    );
  }

  return (
    <div className={`${category}-page-container`}>
      {category === "all" && (
        <>
          <Slider
            {...settings}
            className="row-start-1 row-end-2 col-start-1 col-end-5"
          >
            {dataBannerCategory.map((item, index) => (
              <div key={index} className="w-full h-[450px] p-[20px]">
                <img
                  src={require("../../assets/Banner_category/" +
                    item.linkImg +
                    ".png")}
                  alt="image_banner"
                  className="w-full h-full rounded-3xl"
                />
              </div>
            ))}
          </Slider>
          <div className="row-start-2 row-end-3 col-start-1 col-end-5 flex justify-center items-center mt-5">
            <div className="w-[90%] h-[350px] grid grid-rows-4 grid-cols-4 ">
              {iconCategory.map((item) => (
                <Link
                  className="my-[15px] mx-[30px] p-1 rounded-xl flex flex-row justify-start hover:bg-slate-500"
                  to={`/category/${item.title}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={require("../../assets/icon_category/icon_" +
                      item.title +
                      ".png")}
                    alt={"icon " + item.title}
                    className="object-cover"
                  />
                  <p className="my-auto ml-[8px] capitalize text-white dark:text-[#484848] font-bold text-[1rem]">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {!category === "all" && (
        <div
          className={`pt-3 ${category}-banner-container category-banner-container row-start-3 row-end-4 col-start-1 col-end-5`}
        >
          <h1 className="text-center">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        </div>
      )}

      <div className="row-start-3 row-end-4 col-start-1 col-end-5 mx-12 my-7">

      <Box
        display="flex"
        borderRadius="3px"
        className="w-[300px] h-[50px] bg-[#1f2a40] dark:bg-[#909090]"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} 
        className="text-[#FFFFFF] dark:text-[#E8E8E8]"/>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon className="text-[#FFFFFF] dark:text-[#E8E8E8]"/>
        </IconButton>
      </Box>
      </div>

      {/* <div className="filters-container search-product row-start-3 row-end-4 col-start-1 col-end-5">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div> */}

      {productsSearch.length === 0 ? (
        <div className={category === "all" ? `not_product row-start-4 row-end-5 col-start-1 col-end-5` : `not_product`}>
          <h1>Don't have any books</h1>
        </div>
      ) : (
        <div  className="row-start-4 row-end-5 col-start-1 col-end-5 h-[150vh]">
          <Pagination
            data={productsSearch}
            RenderComponent={ProductSearch}
            pageLimit={2}
            dataLimit={10}
            tablePagination={false}
          />

          {/* <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    href="/category/all"
                    className="btn_dashboard btn_hover"
                  >
                    All products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/category/phones"
                    className="btn_dashboard btn_hover"
                  >
                    Phones
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/category/laptops"
                    className="btn_dashboard btn_hover"
                  >
                    Laptops
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/category/technology"
                    className="btn_dashboard btn_hover"
                  >
                    Others Technology
                  </Nav.Link>
                </Nav.Item>
              </Nav> */}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
