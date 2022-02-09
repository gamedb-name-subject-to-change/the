import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');
const News = () => {
    const [gameNews, setNews] = useState(<></>)
    const renderNews = (res) => {
        let pNews = [];
        res.map((e, i) => {
            console.log(e);
            pNews.push(<a
                href={`${e.url}`}
                className="card" key={i}>
                <h3>{e.title}</h3>
                <p>
                    {parse(e.contents)}<br/><br/>
                    {/* {(e.data.about_the_game) ? e.data.about_the_game.substring(0, 180) : e.data.about_the_game}... */}
                    Source:- {e.author}
                </p>
            </a>);
        });
        return (pNews)
    };
    useEffect(async () => {
        const fetchedNews = await getNews([730])
        console.log(fetchedNews)
        setNews(renderNews(fetchedNews))
    }, [])
    return (<div className="container"><h1 className='title'>News</h1>{gameNews}</div>)
}
async function getNews(appIDs) {
    let results = []
    for (let i = 0; i < appIDs.length; i++) {
        const res = await fetchNewsData(appIDs[i])
        let temp = res.data.appnews.newsitems
        for(const item of temp){
            results.push(item)
        }
    }
    return results;
}
async function fetchNewsData(appID) {
    const res = await axios.post('/api/news/get', { id: appID }).then(async (res) => await res.data)
    return res;
}
export default News;