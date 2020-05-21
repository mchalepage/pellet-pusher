import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import axios from 'axios'
import './Patient.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Visits from '../Visits/Visits'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import {getPatient} from '../../ducks/patientReducer'
import Image from 'react-bootstrap/Image'


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
    const [isEditing, setIsEditing] = useState(false)

    let history = useHistory()
    let location = useLocation()
    let {patient_id} = useParams()

    // console.log(`/api${location.pathname}`)

    useEffect(() => {
        axios
            .get(`/api/patient/${patient_id}`)
            .then(res => {
                // props.getPatient(res.data)
                setPatient(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(err => console.log('failed to get patient. .catch on front-end.'))
    })

    // useEffect(() => {

    //     const { match: { params } } = props
        
    //     axios
    //         .get(`/api/patients/${params.patient_id}`)
    //         .then(res => {
    //             // props.getPatient(res.data)
    //             setPatient(res.data)
    //             setTimeout(() => {
    //                 setLoading(false)
    //             }, 500)
    //         })
    //         .catch(err => console.log('failed to get patient. .catch on front-end.'))
    // })

    const handleUpdatePatient = () => {
        const body = {
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            email: email
        }

        axios
            .put(`/api/patient/${patient_id}`, body)
            .then(res => {
                setPatient(res.data)
                setIsEditing(false)
            }).catch(err => console.log('update patient failed on front-end'))
    }

    const handleDeletePatient = () => {
        axios
            .delete(`/api/patient/${patient_id}`)
            .then(() => {
                console.log('patient deleted')
                history.push('/dashboard')
            })

    }

    if(!isEditing){
        return(
            <Container style={{height: '100vh'}}>
                <Header />
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Link as={Col} to='/dashboard'>
                        <Button variant='link'>Return to Dashboard</Button>
                    </Link>
                    <Link as={Col} to='/dashboard'>
                        <Button variant='link' onClick={() => handleDeletePatient()}>Delete Patient</Button>
                    </Link>
                </Row>
                <h3>Patient Info</h3>
                <Card>
                    <Row style={{margin: '5px'}}>
                        &nbsp;&nbsp;&nbsp;<Image src="https://pellet-pusher-patient-files.s3-us-west-2.amazonaws.com/bruce+lee.jpg" width='75px' height='75px' rounded />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Card.Title as={Col} key={patient.patient_id}>Patient: McHale{patient.first_name} Page{patient.last_name}</Card.Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button as={Col} variant='link' onClick={() => setIsEditing(true)}>Edit</Button>
                    </Row>
                    <Row style={{margin: '5px'}}>
                        <Card.Subtitle as={Col} key={patient.patient_id}>Date of Birth: 06/16/1995{patient.date_of_birth}</Card.Subtitle>
                        <Card.Subtitle as={Col} key={patient.patient_id}>Gender: Male{patient.gender}</Card.Subtitle>
                    </Row>
                    <Row style={{margin: '5px'}}>
                        <Card.Body key={patient.patient_id}>Phone: 2086973163{patient.phone}</Card.Body>
                        <Card.Body key={patient.patient_id}>Email: me@mchale.page{patient.email}</Card.Body>
                    </Row>
                </Card>
                <br />
                <br />
                <Visits />
                {/* <Files /> */}
            </Container>
        )
    } else if (isEditing) {
        return (
            <Container style={{height: '100vh'}}>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <Link to='/dashboard'>
                    <Button variant='link'>Return to Dashboard</Button>
            </Link>
            <h3>Patient Info</h3>
            <Card>
                <Form>
                    <Form.Row style={{margin: '5px'}}>
                        <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={e => setFirstName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={e => setLastName(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{margin: '5px'}}>
                        <Form.Group controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <br />
                            <DatePicker style={{borderRadius: '5px'}}id='DOB-datepicker' selected={dateOfBirth} onChange={date => setDateOfBirth(date)} />
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
                            <Form.Control type='text' placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{margin: '5px'}}>
                        <Button variant="primary" type="submit" onClick={() => handleUpdatePatient()}>
                            Save
                        </Button>
                        <Button variant='outline-primary' onClick={() => setIsEditing(false)}>Discard Changes</Button>
                    </Form.Row>
                </Form>
            </Card>
            <br />
            <br />
            <Visits />
            </Container>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getPatient})(Patient)