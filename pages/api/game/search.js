import axios from 'axios';
let matches = [];
let index = 0;
const uri = process.env.MongoSecret
const mongoose=require('mongoose')
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const Schema = new mongoose.Schema({
    appid: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    }
});
const  GameDB= mongoose.models.gdbsteam || mongoose.model("gdbsteam", Schema);
async function fetchGameData(appID) {
    const res = await axios.post('/api/game/get', { id: appID }).then(async (res) => await res.data)
    return res;
}
export default async function handler(req, res) {
    const { text, more } = req.body
    let results = []
    const regex = new RegExp(`.*${text}.*`, 'gi');
    if (!more){
        index=0;
        matches = await  GameDB.find( { name: regex } )
    }
    console.log(text, matches.length)
    for(let i =index;i<index+6;i++){
        let url = `https://store.steampowered.com/api/appdetails?appids=${Q[i].appid}`
        let res = await axios.get(url).then(async (res) => await res.data)
        let temp=Object.values(res)[0].data
        results.push[temp];
    }
    index=index+6;
    console.log(results)   
    res.json({ data: results, more: (matches[index])?true:false})
    return;
}