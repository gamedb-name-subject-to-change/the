import axios from 'axios'
import Head from 'next/head'
import UserActivity from '../../components/userposts'
import GameList from '../../components/userlist'
import NavBar from '../../components/navbar'
export default function ({ data }) {
    console.log(data)
    return (<div className="container">
        <Head>
            <title>User Profile</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        
        <main>
        <NavBar />
            <div className='user-container'>
                <div className='grid' style={{background:`rgba(0,0,0,0)`}} >
                    <h1 style={{background:`rgba(0,0,0,0)`,marginBlockStart:"15%"}}>{data.displayName}'s Profile</h1>
                </div>
            </div>

            <div className='main-container'><GameList /><UserActivity user={data.username}/></div>

        </main>
    </div>);
}
export async function getServerSidePaths() {
    const res = await axios.get(`${process.env.URL}/api/user/get`).then(async (res) => await res.data)
    const paths = res.map(item => { return { params: { id: item } } })
    return { paths, fallback: false }
}
export async function getServerSideProps({ params }) {
    const data = await axios.post(`${process.env.URL}/api/user/get`, { id: params.id }).then(async (res) => await res.data)
    return { props: { data } }
}