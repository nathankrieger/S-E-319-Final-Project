import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {



        return (
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">Course Tracker</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link to="/" className="nav-link fw-bold py-1 px-0">Home</Link>
                        {/* <Link to="/getCatalog" className="nav-link fw-bold py-1 px-0">Courses</Link> */}
                        {/* <Link to="/flowcharts" className="nav-link fw-bold py-1 px-0">Flowcharts</Link> */}
                        <Link to="/about" className="nav-link fw-bold py-1 px-0">About</Link>
                        <Link to="/login" className="nav-link fw-bold py-1 px-0">Log In/Register</Link>
                    </nav>
                </div>
            </header>

        );
    }
}

export default NavBar;