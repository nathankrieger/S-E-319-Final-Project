import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/courses")
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

    const listItems = searchResults.slice(0, 100).map((course) => (
        <tr key={course.courseCode}>
            <td>
                <Link to={`/course/${course.courseCode}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {course.courseCode}
                </Link>
            </td>
            <td>
                <Link to={`/course/${course.courseCode}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {course.courseTitle}
                </Link>
            </td>
            <td><Link to={`/course/${course.courseCode}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {course.credits}
            </Link></td>
        </tr>
    ));

    return (
        <div className="container text-center">
            <div class="col justify-content-center">
                <div class="search">
                    {/* <i class="fa fa-search"></i> */}
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search By Course Code..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-borderless table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Title</th>
                            <th scope="col">Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
