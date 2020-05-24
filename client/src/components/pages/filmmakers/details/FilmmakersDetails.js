import React, { Component } from 'react'
import FilmmakerService from '../../../../service/filmmakers.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './FilmmakersDetails.css'

class FilmmakerDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.filmmakerService = new FilmmakerService()
        this.goBack = this.goBack.bind(this)
    }


    getFilmmakerInfo() {
        const id = this.props.match.params.id
        this.filmmakerService.getFilmmaker(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    goBack() {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        this.getFilmmakerInfo()
    }

    render() {
        return (
            <Container as="section" className="filmmaker-details">
                <Row className="filmDetailsFirstRow">
                    <h2>{this.state.name} {this.state.lastname}</h2>
                </Row>
                <Row className="filmDetailsSecondRow">
                    <Col md={{ span: 4, offset: 1 }}>
                        <h4>Info</h4>
                        <p>Nombre: {this.state.name} {this.state.lastname}</p>
                        <p>Nickname: {this.state.username}</p>
                        <p>Edad: {this.state.age}</p>
                        <p>Ciudad: {this.state.city}</p>
                        <h5>Equipo de {this.state.team}</h5>                       
                    </Col>
                    <Col md={6}>
                        <img src={this.state.picture} alt={this.state.name}></img>
                    </Col>
                    <Row className="forgottenRow">
                        <Col>
                            <h4>Sobre mi</h4>
                            <p>{this.state.aboutMe}</p>
                        </Col>
                    </Row>
                </Row>
                <Row className="filmDetailsThirdRow">
                    <Button className="filmmakerButton" onClick={this.goBack}>Volver</Button>
                </Row>
            </Container>
        )
    }
}

export default FilmmakerDetails