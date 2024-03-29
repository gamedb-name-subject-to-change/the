import axios from 'axios';
let matches = [];
let index = 0;
import  GameDB from "../../../models/gamedata";
import dbConnect from '../../../db/index'
async function fetchGameData(appID) {
    const res = await axios.post('/api/game/get', { id: appID }).then(async (res) => await res.data)
    return res;
}
export default async function handler(req, res) {
    await dbConnect()
    const { text, more } = req.body
    let results = []
    const regex = new RegExp(`.*${text}.*`, 'gi');
    if (!more){
        index=0;
        matches = await  GameDB.find( { name: regex } )
    }
    console.log(text, matches.length)
    let Q=matches.slice(index,index+6)
    index=index+6;
    for(const e of Q){
        let url = `https://store.steampowered.com/api/appdetails?appids=${e.appid}`
        let res = await axios.get(url).then(async (res) => await res.data)
        let temp=Object.values(res)[0].data
        results.push(temp);
    }   
    res.json({ data: results, more: (matches[index])?true:false})
    return;
}