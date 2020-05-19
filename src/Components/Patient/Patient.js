import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Patient.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Visits from '../Visits/Visits'
import Files from '../Files/Files'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import {getPatient} from '../../ducks/patientReducer'


function Patient(props) {
    
    const [patient, setPatient] = useState({})
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)
    const [isNewPatient, setIsNewPatient] = useState(true)
    const [isEditing, setIsEditing] = useState(true)

    let history = useHistory()


    useEffect(() => {
        axios
            .get(`/api/patient/${props.patient_id}`)
            .then(res => {
                setPatient(res.data)
                setIsNewPatient(false)
                setIsEditing(false)
            })
            .catch(err => console.log(err))
    }, [props.patient_id])

    
    // const handleNewUnsavedPatient = () => {
    //     setIsEditing(true)
    //     setIsNewPatient(true)
    //     history.push('/patient/new')
    // }

    const handleReturnToDashboard = () => {
        axios.get('/api/patients')
        .then((res) => {
            setPatients(res.data)
            history.push('/dashboard')
            setIsNewPatient(true)
            setIsEditing(true)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
        .catch(err => console.log(err))
    }

    const handleGetPatient = () => {
    }

    const handleAddPatient = () => {
        const body = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            gender: gender,
            phone: phone,
            email: email
        }

        axios
            .post('/api/patient', body)
            .then(res => {
                props.getPatient(res.data)
                history.push(`/patient/${res.data.patient_id}`)
            })
            .catch(err => console.log(err))
        setIsEditing(false)
        setIsNewPatient(false)
    }

    const handleUpdatePatient = () => {
        setIsEditing(false)
    }

    const handleDeletePatient = () => {

    }

    if(!isEditing && !isNewPatient){
        return(
            <Container>
                <Header />
                <br />
                <br />
                <br />
                <br />
                <Button variant='link' onClick={() => handleReturnToDashboard()}>Return to Dashboard</Button>
                <h3>Patient Info</h3>
                <Card style={{width: '80vw'}}>
                    <Card.Title>{patient.first_name} {patient.last_name}</Card.Title>
                    <Card.Subtitle>Date of Birth: 04/27/1966 <br />Gender: Female</Card.Subtitle>
                    <Card.Body>Phone: 2086973163 <br/> Email: carlet@page.com <br /></Card.Body>
                    <Button variant='link' onClick={() => setIsEditing(true)}>Edit Info</Button>
                </Card>
                <Visits />
                <Files />
            </Container>
        )
    } else if (isEditing && !isNewPatient) {
        return (
            <Container>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <Button variant='link' onClick={() => handleReturnToDashboard()}>Return to Dashboard</Button>
            <h3>Patient Info</h3>
            <Card>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={e => setFirstName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={e => setLastName(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <br />
                            <DatePicker id='DOB-datepicker' selected={dateOfBirth} onChange={date => setDateOfBirth(date)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" onChange={e => setGender(e.target.value)}>
                                <option>Choose...</option>    
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' placeholder="(123)456-7890" onChange={e => setPhone(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder="Enter email address" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="primary" type="submit" onClick={() => handleUpdatePatient()}>
                            Save
                        </Button>
                    </Form.Row>
                    <Form.Row>

                    </Form.Row>
                </Form>
            </Card>
            <Visits />
            <Files />
            </Container>
        )
    } else if (isEditing && isNewPatient){
        return(
            <Container>
                <Header />
                <br />
                <br />
                <br />
                <br />
                <Button variant='link' onClick={() => handleReturnToDashboard()}>Return to Dashboard</Button>
                <h3>Patient Info</h3>
                <Card>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={e => setFirstName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={e => setLastName(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <br />
                            <DatePicker id='DOB-datepicker' selected={dateOfBirth} onChange={date => setDateOfBirth(date)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" onChange={e => setGender(e.target.value)}>
                                <option>Choose...</option>    
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' placeholder="(123)456-7890" onChange={e => setPhone(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder="Enter email address" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                    <Button variant='success' onClick={() => handleAddPatient()}>Save Patient</Button>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getPatient})(Patient)