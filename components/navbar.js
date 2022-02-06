import React, { useReducer, useEffect } from 'react';

export default function(){
    return (
        <div className='container-navbar'>
            <h1>Some Kind of Navigation Bar will be here</h1>
            <button onClick={()=>window.location.href="/user/0"}>My Profile</button>
            <button>Logout</button>
        </div>
    );
}
;