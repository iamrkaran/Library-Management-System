import React from "react";
import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Updatebook from "../../Updatebook";

const Home = () => {
  const [sample, setSample] = useState([]);

  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
        setSample(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="home">
      <div className="container bg-dark">
        <div className="row">
          {sample.map((item) => (
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" key={item.book_id} >Book id :-- {item.book_id}</h5>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.author}</p>
                  <p className="card-text">{item.isbn}</p>
                  <p className="card-text">{item.edition}</p>
                  <p className="card-text">{item.dimensions}</p>
                  <p className="card-text">{item.publisher}</p>
                  <p className="card-text">{item.year}</p>
                  <p className="card-text">{
                    item.availability == 1 ? "Available" : "Not Available"
                  }</p>
                  <Link
                    to="/updatebook"
                    onClick={() => <Updatebook value={item} />}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
