import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Routes, useNavigate, Link, useLocation } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './style.css';
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";

function App() {

  const Get = () => {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
      const results = products.filter((major) =>
        major.courses.some((course) =>
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(results);
    }, [searchTerm, products]);

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };


    const listItems = searchResults.map((major) => (
      <div className="m-5" key={major.major}>
        <h2>{major.major}</h2>
        <img src={major['major-info'].img} alt={major.major} />
        <p>College: {major['major-info'].college}</p>
        <p>Abbreviation: {major['major-info'].abbr}</p>
        <p>Flowchart Credits: {major.flowchart.credits}</p>
        <p>Flowchart Year: {major.flowchart.year}</p>
        <img src={major.flowchart.img} alt={`Flowchart for ${major.major}`} />
        <h3>Courses:</h3>
        {major.courses
          .filter((course) =>
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((course) => (
            <div className="mt-5" key={course.courseCode}>
              <p>Course Code: {course.courseCode}</p>
              <p>Course Title: {course.courseTitle}</p>
              <p>Credits: {course.credits}</p>
            </div>
          ))}
      </div>

    ));

    return (<div className="m-5">

      <input
        type="text"
        placeholder="Search Course by Course Code"
        value={searchTerm}
        onChange={handleChange}
      />
      {listItems}
    </div>);
  }

  return (


    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <div className="cover-container d-flex w-100 p-3 mx-auto flex-column flex-grow-1 text-center">
          <NavBar />
          {/* <main className="px-3">
            <Home />
          </main> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getcatalog" element={<Get />} />
            <Route path="/about" element={<About />} />

          </Routes>
          <Footer />
        </div>
      </div>
    </Router>

  );
}

export default App;
