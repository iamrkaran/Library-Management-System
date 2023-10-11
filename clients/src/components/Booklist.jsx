import { Card, Container, ListGroup } from 'react-bootstrap';
import React, { useState , useEffect } from 'react';
import { getBooks } from '../api';
import Navbar from './Dashboard/Navbar/Navbar';
import Footer from './Dashboard/Footer/Footer';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(response => {
      setBooks(response.data);
    });
  }, []);

  return (
    <>
    <Navbar />
    <Container className="p-4">

      {books.map(book => (
        <Card key={book.book_id}>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Author: {book.author_id}</ListGroup.Item>
              <ListGroup.Item>Publisher: {book.publisher_id}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
    <Footer />
    </>
  );
}

export default BookList;
