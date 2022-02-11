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
        const fetchedData = await axios.get('/api/top/get').then(async (res) => await res.data)
        console.log(fetchedData)
        setResults(renderResults(fetchedData.data))
    }, [])
    return (<div className="container" style={{minWidth:'50vw',maxWidth:'50vw'}}><h1 className='title'>Discover</h1>{searchResults}</div>)
}
export default Top;