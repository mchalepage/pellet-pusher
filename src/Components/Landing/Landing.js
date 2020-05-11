import React from 'react'
import './Landing.css'
import Auth from '../Auth/Auth'
import Card from 'react-bootstrap/Card'

const Landing = props => {
    return(
        <div className="landing">
            <div className='login-card'>
                    <p className='welcome-text'>Welcome to Pellet Pusher. Log in or register for an account below.</ p>
                    <div className='login-credentials-container'>       
                        <Auth />
                    </div>
            </ div>
        </div>

    )
}

export default Landing