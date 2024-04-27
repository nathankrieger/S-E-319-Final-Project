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

// Read
app.get("/getCourses", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const query = {};

    const results = await db.collection("courses").find(query).limit(100).toArray();
    console.log(results);

    res.status(200);
    res.send(results);
});