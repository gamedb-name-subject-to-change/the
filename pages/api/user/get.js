import Users from '../../../models/users'
import dbConnect from '../../../db/index'

export default async function handler(req, res) {
    await dbConnect()
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