import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../services/appApi";
import axios from "../../axios";
import "./NewProduct.css";
import { TiDeleteOutline } from "react-icons/ti";
import { iconCategory } from "../CategoryPage/dataBannerCategory";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

    function handleRemoveImg(imgObj) {
      setImgToRemove(imgObj.public_id);
      axios
          .delete(`/images/${imgObj.public_id}/`)
          .then((res) => {
              setImgToRemove(null);
              setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
          })
          .catch((e) => console.log(e));
  }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 500);
            }
        });
    }

    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "thesisweb",
                uploadPreset: "cd1nwcfc",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

  return (
    <div className="h-[150vh]">

    <Container className="mb-5">
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4 text-[#fff] dark:text-[#404040]">Create a new book</h1>
            {isSuccess && (
              <Alert variant="success">Book created with succcess</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label className="text-[#fff] dark:text-[#404040]">The title of the book</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title of the book"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-[#fff] dark:text-[#404040]">Book's description</Form.Label>
              {/* <Form.Control
                as="textarea"
                placeholder="Description of book"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              /> */}
              <ReactQuill 
                value={description}
                required
                // onChange={(e) => setDescription(e.target.value)}
                onChange={setDescription}
                className="h-[180px] mb-5 text-[#fff] dark:text-[#404040] "
                />

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-[#fff] dark:text-[#404040]">Number of available</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of available"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label className="text-[#fff] dark:text-[#404040]">Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                {iconCategory.map((item) => (
                <option value={`${item.title}`}>{item.title}</option>
                ))}

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget} className="bg-[#6a5af9] dark:bg-[#4cceac] border-none">
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="img-upload"/>
                    {imgToRemove !== image.public_id && (
                      <TiDeleteOutline className="icon_remove-img" size="1.5rem" onClick={() => handleRemoveImg(image)}/>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess} className="bg-[#6a5af9] dark:bg-[#4cceac] border-none">
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
    </div>
  );
};

export default NewProduct;
