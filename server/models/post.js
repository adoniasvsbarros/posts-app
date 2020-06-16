const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true},
    content: { type: String, required: true}
});

module.exports = mongoose.model("Post", postSchema);