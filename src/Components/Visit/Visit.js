import React, {useState, useEffect } from 'react'
import axios from 'axios'
import './Visit.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import Card from 'react-bootstrap/Card'
import Axios from 'axios'
import { useLocation, useHistory, useParams } from 'react-router-dom'

const Visit = props => {
    const [expandVisit, setExpandVisit] = useState(false)
    const [isNewVisit, setIsNewVisit] = useState(true)
    const [isEditing, setIsEditing] = useState(true)
    const [visit, setVisit] = useState({})
    const [date, setDate] = useState(new Date())
    const [visitType, setVisitType] = useState('')
    const [HPI, setHPI] = useState('')
    // const [AMSSymptomScore, setAMSSymptomScore] = useState(null)
    // const [MRSSymptomScore, setMRSSymptomScore] = useState(null)
    // const [currentStressLevel, setCurrentStressLevel] = useState('')
    // const [sleep, setSleep] = useState('')
    // const [mood, setMood ] = useState('')
    // const [energy, setEnergy] = useState('')
    // const [libido, setLibido] = useState('')
    // const [exercise, setExercise] = useState('')
    // const [diet, setDiet] = useState('')
    // const [meds, setMeds] = useState('')
    // const [supplements, setSupplements] = useState('')
    // const [vitalsBPSystolic, setVitalsBPSystolic] = useState(null)
    // const [vitalsBPDiastolic, setVitalBPDiastolic] = useState(null)
    // const [vitalsSpo2, setVitalsSpo2] = useState(null)
    // const [weight, setWeight ] = useState(null)
    // const [height, setHeight] = useState(null)
    // const [bmi, setBmi] = useState(null)
    // const [pbf, setpbf] = useState(null)
    // const [vfl, setVfl] = useState(null)
    // const [testicularHypofunctionE291, setTesticularHypofunctionE291] = useState('')
    // const [menopausalAndFemaleClimactericStates, setMenopausalAndFemaleClimactericStates] = useState('')
    // const [notes, setNotes] = useState('')
    // const [sideOfPellets, setSideOfPellets] = useState('')

    let history = useHistory()
    let {patient_id, visit_id} = useParams()
    let location = useLocation()

    useEffect (() => {
        axios
            .get(`/api/visit/${visit_id}`)
            .then(res => {
                setVisit(res.data)
                setIsEditing(false)
                setIsNewVisit(false)
            })

    })

    const handleAddVisit = () => {
        axios
            .get(`/api/${patient_id}/visit`)
            .then(res => {
                setVisit(res.data)
                setIsEditing(false)
                setIsNewVisit(false)
            })
    }

    const handleUpdateVisit = () => {
        const body = {
            date: date,
            visit_type: visitType,
            HPI: HPI,
            AMS_symptom_score: AMSSymptomScore,
            MRS_symptom_score: MRSSymptomScore,
            current_stress_level: currentStressLevel,
            // sleep: sleep,
            // mood: mood,
            // energy: energy,
            // libido: libido,
            // exercise: exercise,
            // diet: diet,
            // meds: meds,
            // supplements: supplements,
            // vitals_bp_systolic: vitalsBPSystolic,
            // vitals_bp_diastolic: vitalsBPDiastolic,
            // vitals_spo2: vitalsSpo2,
            // weight: weight,
            // height: height,
            // bmi: bmi,
            // pbf,
            // vfl,
            // testicular_hypofunction_e29_1: testicularHypofunctionE291,
            // menopausal_and_female_climacteric_states: menopausalAndFemaleClimactericStates,
            // notes: notes,
            // side_of_pellets: sideOfPellets
        }
        axios
            .put(`/api/visit/${visit_id}`, body)
            .then(res => {
                setVisit(res.data)
                setIsEditing(false)
            })
        setIsEditing(false)
    }

    const handleDeleteVisit = () => {
        axios
            .delete(`/api$/visit/${visit_id}`)
            .then(() => {
                console.log('visit deleted')
                setIsEditing(false)
                setIsNewVisit(false)
            })
    }

    if (!isEditing && !isNewVisit){
        return (
            <Container>
                <Button
                onClick={() => setExpandVisit(!expandVisit)}
                aria-controls="example-collapse-text"
                aria-expanded={expandVisit}
                variant='link'
                > 
                Expand / Collapse
                </Button>
                <Collapse in={expandVisit}>
                    <p>Saved Visit</p>
                    <Button variant='link' onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                </Collapse>
    
            </Container>
        )
    } else if (isEditing && !isNewVisit){
        return (
            <Container>
            <Form>
                <Form.Row>
                    <Form.Group controlId='formGridVisitDatepicker'>
                        <Form.Label>Visit Date</Form.Label>
                        <br />
                        <DatePicker id='visit-datepicker' selected={date} onChange={date => setDate(date)} />
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
                <Form.Row style={{margin: '5px'}}>
                    <Button variant='primary'>Save Visit</Button>
                </Form.Row>
            </Form>
        </Container>
        )
    } else if (isEditing && isNewVisit) {
        return(
            <Container>
            <Card>
                <Form.Row style={{margin: '5px'}}>
                    <Form.Group controlId='formGridVisitDatepicker'>
                        <Form.Label>Visit Date</Form.Label>
                        <br />
                        <DatePicker id='visit-datepicker' selected={date} onChange={date => setDate(date)} />
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
                        <Form.Control as='textarea' placeholder='Enter HPI details here'></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row style={{margin: '5px'}}>
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
                <Form.Row style={{margin: '5px'}}>
                    <Button variant='primary' onClick={() => handleAddVisit()}>Save Visit</Button>
                </Form.Row>
            </Card>
        </Container>
        )
    }
    
}

export default Visit