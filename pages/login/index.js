import axios from 'axios'
import Head from 'next/head'

export default function ({ data }) {
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
        <main><h1>Login Page goes here</h1></main>
    </div>);
}