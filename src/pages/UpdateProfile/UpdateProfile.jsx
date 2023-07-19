import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./UpdateProfile.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./UpdateProfile.css";
import { Container } from "react-bootstrap";
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Avatar from "react-avatar-edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
// import { updateUserProfile } from "../../features/userSlice";



const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setstoreImg] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const navigate = useNavigate();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(null);

  const handleNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleAvatarChange = (event) => setPhotoURL(event.target.files[0]);

  const handleProfileUpdate = async () => {
    const userId = user._id; // Replace with the actual user ID
    const updatedData = { name };

    try {
      const response = await axios.put(`/users/${userId}/updateprofile`, updatedData);
      const updatedUser = response.data;
      // Handle the updated user data as needed
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
 

  const OnCrop = (view) => {
    setImgCrop(view);
  };

  const OnClose = () => {
    setImgCrop(null);
  };

  const saveImage = () => {
    setstoreImg([...storeImg, { imgCrop }]);
    setShow1(false);
  };

  const profileImageShow = storeImg.map((item) => item.imgCrop);



  return (
    <div className="profile_layout">
      <div className="profile_update-img">
        <div className="img_profile">
          <img
            src={profileImageShow.length ? profileImageShow : user.photoURL}
            alt="img_profile"
          />
          <button className="btn-edit_img_profile" onClick={handleShow1}>
            <BsFillCameraFill style={{ fontSize: "2.5rem" }} />
            Edit
          </button>
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Update Your Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Avatar
                width={"100%"}
                height={295}
                onCrop={OnCrop}
                onClose={OnClose}
              />
              <AiOutlineMedicineBox className="icon-modal_profile" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              <Button variant="primary" onClick={saveImage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="header_name-proflie">
          <h2 className="uppercase">{user.name}</h2>
          <p>ID Library: {user._id}</p>
        </div>
      </div>
      <Container className="profile_box dark:bg-[#fff] bg-[#1f2a40]">
        <div className="profile_container">
          <div className="profile_update-info">
            <div className="profile_info-title text-[#fff] dark:text-[#404040]">Account Information</div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Name</label>
              <p className=" capitalize text-[#fff] dark:text-[#404040]">{user.name}</p>
              <button onClick={handleShow2} className="text-[#6a5af9] dark:text-[#4cceac] bg-inherit">Edit</button>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Name</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleProfileUpdate}>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        New Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="New Name"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Email</label>
              <p className="text-[#fff] dark:text-[#404040]">{user.email}</p>
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Password</label>
              <p onClick={handleShow4} style={{cursor: "pointer"}} className="text-[#6a5af9] dark:text-[#4cceac]">Change Password</p>{" "}
              <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form >
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Old Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="input old password"
                          // onChange={}
                          id="o_password"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        New Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="input new password"
                          // onChange={(e) => setNewPassword(e.target.value)}
                          id="password"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Confirm Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          // onChange={(e) => setRNewPassword(e.target.value)}
                          id="r_password"
                          required
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Close
                    </Button>
                    <Button variant="primary">Save Changes</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </Container>
      <div className="profile_bg bg-[#141b2d] dark:bg-white"></div>
    </div>
  );
};

export default UpdateProfile;
