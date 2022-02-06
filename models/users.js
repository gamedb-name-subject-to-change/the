const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    list: [{
        appId: { type: Number, required: true },
        score: { type: Number },
        status: { type: String },
        comment: { type: Number },
        genre: { type: String }
    }],
    posts: [{
        postId: { type: Number, required: true },
        title: { type: String, required: true },
        content: { type: String },
        tags: { type: Array }
    }],
    follows: [{ username: String }],
    updates: [{ appId: String, status: String, comment: String}]
});

const Users = mongoose.models.GDBUsers || mongoose.model("GDBUsers", Schema);

module.exports = Users;