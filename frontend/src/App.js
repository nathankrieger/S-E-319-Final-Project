import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import './style.css';

function App() {

  function NavBar() {
    const navigate = useNavigate();

    return (
      // <header class="mb-auto">
      //   <div class="navContainer">
      //     <div onClick={() => navigate('/getcatalog')}>
      //       <div class="navElem">Get</div>
      //     </div>
      //     <div onClick={() => navigate('/postcatalog')}>
      //       <div class="navElem">Post</div>
      //     </div>
      //     <div onClick={() => navigate('/putcatalog')}>
      //       <div class="navElem">Put</div>
      //     </div>
      //     <div onClick={() => navigate('/deletecatalog')}>
      //       <div class="navElem">Delete</div>
      //     </div>
      //     <div onClick={() => navigate('/studentinfo')}>
      //       <div class="navElem">Student Info</div>
      //     </div>
      //   </div>
      // </header>
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Courses</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <Link to="/" className="nav-link fw-bold py-1 px-0" aria-current="page">Home</Link>
            <Link to="/getCatalog" className="nav-link fw-bold py-1 px-0">Courses</Link>
            <Link to="/flowcharts" className="nav-link fw-bold py-1 px-0">Flowcharts</Link>
            <Link to="/about" className="nav-link fw-bold py-1 px-0">About</Link>
          </nav>
        </div>
      </header>

    );
  }

  function Footer() {
    const navigate = useNavigate();

    return (
      // <header class="mb-auto">
      //   <div class="navContainer">
      //     <div onClick={() => navigate('/getcatalog')}>
      //       <div class="navElem">Get</div>
      //     </div>
      //     <div onClick={() => navigate('/postcatalog')}>
      //       <div class="navElem">Post</div>
      //     </div>
      //     <div onClick={() => navigate('/putcatalog')}>
      //       <div class="navElem">Put</div>
      //     </div>
      //     <div onClick={() => navigate('/deletecatalog')}>
      //       <div class="navElem">Delete</div>
      //     </div>
      //     <div onClick={() => navigate('/studentinfo')}>
      //       <div class="navElem">Student Info</div>
      //     </div>
      //   </div>
      // </header>
      <footer class="footer">
        <p>Website made by <strong>Nathan Krieger</strong> & <strong>Rocco Zollo</strong></p>
      </footer>

    );
  }

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
      <div class="row border-top border-bottom mt-5" key={el.id}>
        <div class="row main align-items-center">
          <div class="col-2">
            <img class="img-fluid" src={el.flowchart.img} />
          </div>
          <div class="col">
            {/* <div class="row">Title: {el.major-info.major}</div> */}
          </div>
        </div>

      </div>

    ));

    return (<body>

      Hello World
      {/* <header class="mb-auto">
        <div class="navContainer">
          <div onClick={() => navigate('/getcatalog')}>
            <div class="navElem">Get</div>
          </div>
          <div onClick={() => navigate('/postcatalog')}>
            <div class="navElem">Post</div>
          </div>
          <div onClick={() => navigate('/putcatalog')}>
            <div class="navElem">Put</div>
          </div>
          <div onClick={() => navigate('/deletecatalog')}>
            <div class="navElem">Delete</div>
          </div>
          <div onClick={() => navigate('/studentinfo')}>
            <div class="navElem">Student Info</div>
          </div>
        </div>
      </header> */}
      {listItems}
    </body>);
  }



  return (


    <Router>
      <NavBar />
      <Routes>
        <Route path="/getcatalog" element={<Get />} />

        {/* TODO */}

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
