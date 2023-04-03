// src/App.js
import { Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Signup from './components/Signup';
// import Home from './components/Home';
import Addbook from './components/Addbook';
import Updatebook from './components/Updatebook';
import Issuedbooks from './components/Issuedbooks';
import AddStudentdata from './components/Addnewstudent';
import Students from './components/Students';
import AdminDashbord from './components/AdminDashbord';




function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashbord />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addbook" element={<Addbook />} />
      <Route path="/updatebook" element={<Updatebook />} />
      <Route path="/rentedbooks" element={<Issuedbooks />} />
      <Route path="/addnewstudent" element={<AddStudentdata />} />
      <Route path="/student" element={<Students />} />
    </Routes>
  );
}

export default App;
