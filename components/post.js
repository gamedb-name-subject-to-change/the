import React, { useState, useEffect } from 'react';
import Tags from './tags';
const Post = (props) => {
    const {_id,title,content,author,date,tags}=props.data
    const key=props.key
    return (<a
        href={`/posts/${_id}`}
        className="card" key={key}
    >
        <h3>{title}</h3>
        <p>
            {(content) ? content.substring(0, 70) : content}...
        </p>
        <span>by {author} on {date}</span>
        <Tags data={tags}/>
    </a>)
}

export default Post;