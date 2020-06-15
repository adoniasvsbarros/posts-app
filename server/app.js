const express = require('express');

const app = express();

app.use("/api/posts", (req, res, next) => {
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