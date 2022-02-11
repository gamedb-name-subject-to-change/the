
import axios from 'axios';
export default async function handler(req, res) {
    const appIDs = require('../../../topgames.json')
    const results = []
    let data = Object.values(appIDs)
    let randint = Math.floor(Math.random() * 90);
    let select = data.slice(randint, randint + 10)
    for (const e of select) {
        const url = `https://store.steampowered.com/api/appdetails?appids=${e.appid}`
        const res = await axios.get(url).then(async (res) => await res.data).catch(e=>{})
        let temp = Object.values(res.data)[0]
        console.log(Object.keys(temp))
    }
    res.json({ data: results })

}