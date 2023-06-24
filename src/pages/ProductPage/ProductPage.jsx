import axios from "../../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import SimilarProduct from "../../components/SimilarProduct/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../../services/appApi";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { BiArrowFromLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ReactHtmlParser from 'react-html-parser';

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

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

  const images = product.pictures.map((picture) => (
    <img
      className="w-full max-h-[600px] object-contain mx-[5px] rounded-xl"
      src={picture.url}
      onDragStart={handleDragStart}
      alt="img_carousel"
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <div className="150vh overflow-hidden">
      <div className="product_page-index">
        <ul>
          <Link
            to="/category/all"
            style={{ textDecoration: "none" }}
            className="dark:text-[#383838] text-[#f0c35c]"
          >
            <li>Library</li>
          </Link>
          <li>
            <BiArrowFromLeft style={{ color: "#989898" }} />
          </li>
          <Link
            to={`/category/${product.category}`}
            style={{ textDecoration: "none" }}
            className="capitalize dark:text-[#383838] text-[#f0c35c]"
          >
            <li>{product.category}</li>
          </Link>
        </ul>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 h-fit">
        <Slider
          {...settings}
          className="rounded-xl overflow-hidden"
        >
          {images.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
        </Slider>
        <div className="mx-[10px]">
          <h1
            style={{ fontSize: "1.5rem" }}
            className="text-[#fff] dark:text-[#404040]"
          >
            {product.name}
          </h1>
          <p>
            <Badge bg="primary" className="bg-[#6a5af9] dark:bg-[#4cceac]">
              {product.category}
            </Badge>
          </p>
          <p
            className="product__price text-[#fff] dark:text-[#404040]"
            style={{ fontSize: "2rem" }}
          >
            Available: {product.price}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Button
                className="border-none bg-[#6a5af9] dark:bg-[#4cceac]"
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Borrow
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Added to cart"
              body={`${product.name} is in your cart`}
            />
          )}
          <p
            style={{ textAlign: "justify" }}
            className="py-3 text-[#fff] dark:text-[#404040]"
          >
            <strong>Description:</strong> 
          

            {ReactHtmlParser(product.description)}
        
            
          </p>
        </div>
      </div>
      <div className="my-4 col-start-1 col-end-3 row-start-3 row-end-4">
        <h2 className="text-[#fff] dark:text-[#404040] ml-12">Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
