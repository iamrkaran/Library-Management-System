import React, { useState , useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signup } from "../api";
import "./style.global.css";
// import Dashboard from "./Dashboard";

function signupForm() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  // console.log("signup form state", formState);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("handleSubmit");
    signup(formState.name, formState.email, formState.password)
      .then((response) => {
        if (response.status === 201) {
          console.log("signup success");
          dispatch({ type: "SET_SIGNUP_SUCCESS", payload: true });
          navigate("/"); // signup fixed
        } else {
          console.log(response.message);
          dispatch({ type: "SET_ERROR_MESSAGE", payload: response.message });
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({ type: "SET_ERROR_MESSAGE", payload: error.message });
      });
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const showError = (message) => {
    setErrorMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleValidation = (event) => {
    event.preventDefault();
  
    const name = formState.name;
    const email = formState.email;
    const password = formState.password;
  
    let formIsValid = true;
  
    if (!name) {
      formIsValid = false;
      showError("Name is required");
    }
  
    if (!email) {
      formIsValid = false;
      showError("Email is required");
    } else if (!isValidEmail(email)) {
      formIsValid = false;
      showError("Invalid email address");
    }
  
    if (!password) {
      formIsValid = false;
      showError("Password is required");
    } else if (password.length < 8) {
      formIsValid = false;
      showError("Password must be at least 8 characters");
    }
  
    if (formIsValid) {
      handleSubmit();
    }
  }
  

  return (
    <div className="signup">
      <Form onSubmit={handleValidation}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formState.name}
            onChange={(event) =>
              setFormState({ ...formState, name: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            email="email"
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            password="password"
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-5">
          <Button variant="primary" size="md" type="submit" >
            Signup
          </Button>
        </div>
      </Form>

      <div className="mt-2">
          <p>
            
            Already have an account?{" "}
            <Link to="/">Login</Link>{" "}
            <span>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              &nbsp; 
            </span>{" "}
            <a href="#">Forgot Password?</a>
          </p>
        </div>

      <div className="error-message">{errorMessage}</div>

    </div>
  );
}
export default signupForm;
