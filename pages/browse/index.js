import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NavBar from '../../components/navbar'
const axios = require('axios')
const parse = require('html-react-parser');

export default function () {
    const data = require('../../database.json')['applist']['apps']
    const [currentPage, setCurrentPage] = useState(-1)
    const [searchResults, setResults] = useState(<></>)
    const renderResults = (res) => {
        let sResults = [];
        res.map((e, i) => {
            sResults.push(<a
                href={`/game/${e.data.steam_appid}`}
                className="card" key={i}>
                <h3>{e.data.name}</h3>
                <p>
                    {parse(e.data.short_description)}
                    {/* {(e.data.about_the_game) ? e.data.about_the_game.substring(0, 180) : e.data.about_the_game}... */}
                </p>
                <img className="card-image" src={e.data.header_image}></img>

            </a>);
        });
        console.log(sResults)
        return (sResults)
    };

    useEffect(async () => {
        if (currentPage === -1) return;
        // console.log("***************************************changed to page " + (currentPage + 1) + " having items " + (currentPage * 10 + 1) + " to " + (currentPage * 10 + 10));
        let search = searchText.current.value;
        setResults(<h1>Loading..</h1>)
        const fetchedData = await getAppData(search, 0)
        // console.log(gameData)/
        // const appIDs = getAppID(search, (currentPage * 10 + 1))//got appids
        setResults(renderResults(fetchedData))

    }, [currentPage])
    const searchText = useRef(null)
    function pressed() {
        let search = searchText.current.value;
        setCurrentPage(0)
        // getAppID(search, 0)11
    }
    function nextPage() {
        setCurrentPage(currentPage + 1)
    }
    function prevPage() {
        setCurrentPage(currentPage - 1)
    }
    async function fetchGameData(appID) {
        const res = await axios.post('/api/game/get', { id: appID }).then(async (res) => await res.data)
        return res;
    }
    async function getAppData(text, begin) {
        let count = 0;
        let results = []
        const regex = new RegExp(text, 'gi');
        for (let i = 0; i < data.length && count < begin + 10; i++) {
            if (regex.test(data[i]['name'])) {
                if (count >= begin) {
                    // results.push(data[i]['appid'])
                    const res = await fetchGameData(data[i]['appid'])
                    let temp = Object.values(res.data)[0]
                    if (temp) if (temp.success == true && temp.data.type === 'game') {
                        results.push(temp)
                        count++;
                    }
                }

            }
        }
        if (results.length === 0) {
            if (currentPage < 0)
                nextPage()
            else prevPage()
        }
        return results;
    }
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
        </div>
        </main>
    </div>);
}