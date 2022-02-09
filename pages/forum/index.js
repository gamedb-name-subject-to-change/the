import React, { useReducer, useEffect } from 'react';
import Head from 'next/head'
import NavBar from '../../components/navbar'
import axios from 'axios';
const Posts = () => {
    const defaultState = {
        page: <div>Loading...</div>,
        pageNumber: 0,
        search: '',
        formData: { author: undefined, title: null, content: null, tags: null },
        finalFormData: undefined,
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'PAGE': return { ...state, page: action.value }; break;
            case 'PAGENUMBER': return { ...state, pageNumber: action.value }; break;
            case 'SEARCH': return { ...state, search: action.value }; break;
            case 'AUTHOR': return { ...state, formData: { ...state.formData, author: action.value } }; break;
            case 'TITLE': return { ...state, formData: { ...state.formData, title: action.value } }; break;
            case 'CONTENT': return { ...state, formData: { ...state.formData, content: action.value } }; break;
            case 'TAGS': return { ...state, formData: { ...state.formData, tags: action.value.split(',') } }; break;
            case 'FORMDATA': return { ...state, finalFormData: action.value }; break;
        }
    };
    const [state, dispatch] = useReducer(reducer, defaultState);
    const { page, prevPage, pageNumber, search, formData, finalFormData } = state;
    const renderPosts = (data) => {
        let posts = [];
        data.map((e, i) => {
            posts.push((<a
                href={`/posts/${e._id}`}
                className="card" key={i}
            >
                <h3>{e.title}</h3>
                <p>
                    {(e.content) ? e.content.substring(0, 200) : e.content}...
                </p>
                <span>by {e.author} on {e.date}</span>
            </a>));
        });
        return (
            <div className='container'>

                <div className='searchbar-wrapper'>
                    <input id="search-box" className='input' type="text" onChange={(event) => { dispatch({ type: 'PAGENUMBER', value: 0 }); dispatch({ type: 'SEARCH', value: event.target.value }) }}></input>
                    <button onClick={newPost}>NEW</button>

                </div>
                <div className="grid-forum-posts">
                    {posts}
                </div>
                <div className='button-wrapper'>
                    <button onClick={() => dispatch({ type: 'PAGENUMBER', value: (state.pageNumber > 0) ? (pageNumber - 1) : pageNumber })}>PREV</button>
                    <button onClick={() => dispatch({ type: 'PAGENUMBER', value: state.pageNumber + 1 })}>NEXT</button>

                </div>

            </div>
        );
    };
    const newPost = () => {
        dispatch({
            type: 'PAGE', value: (<div className='container'>
                <form className="form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={event => {
                            dispatch({ type: 'TITLE', value: event.target.value })
                        }}
                    />
                    <textarea
                        type="text"
                        name="content"
                        placeholder="Body"
                        onChange={event => {
                            dispatch({ type: 'CONTENT', value: event.target.value })
                        }}
                    />
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (seperated by commas)"
                        onChange={event => {
                            dispatch({ type: 'TAGS', value: event.target.value })
                        }}
                    />
                    <div>
                        <button type="button" onClick={() => dispatch({ type: 'FORMDATA', value: formData })}>
                            Publish
                        </button>
                        <button type="button" onClick={() => window.location = "/"}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>)
        })
    }
    useEffect(() => {
        console.log("here")
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ requestCount: state.pageNumber, keywords: search, count: 10 })
        }
        fetch('/api/forum/get', options)
            .then(async (response) => {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then((data) => {
                if (data.posts.length == 0 && !((search) ? (search.trim().length == 0) ? false : true : true)) return
                // console.log(data.posts)
                const newPage = renderPosts(data.posts)
                dispatch({ type: 'PAGE', value: newPage });
            }).then()
            .catch((e) => console.log(e))
    }, [pageNumber, search]);
    useEffect(async () => {
        if (!finalFormData) return;
        if (finalFormData) {
            if (typeof window === 'undefined') { return; }
            const token = localStorage.getItem('token')
            const res = await axios.post('/api/user/validate', { token: token }).then(async (res) => await res.data)
            if (res.status != 'ok') {
                alert(`you're not logged in`)
                return
            }

            let fin = { ...formData, author: res.user }
            console.log(fin, "FINAL");
            const qu = await axios.post('/api/forum/post', fin).then(async (res) => await res.data)
            if (qu.status === 'ok') {
                alert('Post published successfully')
                window.location.href = `/posts/${qu.id}`
            }
        }
    }, [finalFormData]);
    return (
        <div className="container" >
            <Head>
                <title>Forums</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <h1 className='title' style={{ margin: '1rem' }}>Forums</h1>
            <div>
                {page}
            </div>

        </div>

    );
}


export default Posts;
