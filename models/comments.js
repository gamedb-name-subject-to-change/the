const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    post: {
        type: String
    },
    content: {
        type: String
    },
    points: {
        type: Number
    },
    date:{
        type: String
    }
});

const Comments = mongoose.models.GDBPostComments || mongoose.model("GDBPostComments", Schema);

module.exports = Comments;