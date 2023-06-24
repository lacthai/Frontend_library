import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navigation from "././components/Navigation/Navigation";
import Home from "././pages/Home/Home";
import Login from "././pages/Login/Login";
import Signup from "././pages/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "././pages/NewProduct/NewProduct";
import ProductPage from "././pages/ProductPage/ProductPage";
import CategoryPage from "././pages/CategoryPage/CategoryPage";
import ScrollToTop from "././components/ScrollToTop/ScrollToTop";
import CartPage from "././pages/CartPage/CartPage";
import OrdersPage from "././pages/OrdersPage/OrdersPage";
import AdminDashboard from "././pages/AdminDashboard/AdminDashboard";
import EditProductPage from "././pages/EditProductPage/EditProductPage";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import AboutUs from "./pages/AboutUs/AboutUs";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import DashboardProducts from "./components/DashboardProducts/DashboardProducts";
import OrdersAdminPage from "./components/OrdersAdminPage/OrdersAdminPage";
import ClientsAdminPage from "./components/ClientsAdminPage/ClientsAdminPage";
import Chat from "./pages/Chat/Chat";
import Document from "./pages/Document/Document";
import Notifications from "./pages/Notifications/Notifications";
import FormRequest from "./pages/FormSendAccount/FormRequest";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("ws://localhost:8080");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      // logic for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="formrequest"
          element={
              <FormRequest />
          }
        />

        {user && (
          <>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/document"
              element={
                <PrivateRoute>
                  <Document />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            />
          </>
        )}
        {user && user.isAdmin && (
          <>
            <Route
              path="/manageBook"
              element={
                <PrivateRoute>
                  <DashboardProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="/manageOrder"
              element={
                <PrivateRoute>
                  <OrdersAdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manageStudent"
              element={
                <PrivateRoute>
                  <ClientsAdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id/edit"
              element={
                <PrivateRoute>
                  <EditProductPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute>
                  <Signup />
                </PrivateRoute>
              }
            />
          </>
        )}

        <Route
          path="/aboutus"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:category"
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/new-product"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// export function ProtectedRouter({children}) {
//   if(localStorage.getItem("auth")) {
//     return children;
//   } else {
//     return <Navigate to="/login"/>
//   }
// }
