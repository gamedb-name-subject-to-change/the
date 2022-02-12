import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Posts = (props) => {
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
        return (
            <div className="grid">
                {posts}
            </div>
        );
    };
    useEffect(async() => {
        const data=await axios.post('/api/forum/get',{count:5,byUser: props.user}).then(async (res)=>await res.data);
        if (data.posts.length == 0){ setPosts(<h1 className='card'>No activity</h1>);return }
        let temp = renderPosts(data.posts)
        setPosts(temp)
    }, []);
    return (
        <div>
            <h1 className='title'>Forum Activity</h1>
            {posts}
        </div>
    );
}


export default Posts;