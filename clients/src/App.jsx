// src/App.js
import { Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Signup from './components/Signup';

import Addbook from './components/Addbook';
import Updatebook from './components/Updatebook';
import Issuedbooks from './components/Issuedbooks';
import AddStudentdata from './components/Addnewstudent';
import Students from './components/Students';
import AdminDashbord from './components/AdminDashbord';




function App() {
  return (
    <Routes>
      <Route path="/" exac element={<AdminDashbord />} />
      <Route path="/login" exac element={<Login />} />
      <Route path="/signup" exac element={<Signup />} />
      <Route path="/addbook" exac element={<Addbook />} />
      <Route path="/updatebook" exac element={<Updatebook />} />
      <Route path="/rentedbooks" exac element={<Issuedbooks />} />
      <Route path="/addnewstudent" exac element={<AddStudentdata />} />
      <Route path="/student" exac element={<Students />} />
    </Routes>
  );
}

export default App;
