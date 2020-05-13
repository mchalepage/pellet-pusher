import React, {useState, UseEffect } from 'react'
import './Visit.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const SavedVisit = props => {
    const [expandVisit, setExpandVisit] = useState(false)

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
            </Collapse>

        </Container>
    )
}

export default SavedVisit