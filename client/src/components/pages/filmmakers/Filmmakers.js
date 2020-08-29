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

    sendFilmmakersToDad = () => {  
        let filmmakersList
        this.state.filmmakers.length > 0 && (filmmakersList = this.state.filmmakers)
        this.props.filmmakersData(filmmakersList)
    }

    componentDidMount = () => {
        this.getAllFilmmakers()
        this.sendFilmmakersToDad()
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