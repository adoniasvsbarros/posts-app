const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://avsb:2SiR0EVVtsj1bxrS@cluster0-vabyl.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

// SET HEADERS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: documents
        });
    });    
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added sucessfully!',
            postId: createdPost._id
        });
    });
    
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({_id: req.params.id}, post).then(updatedPost => {
        res.status(200).json({
            message: 'Post updated sucessfully'
        })
    });
});


app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: 'post deleted!'});
    });
});

module.exports = app;