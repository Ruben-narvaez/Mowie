import React from 'react';
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Videographer from '../../ui/ImagesforCol/photographer-colour-800px.png'
import Filmmaker from '../../ui/ImagesforCol/undraw_videographer_nnc7.svg'
import Connect from '../../ui/ImagesforCol/handshake-colour.svg'
import Role from '../../ui/ImagesforCol/mirror-pose-colour.svg'
import ProjectShare from '../../ui/ImagesforCol/drawkit-content-man-colour.svg'


import './Home.css'

const Home = () => {
    return (
       
        <Container fluid={true}>
            <Row className="homePhrase backImg1">
                <Col className="colPhrase" md="6">
                    <section>   
                        <h1>La red social de los filmmakers independientes</h1>
                    </section>
                <Link className="homeButton" to="/signup" >Crea tu cuenta</Link>
                </Col>
                <Col md="6">
                    <img src={Videographer} alt="Videographer" />
                </Col>
            </Row>
            <Row className="backImg2">
                <Col md="6"></Col>
                <Col className="bluePhrase" md="6">
                    <h2>Únete, determina tu rol y colabora en los proyectos de la comunidad</h2>
                    <Link className="loginButton" to="/login" >Entra</Link>
                </Col>
            </Row>
            <Row className="blueRow">
                <Col className="colBlue role" md="4">
                    <h4>Determina tu rol</h4>
                    <img src={Role} alt="Rol" />
                </Col>
                <Col className="colBlue" md="4">
                    <h4>Busca compañeros</h4>
                    <img src={Connect} alt="Conecta" />
                </Col>
                <Col className="colBlue" md="4">
                    <h4>Comparte tus proyectos</h4>
                    <img src={ProjectShare} alt="Project Sharing" />
                </Col>
            </Row>
            <Row className="lastRow backImg3">
                <h1>¡Te estamos esperando!</h1>
                <Col md="12">
                    <img src={Filmmaker} alt="filmmaker" />
                </Col>
            </Row>
        </Container>
         
    )
}

export default Home