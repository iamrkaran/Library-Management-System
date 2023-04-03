import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { rentedBooks } from "../api";

import "./style.global.css";
import { Link } from "react-router-dom";

function Issuedbooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    rentedBooks().then((response) => {
      setBorrowedBooks(response.data);
      console.log("Rented Data",response.data);
    });
  }, []);

  return (
    <div>
      <Container>
      <Table striped bordered hover responsive="md">
  <thead>
    <tr>
      <th>Borrow ID</th>
      <th>Book ID</th>
      <th>User ID</th>
      <th>Borrow Date</th>
      <th>Due Date</th>
      <th>Return Date</th>
    </tr>
  </thead>
  <tbody>
    {borrowedBooks.map((book) => (
      <tr key={book.borrow_id}>
        <th>{book.borrow_id}</th>
        <th>{book.book_id}</th>
        <th>{book.user_id}</th>
        <th>{book.borrow_date}</th>
        <th>{book.due_date}</th>
        <th>{book.return_date}</th>
      </tr>
    ))}
  </tbody>
</Table>

        <Row className="mt-3">
          <Button className="btn btn-block btn-primary" as={Link} to="/">
            Back
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default Issuedbooks;
