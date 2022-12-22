const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      const user = results[0];
      if (!user) {
        res.status(401).send({ message: "Incorrect email or password" });
      }
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          throw error;
        }
        if (result) {
          // Set session or token
          res.send({ message: "Logged in successfully" });
        } else {
          res.status(401).send({ message: "Incorrect email or password" });
        }
      });
    }
  );
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      throw error;
    }
    pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User added with ID: ${results.insertId}`);
      }
    );
  });
});

app.get("/books", (req, res) => {
  pool.query("SELECT * FROM books", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM books WHERE id = ?", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/addbooks", (req, res) => {
  const {
    title,
    author_id,
    publisher_id,
    isbn,
    publication_year,
    availability,
  } = req.body;
  pool.query(
    "INSERT INTO books (title, author_id, publisher_id, isbn, publication_year, availability) VALUES (?, ?, ?, ?, ?, ?)",
    [title, author_id, publisher_id, isbn, publication_year, availability],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Book added with ID: ${results.insertId}`);
    }
  );
});

app.put("/updatebook/:id", (req, res) => {
  const id = req.params.id;
  const {
    title,
    author_id,
    publisher_id,
    isbn,
    publication_year,
    availability,
  } = req.body;
  pool.query(
    "UPDATE books SET title = ?, author_id = ?, publisher_id = ?, isbn = ?, publication_year = ?, availability = ? WHERE isbn = ?",
    [title, author_id, publisher_id, isbn, publication_year, availability, isbn],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Book modified with ISBN: ${id}`);
    }
  );
});

app.delete("/deletebook/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  pool.query("DELETE FROM books WHERE isbn = ?", [isbn], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json({ message: `Book with ISBN ${isbn} deleted` });
    }
  });
});





app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
