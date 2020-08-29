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
            const { name, lastname, picture, team, projects, following, followers } = this.state.user

            return (
                <>
                    <Container className="profile-section">
                        <Row>
                            <Col md="3" className="firstProfileCol">
                                <article className="profileCard">
                                    <div className="justBlueTop">
                                        <div className="usr-pic">
                                            <img src={picture} alt="" />
                                        </div>
                                    </div>
                                    <div className="userNameTeam">
                                        <h3>{name} {lastname}</h3>
                                        <h5>Equipo de {team}</h5>
                                    </div>
                                    <div className="profileProjectsNumber">
                                        <h4>Proyectos creados</h4>
                                        {projects && projects.length > 0 ? projects.length : <h5>Aún no tienes proyectos creados</h5>}
                                    </div>
                                    <div className="profileProjectsNumber">
                                        <h4>Seguidores</h4>
                                        <h5>{followers.length}</h5>
                                    </div>
                                    <div className="lastProfileDiv">
                                        <h4>Siguiendo</h4>
                                        <h5>{following.length}</h5>
                                    </div>
                                </article>

                            </Col>
                            <Col md="9">
                                <article className="myProjects">
                                    <h3>Mis proyectos</h3>
                                    <div className="separate">
                                        <div className="projectsDisplay">
                                            {(projects && projects.length > 0) ? projects.map((elm, idx) => <Link key={idx} className="buttonList" to={`/projects/details/${elm._id}`}> <img src={elm.poster} alt="poster" /> <div className="profileProjectCards" ><div className="titleForCard">{elm.title}</div> <div className="dataForCard"><div>Fecha de realización: {elm.date}</div><div>Usuarios apuntados: {elm.users.length}</div></div></div></Link>) : <h5 className="noProjects">Todavía no tienes proyectos creados</h5>}
                                        </div>
                                        <Link className="myProjectsButton" to="/projects" >Buscar otros proyectos</Link>
                                    </div>
                                </article>

                                <article className="followed">
                                    <div id="followedPics">
                                        <h3>Usuarios a los que sigues</h3>
                                        
                                        {following.length > 0 ? <div className="picturesRow">{following.map((elm, idx) => following.length < 20 ? <Link key={idx} to={`/filmmakers/${elm._id}`}><img src={elm.picture} alt="followed users" /></Link> : <Link key={idx} to={`/filmmakers/${elm._id}`}><img src={elm.picture} alt="followed users" /></Link>).slice(0, 20)}</div>  : <h5>Todavía no sigues a nadie</h5>}
                                        
                                    </div>
                                    <Link className="myProjectsButton" to="/filmmakers" >Buscar filmmakers</Link>
                                </article>

                            </Col>
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