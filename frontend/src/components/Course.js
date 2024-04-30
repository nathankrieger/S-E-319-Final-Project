import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css';

const Course = () => {

    const [oneCourse, setOneCourse] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/courses/ACCT%202150")
            .then((response) => response.json())
            .then((data) => {
                setOneCourse([data]);
            });
    }, []);

    const courseInfo = oneCourse.map((course) => (
        <div class="text-center">
            <div class="h-100 p-5 text-bg-dark rounded-3">
                <h1 id="course-code" class="display-5 fw-bold" style={{marginTop: "50px"}}>{course.courseCode}</h1>
                <p id="course-title" class="col-md-8 fs-4" style={{margin: "0 auto", textAlign: "center"}}>{course.courseTitle}</p>
                <p id="course-credits" class="col-md-8 fs-4" style={{margin: "0 auto", textAlign: "center", paddingTop: "20px"}}><strong>Credits: {course.credits}</strong></p>
            </div>
        </div>
    ));

    return (
        <main>
            <div class="row align-items-md-stretch">
                {courseInfo}
                <div class="text-center">
                <div class="h-100 p-5 text-bg-dark rounded-3">
                    <span class="heading">Student Rating</span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <p><strong>4.1</strong> average based on <strong>254</strong> reviews.</p>
                    <hr style={{border: "3px solid #f1f1f1"}}/>

                    <div class="row">
                    <div class="side">
                        <div>5 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-5"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>150</div>
                    </div>
                    <div class="side">
                        <div>4 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-4"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>63</div>
                    </div>
                    <div class="side">
                        <div>3 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-3"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>15</div>
                    </div>
                    <div class="side">
                        <div>2 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-2"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>6</div>
                    </div>
                    <div class="side">
                        <div>1 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-1"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>20</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>


            <h1 class="display-5 fw-bold">Reviews</h1>
            <div class="row g-4 py-5">
            <div class="col d-flex flex-column position-relative course-container" style={{height: "150px"}}>
                <div class="user-info">
                <h4 style={{padding: "10px"}}>test_user_1</h4>
                <img id="star1" class="star" src="./myotherimages/star.svg" />
                <img id="star2" class="star" src="./myotherimages/star.svg" />
                <img id="star3" class="star" src="./myotherimages/star.svg" />
                <img id="star4" class="star" src="./myotherimages/star.svg" style={{visibility: "hidden"}} />
                <img id="star5" class="star" src="./myotherimages/star.svg" style={{visibility: "hidden"}} />
                </div>
                <div class="review-data">
                <p>This is a test review. </p>
                </div>
            </div>
            </div>
            <div class="row g-4 py-5">
            <div class="col d-flex flex-column position-relative course-container" style={{height: "150px"}}>
                <div class="user-info">
                <h4 style={{padding: "10px"}}>test_user_2</h4>
                <img id="star1" class="star" src="./myotherimages/star.svg" />
                <img id="star2" class="star" src="./myotherimages/star.svg" />
                <img id="star3" class="star" src="./myotherimages/star.svg" />
                <img id="star4" class="star" src="./myotherimages/star.svg" />
                <img id="star5" class="star" src="./myotherimages/star.svg" style={{visibility: "hidden"}} />
                </div>
                <div class="review-data">
                <p>This is a test review. </p>
                </div>
            </div>
        </div>
    </main>
    );
};

export default Course;