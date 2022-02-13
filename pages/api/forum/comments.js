import mongoose from 'mongoose';

import Comments from '../../../models/comments';
const uri = process.env.MongoSecret
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected to Mongo");
});
export default async function handler(req, res) {
    const {postid}=req.body
    const data=await Comments.find({post:postid}).sort({_id:-1})
    res.json({data})
}