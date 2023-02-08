import Posts from '../../../models/posts';
import dbConnect from '../../../db/index'
export default async  function handler(req, res) {
    await dbConnect()
    let {author,title,content,tags}=req.body;
    const query=await Posts.create({author,title,content,tags,date: new Date()})
    console.log(query);
    res.status(200).json({ status:'ok',id: query._id })
}