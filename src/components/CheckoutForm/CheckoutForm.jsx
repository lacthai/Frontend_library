import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../services/appApi";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function    CheckoutForm() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [paying, setPaying] = useState(false);
    const [maxDate, setMaxDate] = useState("");
  
    useEffect(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const today = `${year}-${month}-${day}`;
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextWeekYear = nextWeek.getFullYear();
      const nextWeekMonth = (nextWeek.getMonth() + 1).toString().padStart(2, "0");
      const nextWeekDay = nextWeek.getDate().toString().padStart(2, "0");
      const nextWeekDate = `${nextWeekYear}-${nextWeekMonth}-${nextWeekDay}`;
      setBorrowDate(today);
      setMaxDate(nextWeekDate);
    }, []);

    async function handlePay(e) {

        e.preventDefault();
        if (user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:8080/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: user.cart.length }),
        }).then((res) => res.json());
        setPaying(false);
            createOrder({ userId: user._id, cart: user.cart, borrowDate, returnDate }).then((res) => {
                if (!isLoading && !isError) {
                    setTimeout(() => {
                        navigate("/orders");
                    }, 3000);
                }
            });
        
    }

    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                <Row className="mb-10">
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-[#fff] dark:text-[#404040] capitalize font-semibold">student name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" value={user.name} disabled className="uppercase h-[50px] font-bold"/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-[#fff] dark:text-[#404040] font-semibold">Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled className="h-[50px] font-bold"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3 flex flex-col">
                            <Form.Label className="text-[#fff] dark:text-[#404040] capitalize font-semibold">start date</Form.Label>
                            <input type="date"   id="startDateInput" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} className="border-[1px] border-[#B8B8B8] h-[50px] rounded-md px-4 font-bold" disabled/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3 flex flex-col">
                            <Form.Label className="text-[#fff] dark:text-[#404040] capitalize font-semibold">return date*</Form.Label>
                            <input type="date"  id="endDateInput" max={maxDate} min={borrowDate} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="border-[1px] border-[#B8B8B8] h-[50px] rounded-md px-4 font-bold cursor-pointer"/>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                    {paying ? "Processing..." : "Pay"}
                </Button> */}
                <div>
                    <PriorityHighIcon className=" border-[1px] border-[#989898] m-2 p-1 rounded-full text-[2rem] text-[#fff] dark:text-[#404040]"/>
                    <em className="font-thin text-[#A8A8A8] italic">You can only choose a return date no later than one week from the date of order</em>
                </div>
                
                <Row className="mt-10 duration-200">
                    <Col md={6}>
                      <button className="w-full h-[50px] capitalize dark:bg-[#181818] bg-[#F0F0F0] dark:text-[#F5F5F5] text-[1.3rem] font-medium  text-[#303030] rounded-xl hover:scale-[1.03] duration-300"
                      type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                        {paying ? "Processing..." : "Borrow"}
                    </button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
}

export default CheckoutForm;