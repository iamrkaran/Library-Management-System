import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";

function CollapsibleExample() {
  const dispatch = useDispatch();
  const SET_LOGIN_SUCCESS = useSelector((state) => state.loginSuccess);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const logout = () => {
    dispatch({ type: "SET_LOGIN_SUCCESS", payload: false });
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Search</Nav.Link>
            <Nav.Link href="#pricing">users</Nav.Link>
            <Nav.Link href="#pricing">Rented Books</Nav.Link>
            <Nav.Link href="/dashboard/addbook">Add Book</Nav.Link>
            <Nav.Link href="/updatebook">Update Book</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button
                className="alignrightButton"
                variant="outline-danger"
                onClick={logout}
              >
                Log Out
              </Button>
            ) : (
              <Button
                className="alignrightButton"
                variant="outline-success"
                href="/login"
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
