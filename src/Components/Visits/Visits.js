import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Visits.css'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import VisitForm from '../Visit/VisitForm'
import SavedVisit from '../Visit/SavedVisit'

function Visits(props) {

    const [visits, setVisits] = useState([])

    useEffect((patient_id) => {
        axios
            .get(`/api/${patient_id}/visits`)
            .then(res => setVisits(res.data))
    }, [])

    const addVisit = () => {
        return (
            <VisitForm />
        )
    }

    const mappedVisits = visits.map((visit, index) => {
        return(
            <Container
            data={visit}
            key={visit.visit_id}
            />
        )

    })
    return (
        <Container>
            <h3>Visits</h3>
            <Button variety='link' onClick={addVisit}>Add Visit</Button>
            <ul>{mappedVisits}</ul>
        </Container>
    )
}

export default Visits