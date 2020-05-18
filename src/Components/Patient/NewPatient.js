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


function NewPatient(props) {
    
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

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
            .catch(err => console.log(err))
    }

    return(
        <Container>
            <h3>Patient Info</h3>
            <Button variant='link'>{`<`}</Button>
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
                        <DatePicker id='DOB-datepicker' selected={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
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
                    <Button variant="primary" type="submit" onClick={handleAddPatient}>
                        Save
                    </Button>
                </Form.Row>
                <Form.Row>

                </Form.Row>
            </Form>
            {/* <Visits />
            <Files /> */}
        </Container>
    )
}

export default NewPatient