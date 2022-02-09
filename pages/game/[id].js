import NavBar from '../../components/navbar'
import Head from "next/head";
import RelatedPosts from '../../components/relatedposts'
import axios from 'axios';
const parse = require('html-react-parser');
export default function Home({ data }) {
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
            <main  style={{backgroundImage:data.background}}>
                <div className='container-forum-posts'>
                    <div className="image" >
                        <img src={data.header_image} />
                    </div>
                    <div className="text-container" style={{ flex: 1 }}>
                        <div className="title1">
                            <h1>{data.name}</h1>
                        </div>
                        <div className="descr">
                            {parse(data.about_the_game)}
                        </div>
                    </div>
                    <div className="text-container2" style={{ flex: 1 }}>
                        <div className="grid">
                            <button className="button">Add to List</button>
                            <button className='button'><img src="https://www.pinclipart.com/picdir/big/526-5263968_minecraft-heart-png-transparent-minecraft-hunger-bar-clipart.png" width="24" height="24" /></button>
                        </div>
                    </div>
                    <div className='container'>
                    <div className='grid-forum-posts' >
                        <RelatedPosts />
                    </div>
                    </div>
                    
                </div>

            </main>

            <footer>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WIP
                </a>
            </footer>
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