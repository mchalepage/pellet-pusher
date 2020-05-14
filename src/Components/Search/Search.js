import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const Search = props => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [userPatients, setUserPatients] = useState({})

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
        <Container bg='light'>
            <h3>Search for an existing patient or click the + to create a new patient.</h3>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
            <Button variant='success'>+</Button>
        </Container>
    )
}

export default Search