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
            <Link to="/signup">Signup</Link>
            <span>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <a href="#">Forgot Password?</a>
          </p>
        </div>
      </Form>
    </div>