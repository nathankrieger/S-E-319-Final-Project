import React, { Component } from "react";

class About extends Component {

    render() {

        return (
            <div>
                <h1><strong>SE/ComS319 Construction of User Interfaces, Spring 2024</strong></h1>
                <p class="lead">03/09/2024 <br></br> Professor Jannesari</p>
                <h2>Nathan Krieger</h2>
                <p class="lead">Sophomore studying Software Engineering at Iowa State University.<br></br>
                    <a href="mailto:nkrieger@iastate.edu"><i class="fas fa-envelope"></i> nkrieger@iastate.edu</a> <br></br>

                </p>

                <h2>Rocco Zollo</h2>
                <p class="lead">
                    Junior studying Computer Science and Cybersecurity at Iowa State University.<br></br>
                    <a href="mailto:rzollo@iastate.edu"><i class="fas fa-envelope"></i> rzollo@iastate.edu</a> <br></br>
                </p>
            </div>

        );
    }
}

export default About;