import axios from 'axios';
export default async function handler(req, res) {
    const { id } = req.body;
    const url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${id}&count=3&maxlength=300&format=json`
    const result = await axios.get(url).then(async (res) => await res.data)
    res.json({ data: result })
}