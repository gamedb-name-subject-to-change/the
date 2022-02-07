import bcrypt from 'bcryptjs/dist/bcrypt';
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
    let { username, displayName, password } = req.body;
    password=await bcrypt.hash(password,10)
    console.log(password)
    console.log(req.body)
    try {
        const query = await Users.create({ username, displayName, password });
        console.log(query);
        res.json({ status: 'ok' })
    }
    catch (e) {
        console.log(e)
        res.json({ status: e })
    }
}