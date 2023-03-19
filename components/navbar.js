import axios from 'axios';
import React,{useState,useEffect} from 'react';
export default function () {
    const [userButtons, setUserButtons] = useState(<></>)
    const renderUserButtons =async () => {
        if (typeof window === 'undefined') { return; }
        const token = localStorage.getItem('token')
        const res =await  axios.post('/api/user/validate', { token: token }).then(async (res) => await res.data)
        if (res.status == 'ok') {
            console.log(res)
            setUserButtons([<div className="navbar-button" onClick={() => window.location.href = `/user/${res.user}`}>Profile</div>,<div className="navbar-button" onClick={() => {localStorage.setItem('token',null);window.location.href = `/`}}>Logout</div>])
        }
        else{
            console.log(res)
            setUserButtons(<div className="navbar-button" onClick={() => window.location.href = `/login`}>Login</div>)
        }
    }
    useEffect(()=>{
        renderUserButtons()
    },[])
    return (
        <div className='container-navbar'>
            <h1 ><a href="/">PlayersDen</a></h1>
            <div className="navbar-button" onClick={() => window.location.href = "/browse"}>Browse</div>
            <div className="navbar-button" onClick={() => window.location.href = "/forum"}>Forums</div>
            {userButtons}

        </div>
    );
}
;
