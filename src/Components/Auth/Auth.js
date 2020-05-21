import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css'
import Button from 'react-bootstrap/Button'
import { getUser } from '../../ducks/userReducer'
import {connect} from 'react-redux'
import AuthHeader from './AuthHeader'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

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
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e4ebf5'}}>
                <AuthHeader style={{display: 'flex'}} />
                <Card style={{backgroundColor: '#f7f8fa', width: '250px', height: '250px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                        <Form.Control
                        style={{backgroundColor: 'transparent'}}
                        type='text' 
                        className='username-input' 
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control 
                        style={{backgroundColor: 'transparent'}}
                        type='password' 
                        className='password-input' 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}}>
                        <Button id='login-button' variant='primary' onClick={() => handleLogin()}>Login</Button>
                        <Button id='register-button' variant='outline-primary' onClick={() => setExistingUser(false)}>Register</Button>
                    </div>
                </Card>
            </div>
        )
    } else {
        return (
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e4ebf5'}}>
                <AuthHeader style={{display: 'flex'}}/>
                <Card style={{backgroundColor: '#f7f8fa', width: '250px', height: '250px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                        <Form.Control 
                        style={{backgroundColor: 'transparent'}}
                        type='text' 
                        className='username-input' 
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control
                        style={{backgroundColor: 'transparent'}} 
                        type='password' 
                        className='password-input' 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control 
                        style={{backgroundColor: 'transparent'}}
                        type='password' 
                        className='password-input' 
                        placeholder='Verify Password'
                        value={verPassword}
                        onChange={(e) => setVerPassword(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}}>
                        <Button id='login-button' variant='outline-primary' onClick={() => setExistingUser(true)}>Login</Button>
                        <Button id='register-button' variant='primary' onClick={() => handleRegister()}>Register</Button>                      
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Auth)