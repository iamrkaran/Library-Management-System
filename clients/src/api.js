import axios from 'axios';

import config from '../config';

const baseUrl = config().baseUrl;

export const login = (email, password) => {
  return axios.post(`${baseUrl}/login`, { email, password });
};

export const signup = (name, email, password) => {
  return axios.post(`${baseUrl}/signup`, { name, email, password });
};

export const getBooks = () => {
  return axios.get(`${baseUrl}/books`);
};

export const createBook = (
  title,
  author_id,
  publisher_id,
  isbn,
  publication_year,
  availability
) => {
  return axios.post(`${baseUrl}/addbooks`, {
    title,
    author_id,
    publisher_id,
    isbn,
    publication_year,
    availability,
  });
};

export const updateBook = (
  id,
  title,
  author_id,
  publisher_id,
  isbn,
  publication_year,
  availability
) => {
  return axios.put(`${baseUrl}/updatebook/${id}`, {
    id,
    isbn,
    title,
    author_id,
    publisher_id,
    publication_year,
    availability,
  });
};

export const deleteBook = (isbn) => {
  return axios.delete(`${baseUrl}/deletebook/${isbn}`);
};

export const rentedBooks = () => {
  return axios.get(`${baseUrl}/rentedbooks`);
};

export const searchNewBooks = (id) => {
  const endpoint = `${baseUrl}/books/${id}`;
  return axios.get(endpoint);
};

export const addNewStudent = (studentData) => {
  return axios.post(`${baseUrl}/dashboard/addnewstudent`, studentData);
};


export const IssueBook = (
  user_id,
  book_id,
  borrow_date, 
  due_date,
  return_date
) => {
  return axios.post(`${baseUrl}/dashboard/issuebook`, {
    user_id,
    book_id,
    borrow_date,
    due_date,
    return_date,
  });
};

export const getStudents = () => {
  return axios.get(`${baseUrl}/student`);
};
