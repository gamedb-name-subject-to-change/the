
import axios from 'axios';
export default async function handler(req, res) {
    const appIDs = require('../../../topgames.json')
    const results = []
    let data = Object.values(appIDs)
    let randint = Math.floor(Math.random() * 90);
    let select = data.slice(randint, randint + 10)
    for (const e of select) {
        const url = `https://store.steampowered.com/api/appdetails?appids=${appID}`
        const res = await axios.get(url).then(async (res) => await res.data)
        let temp = Object.values(res.data)[0]
        if(temp) if(temp.success==true)results.push(temp.data)
    }
    res.json({ data: results })

}

async function fetchGameData(appID) {

}