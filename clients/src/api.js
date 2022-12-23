import axios from "axios";

const baseUrl = "http://localhost:3000";

export const login = (email, password) => {
  return axios.post(`${baseUrl}/login`, { email, password });
};

export const signup = (name, email, password) => {
  return axios.post(`${baseUrl}/signup`, { name, email, password });
};

export const getBooks = () => {
  return axios.get(`${baseUrl}/books`);
};

// const { title, authorId, publisherId, isbn, publication_year } = fromdata;
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
  return axios.put(`${baseUrl}/updatebook/:${id}`, {
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



export const addNewStudent = (
  student_id,
  name,
  email,
  enrollment_status,
  library_card_number
) => {
  return axios.post(`${baseUrl}/dashboard/addnewstudent`, {
    student_id,
    name,
    email,
    enrollment_status,
    library_card_number,
  });
};

// borrow_id, user_id, book_id, borrow_date, due_date, return_date

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
