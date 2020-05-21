import React from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const AuthHeader = props => {
    return (
        <Navbar
        fixed='top'
        variant='dark'
        bg='dark'
        style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <Navbar.Brand>Welcome to Pellet Pusher</Navbar.Brand>
        </Navbar>
    )
}

export default AuthHeader;