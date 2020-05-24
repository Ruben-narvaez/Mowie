import React from 'react';
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Home.css'

const Home = () => {
    return (
       
        <Container fluid={true}>
            <Row className="homePhrase">
                <Col className="colPhrase" md="6">
                    <section>                       
                        <h1>La red social de los filmmakers independientes</h1>
                    </section>
                <Link className="homeButton" to="/signup" >Crea tu cuenta</Link>
                </Col>
                <Col className="travolta" md="6">
                    <section>
                    {/* <img src="./../ui/ImageFoBack/travol.png" alt="travolta" /> */}
                    </section>
                </Col>
            </Row>
            <Row className="blueRow">
                <Col className="miaWallace" md="6">
                </Col>
                <Col className="bluePhrase" md="6">
                    <h2>Únete, determina tu rol y colabora en los proyectos de la comunidad, o busca compañeros para tu propios proyectos.</h2>
                    <Link className="loginButton" to="/login" >Entra</Link>
                </Col>
            </Row>
            {/* <Row className="homeFooter">
                <p>Made by Rub</p>
            </Row>  */}
        </Container>
         
    )
}

export default Home