import React, { Component } from 'react'
import Filmmakers from '../../../service/filmmakers.service'
import FilmmakerCard from './FilmmakerCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './Filmmakers.css'

class FilmmakerList extends Component {

    constructor() {
        super()
        this.state = {
            filmmakers: [],
        }
        this.filmmakersService = new Filmmakers()
    }

    getAllFilmmakers = () => {
        this.filmmakersService.getFilmmakers()
            .then(response => this.setState({ filmmakers: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAllFilmmakers()
    }

    render() {
        return (
            <Container fluid={true} as="section" className="filmContainer">
                <h2>Busca compañeros en nuestra comunidad</h2>
                <Row className="filmmakersRow">
                    {this.state.filmmakers.map(elm => <FilmmakerCard key={elm._id} {...elm} />)}
                </Row>
            </Container>
        )
    
    }
    
}

export default FilmmakerList