import React, { useState, useEffect } from 'react'
// import axios from 'axios'
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


function Patient(props) {
    
    const [dateOfBirth, setDateOfBirth] = useState(new Date())

    return(
        <Container>
            <h3>Patient Info</h3>
            <Button variant='link'>{`<`}</Button>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
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
                        <Form.Control as="select">
                            <option>Choose...</option>    
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhoneNumber">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type='text' placeholder="(123)456-7890" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='text' placeholder="Enter email address" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form.Row>
                <Form.Row>

                </Form.Row>
            </Form>
            <Visits />
            <Files />
        </Container>
    )
}

export default Patient