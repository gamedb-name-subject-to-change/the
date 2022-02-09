import axios from 'axios'
import Head from 'next/head'
import NavBar from '../../components/navbar'
export default function Post({ data }) {
    return (<div className="container">
        <Head>
            <title>GameDB Forum Post</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <NavBar />
        <main>
            <div style={{margin:`5rem`}}>
                <h1 className="title">
                    {data.title}
                </h1>

                <p className="description">
                    {data.content}
                </p>
                <h2>Comments</h2>
            </div>



        </main>

            
        <footer style={{cursor:'pointer',backgroundColor:'#1b3147'}} onClick={() => window.location = "/"}>
            <>Home</>
        </footer>
    </div>)
}

export async function getServerSidePaths() {
    const res = await axios.get(`${process.env.URL}/api/forum/get`).then(async (res) => await res.data)
    const paths = res.map(item => { return { params: { id: item } } })
    return { paths, fallback: false }
}
export async function getServerSideProps({ params }) {
    const data = await axios.post(`${process.env.URL}/api/forum/get`, { id: params.id }).then(async (res) => await res.data)
    return { props: { data } }
}