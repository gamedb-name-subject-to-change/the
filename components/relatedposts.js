import React, { useState, useEffect } from 'react';
import axios from 'axios';
const RelatedPosts = (props) => {
    const [posts, setPosts] = useState(null)
    const renderPosts = (data) => {
        let posts = [];
        data.map((e, i) => {
            posts.push((<a
                href={`/posts/${e._id}`}
                className="card" key={i}
            >
                <h3>{e.title}</h3>
                <p>
                    {(e.content) ? e.content.substring(0, 70) : e.content}...
                </p>
                <span>by {e.author} on {e.date}</span>
            </a>));
        });
        setPosts(
            <div className="grid-forum-posts">
                {posts}
            </div>
        );
    };
    useEffect(async() => {
        const data=await axios.post('/api/forum/get',{count:5,forGame:{appid: props.appid,name:props.name}}).then(async (res)=>await res.data).catch(e=>{});
        console.log("here ",data)
        if (data.posts.length == 0){ setPosts(<h1 className='card'>No Discussions</h1>);return }
        renderPosts(data.posts)
    }, []);
    return (
        <div>
            <h1 className='title'>Recent Discussions</h1>
            {posts}
        </div>
    );
}


export default RelatedPosts;