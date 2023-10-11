import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addNewStudent } from '../api';
import Navbar from './Dashboard/Navbar/Navbar';
import Footer from './Dashboard/Footer/Footer';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function AddStudentForm() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    student_id: '',
    name: '',
    email: '',
    enrollment_status: '',
    library_card_number: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stdata = {
      student_id: studentData.student_id,
      name: studentData.name,
      email: studentData.email,
      enrollment_status: studentData.enrollment_status,
      library_card_number: studentData.library_card_number,
    };
    
    addNewStudent(stdata)
      .then((response) => {
        if (response.status === 201) {
          // Show a success toast
          toast.success('Student added successfully', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          // Show an error toast
          toast.error('Failed to add student', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // Show an error toast in case of an API request error
        toast.error('An error occurred', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <Navbar />
      <Container className="p-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-5">Add New Student</h1>
          <Form.Group>
            <Form.Label>Enrollment Status</Form.Label>
            <Form.Control
              as="select"
              value={studentData.enrollment_status}
              onChange={(event) =>
                setStudentData({
                  ...studentData,
                  enrollment_status: event.target.value,
                })
              }
              required
            >
              <option value="">Select Enrollment Status</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Not Enrolled">Not Enrolled</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Student ID"
              value={studentData.student_id}
              onChange={(event) =>
                setStudentData({ ...studentData, student_id: event.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={studentData.name}
              onChange={(event) =>
                setStudentData({ ...studentData, name: event.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={studentData.email}
              onChange={(event) =>
                setStudentData({ ...studentData, email: event.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Library Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Library Card Number"
              value={studentData.library_card_number}
              onChange={(event) =>
                setStudentData({
                  ...studentData,
                  library_card_number: event.target.value,
                })
              }
              required
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-5">
            <Button variant="primary" size="md" type="submit">
              Add Student
            </Button>
          </div>
        </Form>
        <div className="d-grid gap-2 mt-5">
          <Button variant="danger" size="md" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Container>
      <Footer />

    </>
  );
}

export default AddStudentForm;
