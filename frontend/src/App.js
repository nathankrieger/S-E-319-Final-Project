import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './style.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {

  const Get = () => {

    const [products, setProducts] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
      fetch("http://localhost:8081/getCourses")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    }, []);

    const listItems = products.map((el) => (
      <div className="row border-top border-bottom mt-5" key={el.id}>
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.flowchart.img} />
          </div>
          <div className="col">
            {/* <div class="row">Title: {el.major-info.major}</div> */}
          </div>
        </div>

      </div>

    ));

    return (<body>

      Hello World
      
      {listItems}
    </body>);
  }



  return (


    <Router>
       <div className="min-vh-100 d-flex flex-column"> {/* Set min-vh-100 for minimum viewport height */}
        <div className="cover-container d-flex w-100 p-3 mx-auto flex-column flex-grow-1"> {/* Set flex-grow-1 to make it fill the remaining space */}
          <NavBar />
          <main className="px-3">
            <Home />
          </main>
          <Routes>
            <Route path="/getcatalog" element={<Get />} />

            {/* TODO */}


          </Routes>
          <Footer />
        </div>
      </div>
    </Router>

  );
}

export default App;
