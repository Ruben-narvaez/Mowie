import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './ProjectCard.css'

const ProjectCard = props => {

    return (
        <Col md={3}>
            <Link to={`/projects/details/${props._id}`} >
            <Card bg="light" border="light" as="article" className="projectCards">
                <Card.Img variant="top" className="projectCardImg" src={props.poster} />
                <Card.Body>
                        <Card.Title><b>{props.title}</b></Card.Title>
                    <Card.Title>{props.genre} - {props.format}</Card.Title>
                    {/* <Card.Text className="projectDesc"> {props.description} </Card.Text> */}
                    <Card.Text> Lugar: {props.location} </Card.Text>
                    <Card.Text> Fecha aproximada: {props.date} </Card.Text>
                    
                </Card.Body>
            </Card>
            </Link>
        </Col>
    )
}

export default ProjectCard