import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
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

    let history = useHistory()
    let location = useLocation()
    let { patient_id } = useParams()


    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleGoToPatient = (patient) => {
        axios
            .get(`/api/patient/${patient.patient_id}`)
            .then(res => {
                props.getPatient(res.data)
                history.push(`/patient/${patient.patient_id}`)
            })
            .catch(err => alert(err))
    }
    
    const handleClickAddPatient = () => {
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
    })

    useEffect(() => {
        const results = patients.filter(matchingPatients => matchingPatients.last_name.toLowerCase().includes(searchTerm) || matchingPatients.first_name.toLowerCase().includes(searchTerm))
        setSearchResults(results)
    }, [searchTerm, patients])

    return(
        <Container style={{width: '100vw', backgroundColor: '#e4ebf5'}}>
            <h5>Search for an existing patient by name or create a new patient record</h5>
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
                        <Button size="lg" variant='primary' onClick={() => handleClickAddPatient()}>Add New Patient</Button> 
                    </FormGroup>
                </Form.Row>       
            </Form>
            <ListGroup style={{backgroundColor: '#e4ebf5'}}>
                {searchResults.map(patient => (
                    <ListGroup.Item key={patient.patient_id} action>
                        <Link to={`/patient/${patient.patient_id}`}>
                            {patient.patient_id} {patient.first_name} {patient.last_name}
                        </Link>
                    
                    </ListGroup.Item>))}
            </ListGroup> 
        </Container>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getPatient})(Search)
