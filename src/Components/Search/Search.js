import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'
import { Link, useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FormGroup from 'react-bootstrap/FormGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { getPatient } from '../../ducks/patientReducer'
import { connect } from 'react-redux'

const Search = props => {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [patients, setPatients] = useState([])
    // const [selectedPatient, setSelectedPatient] = useState({})

    let history = useHistory()

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleViewPatient = (patient) => {
        axios
            .get(`/api/patient/${patient.patient_id}`)
            .then(res => {
                getPatient(res.data)
                history.push(`/patient/${patient.patient_id}`)
            })
            .catch(err => alert(err))
    }
    
    const handleAddPatient = () => {
        history.push('/patient/new')
    }

    useEffect(() => {
        axios
            .get(`/api/patients`)
            .then(res => {
                setPatients(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const results = patients.filter(matchingPatients => matchingPatients.last_name.toLowerCase().includes(searchTerm) || matchingPatients.first_name.toLowerCase().includes(searchTerm))
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
                        <Button size="lg" variant='success' onClick={() => handleAddPatient()}>Add New Patient</Button> 
                    </FormGroup>
                </Form.Row>       
            </Form>
            <ListGroup>
    {searchResults.map(matchingPatient => (<ListGroup.Item key={matchingPatient.patient_id} action onClick={() => handleViewPatient(matchingPatient)}>{matchingPatient.patient_id} {matchingPatient.first_name} {matchingPatient.last_name}</ListGroup.Item>))}
            </ListGroup> 
        </Container>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getPatient})(Search)
