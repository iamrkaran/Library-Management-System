import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../api';
import '.././style.global.css';
import './signup.css';

function SignupForm() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleValidation = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setLoading(true); // Show loading spinner

        try {
            const response = await signup(formState.name, formState.email, formState.password);

            if (response.status === 201) {
                // Show success toast
                toast.success(response.data.message, {
                    autoClose: 3000,
                });
                navigate('/');
            } else {
                // Show error toast
                toast.error(response.data.message, {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            showError(error.response.data.message);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    const validateForm = () => {
        const { name, email, password } = formState;

        if (!name || !email || !password) {
            showError('Please fill in all fields.');
            return false;
        }

        if (!isValidEmail(email)) {
            showError('Invalid email address.');
            return false;
        }

        if (password.length < 8) {
            showError('Password must be at least 8 characters.');
            return false;
        }

        return true;
    };

    const showError = (message) => {
        toast.error(message, {
            autoClose: 3000,
        });
    };

    const isValidEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="signup-page">
            <div className="signup-header">
                <h1>Library Management System</h1>
            </div>
            <div className="signup-header_mobile">
                <h1>Library Management System</h1>
            </div>
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
                            name="email"
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
                            name="password"
                            value={formState.password}
                            onChange={(event) =>
                                setFormState({ ...formState, password: event.target.value })
                            }
                        />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-5">
                        <Button variant="primary" size="md" type="submit" disabled={loading}>
                            {loading ? (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                    </div>
                </Form>
                <div className="mt-2">
                    <Container>
                        <Row className="mt-2">
                            <Col>
                                <Link to="/login">Login</Link>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <span className="">Forgot Password?</span>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
