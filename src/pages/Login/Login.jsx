import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/appApi";
import "./Login.css";
import { GiSecretBook } from "react-icons/gi";
import LogoIU from "../../assets/LogoIU.png"
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [login, {  isLoading }] = useLoginMutation({});
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      dispatch(setUser(result.data.user));
      // Navigate to the home page
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  const validateForm = () => {
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="container_form relative">
      <div className="absolute w-[90%] h-[40px] top-[20px] flex items-center justify-between backdrop-blur-sm bg-white/30 rounded-xl">
        <div className="w-[50%] h-[80%] flex items-center ">
          <img src={LogoIU} alt="Logo_IU" className="w-[5%] h-[100%] rounded-full ml-8"/>
          <p className="h-[100%] text-[1.2rem] text-white ml-2 mt-auto">Internationl University</p>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <ul className="flex flex-row m-auto text-[1.1rem] text-[#606060] cursor-pointer">
            <li className="mr-6">Contact</li>
            <li className="mr-6">Quick Links</li>
            <li>Guides</li>
          </ul>
        </div>
      </div>
      <Form onSubmit={handleLogin} className="w-[35%] h-[70%] backdrop-sepia-0 bg-white/60 border-solid border-4 border-white/50 rounded-xl flex items-center flex-col ">
        <h1 className="login-form_title text-[4rem] text-[#318CE7]">E-Library</h1>
        <GiSecretBook className="text-[2rem] text-[#008B8B] "/>
        {/* {isError && <Alert variant="danger">{error.data}</Alert>} */}
        <divp className="w-[75%] my-[20px]">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="login-form_input"/>
        </divp>

        <divp className="w-[75%] my-[20px]">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="login-form_input"/>
        </divp>

        <Form.Group className="mb-3 w-[75%]">
          <Button
            type="submit"
            disabled={!validateForm() || isLoading}
            style={{
              width: "100%",
              backgroundColor: "#111727",
              border: "none",
            }}
          >
            Login
          </Button>
          {error && <div>{error}</div>}
        </Form.Group>

        <p
          className="pt-3 text-center cursor-pointer"
        >
          Forgot your password?
        </p>
        <p>Don't have account? Fill out the <Link to="/formrequest">form</Link> to ask admin to create an account</p>
      </Form>
    </div>
  );
}

export default Login;
