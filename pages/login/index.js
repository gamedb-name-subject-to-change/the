import axios from 'axios'
import Head from 'next/head'
import { useState,  useEffect, useRef } from 'react';
const validateUser = async (formData) => {
    const res = await axios.post('/api/user/validate', formData).then(async (res) => await res.data)
    if (res.status === 'ok') {
        alert('success')
        localStorage.setItem('token',res.data)
        window.location.href = '/'
    }
    else alert(res.status);
}
export default function ({ data }) {
    const username=useRef(null);
    const password=useRef(null);
    const [formData, setFormData] = useState(undefined)
    const pushFormData=()=>{
        setFormData({username:username.current.value,password:password.current.value})
    }
    useEffect(() => {
        if (formData) {
            validateUser(formData);
        }
    }, [formData])
    return (<div className="container">
        <Head>
            <title>GameDB Login</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <main>
            <h1>login</h1>
            <form className="form">
                <input
                    type="text"
                    ref={username}
                    placeholder="Username"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="Password"
                />
                <button type="button" onClick={pushFormData}>
                    Login
                </button>
                <a href='/register'>click here to register</a>
            </form>
        </main>
    </div>);
}