import bcrypt from 'bcryptjs/dist/bcrypt';
import env from '../../../environments/env.json';
import Users from '../../../models/users'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../db/index'

export default async function handler(req, res) {
    await dbConnect()
    let { username, password, token } = req.body;
    try {
        if(token){
            let usr=jwt.verify(token,env.JWTSecret)
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
            console.log(env.JWTSecret)
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    password: user.password
                },
                env.JWTSecret
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