import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../axios";
import Loading from "../../components/Loading/Loading";
import "./OrdersPage.css";
import { TbShoppingCartOff } from "react-icons/tb";

function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return  (
            <div className="no_order-container">
                <p style={{backgroundColor: "#EFC050", borderRadius: "50%", padding: "30px"}}><TbShoppingCartOff style={{fontSize: "3rem", color: "#ffffff"}}/></p>
                <h1 className="text-center pt-3 text-[#909090]">No orders yet</h1>
            </div>
        )
    }

    return (
        <Container className="mb-lg-5 h-[120vh]">
            <div className="order_img"></div>
            <h1 className="text-center order_title text-[#ffffff] dark:text-black">Your orders</h1>
            <Table responsive striped bordered hover className="text-[#ffffff] dark:text-black">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Date Borrow</th>
                        <th>Date Return</th>
                        <th>Total Book</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td className="text-[#ffffff] dark:text-black">{order._id}</td>
                            <td>
                                <Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="text-[#ffffff] dark:text-black">{order.borrowDate}</td>
                            <td className="text-[#ffffff] dark:text-black">{order.returnDate}</td>
                            <td className="text-[#ffffff] dark:text-black">{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default OrdersPage;