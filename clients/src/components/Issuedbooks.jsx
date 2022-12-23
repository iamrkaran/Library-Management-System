import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { rentedBooks } from '../api';

import './style.global.css'

function Issuedbooks() {

    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        rentedBooks().then(response => {
            setBorrowedBooks(response.data);
        });
    }, []);


  return (
   
        <table className="tablestyle">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>User ID</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map(book => (
              <tr key={book.borrow_id}>
                <td>{book.book_id}</td>
                <td>{book.user_id}</td>
                <td>{book.borrow_date}</td>
                <td>{book.due_date}</td>
                <td>{book.return_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
  );
}

export default Issuedbooks;