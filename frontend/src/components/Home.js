import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/getCourses")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    useEffect(() => {
        const results = products.filter((course) =>
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      }, [searchTerm, products]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // You can perform any additional actions here if needed
        console.log("Search term:", searchTerm);
    };

    const listItems = searchResults.map((course) => (
        <div className="m-5 course-item" key={course.courseCode}>
          <Link to={`/course/${course.courseCode}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>{course.courseCode}</h2>
            <p>Title: {course.courseTitle}</p>
            <p>Credits: {course.credits}</p>
          </Link>
        </div>
      ));
      

    return (
        <div className="container text-center">
            <div class="row height d-flex justify-content-center align-items-center">
                <div class="col-md-8">
                    <div class="search">
                        <i class="fa fa-search"></i>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search By Course Code..."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button class="btn btn-primary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {listItems}
        </div>
    );
};

export default Home;
