import mongoose from 'mongoose';
import axios from 'axios';
export default async function handler(req, res) {
    const {id}=req.body;
    const url = `https://store.steampowered.com/api/appdetails?appids=${id}`
    const result = await axios.get(url).then(async (res) => await res.data)
    res.json({data:result})
}