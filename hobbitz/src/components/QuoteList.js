import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Quote from './Quote';

const QuoteList = props => {

    
    const [ quotes, setQuotes ] = useState([]);

    useEffect(() => {
        const id = props.id;
        const getQuotes = () => {
            axios.get(`http://localhost:6996/users/${id}/posts`)
            .then(res => {
                console.log("posts", res.data)
                setQuotes([res.data])
            })
            .catch(err => {
                console.log(err)
            })
        }
        getQuotes();
    }, []);

    console.log(quotes)
    return (
        <div>
            {quotes.map((post, index) => {
                return <Quote post={post} key={index} />
            })}
        </div>
    )
}

export default QuoteList
