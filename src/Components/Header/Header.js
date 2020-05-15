import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../../ducks/userReducer'
import Navbar from 'react-bootstrap/Navbar'

const Header = (props) => {

    const [username, setUsername] = useState('')

    // useEffect(() => {
    //     handleDisplayUsername()
    // }, [])

    // const handleDisplayUsername = () => {
    //     axios
    //         .get('/api/:user_id/username', )
    //         .then(res => {
    //             setUsername(res.data)
    //         })
    //         .catch(err => {
    //             alert('Could not fetch username')
    //             console.log(err)
    //         }) 
    // }
    
    const handleLogout = () => {
        axios.delete('/auth/logout')
        .then((res) => {
            props.logoutUser(res.data)
            // props.history.push('/')
        })
    }

    return(
        <div>
            <Navbar
            fixed='top'
            variant='dark'
            bg='dark'
            >
                <Navbar.Brand>Pellet Pusher</Navbar.Brand>
                <Navbar.Text
                // value={`Welcome, ${username}`}
                />
                <Link to='/'>
                    <Button variant='link' onClick={() => handleLogout()}>Log Out</Button>
                </Link>
            </Navbar>
            
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {logoutUser, getUser})(Header)