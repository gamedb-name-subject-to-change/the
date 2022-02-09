
import axios from 'axios';
export default async function handler(req, res) {
    const url = `https://steamspy.com/api.php?request=top100in2weeks`
    const result = await axios.get(url).then(async (res) => await res.data)
    res.json({data:result})
}