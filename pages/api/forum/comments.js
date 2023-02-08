import Comments from '../../../models/comments';
import dbConnect from '../../../db/index'
export default async function handler(req, res) {
    await dbConnect()
    const {postid}=req.body
    const data=await Comments.find({post:postid}).sort({_id:-1})
    res.json({data})
}