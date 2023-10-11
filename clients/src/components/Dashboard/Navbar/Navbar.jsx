import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import SearchComponent from "../../SearchComponent";

import { searchNewBooks } from "../../../api";

import "./navbar.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NavbarNav() {
  const dispatch = useDispatch();
  const SET_LOGIN_SUCCESS = useSelector((state) => state.loginSuccess);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const regex = /^[0-9\b]+$/;

  const validatesearch = (id) => {
    if (!id) {
      setError("Search is required");
      return false;
    } else if (!regex.test(id)) {
      setError("Search is not valid");
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validatesearch(searchTerm);

    if (!isValid) {
      alert("Please Enter a valid search id");
      return;
      setError("Please Enter a valid search id");
    } else {
      searchNewBooks(searchTerm).then((results) => {
        setResults(results.data);
        setShowModal(true);
      });
    }
  };

  const logout = () => {
    dispatch({ type: "SET_LOGIN_SUCCESS", payload: false });
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return (
    <>
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <div className="container-fluid m-4 ">
          <Navbar.Brand href="/">KNIT SULTANPUR</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Student"
                id="collasible-nav-dropdown"
                className="text-black"
              >
                <NavDropdown.Item className="bg-light">
                  <Link className="nav-link text-dark" to="/addnewstudent">
                    Add New Student
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="bg-light">
                  <Link className="nav-link text-dark" to="/student">
                    Student Lists
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Books"
                id="collasible-nav-dropdown"
                className="text-gray"
              >
                <NavDropdown.Item className="bg-light">
                  <Link className="nav-link text-dark" to="/addbook">
                    Add New Book
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="bg-light">
                  <Link className="nav-link text-dark" to="/updatebook">
                    Update Book
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="bg-light">
                  <Link className="nav-link text-dark" to="/rentedbooks">
                    Rented Books
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Form className="d-flex p-4">
                <Form.Control
                  type="search"
                  placeholder='Search for a book ID'
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <Button variant="outline-success" onClick={handleSubmit}>
                  Search
                </Button>
              </Form>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <Button
                  className="me-5"
                  variant="outline-danger"
                  onClick={logout}
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  className="me-5"
                  variant="outline-success"
                  href="/login"
                >
                  Sign In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarNav;
