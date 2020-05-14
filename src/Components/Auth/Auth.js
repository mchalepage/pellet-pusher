import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css'
import Button from 'react-bootstrap/Button'
import { getUser } from '../../ducks/userReducer'
import {connect} from 'react-redux'
import AuthHeader from './AuthHeader'

const Auth = props => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState('')
    const [existingUser, setExistingUser] = useState(true)

    const handleLogin = () => {
        const body = {
            username: username,
            password: password
        }
        axios.post('/auth/login', body).then(res => {
            props.getUser(res.data)
            props.history.push('/dashboard')
        }).catch(err => alert(`Incorrect username or password.`))
    }

    const handleRegister = () => {
        const body = {
            username: username,
            password: password,
        }
        axios.post('/auth/register', body).then(res => {
            console.log('redux data:', res.data)
            props.getUser(res.data)
            props.history.push('/dashboard')
        }).catch(err => alert(`Username already in use.`))
    }

    if (existingUser) {
        return (
            <div>
                <AuthHeader />
                <input 
                type='text' 
                className='username-input' 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type='password' 
                className='password-input' 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button id='login-button' variant='success' onClick={() => handleLogin()}>Login</Button>
                <Button id='register-button' variant='outline-success' onClick={() => setExistingUser(false)}>Register</Button>
            </div>
        )
    } else {
        return (
            <div>
                <AuthHeader/>
                <input 
                type='text' 
                className='username-input' 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type='password' 
                className='password-input' 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                type='password' 
                className='password-input' 
                placeholder='Verify Password'
                value={verPassword}
                onChange={(e) => setVerPassword(e.target.value)}
                />
                <br />
                <Button id='login-button' variant='outline-success' onClick={() => setExistingUser(true)}>Login</Button>
                <Button id='register-button' variant='success' onClick={() => handleRegister()}>Register
                </Button>                      
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Auth)