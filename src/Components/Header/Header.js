import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/reducer'
import Navbar from 'react-bootstrap/Navbar'

const Header = (props) => {

    const [username, setUsername] = useState('')

    

    const handleDisplayUsername = () => {
        axios
            .get('/api/:user_id/username')
            .then(res => {
                username = res.data
            })
            .catch(err => {
                alert('Could not fetch username')
                console.log(err)
            }) 
        return `${username}`
    }
    
    const logout = () => {
        axios.delete('/auth/logout')
        .then(() => {
            props.logoutUser()
            props.history.push('/')
        })
    }

    useEffect(handleDisplayUsername(), [])

    return(
        <div>
            <Navbar
            fixed='top'
            variant='dark'

            >
                <Navbar.Brand href='#home'>Pellet Pusher</Navbar.Brand>
                <Navbar.Text
                value={`Welcome, ${username}`}
                onChange={(e) => setUsername(e.target.value)}
                />
                <Link to='/'>
                    <Button variant='link'>Log Out</Button>
                </Link>
            </Navbar>
            
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default Header