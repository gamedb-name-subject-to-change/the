import mongoose from 'mongoose';
import Posts from './model';
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
export default async  function handler(req, res) {
    let {author,title,content,tags}=req.body;
    const query=await Posts.create({author,title,content,tags,date: `${(new Date().getDate())}/${(new Date().getMonth())}/${(new Date().getFullYear())} ${(new Date().getHours())}:${(new Date().getMinutes())}`})
    console.log(query);
    res.status(200).json({ id: query._id })
}