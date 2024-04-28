import React, { Component } from "react";

class Footer extends Component {

    render() {



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
            <footer className="mt-auto text-white-50 text-center">
                <p>Website made by <strong>Nathan Krieger</strong> & <strong>Rocco Zollo</strong></p>
            </footer>

        );
    }
}

export default Footer;