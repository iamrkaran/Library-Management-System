import React from "react";

import "./home.css";

import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Container,
} from "react-bootstrap";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Updatebook from "../../Updatebook";

import { getBooks, IssueBook } from "../../../api";

const Home = () => {
  const [sample, setSample] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formdata, setFormData] = useState({
    user_id: "",
    book_id: "",
  });

  console.log("formdata" + formdata);
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
        setSample(data);
        console.log(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user_id = formdata.user_id;
    const book_id = formdata.book_id;

    const dateformate = new Date();
    const formattedBorrowDate = dateformate.toISOString().slice(0, 10);

    const formatedDueDate = new Date();
    formatedDueDate.setMonth(formatedDueDate.getMonth() + 3);
    const formattedDueDate = formatedDueDate.toISOString().slice(0, 10);

    const borrow_date = formattedBorrowDate;
    const due_date = formattedDueDate;
    const return_date = null; 

    IssueBook(user_id, book_id, borrow_date, due_date, return_date)
    .then((res) => {
      console.log(res);
      setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <div className="home">
      <div className="container bg-dark">
        <div className="row">
          {sample.map((item) => (
            <div className="col-md-4" key={item.book_id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Book id :-- {item.book_id}</h5>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.author}</p>
                  <p className="card-text">{item.isbn}</p>
                  <p className="card-text">{item.edition}</p>
                  <p className="card-text">{item.dimensions}</p>
                  <p className="card-text">{item.publisher}</p>
                  <p className="card-text">{item.year}</p>
                  <p className="card-text">
                    {item.availability == 1 ? "Available" : "Not Available"}
                  </p>

                  <Row className="d-flex justify-content-between">
                    <Col>
                      <Link
                        to="/updatebook"
                        onClick={() => <Updatebook value={item} />}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </Col>
                    <Col>
                      <Button
                        variant="success"
                        onClick={() => {
                          setFormData({ book_id: item.book_id, user_id: "" });
                          setShowModal(true);
                        }}
                      >
                        Issue Book
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Book Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="user_id"
                id="user_id"
                value={formdata.user_id}
                onChange={(event) =>
                  setFormData({ ...formdata, user_id: event.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Book ID</Form.Label>
              <Form.Control
                type="text"
                name="book_id"
                id="book_id"
                value={formdata.book_id}
                onChange={(event) =>
                  setFormData({ ...formdata, book_id: event.target.value })
                }
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col>
                <Button variant="primary" onClick={handleSubmit}>
                  Issue Book
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
