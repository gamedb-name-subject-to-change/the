export default async function handler(req, res) {
    const result = require('../../../topgames.json')
    res.json({data:result})
}