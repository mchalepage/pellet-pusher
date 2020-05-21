import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../../ducks/userReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
        <Navbar
        fixed='top'
        variant='dark'
        bg='dark'
        style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <Navbar.Brand>Pellet Pusher</Navbar.Brand>
            {/* <Navbar.Text>Logged in as: {props.userReducer.user.username} </Navbar.Text> */}
            <Nav>
                <Link to='/'>
                    <Button variant='link' onClick={() => handleLogout()}>Log Out</Button>
                </Link>
            </Nav>
        </Navbar>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {logoutUser, getUser})(Header)