import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ObjectId } from 'bson';
import '../style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const Course = ({ username }) => {
    const params = useParams();
    const course = params.courseCode;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [oneCourse, setOneCourse] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [numRatings, setNumRatings] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        fetch(`http://localhost:8081/courses/${course}`)
            .then((response) => response.json())
            .then((data) => {
                setOneCourse([data]);
            });

        fetch(`http://localhost:8081/${course}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });

        setRatingBars();
    }, []);

    useEffect(() => {
        setRatingBars();
    }, [reviews]);

    function setRatingBars() {
        var tmp = [0, 0, 0, 0, 0];
        for (var i = 0; i < reviews.length; i++) {
            tmp[reviews[i].rating - 1]++;
        }
        setNumRatings(tmp);
    }

    function getAverageRating() {
        if (reviews.length == 0) {
            return 0;
        }
        else {
            var sum = 0;
            for (var i = 0; i < reviews.length; i++) {
                sum += reviews[i].rating;
            }
            return (sum / reviews.length).toFixed(2);
        }
    }

    const submitReview = async data => {
        const id = new ObjectId();
        console.log(id.toString);
        const response = await fetch(`http://localhost:8081/${course}/${localStorage.getItem("username")}/reviews`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                "id": id.toString(),
                "title": "tmp",
                "body": data.review,
                "rating": parseInt(data.rating)
            })
        });

        if (response.status != 200) {
            alert("Failed to create review");
        }
        else {
            window.location.reload();
        }
    }

    const editReview = index => {
        try {
            fetch(`http://localhost:8081/${reviews[index]._id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show Catalog of Products :");
                    console.log(data);
                });
        }
        catch {
            console.log("error");
        }
    }

    const deleteReview = index => {
        try {
            fetch(`http://localhost:8081/${course}/${reviews[index]._id}/reviews`, { method: "DELETE" })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
            alert("Item successfully deleted!");
        }
        catch {
            console.log("error");
        }
    }

    const courseInfo = oneCourse.map((course) => (
        <div class="text-center">
            <div class="h-100 p-5 text-bg-dark rounded-3">
                <h1 id="course-code" class="display-5 fw-bold" style={{ marginTop: "50px" }}>{course.courseCode}</h1>
                <p id="course-title" class="col-md-8 fs-4" style={{ margin: "0 auto", textAlign: "center" }}>{course.courseTitle}</p>
                <p id="course-credits" class="col-md-8 fs-4" style={{ margin: "0 auto", textAlign: "center", paddingTop: "20px" }}><strong>Credits: {course.credits}</strong></p>
            </div>
        </div>
    ));

    const addReview = (
        <div className="form-container">
             <h3 className="mb-5">Add a review:</h3>
            {/*<form className="container m-5 review-form" onSubmit={handleSubmit(submitReview)}>
                <div class="row">
                    <div className="col">
                        <label for="rating">Rating</label>
                        <input {...register("rating", { required: true, pattern: { value: /^[1-5]$/, message: "Please enter a valid number from 1-5" } })} placeholder="Rating" className="form-control" autoFocus />
                        {errors.rating && <p className="text-danger">Rating is required.</p>}
                    </div>
                </div>
                <div class="row">
                    <div className="col">
                        <label htmlFor="review">Review</label>
                        <textarea
                            {...register("review", {
                                required: true,
                            })}
                            placeholder="Review"
                            className="form-control"
                            rows="3"
                            autoFocus
                        />
                        {errors.review && <p className="text-danger">Please enter a review for the course.</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form> */}

            {/* <form className="container" onSubmit={handleSubmit(submitReview)}>
                <input {...register("rating", { required: true, pattern: { value: /^[1-5]$/, message: "Please enter a valid number from 1-5" } })} placeholder="Rating" className="form-control" autoFocus />
                {errors.rating && <p className="text-danger">Rating is required.</p>}

            </form> */}
            <form className="container" onSubmit={handleSubmit(submitReview)}>
                <div class="form-group">
                    <label for="rating">Rate 1 - 5 Stars</label>
                    
                    <input {...register("rating", { required: true, pattern: { value: /^[1-5]$/, message: "Please enter a valid number from 1-5" } })} placeholder="Enter Rating..." className="form-control" autoFocus />
                        {errors.rating && <p className="text-danger">Rating is required.</p>}

                </div>
                <div class="form-group">
                    <label for="review">Write a Review</label>
                    <textarea
                        {...register("review", {
                            required: true,
                        })}
                        placeholder="Enter Review... "
                        className="form-control"
                        rows="3"
                        autoFocus
                    />
                </div>
                <button type="submit" class="form-submit">Submit</button>
            </form>
        </div>
    );

    const reviewList = reviews.map((review, index) => (
        <div class="row g-4 py-5">
            <div class="col d-flex flex-column position-relative course-container" style={{ height: "150px" }}>
                <div class="user-info">
                    <h4 style={{ padding: "10px" }}>{review.user}</h4>
                    <img id="star1" class="star" src={process.env.PUBLIC_URL + "/star.svg"} />
                    <img id="star2" class="star" src={process.env.PUBLIC_URL + "/star.svg"} style={review.rating < 2 ? { visibility: "hidden" } : {}} />
                    <img id="star3" class="star" src={process.env.PUBLIC_URL + "/star.svg"} style={review.rating < 3 ? { visibility: "hidden" } : {}} />
                    <img id="star4" class="star" src={process.env.PUBLIC_URL + "/star.svg"} style={review.rating < 4 ? { visibility: "hidden" } : {}} />
                    <img id="star5" class="star" src={process.env.PUBLIC_URL + "/star.svg"} style={review.rating < 5 ? { visibility: "hidden" } : {}} />
                </div>
                <div class="review-data">
                    <p>{review.body}</p>
                </div>
                <div className="edit-button">
                    <button>Edit</button>
                </div>
                <div className="delete-button" onClick={() => deleteReview(index)}>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    ));
    
    return (
        <div className="container">
            <div className="container row align-items-md-stretch">
                {courseInfo}
                <div className="text-center h-100 p-5 text-bg-dark rounded-3">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <span className="heading">Student Rating</span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <p><strong>{getAverageRating()}</strong> average based on <strong>{reviews.length}</strong> reviews.</p>
                        <hr style={{ border: "3px solid #f1f1f1" }} />

                        <div className="row">
                            <div className="side">
                                <div>5 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-5" style={{ width: `${(numRatings[4] / reviews.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{numRatings[4]}</div>
                            </div>
                            <div className="side">
                                <div>4 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-4" style={{ width: `${(numRatings[3] / reviews.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{numRatings[3]}</div>
                            </div>
                            <div className="side">
                                <div>3 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-3" style={{ width: `${(numRatings[2] / reviews.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{numRatings[2]}</div>
                            </div>
                            <div className="side">
                                <div>2 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-2" style={{ width: `${(numRatings[1] / reviews.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{numRatings[1]}</div>
                            </div>
                            <div className="side">
                                <div>1 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-1" style={{ width: `${(numRatings[0] / reviews.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{numRatings[0]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="row g-4 py-5">
                        {addReview}
                        <h1 className="display-5 fw-bold">Reviews</h1>
                        {reviewList}
                    </div>
                </div>
                </div>
                
            </div>


        </div>
    );
};

export default Course;