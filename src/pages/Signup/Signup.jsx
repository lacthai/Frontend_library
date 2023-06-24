import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../../services/appApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  function handleSignup(e) {
    e.preventDefault();
    if (password === verifyPassword) {
      signup({ name, email, password });
      toast("Signup request submitted!", toastOptions);
    } else {
      setPasswordMatchError(true);
      toast.error("Passwords do not match!", toastOptions);
    }
  }

  return (
    <div className="h-[150vh] overflow-hidden">
      <div className="h-[60%]">
        <h1 className="font-bold text-[2rem] text-center text-[#fff] dark:text-[#404040] ">
          Create new account for student
        </h1>
        <div className="text-center h-[50px]">
          <GroupAddIcon className="text-[3rem] mt-[20px] text-[#fff] dark:text-[#404040]"/>
        </div>
        <Form
          onSubmit={handleSignup}
          className="w-full h-full grid grid-cols-2 grid-rows-3 mt-14"
        >
          {isError && <Alert variant="danger">{error.data}</Alert>}
          <div class="relative w-full h-8 col-start-1 col-end-2 row-start-1 row-end-2 flex justify-center items-center mb-[80px]">
            <label
              className="inline-block font-bold cursor-pointer absolute top-[-35px] left-[10%]
              bg-[#141b2d] dark:bg-white px-[5px] py-[1px] text-[12px] translate-y-1/2 text-[#6a5af9] dark:text-[#4cceac]"
            >
              Student Name
            </label>
            <input
              autocomplete="off"
              type="text"
              placeholder="Enter student name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="p-[20px] block w-[85%] text-[14px] border-solid border-[1px] border-[#6a5af9] dark:border-[#4cceac] rounded-xl 
            bg-transparent text-[#fff] dark:text-[#404040] outline-none"
            />
          </div>
          <div class="relative w-full h-8 col-start-2 col-end-3 row-start-1 row-end-2 flex justify-center items-center mb-[80px]">
            <label
              className="inline-block font-bold cursor-pointer absolute top-[-35px] left-[10%]
              bg-[#141b2d] dark:bg-white px-[5px] py-[1px] text-[12px] translate-y-1/2 text-[#6a5af9] dark:text-[#4cceac]"
            >
              Student Email
            </label>
            <input
              autocomplete="off"
              type="email"
              placeholder="ID student@student.hcmiu.edu.vn"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="p-[20px] block w-[85%] text-[14px] border-solid border-[1px] border-[#6a5af9] dark:border-[#4cceac] rounded-xl 
            bg-transparent text-[#fff] dark:text-[#404040] outline-none"
            />
          </div>

          <div class="relative w-full h-8 flex justify-center items-center">
            <label
              className="inline-block font-bold cursor-pointer absolute top-[-35px] left-[10%]
              bg-[#141b2d] dark:bg-white px-[5px] py-[1px] text-[12px] translate-y-1/2 text-[#6a5af9] dark:text-[#4cceac]"
            >
              Password: day of birth
            </label>
            <input
              autocomplete="off"
              type="password"
              placeholder="dd/mm/yy"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="p-[20px] block w-[85%] text-[14px] border-solid border-[1px] border-[#6a5af9] dark:border-[#4cceac] rounded-xl  
            bg-transparent text-[#fff] dark:text-[#404040] outline-none"
            />
          </div>
          <div class="relative w-full h-8 flex justify-center items-center">
            <label
              className="inline-block font-bold cursor-pointer absolute top-[-35px] left-[10%]
              bg-[#141b2d] dark:bg-white px-[5px] py-[1px] text-[12px] translate-y-1/2 text-[#6a5af9] dark:text-[#4cceac]"
            >
              Enter password again
            </label>
            <input
              autocomplete="off"
              type="password"
              placeholder="verify password"
              value={verifyPassword}
              required
              onChange={(e) => {
                setVerifyPassword(e.target.value);
                setPasswordMatchError(false);
              }}
              className="p-[20px] block w-[85%] text-[14px] border-solid border-[1px] border-[#6a5af9] dark:border-[#4cceac] rounded-xl 
            bg-transparent text-[#fff] dark:text-[#404040] outline-none"
            />
          </div>

          <Form.Group className="col-start-1 col-end-3 row-start-3 row-end-4 mx-[4%]">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-block uppercase tracking-wider outline outline-[2px] outline-[#fff] 
            px-[60px] py-[20px] relative overflow-hidden transition-colors delay-[1s]
            hover:text-[#fff] button_signup "
            >
              Create account
            </button>
          </Form.Group>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
