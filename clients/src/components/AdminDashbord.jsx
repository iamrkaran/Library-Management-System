import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./Dashboard/Home/Homedas";
import Footer from "./Dashboard/Footer/Footer";
import Navbar from "./Dashboard/Navbar/Navbar";
import Login from "./login";

const AdminDashbord = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar />
          <Home />
          <Footer />
        </div>
      ) : (
        <div>
          {" "}
          <Login/>{" "}
        </div>
      )}
    </div>
  );
};

export default AdminDashbord;
