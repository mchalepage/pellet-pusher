import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Visits from '../Visits/Visits'
import Files from '../Files/Files'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {getPatient} from '../../ducks/patientReducer'
import {connect} from 'react-redux'
import Header from '../Header/Header'
var ReactS3Uploader = require('react-s3-uploader')


function NewPatient(props) {

    let history = useHistory()
    
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
            .then(res => {
                // props.getPatient(res.data)
                history.push(`/patient/${res.data.patient_id}`)
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
        <Link to='/dashboard'>
                <Button variant='link'>Return to Dashboard</Button>
        </Link>
        <h3>Enter Patient Info Below</h3>
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
                        <Form.Control type='text' placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridPatientImg">
                        <Form.Label>Upload Patient Image</Form.Label>
                        <ReactS3Uploader
                            // signingUrl="/s3/sign"
                            // signingUrlMethod="GET"
                            // accept="image/*"
                            // s3path="/uploads/"
                            // // preprocess={this.onUploadStart}
                            // onSignedUrl={this.onSignedUrl}
                            // onProgress={this.onUploadProgress}
                            // onError={this.onUploadError}
                            // // onFinish={this.onUploadFinish}
                            // // signingUrlHeaders={{ additional: headers }}
                            // // signingUrlQueryParams={{ additional: query-params }}
                            // signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                            // uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                            // contentDisposition="auto"
                            // scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                            // server="http://cross-origin-server.com"
                            // inputRef={cmp => this.uploadInput = cmp}
                            // autoUpload={true}
                            />
                    </Form.Group>
                    <Form.Group as={Col} controlId='formGridPatientSince'>
                        <Form.Label>Patient Since</Form.Label>
                        <DatePicker id='DOB-datepicker' selected={patientSince} onChange={date => setPatientSince(date)} />
                    </Form.Group>
                </Form.Row> */}
                <Form.Row>
                    <Button variant="primary" type="submit" onClick={() => handleAddPatient()}>
                        Create Patient
                    </Button>
                </Form.Row>
                <Form.Row>

                </Form.Row>
            </Form>
        </Card>
        </Container>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getPatient})(NewPatient)