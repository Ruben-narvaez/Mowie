
import React from 'react'

import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import './FilmmakerCard.css'

const FilmmakerCard = props => {

    return (
        <Row>
            <Card className="cards" as="article">
                <Link to={`/filmmakers/${props._id}`} className="btn btn-block">
                        <Card.Img variant="top" src={props.picture} />
                        <Card.Body>
                                <Card.Title><h5>{props.name} {props.lastname}</h5></Card.Title>
                        <Card.Text className="cardText">{props.team}</Card.Text>
                        <Card.Text className="cardText"> {props.city} </Card.Text>
                        </Card.Body>
                </Link>
            </Card>
        </Row>
    )
}

export default FilmmakerCard