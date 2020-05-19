import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Patient.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
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
import {getPatient} from '../../ducks/patientReducer'
import {connect} from 'react-redux'
import Header from '../Header/Header'


function NewPatient(props) {
    
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)

    
    const submit = () => {
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
                props.history.push(`/patient/${res.data.patient_id}`)
            })
            .catch(err => console.log(err))
    }

    // const handleGetPatient = () => {
    //     axios
    //         .get('api/:patient_id')
    //         .then(res => {
    //             setPatient(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }
    // const handleClickSave = () => {
    //     handleAddPatient()
    //     handleGetPatient()
    // }

    const handleReturnToDashboard = () => {
        axios.get('/api/patients')
        .then((res) => {
            setPatients(res.data)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
        .catch(err => console.log(err))
    }

    return(
        <Container>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <h3>Patient Info</h3>
            <Link to='/dashboard'>
                <Button variant='link' onClick={handleReturnToDashboard}>Back</Button>
            </Link>
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
                    <Button variant="primary" type="submit" onClick={submit}>
                        Save
                    </Button>
                </Form.Row>
                <Form.Row>

                </Form.Row>
            </Form>
        </Container>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getPatient})(NewPatient)