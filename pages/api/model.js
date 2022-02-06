const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    tags: {
        type: Array,
    },
    hits: {
        type: Number,
    },
    date:{
        type: String,
    }
});

const Posts = mongoose.models.postrb || mongoose.model("postrb", Schema);

module.exports = Posts;