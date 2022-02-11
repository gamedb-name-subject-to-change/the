
import axios from 'axios';
export default async function handler(req, res) {
    const appIDs = require('../../../topgames.json')
    let results = []
    let data = Object.values(appIDs)
    let randint = getRandomInt(90)
    let select=data.slice(randint, randint + 10)
    console.log(select)
    for (const e of select) {
        const res = await fetchGameData(e.appid)
        let temp = Object.values(res.data)[0]
        console.log(temp)
        if (temp.success == true && temp.data.type === 'game')
            results.push(temp.data)
    }
    res.json({data:results})
}

async function fetchGameData(appID) {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appID}`
    const res = await axios.get(url).then(async (res) => await res.data)
    return res;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}