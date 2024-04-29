import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {

    render() {

        return (

            <div className="container text-center">
                <h1>Welcome</h1>
                <p>This website is designed with the intent to give every student the ability to seemlessly find any required course in their major at Iowa State.
                </p>
                {/* <p className="lead">
                    <Link to="/getcatalog" className="btn btn-lg btn-light fw-bold border-white bg-white">Find a course</Link>
                </p> */}
                <div class="row height d-flex justify-content-center align-items-center">

                    <div class="col-md-8">

                        <div class="search">
                            <i class="fa fa-search"></i>
                            <input type="text" class="form-control" placeholder="Search By Course Code..." />
                            <button class="btn btn-primary">Search</button>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}

export default Home;