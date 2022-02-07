import axios from 'axios'
import Head from 'next/head'

export default function Post({ data }) {
    return (<div className="container">
        <Head>
            <title>GameDB Forum Post</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="description" content="No Description" />
            <meta name="keywords" content="Absolutely, Nothing, Here" />
            <meta name="author" content="malis" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <main>
            <h1 className="title">
                {data.title}
            </h1>

            <p className="description">
                {data.content}
            </p>
            <h2>Comments</h2>


        </main>

        <footer>
            <button onClick={()=>window.location="/"}>HOME</button>
        </footer>

        <style jsx global>{`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    
    * {
        box-sizing: border-box;
    }
    
    @font-face {
        font-family: NerdFont;
        src: local("mplus Nerd Font Regular"), local("mplusNerdFont-Regular"), url(/font.ttf);
        font-weight: bold;
    }
    
    * {
        font-family: NerdFont;
        color: #9f9f9f;
        background-color: #1c1f25;
    }
    
    .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    img {
        width: wrap-parent;
        height: wrap-parent;
    }
    
    footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    footer img {
        margin-left: 0.5rem;
    }
    
    footer a {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    
    .title a {
        color: #0070f3;
        text-decoration: none;
    }
    
    .title a:hover,
    .title a:focus,
    .title a:active {
        text-decoration: underline;
    }
    
    .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
    }
    
    .title,
    .description {
        text-align: center;
    }
    
    .description {
        line-height: 1.5;
        font-size: 1.5rem;
    }
    
    code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    }
    
    .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 800px;
        margin-top: 3rem;
    }
    
    .input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70%;
        border-radius: 5px;
        max-width: 800px;
        margin-top: 2rem;
        background-color: #1c1f25
    }
    
    .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
    }
    
    .card:hover,
    .card:focus,
    .card:active {
        color: #0070f3;
        border-color: #0070f3;
    }
    
    .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }
    
    .card p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
    }
    
    .card span {
        margin: 0;
        font-size: 0.75rem;
        line-height: 1.5;
    }
    .card input {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
  }
  .card textarea {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
}
.form {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.form:hover,
.form:focus,
.form:active {
  color: #0070f3;
  border-color: #0070f3;
}

.form h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.form p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.form span {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
}
.form input {
margin: 0 0 1rem 0;
font-size: 1rem;
}
.form textarea {
margin: 0 0 1rem 0;
font-size: 0.75rem;
}
    
    .logo {
        height: 1em;
    }
    
    @media (max-width: 600px) {
        .grid {
            width: 100%;
            flex-direction: column;
        }
    }
    
    `}</style>
    </div>)
}

export async function getServerSidePaths() {
    const res = await axios.get(`${process.env.URL}/api/forum/get`).then(async (res) => await res.data)
    const paths = res.map(item => { return { params: { id: item } } })
    return { paths, fallback: false }
}
export async function getServerSideProps({ params }) {
    const data = await axios.post(`${process.env.URL}/api/forum/get`, { id: params.id }).then(async (res) => await res.data)
    return { props: {data} }
}