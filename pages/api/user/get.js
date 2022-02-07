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
    
}