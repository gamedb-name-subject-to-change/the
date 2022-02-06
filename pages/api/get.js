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
export default async function handler(req, res) {
    const { requestCount, keywords,id} = req.body;
    if (req.method==='GET') {
        let data = await Posts.find({}, { _id: 1 })
        let paths = data.map((item) => { return item._id.valueOf() })
        res.status(200).json(paths)
        return;
    }
    else if(id){
        console.log(id)
        let data=await Posts.findOne({_id:id});
        let hits=(data.hits)?parseInt(data.hits)+1:1;
        await Posts.findByIdAndUpdate(id,{hits:hits})
        res.status(200).json(data)
    }
    else{
    let posts = await Posts.find({ $or: [{ "title": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }, { "author": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }, { "date": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }] }).sort({ hits: -1 }).limit(3).skip((requestCount >= 0) ? requestCount * 10 : 0);
    res.status(200).json({ posts })
    }
}