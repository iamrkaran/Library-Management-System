const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Knit LMS API!");
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
  const book_id = req.params.id;
  pool.query("SELECT * FROM books WHERE book_id = ?", [book_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/books/:title", (req, res) => {
  const title = req.params.title;
  pool.query("SELECT * FROM books WHERE title LIKE ?", ['%' + title + '%'], (error, results) => {
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

app.get("/student", (req, res) => {
  pool.query("SELECT * FROM student", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/rentedbooks", (req, res) => {
  pool.query("SELECT * FROM borrowed_books", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});


app.post("/dashboard/addnewstudent", (req, res) => {
  const {
    student_id,
    name,
    email,
    enrollment_status,
    library_card_number,
  } = req.body;

  const values = [student_id, name, email, enrollment_status, library_card_number];

  pool.query(
    "INSERT INTO student (student_id, name, email, enrollment_status, library_card_number) VALUES (?, ?, ?, ?, ?)",
    values,
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Failed to add student");
      } else {
        res.status(201).send(`Student added`);
      }
    }
  );
});



app.post("/dashboard/issuebook", (req, res) => {
  const {
    user_id,
    book_id,  
    borrow_date,
    due_date,
    return_date,
  } = req.body; 
  pool.query(
    "INSERT INTO borrowed_books (user_id, book_id, borrow_date, due_date, return_date) VALUES (?, ?, ?, ?, ?)",
    [user_id, book_id, borrow_date, due_date, return_date],
    (error, results) => {
      if (error) {    
        console.error(error);
        res.status(500).send("Failed to add borrow");
      } else {
        res.status(201).send(`Borrow added with ID: ${results.user_id}`);
      }
    }
  );
});

app.get("/student", (req, res) => {
  pool.query("SELECT * FROM student", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

 




app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
