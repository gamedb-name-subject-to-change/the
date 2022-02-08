import React, { useState, useEffect } from 'react';

const Posts = () => {
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
                console.log(temp,typeof(temp))
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