import React, { useEffect, useState} from 'react'
import QuoteList from './QuoteList';
import axios from 'axios';

const Hobbit = (props) => {
    const id = props.char.id;
    

    return (
        <div className="box">
            <p className="subtitle">{props.char.name}</p>
            <QuoteList id={id} />
            
        </div>
    )
}

export default Hobbit