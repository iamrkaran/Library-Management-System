import { React, useState } from "react";
import Login from "./components/login";
import Signup from "./components/Signup";
import { Routes , Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AdminDashbord from "./components/AdminDashbord";
import Addbook from "./components/Addbook";
import Updatebook from "./components/Updatebook";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/dashboard/addbook" element={<Addbook />} />
      <Route path="/updatebook" element={<Updatebook />} />
    </Routes>
  );
}

export default App;
