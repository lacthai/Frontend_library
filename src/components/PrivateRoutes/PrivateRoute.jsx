import React, { useEffect } from "react";
import { LayoutApp } from "../Global/LayoutApp.jsx";
import { useDispatch, useSelector } from "react-redux";




export const PrivateRoute = ({ children }) =>{
  // const dispatch = useDispatch();
	// const { isAuth,currentToken } = useSelector(state => state.login);
	// const { user } = useSelector(state => state.user);
  // const {cart} = useSelector(state => state.cart)

  // useEffect(()=>{
     
  //   /*       getCart(dispatch,user.cart)
  //          console.log(cart) */
      
  //   /*   const firstLogin = localStorage.getItem("firstLogin")
  //     if(firstLogin){
  //         const refreshToken= async()=>{
  //             const token = await axios.get("/user/refresh_token")
  //             console.log(token)
  //             getToken(token.data.accesstoken)
  //             setTimeout(()=>{
  //                 refreshToken()
  //             },10*60*1000)
  //         }
  //         refreshToken() && dispatch(loginSuccess())
  //     } */
  // },[])
    return <LayoutApp>{children}</LayoutApp>

}


