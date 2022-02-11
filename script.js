const data = require('./the/database.json')['applist']['apps']
const axios=require('axios')
const checkGame=async(e)=>{
    const res = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${e.appid}`).then(async (res) => await res.data).catch(e=>{})
    console.log(res)
    return true
    if(temp.success == true && temp.data.type === 'game')return true
}
const text='call of Duty'
let results = []
const regex = new RegExp(text, 'gi');
const matches = data.filter(e => {
    return (regex.test(e['name'])&&((/points$|pack$|map$|packs$|pass$|trailer|content$|demo$|weapon$|character$|skin$|dlc/).test(e['name'].toLowerCase().trim()))==false)&&(checkGame(e))
})
//console.log(matches)