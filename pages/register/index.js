import axios from 'axios'
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react';
const registerUser = async (formData) => {
    const res = await axios.post('/api/user/register', formData).then(async (res) => await res.data)
    if (res.status === 'ok') {
        alert('success')
        window.location.href = '/'
    }
    else alert(res.status);
}

export default function ({ data }) {
    const username = useRef(null)
    const displayName = useRef(null)
    const password = useRef(null)
    const [formData, setFormData] = useState(undefined)
    useEffect(() => {
        if (formData) {
            registerUser(formData);
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
            <h1>register</h1>
            <form className="form">
                <input
                    type="text"
                    ref={username}
                    placeholder="Username"
                />
                <input
                    type="text"
                    ref={displayName}
                    placeholder="Display Name"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="Password"
                />
                <button type="button" onClick={() => setFormData({username:username.current.value,displayName:displayName.current.value,password:password.current.value})}>
                    Register
                </button>
            </form>
        </main>
    </div>);
}