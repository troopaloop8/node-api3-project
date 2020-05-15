import React from 'react'

const Quote = (props) => {
    const quotes = props.post.posts;
    
    console.log("QUOTES", quotes)
    if (!quotes) {
       return(<div>...waiting</div>) 
    } else {
       return (<ul> {
        quotes.map((quote) => {
        return <li>"{quote.text}"</li>
        })
        }</ul>)
    }
   
}

export default Quote