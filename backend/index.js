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

app.get("/getUsers", async (req, res) => {
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
        res.send(results);
    }
});

app.post("/user", async (req, res) => {
    try {
        const user = req.body;

        await client.connect();
        console.log("Node connected successfully to POST USER MongoDB");

        const result = await db.collection("users").insertOne(user);
        console.log(result);

        if (result.acknowledged) {
            res.status(201);
        }
        else {
            res.status(500);
        }
    }
    catch {
        res.status(500);
    }
});
