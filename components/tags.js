import React, { useState, useEffect } from 'react';

const Tags = (props) => {
    const [list, setList] = useState(null);
    useEffect(() => {
        if(!props.data)return
        let temp=props.data.map((e,i) => {
            return(<div className='tag' key={i}>{e}</div>)
        })
        setList(temp)
    }, [])
    return(
        <div className='tag-wrapper'>{list}</div>
    )
}
export default Tags;