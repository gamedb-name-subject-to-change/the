import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NavBar from '../../components/navbar'
const axios = require('axios')
const parse = require('html-react-parser');

export default function () {
    const [button, clickButton] = useState(-1);
    const [more, getMore] = useState(-1);
    const [searchResults, setResults] = useState(<></>)
    const [moreButton, setMoreButton] = useState(undefined)
    const searchText = useRef(null)
    function pressed() {
        clickButton((button == 1) ? 0 : 1)
    }
    const renderResults = async (search, more) => {
        const res = await axios.post('/api/game/search', { text: search, more }).then(async (res) => await res.data)
        setResults(res.data.map((e, i) => {
            return (<a
                href={`/game/${e.steam_appid}`}
                className="card" key={i}>
                <h3>{e.name}</h3>
                <p>
                    {parse(e.short_description)}
                    {/* {(e.data.about_the_game) ? e.data.about_the_game.substring(0, 180) : e.data.about_the_game}... */}
                </p>
                <img className="card-image" src={e.header_image}></img>

            </a>);
        }))
        if (res.more === true) {
            setMoreButton(
                <button style={{ margin: '1rem' }} onClick={pressed}>Load more</button>
            )
        }
    };

    useEffect(async () => {
        if (button === -1) return;
        let search = searchText.current.value;
        setMoreButton(undefined)
        await renderResults(search,(moreButton)?true:undefined)
    }, [button])
    
    return (<div className="container">
        <Head>
            <title>vent</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <NavBar />
        <main><div className="container" style={{ minWidth: '60vw', alignItems: 'center', justifyContent: 'top' }}>

            <div className="grid" style={{ minHeight: '20vh' }}>
                <h1>Find Games</h1>

                <input className="" style={{ minWidth: '40vw' }} type="text" placeholder="Search.." id="searchbox" ref={searchText}>
                </input>
                <button style={{ margin: '1rem' }} onClick={pressed}>Search</button>
                {/* <button onClick={nextPage}>Next</button>
                <button onClick={prevPage}>Previous</button> */}
            </div>
            <div className="grid-forum-posts">{searchResults}</div>
            {moreButton}
        </div>
        </main>
    </div>);
}