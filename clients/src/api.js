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
}