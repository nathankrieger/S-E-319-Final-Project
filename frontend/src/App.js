import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './style.css';
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Course from "./components/Course"
import Login from "./components/Login"
import About from "./components/About";

function App() {

  return (

    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <div className="cover-container d-flex w-100 p-3 mx-auto flex-column flex-grow-1 text-center">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/course/:courseCode" element={<Course />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>

  );
}

export default App;