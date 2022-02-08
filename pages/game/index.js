import NavBar from '../../components/navbar'
import Head from "next/head";
import HotPosts from '../../components/hotposts'
const parse = require('html-react-parser');
export default function Home() {
    const sysReq=`<strong>Minimum:</strong><br><ul class="bb_ul"><li><strong>OS:</strong> Any Linux Distribution 2012+<br></li><li><strong>Processor:</strong> 2.5 GHz<br></li><li><strong>Memory:</strong> 1 GB RAM<br></li><li><strong>Graphics:</strong> OpenGL 2.1+ Support, and recommended dedicated graphics card with 128 MB of RAM<br></li><li><strong>Storage:</strong> 130 MB available space<br></li><li><strong>Additional Notes:</strong> Microsoft Xbox 360 Controller or Direct Input compatible controller</li></ul>`
    return (
        <div className="container">
            <Head>
                <title>Among Us</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
                <meta name="description" content="No Description" />
                <meta name="keywords" content="Absolutely, Nothing, Here" />
                <meta name="author" content="malis" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <NavBar />
            <main>
                <div className='main-container'>
                    <div className="image" >
                        <img src="https://cdn.akamai.steamstatic.com/steam/apps/945360/capsule_616x353.jpg" alt="Among Us" />
                    </div>
                    <div className="text-container" style={{flex:1}}>
                        <div className="title1">
                            <h1>Among Us</h1>
                        </div>
                        <div className="descr">
                        Among Us is a 2018 online multiplayer social deduction game developed and published by American game studio Innersloth. The game was inspired by the party game Mafia and the science fiction horror film The Thing.
                        </div>
                    </div>
                    <div className="text-container2" style={{flex:1}}>
                        <div className="add_to_list">
                            <button className="button">Add to List</button>
                            <button className='button'><img src="https://www.pinclipart.com/picdir/big/526-5263968_minecraft-heart-png-transparent-minecraft-hunger-bar-clipart.png" width="24" height="24"/></button>
                        </div>
                        <div className="information">
                        {parse(sysReq)}
                        </div>
                    </div>
                </div>
                <div className='main-container' >
                    <div className='posts'>
                        <HotPosts/>
                    </div>
                    <div className='others'>
                        <h1  style={{textAlign:'center'}}>DLCs</h1>
                        <HotPosts/>
                        <br/>
                    </div>
                </div>
            </main>

            <footer>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WIP
                </a>
            </footer>
        </div>
    )
}