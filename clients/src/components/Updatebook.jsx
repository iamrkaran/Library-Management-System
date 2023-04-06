import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "./style.global.css";
import { updateBook, getBooks, deleteBook } from "../api";

const Updatebookfrom = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);

  const [state, setState] = useState({
    uid: "",
    utitle: "",
    uauthor_id: "",
    upublisher_id: "",
    uisbn: "",
    upublication_year: "",
    uavailability: "",
  });

  useEffect(() => {
    getBooks().then((res) => {
      setData(res.data);
    });
  }, []);

  const [success, setSuccess] = useState(false);

  const handleDelete = (isbn) => {
    deleteBook(isbn).then((res) => {
      console.log(res);
      navigate("/");
    });
  };

  const handleUpdate = (
    book_id,
    title,
    author_id,
    publisher_id,
    isbn,
    publication_year,
    availability
  ) => {
    setState({
      uid: book_id,
      utitle: title,
      uauthor_id: author_id,
      upublisher_id: publisher_id,
      uisbn: isbn,
      upublication_year: publication_year,
      uavailability: availability,
    });
    handleShow();
  };

  const updateField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const handleModalUpdate = () => {
    const {
      uid,
      utitle,
      uauthor_id,
      upublisher_id,
      uisbn,
      upublication_year,
      uavailability,
    } = state;
    updateBook(
      uid,
      utitle,
      uauthor_id,
      upublisher_id,
      uisbn,
      upublication_year,
      uavailability
    ).then((res) => {
      console.log(res);
      navigate("/");
    });
  };

  return (
    <>
      <div className="home">
        <div className="container bg-dark">
          <div className="row">
            {data.map((item) => (
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title" key={item.book_id}>
                      {item.book_id}
                    </h5>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.author}</p>
                    <p className="card-text">{item.isbn}</p>
                    <p className="card-text">{item.edition}</p>
                    <p className="card-text">{item.dimensions}</p>
                    <p className="card-text">{item.publisher}</p>
                    <p className="card-text">{item.year}</p>
                    <p className="card-text">{item.availability}</p>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                   
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleUpdate(
                            item.book_id,
                            item.title,
                            item.author_id,
                            item.publisher_id,
                            item.isbn,
                            item.publication_year,
                            item.availability
                          )
                        }
                      >
                        Update
                      </Button>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item.isbn)}
                      >
                        Delete
                      </Button>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <Button variant="success" 
                        onClick={() => navigate("/")}
                        >
                            Back to Dashboard
                          
                        </Button>
                      </div>
                      {success && (
                        <div className="alert alert-success" role="alert">
                          Book Deleted Successfully
                        </div>
                      )}
                    
              
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Book ID</Form.Label>
              <Form.Control
                type="text"
                name="uid"
                value={state.uid}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="utitle"
                value={state.utitle}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Author ID</Form.Label>
              <Form.Control
                type="text"
                name="uauthor_id"
                value={state.uauthor_id}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Publisher ID</Form.Label>
              <Form.Control
                type="text"
                name="upublisher_id"
                value={state.upublisher_id}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                name="uisbn"
                value={state.uisbn}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Publication Year</Form.Label>
              <Form.Control
                type="text"
                name="upublication_year"
                value={state.upublication_year}
                onChange={updateField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                name="uavailability"
                value={state.uavailability}
                onChange={updateField}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <div className="d-grid gap-5">
          <Stack className="col-md-12">
            <Button variant="primary" size="lg" onClick={handleModalUpdate}>
              Submit
            </Button>
          </Stack>
        </div>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Updatebookfrom;
