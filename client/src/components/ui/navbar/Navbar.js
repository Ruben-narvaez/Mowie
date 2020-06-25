import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthService from './../../../service/auth.service'
import Logo from '../ImagesforCol/logo-navbar.png'

import { Link } from 'react-router-dom'
import './Navbar.css'



class Navigation extends Component {

    constructor(props) {
        super(props)
        this.authService = new AuthService()
    }

    logout = () => {
        this.props.setTheUser(false)
        this.authService.logout()
    }

    render() {

        return (
            <Navbar className="nav" expand="md">
                <Navbar.Brand as="div"><Link to="/"><img className="navLogo" src={Logo} alt="logo" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="navEnd" id="basic-navbar-nav">
                    <Nav >
                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link as="div"><Link to="/login">Iniciar sesión</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/signup">Registro</Link></Nav.Link>
                                </>

                                :
                                <>
                                    <Nav.Link as="div"><Link to="/profile">Mi perfil</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/projects">Proyectos</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/filmmakers">Comunidad</Link></Nav.Link>

                                    <Nav.Link as="div" onClick={this.logout}>Cerrar sesión</Nav.Link>
                                </>

                        }

                    </Nav>
                    {/* <Navbar.Text className="ml-auto"> {this.props.loggedInUser ? this.props.loggedInUser.username : 'invitad@'}</Navbar.Text> */}
                </Navbar.Collapse>

            </Navbar>
        )
    }

}

export default Navigation