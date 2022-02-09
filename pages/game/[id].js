import NavBar from '../../components/navbar'
import Head from "next/head";
import RelatedPosts from '../../components/relatedposts'
import axios from 'axios';
const parse = require('html-react-parser');
import { useState, useRef } from 'react';
import News from '../../components/news';
export default function Home({ data }) {
    const [options, setOptions] = useState(null)
    const score = useRef(null)
    const comment = useRef(null)
    const addToList = async (score, comment) => {
        if (typeof window === 'undefined') { return; }
        const token = localStorage.getItem('token')
        let val = await axios.post(`/api/user/validate`, { token: token }).then(async (res) => await res.data)
        if (val.status == 'ok') {
            console.log(val.user, data.steam_appid, score, comment)
            const res = await axios.post(`/api/user/addtolist`, { user: val.user, appid: data.steam_appid, score, comment }).then(async (res) => await res.data)
            if (res.status === 'ok') alert(`${data.name} added to your list`)
            else alert('something went wrong')
        }
        else {
            //alert('Something went wrong. Could be that you are not logged in')
        }
    }
    const showOptions = () => {
        let a = (
            <div className='container'>
                <div className="form">
                    <input type="text"
                        placeholder="Score"
                        ref={score}
                    />
                    <input type="text"
                        placeholder="Comment"
                        ref={comment}
                    />
                    <button onClick={() => addToList(score.current.value, comment.current.value)}>Submit</button>

                </div>
            </div>
        )
        setOptions(a)
    }
    return (
        <div className="container">
            <Head>
                <title>{data.name}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
                <meta name="description" content="No Description" />
                <meta name="keywords" content="Absolutely, Nothing, Here" />
                <meta name="author" content="malis" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <NavBar />
            <main >
                <div style={{ backgroundImage: `url(${data.background})` }}>
                    <div className='user-container' style={{ background: `rgba(0,0,0,0)` }} >
                        <div className="image" style={{ background: `rgba(0,0,0,0)` }}>
                            <img src={data.header_image} />
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='game-container' >

                        <div className='container'>

                            <div className="text-container" style={{ flex: 1 }}>
                                <div className="title1">
                                    <h1>{data.name}</h1>
                                </div>
                                <div className="descr">
                                    {parse(data.about_the_game)}
                                </div>
                            </div>
                            <div className="text-container2" style={{ flex: 1 }}>
                                <div className="game-list" style={{ maxWidth: `50vw`, maxHeight: `60vh` }}>
                                    <button className="text" onClick={showOptions}>Add to List <img src="https://www.pinclipart.com/picdir/big/526-5263968_minecraft-heart-png-transparent-minecraft-hunger-bar-clipart.png" width="24" height="24" /></button>
                                    {options}
                                </div>
                            </div>
                            <div className='container'>
                                <div className='container' >
                                    <RelatedPosts />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='container'>
                    <News appId={data.steam_appid} />
                    </div>
                </div>
            </main>
        </div>
    )
}
export async function getServerSidePaths() {
    const res = await axios.get(`${process.env.URL}/api/game/get`).then(async (res) => await res.data)
    const paths = res.map(item => { return { params: { id: item } } })
    return { paths, fallback: false }
}
export async function getServerSideProps({ params }) {
    const res = await axios.post(`${process.env.URL}/api/game/get`, { id: params.id }).then(async (res) => await res.data)
    const data = Object.values(res.data)[0].data
    return { props: { data } }
}