import React, { useReducer, useEffect } from 'react';

export default function(){
    return (
        <div className='container-navbar'>
            <h1 ><a href="/">GameDB</a></h1>
            <div className="navbar-button" onClick={()=>window.location.href="/browse"}>Browse</div>
            <div className="navbar-button" onClick={()=>window.location.href="/forum"}>Forums</div>
            <div className="navbar-button" onClick={()=>window.location.href="/login"}>Login</div>
            <div className="navbar-button">Logout</div>
        </div>
    );
}
;