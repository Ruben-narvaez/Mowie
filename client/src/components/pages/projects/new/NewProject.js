import React, { Component } from 'react'
import ProjectService from '../../../../service/projects.service'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './NewProject.css'


class ProjectForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.loggedInUser,
            title: '',
            description: '',
            genre: '',
            format: '',
            poster: '',
            date: '',
            location: '',
            needed: '',
        }
        this.projectService = new ProjectService()
    }


    handleInputChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.projectService.saveProject(this.state)
            .then(() => this.props.finishNewProject())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>Nuevo proyecto</h2>
                        <hr></hr>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Título del proyecto</Form.Label>
                                <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="crID">
                                <Form.Control name="creatorID" type="hidden" value={this.state.user} /> 
                            </Form.Group>
                            <Form.Group controlId="desc">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows="3" name="description" type="textarea" value={this.state.description} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="loc">
                                <Form.Label>Lugar</Form.Label>
                                <Form.Control name="location" type="text" value={this.state.location} onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="nd">
                                <Form.Label>¿Qué necesitas?</Form.Label>
                                <Form.Control name="needed" type="text" value={this.state.needed} onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Fecha aproximada del fin de proyecto</Form.Label>
                                <Form.Control name="date" type="date" value={this.state.date} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="gen">
                                <Form.Label>Género</Form.Label>
                                <Form.Control size="sm" as="select" name="genre" type="text" value={this.state.genre} onChange={this.handleInputChange}>
                                    <option>Seleccionar</option>
                                    <option>Documental</option>
                                    <option>Comedia</option>
                                    <option>Drama</option>
                                    <option>Acción</option>
                                    <option>Ciencia-ficción</option>
                                    <option>Comedia romántica</option>
                                    <option>Musical</option>
                                    <option>Fantasía</option>
                                    <option>Artes Marciales</option>
                                    <option>Video-arte</option>
                                    <option>Video-ensayo</option>
                                    <option>Otros</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="format">
                                <Form.Label>Formato</Form.Label>
                                <Form.Control size="sm" as="select" name="format" type="text" value={this.state.format} onChange={this.handleInputChange}>
                                    <option>Seleccionar</option>
                                    <option>Largometraje</option>
                                    <option>Cortometraje</option>
                                    <option>Web Serie</option>
                                    <option>Publicidad</option>
                                    <option>Videoclip</option>
                                    <option>Otro formato</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="img">
                                <Form.Label>Póster (URL)</Form.Label>
                                <Form.Control name="poster" type="text" value={this.state.poster} onChange={this.handleInputChange} />
                            </Form.Group>
                            <div className="buttons">
                            <Button className="editButton" type="submit">Crear proyecto</Button>
                            <Button className="redButton" onClick={this.props.closeModal}>Cerrar</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProjectForm

