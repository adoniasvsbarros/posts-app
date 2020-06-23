const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsController = require('./controllers/posts.controller');
const usersController = require('./controllers/users.controller');

const app = express();

// CONNECT DATABASE
mongoose.connect("mongodb+srv://avsb:" + 
process.env.MONGO_ATLAS_PW + 
"@cluster0-vabyl.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(error => {
        console.log('#################\n' + error);
        console.log('Connection failed'); 
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

// SET REQUEST HEADERS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Request-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

// SET CONTROLLERS
app.use("/api/posts", postsController);
app.use("/api/user", usersController);

module.exports = app;