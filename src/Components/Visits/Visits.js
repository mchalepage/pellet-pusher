import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Visits.css'
import {Link, useLocation, useParams, useHistory} from 'react-router'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Visit from '../Visit/Visit'
import Card from 'react-bootstrap/Card'

function Visits(props) {

    let location = useLocation()
    let history = useHistory()
    let {patient_id} = useParams()

    const [visits, setVisits] = useState([])

    useEffect(() => {
        axios
            .get(`/api/${patient_id}/visits`)
            .then(res => setVisits(res.data))
    }, [patient_id])

    const mappedVisits = visits.map((visit, index) => {
        return(
            <Visit
            data={visit}
            key={visit.visit_id}
            />
        )

    })

    const handleAddVisit = () => {
        axios  
            .post(`/api/patient/${patient_id}/visit`)
            .then(res => setVisits(res.data))
    }

    return (
        <Container>
            <h3>Visits</h3>
            <Card style={{backgroundColor: 'transparent'}}>
                <Button variety='link' onClick={() => handleAddVisit(props.patient.patient_id)}>Add Visit</Button>
                <br />
                <br />
                <Visit />
                <ul>{visits}</ul>
            </Card>
        </Container>
    )
}

export default Visits