import React, { Component } from 'react'
import ProjectService from '../../../../service/projects.service'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import './EditProject.css'

class EditProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            genre: this.props.genre,
            format: this.props.format,
            poster: this.props.poster,
            location: this.props.location,
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
        this.projectService.editProject(this.props._id, this.state)
            .then(() => this.props.finishProject())
            .catch(err => console.log(err))
    }

    render() {
        
        return (
                <Container className="editProjectForm">
                    <Row>
                        <Col md={12}>
                            <h2>Editar</h2>
                            <hr></hr>
                            <Form onSubmit={this.handleSubmit}>
                                
                                <Form.Group controlId="title">
                                        <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="description">
                                        <Form.Control name="description" as="textarea" rows="3" value={this.state.description} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="loc">
                                    <Form.Label>Lugar</Form.Label>
                                    <Form.Control name="location" type="text" value={this.state.location} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="nd">
                                    <Form.Label>¿Qué necesitas?</Form.Label>
                                    <Form.Control name="needed" type="text" value={this.state.needed} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="date">
                                    <Form.Label>Fecha aproximada del fin de proyecto</Form.Label>
                                    <Form.Control name="date" type="text" value={this.state.date} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="genre">
                                        <Form.Label>Género</Form.Label>
                                        <Form.Control as="select" name="genre" type="text" multiple={false} value={this.state.genre} onChange={this.handleInputChange}>
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
                                        <Form.Label>Formato</Form.Label>
                                        <Form.Control as="select" name="format" type="text" multiple={false} value={this.state.format} onChange={this.handleInputChange}>
                                            <option>Seleccionar</option>
                                            <option>Largometraje</option>
                                            <option>Cortometraje</option>
                                            <option>Web Serie</option>
                                            <option>Publicidad</option>
                                            <option>Videoclip</option>
                                            <option>Otro formato</option>
                                        </Form.Control>
                                </Form.Group>
                                {/* <Form.Group controlId="cover">
                                    <Form.Label>Sube una foto</Form.Label>
                                    <Form.Control name="poster" type="file" onChange={this.handleFileUpload} />
                                </Form.Group> */}
                                <div className="buttons">
                                    <Button className="modalButton" type="submit" >Actualizar</Button>
                                    <Button className="modalButton" onClick={() => this.props.closeModal()}> Cerrar</Button>                                   
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        )
    }
}
export default EditProject