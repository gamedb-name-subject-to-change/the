import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
export default function () {
    const getActivity = async() => {
        if (typeof window === 'undefined') { return; }
        const token = localStorage.getItem('token')
        const res = await axios.post('/api/user/validate', { token: token }).then(async (res) => await res.data)
        
    }

    return (
        <div className='container-home-activity'>
            <div className='grid'>
                <h1>Login to see user activities</h1>
            </div>
        </div>
    );
}
;
