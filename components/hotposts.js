import React, { useState, useEffect } from 'react';
import Post from './post';
const Posts = () => {
    const [posts, setPosts] = useState(null)
    const renderPosts = (data) => {
        let posts = data.map((e, i) => {
            return (<Post data={e} key={i}/>);
        });
        return (
            <div className="container">
                {posts}
            </div>
        );
    };
    useEffect(() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body:JSON.stringify({count:3})
        }
        fetch('/api/forum/get', options)
            .then(async (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then((data) => {
                if (data.posts.length == 0 && !((search) ? (search.trim().length == 0) ? false : true : true)) return
                let temp=renderPosts(data.posts)
                setPosts(temp)

            }).then()
            .catch((e) => console.log(e))
    }, []);
    return (
        <div>
            <h1 className='title'>Forum Activity</h1>
            {posts}
        </div>
    );
}


export default Posts;