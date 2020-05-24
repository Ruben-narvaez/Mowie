import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import Container from 'react-bootstrap/Container'
import ProjectService from '../../../service/projects.service'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.authService = new AuthService()
        this.projectsService = new ProjectService()
        this.state = {
            user: '',
        }
    }

    displayProjects = () => {
        this.authService.userProfile(this.props.loggedInUser._id)
            .then(response => this.setState({ user: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
       this.displayProjects()
    }

    render() {

        if (this.state.user) {
            const { name, lastname, picture, team, projects } = this.state.user
            return (
                <>
                    <Container as="section" className="profile-section">
    
                            <Row className="firstProfileRow">
                                <Col md="3"><img src={picture} alt="" />
                                </Col>
                                <Col md="3">
                                    <h2>{name} {lastname}</h2>
                                    <h3>Equipo de {team}</h3>
                                </Col>                           
                            </Row>
                            
                            <Row className="secondProfileRow">                              
                                <Col md={12}>
                                    <h3>Mis proyectos</h3>
                                </Col>
                                <Col md={12}>               
                                    {projects && projects.length > 0 ? projects.map(elm => <h5><Link key={elm._id} className="buttonList" to={`/projects/details/${elm._id}`}> {elm.title} </Link></h5>) : <h5 className="buttonList">Todavía no tienes proyectos creados</h5>}                                                                                                         
                                </Col>
                                </Row>   
                                <Row className="thirdProfileRow">
                                    <Link className="profileButton" to="/filmmakers" >Buscar filmmakers</Link>
                                <Link className="profileButton" to="/projects" >Buscar proyectos</Link>
                            </Row>
                            
                    </Container>
                </>
            )
        } else {
            return <p>Cargando...</p>
        }
    }
}
export default Profile