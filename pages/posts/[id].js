import axios from 'axios'
import Head from 'next/head'
import { useState,useRef, useEffect } from 'react';
import Comments from '../../components/comments';
import NavBar from '../../components/navbar'
import Tags from '../../components/tags';
const parse = require('html-react-parser');
export default function Post({ data }) {
    const [input, setInput] = useState(<button style={{cursor:'pointer'}}>+ New Message</button>);
    const [update, triggerUpdate] = useState(true);
    const comment=useRef(null);
    const [comments,setComments]=useState(<h1 style={{color:"GrayText"}}>Loading...</h1>)
    const postComment = async (content) => {
        if (typeof window === 'undefined') { return; }
        const token = localStorage.getItem('token')
        let res = await axios.post('/api/user/validate', { token: token }).then(async (res) => await res.data)
        if (!(res.status === 'ok')) { alert('You need to login before posting a comment'); return; }
        res = await axios.post('/api/forum/get', { addcomment: { author: res.user,post:data._id, content: content, date: new Date() } })
        if(res.status===200){setInput(<button style={{cursor:'pointer'}}>+ New Message</button>)}
        else{alert("something went wrong")}
    }
    const getComments = async()=>{
        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
        await waitFor(1000);
        let res = await axios.post('/api/forum/comments', { postid: data._id }).then(async (res) => await res.data)
        setComments(<Comments data={res.data}/>)
        console.log(res.data)
    }
    useEffect(async()=>{
       await getComments()
       console.log("jedee")
    },[comments])
    return (<div className="container">
        <Head>
            <title>{data.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <NavBar />
        <main>
            <div className='container' style={{ margin: `5rem` }}>
                <h1 className="title">
                    {data.title}

                </h1>
                <Tags data={data.tags}/>
                <div onClick={() => window.location.href = "/user/" + data.author} style={{ textAlign: 'right', cursor: "pointer" }}><strong style={{ fontSize: '150%' }}>by {data.author}</strong><br />{data.date}</div>
                <p className="description" style={{fontSize:'1rem'}}>
                    {parse(data.content)}
                </p>
                <h2>Threads</h2>
                <div onClick={() => {
                    setInput(<div className='container'>
                        <div className="form">
                            <input type="text" style={{minWidth:'60vw', height:'20vh'}}
                                placeholder="Send"
                                ref={comment}
                            />
                            <button onClick={() => {postComment(comment.current.value)}}>Post</button>

                        </div>
                    </div>)
                }}>{input}</div>
                    {comments}
                    {update}
            </div>
        </main>


        <footer style={{ cursor: 'pointer', backgroundColor: '#1b3147' }} onClick={() => window.location = "/"}>
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
