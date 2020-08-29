import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import './Signup.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                password: '',
                name: '',
                lastname: '',
                age: undefined,
                email: '',
                city: '',
                aboutMe: '',
                team: '',
                picture: ''
            },
            errorMessage: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        let loginInfoCopy = { ...this.state.loginInfo }
        const { name, value } = e.target
        loginInfoCopy = { ...loginInfoCopy, [name]: value }

        this.setState({ loginInfo: loginInfoCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.authService.signup(this.state.loginInfo)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => {
                err.response.status === 400 && this.setState({ errorMessage: err.response.data.message })
            })
    }



    render() {

        return (
            <Container fluid={true} className='loginBody'>

                <Row className="loginRow">
                    <Col className="loginForm">
                        <h3>Registro de usuario</h3>
                        <hr></hr>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="usr">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="pwd">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="lastname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control name="lastname" type="text" value={this.state.lastname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="age">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control name="age" type="text" value={this.state.age} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="city">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control name="city" type="text" value={this.state.city} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="team">
                                <Form.Label>¿De qué equipo de la producción eres?</Form.Label>
                                <Form.Control size="sm" as="select" name="team" type="text" value={this.state.team} onChange={this.handleInputChange}>
                                    <option>Seleccionar</option>
                                    <option>Dirección</option>
                                    <option>Guión</option>
                                    <option>Fotografía</option>
                                    <option>Arte</option>
                                    <option>Cámara</option>
                                    <option>Sonido</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="btMe">
                                <Form.Label>Sobre mi labor</Form.Label>
                                <Form.Control as="textarea" rows="3" name="aboutMe" type="textarea" value={this.state.aboutMe} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="pic">
                                <Form.Label>Foto de perfil</Form.Label>
                                <Form.Control name="picture" type="text" placeholder="Adjunta una url a tu foto" value={this.state.picture} onChange={this.handleInputChange} />
                            </Form.Group>

                            <p
                                className='error-message'
                                style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                            >{this.state.errorMessage}</p>

                            <Button className="myLoginButton" type="submit">Registrarme</Button>
                        </Form>

                        <p><small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small></p>

                    </Col>
                </Row>

            </Container>
        )
    }
}


export default Signup