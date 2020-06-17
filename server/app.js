const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

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

app.use("/api/posts", postsRoutes);


module.exports = app;