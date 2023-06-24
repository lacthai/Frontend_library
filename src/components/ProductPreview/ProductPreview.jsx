import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";
import { BiDollarCircle } from "react-icons/bi";

function ProductPreview({ _id, category, name, pictures}) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }} className="card_product-preview">
                <Card.Img variant="top" className="product-preview-img h-[250px] object-cover" src={pictures[0].url} />
                <Card.Body>
                    <Card.Title className="home_product--name text-black">{name}</Card.Title>
                    <Card.Footer className="flex justify-center items-center text-black capitalize"><p className="m-auto p-[5px] w-fit h-auto bg-[#1877F2] font-bold text-white rounded-xl">{category}</p></Card.Footer>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProductPreview;