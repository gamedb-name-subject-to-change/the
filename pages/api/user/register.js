import bcrypt from 'bcryptjs/dist/bcrypt';
import Users from '../../../models/users'
import dbConnect from '../../../db/index'

export default async function handler(req, res) {
    await dbConnect()
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