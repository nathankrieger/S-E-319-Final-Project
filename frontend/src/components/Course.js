import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css';

const Course = () => {

    const [oneCourse, setOneCourse] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [numRatings, setNumRatings] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        fetch("http://localhost:8081/courses/ACCT%202150")
            .then((response) => response.json())
            .then((data) => {
                setOneCourse([data]);
            });

        fetch("http://localhost:8081/ACCT%202150/ratings")
            .then((response) => response.json())
            .then((data) => {
                setRatings(data);
            });

        fetch("http://localhost:8081/ACCT%202150/reviews")
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });

            setRatingBars();
    }, []);

    function setRatingBars() {
        var tmp = [0, 0, 0, 0, 0];
        for (var i = 0; i < ratings.length; i++) {
            tmp[ratings[i].rating-1]++;
        }
        setNumRatings(tmp);
    }

    function getAverageRating() {
        if (ratings.length == 0) {
            return 0;
        }
        else {
            var sum = 0;
            for (var i = 0; i < ratings.length; i++) {
                sum+=ratings[i].rating;
            }
            return (sum/ratings.length).toFixed(2);
        }
    }

    const courseInfo = oneCourse.map((course) => (
        <div class="text-center">
            <div class="h-100 p-5 text-bg-dark rounded-3">
                <h1 id="course-code" class="display-5 fw-bold" style={{marginTop: "50px"}}>{course.courseCode}</h1>
                <p id="course-title" class="col-md-8 fs-4" style={{margin: "0 auto", textAlign: "center"}}>{course.courseTitle}</p>
                <p id="course-credits" class="col-md-8 fs-4" style={{margin: "0 auto", textAlign: "center", paddingTop: "20px"}}><strong>Credits: {course.credits}</strong></p>
            </div>
        </div>
    ));

    const reviewList = reviews.map((review) => (
        <div class="row g-4 py-5">
            <div class="col d-flex flex-column position-relative course-container" style={{height: "150px"}}>
                <div class="user-info">
                <h4 style={{padding: "10px"}}>{review.user}</h4>
                <img id="star1" class="star" src={process.env.PUBLIC_URL+"/star.svg"} />
                <img id="star2" class="star" src={process.env.PUBLIC_URL+"/star.svg"} style={review.rating < 2 ? {visibility: "hidden"} : {}} />
                <img id="star3" class="star" src={process.env.PUBLIC_URL+"/star.svg"} style={review.rating < 3 ? {visibility: "hidden"} : {}} />
                <img id="star4" class="star" src={process.env.PUBLIC_URL+"/star.svg"} style={review.rating < 4 ? {visibility: "hidden"} : {}} />
                <img id="star5" class="star" src={process.env.PUBLIC_URL+"/star.svg"} style={review.rating < 5 ? {visibility: "hidden"} : {}} />
                </div>
                <div class="review-data">
                <p>{review.body}</p>
                </div>
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
                    <p><strong>{getAverageRating()}</strong> average based on <strong>{ratings.length}</strong> reviews.</p>
                    <hr style={{border: "3px solid #f1f1f1"}}/>

                    <div class="row">
                    <div class="side">
                        <div>5 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-5" style={{width: `${(numRatings[4]/ratings.length)*100}%`}}></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>{numRatings[4]}</div>
                    </div>
                    <div class="side">
                        <div>4 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-4" style={{width: `${(numRatings[3]/ratings.length)*100}%`}}></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>{numRatings[3]}</div>
                    </div>
                    <div class="side">
                        <div>3 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-3" style={{width: `${(numRatings[2]/ratings.length)*100}%`}}></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>{numRatings[2]}</div>
                    </div>
                    <div class="side">
                        <div>2 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-2" style={{width: `${(numRatings[1]/ratings.length)*100}%`}}></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>{numRatings[1]}</div>
                    </div>
                    <div class="side">
                        <div>1 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-1" style={{width: `${(numRatings[0]/ratings.length)*100}%`}}></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>{numRatings[0]}</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <h1 class="display-5 fw-bold">Reviews</h1>
            {reviewList}
        </main>
    );
};

export default Course;