import React, {useState, UseEffect } from 'react'
import './Visit.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const VisitForm = (props) => {
    const [expandVisit, setExpandVisit] = useState(false)
    const [visitDate, setVisitDate] = useState(new Date())

    return(
        <Container>
            <Form>
                <Form.Row>
                    <Form.Group controlId='formGridVisitDatepicker'>
                        <Form.Label>Visit Date</Form.Label>
                        <br />
                        <DatePicker id='visit-datepicker' selected={visitDate} onChange={e => setVisitDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId='formGridvisitType'>
                        <Form.Label>Visit Type</Form.Label>
                        <Form.Control as='select'>
                            <option>Choose...</option>
                            <option>Consultation</option>
                            <option>Blood Work</option>
                            <option>Male Pellet Insertion</option>
                            <option>Female Pellet Insertion</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='formGridHPI'>
                        <Form.Label>History of Present Illness</Form.Label>
                        <Form.Control as='textarea' placeholder='Enter HPI details here'>Enter HPI details</Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId='formGridAMS'>
                        <Form.Label>AMS Symptom Score</Form.Label>
                        <Form.Control as='select' size='sm'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='formGridMRS'>
                        <Form.Label>MRS Symptom Score</Form.Label>
                        <Form.Control as='select' size='sm'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='formGridStressLevel'>
                        <Form.Label>Current Stress Level</Form.Label>
                        <Form.Control as='select' size='sm'>
                            <option>Low</option>
                            <option>Moderate</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    )
}

export default VisitForm