import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button  } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { login } from "../api";
import Dashboard from "./AdminDashbord";

import "./style.global.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const loginSuccess = useSelector((state) => state.loginSuccess);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formState.email, formState.password)
      .then((response) => {
        if (response.status === 200) {
          console.log("login success");
          dispatch({ type: "SET_LOGIN_SUCCESS", payload: true });
          dispatch({ type: "isLoggedIn", payload: true });

          localStorage.setItem("isLoggedIn", "true");

          navigate("/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      {loginSuccess && <Dashboard />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
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
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-5">
        <Button variant="primary" type="submit">
          Log in
        </Button>
        </div>

        <div className="mt-2">
          <p>
            {" "}
            <Link to="/signup">Signup</Link>{" "}
            <span>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;
            </span>{" "}
            <a href="#">Forgot Password?</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
