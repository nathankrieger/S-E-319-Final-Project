var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);


app.listen(port, () => {
    console.log("App listening at https://%s:%s", host, port);
});

// get all courses
app.get("/courses", async (req, res) => {
    try {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");

        const query = {};

        const results = await db.collection("courses").find(query).toArray();

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send(results);
    }
});

// get single course
app.get("/courses/:course", async (req, res) => {
    try {
        courseCode = decodeURIComponent(req.params.course);

        await client.connect();
        console.log("Node connected successfully to GET COURSE MongoDB");

        const query = {"courseCode": courseCode};

        const results = await db.collection("courses").findOne(query);

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});

//get all current users
app.get("/users", async (req, res) => {
    try {
        await client.connect();
        console.log("Node connected successfully to GET USERS MongoDB");

        const query = {};

        const results = await db.collection("users").find(query).toArray();
        console.log(results);

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});

//get single user
app.get("/user/:username", async (req, res) => {
    try {
        const username = req.params.username;

        await client.connect();
        console.log("Node connected successfully to GET USER MongoDB");

        const query = {"username": username};

        const results = await db.collection("users").findOne(query);

        if (results == null) {
            res.status(404);
            res.send({"error": "Object not found"});
        }

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});

//add a new user provided username and password
//payload format:
// {
//     "username": username,
//     "password": password
// }
app.post("/user", async (req, res) => {
    try {
        const user = req.body;

        await client.connect();
        console.log("Node connected successfully to POST USER MongoDB");

        const results = await db.collection("users").insertOne(user);
        console.log(results);

        if (results.acknowledged) {
            res.status(201);
            res.send(results);
        }
        else {
            res.status(500);
            res.send(results);
        }
    }
    catch {
        res.status(500);
        res.send();
    }
});

//delete a user by username, including all posted reviews/ratings
app.delete("/user/:username", async (req, res) => {
    try {
        const username = req.params.username;

        await client.connect();
        console.log("Node connected successfully to DELETE USER MongoDB");

        query = {"reviews": {$elemMatch: {"user": username}}}
        const reviewsRes = await db.collection("courses").updateMany(query, {$pull: {'reviews': {'user': username}}});

        query = {"username": username}
        const results = await db.collection("users").deleteOne(query);

        if (results.deletedCount == 0) {
            res.status(404);
            res.send({"error": "User not found"});
        }
        else {
            res.status(200);
            res.send(results);
        }
    }
    catch {
        res.status(500);
        res.send();
    }
});

//return reviews for a course based on the course code
app.get("/:course/reviews", async (req, res) => {
    try {
        courseCode = decodeURIComponent(req.params.course);

        await client.connect();
        console.log("Node connected successfully to GET REVIEWS MongoDB");

        const query = {"courseCode": courseCode};

        const results = await db.collection("courses").findOne(query);

        res.status(200);
        res.send(results.reviews);
    }
    catch {
        res.status(500);
        res.send();
    }
});

//post a review on a course from a user, also updating the ratings table
//body format (can and probably will change later):
// {
//     "id": randomly generated unique id
//     "title": title,
//     "body": body,
//     "rating": rating (decimal)
// }
app.post("/:course/:username/reviews", async (req, res) => {
    try {
        username = req.params.username;
        courseCode = decodeURIComponent(req.params.course);

        review = req.body;

        await client.connect();
        console.log("Node connected successfully to POST REVIEW MongoDB");

        const query = {"courseCode": courseCode};
        const payload = {
            "_id": review.id,
            "user": username,
            "title": review.title,
            "body": review.body,
            "rating": review.rating
        };

        const results = await db.collection("courses").findOneAndUpdate(query, {$push: {"reviews": payload}});

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});

//delete review for given course for specified user
app.delete("/:course/:id/reviews", async (req, res) => {
    try {
        courseCode = decodeURIComponent(req.params.course);
        id = req.params.id;

        await client.connect();
        console.log("Node connected successfully to DELETE REVIEW MongoDB");

        const query = {"courseCode": courseCode};
        const results = await db.collection("courses").findOneAndUpdate(query, {$pull: {'reviews': {'_id': id}}});

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});

app.put("/:course/:id/reviews", async (req, res) => {
    try {
        courseCode = decodeURIComponent(req.params.course);
        revId = req.params.id;

        review = req.body;

        await client.connect();
        console.log("Node connected successfully to POST REVIEW MongoDB");

        const query = {"courseCode": courseCode};
        const results = await db.collection("courses").findOneAndUpdate(query, {$set: {'reviews.body': review.body, 'reviews.rating': review.rating}});

        res.status(200);
        res.send(results);
    }
    catch {
        res.status(500);
        res.send();
    }
});
