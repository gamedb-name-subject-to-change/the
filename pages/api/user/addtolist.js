import Users from '../../../models/users'
import dbConnect from '../../../db/index'

export default async function handler(req, res) {
    await dbConnect()
    const {user,appid,score,comment}=req.body
    let data = await Users.findOne({username:user})
    let list=data.list
    const check=list.find((el)=>{return el.appId===appid})
    console.log(check)
    if(check){
        res.json({status:'already in the list'})
        return
    }
    list.push({appId:appid,score,status:null,comment:comment})
    let query=await Users.findOneAndUpdate({username:user},{list:list})
    res.json({status:'ok'})
    return;
}