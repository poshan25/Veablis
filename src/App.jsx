import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminAddProduct from "./pages/AdminAddProduct";
// import UserProducts from "./pages/UserProducts";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import ViewOrder from "./pages/ViewOrder";
import Verify from "./components/Verify";
import User from "./components/User";
import Admin from "./components/Admin";
// import TrackOrder from "./components/OrderStatus";
import ToReceive from "./components/ToReceive";
// import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import Received from "./components/Received";
import UserCart from "./components/UserCart";
import UserProducts from "./pages/UserProducts";
import OrderStatus from "./components/OrderStatus";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      <Route path="/adminAddProduct" element={<AdminAddProduct />}></Route>
            <Route path="/products" element={<Products />}></Route>

      <Route path="/userCart" element={<UserCart />}></Route>
            <Route path="/viewOrder" element={<ViewOrder />}></Route>

      <Route path="/orderStatus" element={<OrderStatus />}></Route>

      <Route path="/toReceive" element={<ToReceive />}></Route>

      <Route path="/Received" element={<Received />}></Route>

      <Route path="/user" element={<User />}></Route>
      <Route path="/order/:productId" element={<PlaceOrder />}></Route>
      <Route path="/verify" element={<Verify />}></Route>

      {/* <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Admin/>
            <Routes>
                    <Route path="/adminAddProduct" element={<AdminAddProduct />}></Route>

                    <Route path="/vieworder" element={<ViewOrder />}></Route>

            </Routes>
          </AdminLayout>
        }
      />

      <Route
        path="/user/*"
        element={
          <UserLayout>
            <UserProducts/>
            <Routes>
              <Route path="Usercart" element={<UserCart />} />
              <Route path="trackOrders" element={<TrackOrder />} />
            </Routes>
          </UserLayout>
        }
      /> */}
    </Routes>
  );
}

export default App;
