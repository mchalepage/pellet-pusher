import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from '../Search/Search'
import Header from '../Header/Header'

const Dashboard = props => {

    const [user, setUser] = useState({})

    useEffect(() => {
        handleSessionUser()
    }, [])

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
        })
        .catch(
            props.history.push('/')
        )
    }

    return(
        <div className='Dashboard'>
            <Header />
            <h4>Search for an existing patient or click the + to create a new patient</h4>
            <Search />
        </div>
    )
}

export default Dashboard