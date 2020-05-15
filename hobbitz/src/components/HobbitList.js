import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Hobbit from './Hobbit'

const HobbitList = () => {

    const [ hobbit, setHobbit ] = useState([]);

    useEffect(() => {
        axios.get('https://lotr-troop.herokuapp.com/users/')
        .then(res => {
            console.log(res.data)
            setHobbit(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div className="flexy">
            {hobbit.map((char, index) => {
                return <Hobbit char={char} key={index} />
            })}
        </div>
    )
}

export default HobbitList