import bcrypt from 'bcryptjs/dist/bcrypt';
import mongoose from 'mongoose';
import Users from '../../../models/users'
import jwt from 'jsonwebtoken'
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
    let { username, password, token } = req.body;
    try {
        if(token){
            let usr=jwt.verify(token,process.env.JWTSecret)
            if(usr.username){
                res.json({status:'ok',user:usr.username})
            }
            else{
                res.json({status:'not ok'});
            }
            return
        }
        const user = await Users.findOne({ username });
        if(!user){
            res.json({status:'not ok'})    
        }
        else if (await bcrypt.compare(password, user.password)) {
            console.log(process.env.JWTSecret)
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    password: user.password
                },
                process.env.JWTSecret
            )
            res.json({ status: 'ok', data: token })
        }
        else
            res.json({ status: 'invalid password' })
    }
    catch (e) {
        console.log(e)
        res.json({ status: e })
    }
}