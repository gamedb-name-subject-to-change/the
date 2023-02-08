import Posts from '../../../models/posts'
import Comments from '../../../models/comments';
import dbConnect from '../../../db/index'
export default async function handler(req, res) {
    await dbConnect()
    const { requestCount, keywords, id, byUser, forGame, addcomment, count } = req.body;
    if (req.method === 'GET') {
        let data = await Posts.find({}, { _id: 1 })
        let paths = data.map((item) => { return item._id.valueOf() })
        res.status(200).json(paths)
        return;
    }
    else if (addcomment) {
        console.log(addcomment)
        let query = await Comments.create(addcomment)
        res.status(200).json({ status:'ok',id: query._id })
    }
    else if (forGame && count) {
        let posts = await Posts.find({ $or: [{ "tags": new RegExp(forGame.name, "gi") }, { "tags": new RegExp(forGame.appid, "gi") }] }).sort({ _id: -1 }).limit(count)
        console.log(posts, forGame)
        res.status(200).json({ posts })
    }
    else if (byUser && count) {
        let posts = await Posts.find({ "author": byUser }).sort({ _id: -1 }).limit(count)
        res.status(200).json({ posts })
    }
    else if (id) {
        console.log(id)
        let data = await Posts.findOne({ _id: id });
        let hits = (data.hits) ? parseInt(data.hits) + 1 : 1;
        await Posts.findByIdAndUpdate(id, { hits: hits })
        res.status(200).json(data)
    }
    else {
        let posts = await Posts.find({ $or: [{ "title": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }, { "author": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }, { "date": { $regex: (keywords) ? (keywords.trim().length > 0) ? new RegExp(keywords.trim()) : ".*" : ".*", $options: 'i' } }] }).sort({ hits: -1 }).limit(count).skip((requestCount >= 0) ? requestCount * 10 : 0);
        res.status(200).json({ posts })
    }
}