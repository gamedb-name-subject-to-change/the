import React, { useEffect, useState } from 'react';
import axios from 'axios';
const getGameData=async (id)=>{
    const res = await axios.post(`/api/game/get`, { id: id }).then(async (res) => await res.data)
    return Object.values(res.data)[0].data
}


export default function userlist() {
    const renderList=async(user)=>{
        const res=await axios.post('/api/user/get',{id:user}).then(async (res) => await res.data)
        const list=[]
        for(const el of res.list){
            const data=await getGameData(el.appId);
            console.log(data.name,data.header_image)
            list.push(<div className='game-list-item'>
                <img src={data.header_image}/>
                <h1 style={{minWidth:'60%'}}>   {data.name}   </h1>  
                <div ><h1>{el.score}</h1></div>
            </div>)
        }
        setGameList(list)
    }
    const [gameList,setGameList]=useState(<h1>Loading...</h1>)
    useEffect(async() => {
        const currentPage=window.location.href;
        const user=currentPage.substring(currentPage.indexOf('/user')+6)
        await renderList(user)
    }, [])
    return <div className='container' style={{minWidth:'50vw'}}>
        <h1 className='title'>My List</h1>
        <div className='container-game-list'>
            {gameList}
        </div>
    </div>;
}
