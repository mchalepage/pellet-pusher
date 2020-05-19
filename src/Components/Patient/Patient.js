import React, { useState, useEffect } from 'react'
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
    
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

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

    const handleUpdatePatient = () => {
        setIsEditing(false)
    }

    if(!isEditing){
        return(
            <Container>
                <Header />
                <br />
                <br />
                <br />
                <br />
                <Card style={{width: '80vw'}}>
                    <Card.Title>Carlet Page</Card.Title>
                    <Card.Subtitle>Date of Birth: 04/27/1966 <br />Gender: Female</Card.Subtitle>
                    <Card.Body>Phone: 2086973163 <br/> Email: carlet@page.com <br /></Card.Body>
                    <Button variant='link' onClick={() => setIsEditing(true)}>Edit Info</Button>
                </Card>
                <Visits />
                <Files />
            </Container>
        )
    } else {
        return (
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
                    <Button variant="primary" type="submit" onClick={handleUpdatePatient}>
                        Save
                    </Button>
                </Form.Row>
                <Form.Row>

                </Form.Row>
            </Form>
            </Container>
        )
    } 
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getPatient})(Patient)