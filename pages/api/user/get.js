import mongoose from 'mongoose';
import Users from '../../../models/users'
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
    if(req.method==='GET'){
        let data = await Users.find({}, { username: 1 })
        let paths = data.map((item) => { return item.username })
        res.status(200).json(paths)
        return;
    }
    else{
        const {id}=req.body
        let query=await Users.findOne({username:id})
        res.status(200).json(query)
    }
}