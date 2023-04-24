import React, { useState, useEffect } from 'react';


const Comments = (props) => {
    const [list, setList] = useState(null);
    useEffect(() => {
        if(!props.data)return
        let temp=props.data.map((e,i) => {
            return(<a
                className="comment" key={i}>
                    {e.content}<br/>
                <span style={{color:"#999999"}}>by {e.author} on {e.date}</span>
            </a>)
        })
        setList(temp)
    }, [props])
    return(
        <div className='comment-wrapper'>{list}</div>
    )
}
export default Comments;