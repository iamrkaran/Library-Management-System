import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addNewStudent } from '../api';


function AddStudentForm() {
   
const navigate = useNavigate();

const [studentData , setStudentData] = useState({
    student_id: '',
    name: '',
    email: '',
    enrollment_status: '',
    library_card_number: '',
});

const [success, setSuccess] = useState(false);



const handleSubmit = async event => {
    event.preventDefault();
    
    const stdata = {
        student_id: studentData.student_id,
        name: studentData.name,
        email: studentData.email,
        enrollment_status: studentData.enrollment_status,
        library_card_number: studentData.library_card_number,
    };
    addNewStudent(stdata)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
};

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Student Id</Form.Label>
          <Form.Control
            type="text"
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
            value={studentData.email}
            onChange={(event) =>
              setStudentData({ ...studentData, email: event.target.value })
            }
            required
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Enrollment Status</Form.Label>
            <Form.Control

            type="text"
            value={studentData.enrollment_status}
            onChange={(event) =>
              setStudentData({ ...studentData, enrollment_status: event.target.value })
            }

            required
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Library Card Number</Form.Label>
            <Form.Control
            type="text"
            value={studentData.library_card_number}
            onChange={(event) =>
              setStudentData({ ...studentData, library_card_number: event.target.value })
            }
            required
            />
        </Form.Group>
      
        <div className="d-grid gap-2 mt-5">
          <Button variant="primary" size="md" type="submit" >
            Add Student
          </Button>
        </div>
      
        <div className="d-grid gap-2 mt-5">
          <Button variant="danger" size="md"
          onClick={() => navigate('/dashboard')}
          >
          Cancel
          </Button>
        </div>
        </Form>
        <div >
          {success && <h2>Student added successfully</h2>}
        </div>
    </Container>
    );
}

export default AddStudentForm;
