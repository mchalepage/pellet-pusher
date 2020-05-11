import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'
import {Link} from 'react-router-dom'

const Search = props => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [userPatients, setUserPatients] = useState({})

    useEffect(() => {
        handleSessionUser()
    }, [])

    const handleLoading = () => {
        setLoading(false)
    }

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            handleGetUserPatients(res.data.user_id)
        })
    }

    const handleGetUserPatients = async(id) => {
        await axios.get('/api/:user_id/patients')
        .then((res) => {
            setUserPatients(res.data)
        })
    }

    return(
        <div>
            <input
            className='search-bar'
            placeholder='Search...'
            type='text'
            />
            <button id='create-patient-button'>+</button>
        </div>
    )
}

export default Search