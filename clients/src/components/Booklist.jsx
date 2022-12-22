import { Card, ListGroup } from 'react-bootstrap';
import React, { useState , useEffect } from 'react';
import { getBooks } from '../api';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(response => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default BookList;
