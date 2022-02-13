import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from './post';
const Posts = (props) => {
    const [posts, setPosts] = useState(null)
    const renderPosts = (data) => {
        let posts = data.map((e, i) => {
            return (<Post data={e} key={i}/>);
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
            <h1 className='title'>User Activity</h1>
            {posts}
        </div>
    );
}


export default Posts;