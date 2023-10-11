import React, { useState, useEffect } from "react";
import { getStudents } from "../api";
import Navbar from "./Dashboard/Navbar/Navbar";
import { Container } from "react-bootstrap";
import Footer from "./Dashboard/Footer/Footer";

const Students = () => {
    const [students, setStudents] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        getStudents()
            .then((students) => {
                setStudents(students.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);


    return (
        <div>
            <Navbar />
            <Container>
                {loading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                {students && (
                    <div>
                        <h1>Students</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Student Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Enrollment Status</th>
                                    <th>Library Card Number</th>

                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.student_id}>
                                        <td>{student.student_id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.enrollment_status}</td>
                                        <td>{student.library_card_number}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}


            </Container>
            <Footer />
        </div>
    );
};

export default Students;
