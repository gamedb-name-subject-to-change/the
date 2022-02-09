import axios from 'axios'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Login.module.css'
const registerUser = async (formData) => {
    console.log(formData)
    const res = await axios.post('/api/user/register', formData).then(async (res) => await res.data)
    if (res.status === 'ok') {
        alert('success. please login again using your credentials')
        window.location.href = '/'
    }
    else alert(res.status);
}
const validateUser = async (formData) => {
    console.log('here')
    const res = await axios.post('/api/user/validate', formData).then(async (res) => await res.data)
    if (res.status === 'ok') {
        alert('success')
        localStorage.setItem('token', res.data)
        window.location.href = '/'
    }
    else alert(res.status);
}
export default function Login({ data }) {
    if (typeof window != 'undefined')
        window.location.href = '/login?#'
    const username = useRef(null);
    const password = useRef(null);
    const nusername = useRef(null);
    const ndisplayName = useRef(null)
    const npassword = useRef(null);
    const [cover, changeCover] = useState("50%")
    const [formData, setFormData] = useState(undefined)
    const [newUserData, setNewUserData] = useState(undefined)
    const toggleCover = () => {
        changeCover((cover == '50%') ? '0%' : '50%')
    }
    useEffect(async () => {
        if (formData) {
            await validateUser(formData);
            setFormData(undefined)
            setNewUserData(undefined)
        }
    }, [formData])
    useEffect(async () => {
        if (newUserData) {
            await registerUser(newUserData);
            setFormData(undefined)
            setNewUserData(undefined)
        }
    }, [newUserData])
    return (<div className={styles.container}>
        <Head>
            <title>GameDB Login</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {() => window.location.href = '/login?#'}
        </Head>
        <main className={styles['main-container']}>
            <div className={styles.container}>
                {/* <input type="checkbox" id="flip" /> */}
                <div className={styles.cover} style={{ left: cover }}>
                    <div className={styles.back} >
                        <div className={styles.text}>
                            <span className={styles['text-1']}>Every new friend is a <br /> new adventure</span><br />

                            <span className={styles['text-2']}>Let's get connected</span>
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.text}>
                            <span className={styles['text-1']}>Complete miles of journey <br /> with one step</span>
                            <span className={styles['text-2']}>Let's get started</span>
                        </div>
                    </div>
                </div>
                <div className={styles.forms}>
                    <div className={styles['form-content']}>
                        <div className={styles['login-form']}>
                            <div className={styles.title}>Login</div>
                            <form>
                                <div className={styles['input-boxes']}>
                                    <div className={styles['input-box']}>
                                        <i className={styles.fas + " " + styles['fa-user']}></i>
                                        <input type="text" ref={username} placeholder="Enter your username" required />
                                    </div>
                                    <div className={styles['input-box']}>
                                        <i className={styles.fas + " " + styles['fa-lock']}></i>
                                        <input type="password" ref={password} placeholder="Enter your password" required />
                                    </div>
                                    {/* <div className={styles.text}><a href="#">Forgot password?</a></div> */}
                                    <div className={styles.button + " " + styles['input-box']}>
                                        <input type="submit" onClick={() => {
                                            setFormData({ username: username.current.value, password: password.current.value })
                                        }} value="Submit" />
                                    </div>
                                    <div className={styles.text + " " + styles['sign-up-text']}>Don't have an account? <a onClick={toggleCover}>Sign up now</a></div>
                                </div>
                            </form>
                        </div>
                        <div className={styles['signup-form']}>
                            <div className={styles.title}>Sign up</div>
                            <form>
                                <div className={styles['input-boxes']}>
                                    <div className={styles['input-box']}>
                                        <i className={styles.fas + " " + styles['fa-user']}></i>
                                        <input type="text" ref={nusername} placeholder="Enter your username" required />
                                    </div>
                                    <div className={styles['input-box']}>
                                        <i className={styles.fas + " " + styles['fa-envelope']}></i>
                                        <input type="text" ref={ndisplayName} placeholder="Enter your display name" required />
                                    </div>
                                    <div className={styles['input-box']}>
                                        <i className={styles.fas + " " + styles['fa-lock']}></i>
                                        <input type="password" ref={npassword} placeholder="Enter your password" required />
                                    </div >
                                    <div className={styles.button + " " + styles['input-box']}>
                                        <input type="submit" onClick={() => {
                                            setNewUserData({ username: nusername.current.value, displayName: ndisplayName.current.value, password: npassword.current.value })
                                        }
                                        } value="Submit" />
                                    </div >
                                    <div className={styles.text + " " + styles['sign-up-text']}>Already have an account? <a onClick={toggleCover}>Login now</a></div>
                                </div >
                            </form >
                        </div >
                    </div >
                </div >
            </div >
        </main >
    </div >);
}