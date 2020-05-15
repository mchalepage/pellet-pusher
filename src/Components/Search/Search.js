import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FormGroup from 'react-bootstrap/FormGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { search } from './utils'

const Search = props => {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [patients, setPatients] = useState([])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        axios
            .get(`/api/patients`)
            .then(res => {
                setPatients(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const results = patients.filter(matchingPatients => matchingPatients.last_name.toLowerCase().includes(searchTerm))
        setSearchResults(results)
    }, [searchTerm, patients])

    return(
        <Container bg='light'>
            <h3>Search for an existing patient by name or create a new patient record</h3>
            <Form>
                <Form.Row>
                    <FormGroup as={Col}>
                        <FormControl
                        type="text" 
                        size="lg"
                        placeholder="Search" 
                        onChange={handleChange}
                        value={searchTerm}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button size="lg" variant='success'>Add New Patient</Button> 
                    </FormGroup>
                </Form.Row>       
            </Form>
            <ListGroup>
                {searchResults.map(matchingPatients => (<ListGroup.Item action>{matchingPatients.first_name} {matchingPatients.last_name}</ListGroup.Item>))}
            </ListGroup> 
        </Container>
    )
}

export default Search
