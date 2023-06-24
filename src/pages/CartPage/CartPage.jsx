import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../../services/appApi";
import "./CartPage.css";

const stripePromise = loadStripe(
  "pk_test_51LmYQLICScwDBaXPdypFAEiblWWA6FBbmJC1WSiUbNVBQAsjYOzHz58MzF5oEXJJCeZLlRclrhur1GidyOPuUUou00y1Rdgze9"
);

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert("Can't proceed");
    decreaseCart(product);
  }

  return (
    <div className="h-[150vh]">
      <Container style={{ minHeight: "95vh" }} className="cart-container mb-5">
        <div className="cart_img"></div>
        <Row>
          <Col>
            <h1 className="pt-2 h3 cart_title text-[#fff] dark:text-[#404040] mb-8">Borrowing cart</h1>
            {cart.length === 0 ? (
              <Alert variant="info">
                Borrowing cart is empty. Add books to your cart
              </Alert>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Col>
          {cart.length > 0 && (
            <Col md={5}>
              <>
                <Table responsive="sm" className="cart-table">
                  <thead>
                    <tr>
                      <th className="font-bold capitalize text-[1.3rem] pb-4 w-[30%] text-[#fff] dark:text-[#404040]">your book</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* loop through cart products */}
                    {cart.map((item) => (
                      <tr key={item}>
                        <td>
                          {!isLoading && (
                            <i
                              className="fa fa-times text-[#fff] dark:text-[#404040]"
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                              ></i>
                          )}
                          <img
                            src={item.pictures[0].url}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                            alt="cart_page"
                          />
                        </td>
                        {/* <td>${item.price}</td>
                        <td>
                          <span className="quantity-indicator">
                            <i
                              className="fa fa-minus-circle"
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                            <span>{user.cart[item._id]}</span>
                            <i
                              className="fa fa-plus-circle"
                              onClick={() =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                          </span>
                        </td>
                        <td>${item.price * user.cart[item._id]}</td> */}
                        <td>
                          <div className="">
                            <h2 className="text-[1rem] font-semibold  text-[#fff] dark:text-[#202020]">{item.name}</h2>
                            <div className="flex mt-4">
                              <p className="dark:text-[#282828] text-[#fff]  font-bold capitalize mr-12"><span className=" font-normal capitalize text-[#B8B8B8] mr-2">type:</span>{item.category}</p>
                              <p className="dark:text-[#282828] text-[#fff]  font-bold capitalize mr-12"><span className=" font-normal capitalize text-[#B8B8B8] mr-2">available:</span>{item.price}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="sub_total mx-4">
                  <h3 className="capitalize font-semibold text-[#fff] dark:text-[#404040]">total book:</h3>
                  <h3 className="font-semibold text-[#fff] dark:text-[#404040]">
                    {cart.length}
                  </h3>
                </div>
              </>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
