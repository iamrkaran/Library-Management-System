import { Form, Button } from "react-bootstrap";
import { createBook } from "../api";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Updatebook from "./Updatebook";

import './style.global.css';

const AddBookForm = () => {

    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        title: "",
        author_id: "",
        publisher_id: "",
        isbn: "",
        publication_year: "",
        availability: "0",
    });

    const validateTitle = (title) => {
      if (!title) {
        return false;
      }
      return true;
    };
    
      
      const validateauthor_id = (author_id) => {
        if (!author_id) {
          return false;
        }
        return true;
      };
      
      const validatepublisher_id = (publisher_id) => {
        if (!publisher_id) {
          return false;
        }
        return true;
      };
      
      const validateIsbn = (isbn) => {
        if (!isbn) {
          return false;
        }
        return true;
      };
      
      const validatepublication_year = (publication_year) => {
        if (!publication_year) {
          return false;
        }
        return true;
      };
      
    const handleValidation = (event) => {
        event.preventDefault();
        const { title, author_id, publisher_id, isbn, publication_year } = formdata;
        const titleValid = validateTitle(title);
        const author_idValid = validateauthor_id(author_id);
        const publisher_idValid = validatepublisher_id(publisher_id);
        const isbnValid = validateIsbn(isbn);
        const publication_yearValid = validatepublication_year(publication_year);
        if (
            titleValid &&
            author_idValid &&
            publisher_idValid &&
            isbnValid &&
            publication_yearValid
            ) {
            console.log("Form is valid");
            handleSubmit();
            }
            else {
            console.log("Form is invalid");
            }
       
    };

   const [success, setSuccess] = useState(false);
  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  const handleSubmit = () => {
   
    const { title, author_id, publisher_id, isbn, publication_year, availability } = formdata;
    createBook(title, author_id, publisher_id, isbn, publication_year, availability)
      .then((response) => {
        setSuccess(true);
        console.log(response.data);
        setFormData({
          title: "",
          author_id: "",
          publisher_id: "",
          isbn: "",
          publication_year: "",
          availability: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addbook">
      <Form onSubmit={handleValidation}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={formdata.title}
          onChange={(event) =>
            setFormData({ ...formdata, title: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formauthor_id">
        <Form.Label>Author ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author ID"
          value={formdata.author_id}
          onChange={(event) =>
            setFormData({ ...formdata, author_id: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formpublisher_id">
        <Form.Label>Publisher ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter publisher ID"
          value={formdata.publisher_id}
          onChange={(event) =>
            setFormData({ ...formdata, publisher_id: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formIsbn">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ISBN"
          value={formdata.isbn}
          onChange={(event) =>
            setFormData({ ...formdata, isbn: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formpublication_year">
        <Form.Label>Publication Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter publication year"
          value={formdata.publication_year}
          onChange={(event) =>
            setFormData({ ...formdata, publication_year: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formAvailability">
        <Form.Check
          type="checkbox"
          label="Available"
          checked={formdata.availability}
          onChange={(event) => setFormData({ ...formdata, availability: event.target.checked })}
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-5">
        <Button variant="primary" type="submit">
         Add Book
        </Button>
        </div>
      <div className="d-grid gap-2 mt-5">
        <Button variant="danger" 
        onClick={() => navigate("/dashboard")}
        >
        Cancel
        </Button>
        </div>
      
      {success ?? <p>Book added successfully</p>}
    </Form>
   
      </div>
  );
};

export default AddBookForm;