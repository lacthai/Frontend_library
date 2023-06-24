import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../../services/appApi";
import axios from "../../axios";
import "../NewProduct/NewProduct.css";
import { TiDeleteOutline } from "react-icons/ti";
import { iconCategory } from "../CategoryPage/dataBannerCategory";
import ReactQuill from "react-quill";

const EditProductPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get("/products/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setImages(product.pictures);
        setPrice(product.price);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    updateProduct({ id, name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dfmzufus5",
        uploadPreset: "rqnrrrtx",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <div className="h-[150vh]">
      <Container>
        <Row>
          <Col md={6} className="new-product__form--container">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <h1 className="mt-4 text-[#fff] dark:text-[#404040]">
                Edit book
              </h1>
              {isSuccess && <Alert variant="success">Product updated</Alert>}
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label className="text-[#fff] dark:text-[#404040]">
                  Title of book
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-[#fff] dark:text-[#404040]">
                  Book's description
                </Form.Label>
                <ReactQuill
                value={description}
                required
                // onChange={(e) => setDescription(e.target.value)}
                onChange={setDescription}
                className="h-[180px] mb-5 text-[#fff] dark:text-[#404040] "
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-[#fff] dark:text-[#404040]">
                  Available
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="number of book available"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                onChange={(e) => setCategory(e.target.value)}
              >
                <Form.Label className="text-[#fff] dark:text-[#404040]">
                  Category
                </Form.Label>
                <Form.Select value={category}>
                  <option disabled selected>
                    -- Select One --
                  </option>
                  {iconCategory.map((item) => (
                    <option value={`${item.title}`}>{item.title}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button type="button" onClick={showWidget}>
                  Upload Images
                </Button>
                <div className="images-preview-container">
                  {images.map((image) => (
                    <div className="image-preview">
                      <img src={image.url} alt="img-upload" />
                      {imgToRemove !== image.public_id && (
                        <TiDeleteOutline
                          className="icon_remove-img"
                          size="1.5rem"
                          onClick={() => handleRemoveImg(image)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Form.Group>

              <Form.Group>
                <Button type="submit" disabled={isLoading || isSuccess}>
                  Update Product
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

export default EditProductPage;
