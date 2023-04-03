import { React, useState } from "react";
import Login from "./components/login";
import Signup from "./components/Signup";
import { Routes , Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Addbook from "./components/Addbook";
import Updatebook from "./components/Updatebook";
import Issuedbooks from "./components/Issuedbooks";
import AddStudentdata from "./components/Addnewstudent";
import Students from "./components/Students";

import config from '../config';

const baseUrl = config().baseUrl;


function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/dashboard/addbook" element={<Addbook />} />
      <Route path="/rentedbooks" element={<Issuedbooks />} />
      <Route path="/updatebook" element={<Updatebook />} />
      <Route path="/dashboard/addnewstudent" element={<AddStudentdata />} />
      <Route path="/dashboard/student" element={<Students />} />
    </Routes>
  );
}

export default App;
