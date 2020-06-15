const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

// SET HEADERS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Request-With, Content-Type, Accept",
        "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});

// POST - Posts
app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    
    res.status(201).json({
        message: 'Post added sucessfully!'
    });
});

// GET - Posts
app.get("/api/posts", (req, res, next) => {
    const posts = [
        {id: "1kjh321h", title: "first title", content:"first commes from server"},
        {id: "1dd3411c", title: "second title", content:"second commes from server"},
        {id: "abcuf123", title: "third title", content:"third commes from server"}
    ];

    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: posts
    });
});

module.exports = app;