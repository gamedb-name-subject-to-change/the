import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';
const RelatedPosts = (props) => {
    const [posts, setPosts] = useState(null)
    const renderPosts = (data) => {
        let posts = data.map((e, i) => {
            return (<Post data={e} key={i}/>);
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
            <h1 className='title' style={{margin:'1rem'}}>Recent Discussions</h1>
            {posts}
        </div>
    );
}


export default RelatedPosts;