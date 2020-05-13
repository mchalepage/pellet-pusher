import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css'
import Button from 'react-bootstrap/Button'
import {Link, withRouter} from 'react-router-dom'
import { loginUser, getUser } from '../../ducks/userReducer'
import {connect} from 'react-redux'

const Auth = props => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState('')
    const [existingUser, setExistingUser] = useState(true)
    // const [loggedInUser, setLoggedInUser] = useState({})

    const handleLogin = async () => {
        // let res = await axios.post('/auth/login', {
        //     username,
        //     password
        // })
        // setLoggedInUser({loggedInUser: res.data})
        // props.history.push('/dashboard')
        const body = {
            username: username,
            password: password
        }

        axios
            .post('/auth/login', body)
            .then(res => {
                props.loginUser(res.data)
                props.history.push('/dashboard')
            })
            // .catch((err) => {
            //     alert('Could not log in')
            //     console.log(err)
            // })
    }

    const handleRegister = async () => {
        // let res = await axios.post('/auth/register', {
        //     username,
        //     password
        // })
        // setLoggedInUser({loggedInUser: res.data})
        // props.history.push('/dashboard')

        const body = {
            username: username,
            password: password
        }


        if(password !== verPassword){
            alert('The entered passwords do not match.')
        } else {
            axios.post('/auth/register', body)
            .then((res) => {
                props.loginUser(res.data)
                props.history.push('/dashboard')
            })
            // .catch((err) => {
            //     alert('Could not register')
            //     console.log(err)
            // })
        }
    }

    if (existingUser) {
        return (
            <div>
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
                <Link to='/dashboard'>
                    <Button id='login-button' variant='success' onClick={() => handleLogin()}>Login</Button>
                </Link>
                <Button id='register-button' variant='outline-success' onClick={() => setExistingUser(false)}>Register</Button>
            </div>
        )
    } else {
        return (
            <div>
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
                <Link to='/dashboard'>
                    <Button id='register-button' variant='success' onClick={() => handleRegister()}>Register
                    </Button>                
                </Link>
            </div>
        )
    }
}

export default connect(null, {loginUser, getUser})(withRouter(Auth))