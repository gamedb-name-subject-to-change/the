import React, { useState, useEffect } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');
const Top = () => {
    const [searchResults, setResults] = useState(<></>)
    const renderResults = (res) => {
        let sResults = [];
        res.map((e, i) => {
            sResults.push(<a
                href={`/game/${e.data.steam_appid}`}
                className="card" key={i}>
                <h3>{e.data.name}</h3>
                <p>
                    {parse(e.data.about_the_game)}
                    {/* {(e.data.about_the_game) ? e.data.about_the_game.substring(0, 180) : e.data.about_the_game}... */}
                </p>
                <img className="card-image" src={e.data.header_image}></img>

            </a>);
        });
        console.log(sResults)
        return (sResults)
    };
    useEffect(async () => {
        const fetchedData = await getAppData()
        setResults(renderResults(fetchedData))
    }, [])
    return (<div className="container" style={{minWidth:'50vw',maxWidth:'50vw'}}><h1 className='title'>Discover</h1>{searchResults}</div>)
}
async function getAppData() {
    let results = []
    const appIDs = await fetchTopGames()
    let data=Object.values(appIDs.data)
    let randint = getRandomInt(90)
    for (let i = randint; i < randint+10; i++) {
        const res = await fetchGameData(data[i].appid)
        let temp = Object.values(res.data)[0]
        if (temp.success == true && temp.data.type === 'game')
            results.push(temp)
    }
    return results;
}

async function fetchGameData(appID) {
    const res = await axios.post('/api/game/get', { id: appID }).then(async (res) => await res.data)
    return res;
}
async function fetchTopGames() {
    const res = await axios.post('/api/top/get').then(async (res) => await res.data)
    return res;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
export default Top;