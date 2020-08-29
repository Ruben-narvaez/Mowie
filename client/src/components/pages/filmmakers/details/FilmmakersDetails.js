import React, { Component } from 'react'
import FilmmakerService from '../../../../service/filmmakers.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import './FilmmakersDetails.css'

class FilmmakerDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            following: [],
            followers: [],
        }
        this.filmmakerService = new FilmmakerService()
        this.goBack = this.goBack.bind(this)
    }

    
    getFilmmakerInfo() {
        const id = this.props.match.params.id
        this.filmmakerService.getFilmmaker(id)
        .then(response => this.setState(response.data))
        .catch(err => console.log(err))
    }
    
    goBack() {
        this.props.history.goBack();
    }

    addFollower() {
        this.filmmakerService.addFollower(this.props.match.params.id, this.props.loggedInUser._id)
            .catch(err => console.log(err))     
    }

    addFollowing() {
        this.filmmakerService.addFollowing(this.props.match.params.id, this.props.loggedInUser._id)
            .catch(err => console.log(err))
    }

    followProcess() {
        this.addFollower()
        this.addFollowing()
        this.getFilmmakerInfo()
    }
    
    deleteFollower() {
        this.filmmakerService.deleteFollower(this.props.match.params.id, this.props.loggedInUser._id)
            .catch(err => console.log(err))
    }

    deleteFollowing() {
        this.filmmakerService.deleteFollowing(this.props.match.params.id, this.props.loggedInUser._id)
            .catch(err => console.log(err))
    }

    deleteFollow() {
        this.deleteFollower()
        this.deleteFollowing()
        this.getFilmmakerInfo()
    }

    componentDidMount = () => {
        this.getFilmmakerInfo()
    }
    
    render() {
        
        const { picture, name, lastname, team, age, city, aboutMe, projects, following, followers, _id } = this.state
        
        return (
            <Container as="section">
                <Row className="filmDetailsFirstRow">
                    <div className="blueDivFilmmaker">
                        <div className="profileDetailsPicture">
                            <img src={picture} alt="" />
                        </div>
                        <div className="infoFilmmaker">
                            <h2>{name} {lastname}</h2>
                            <h5>Equipo de {team}</h5>
                            <p>Edad: {age}</p>
                            <p>Ciudad: {city}</p>
                        </div>
                        <div className="followButtonDiv">
                            {this.props.loggedInUser._id === _id ? null : followers.find(elm => elm._id === this.props.loggedInUser._id) ? <Button className="redButton" onClick={() => this.deleteFollow()}>Dejar de seguir</Button> : <Button className="editButton" onClick={() => this.followProcess()}>Seguir</Button>}
                        </div>
                    </div>
                </Row>
                <Row className="filmDetailsSecondRow">
                    <Col lg={3}>
                        <div className="aboutMe-col">
                            <q>{aboutMe}</q>
                        </div>
                        <div className="followersDiv">
                            <p>Siguiendo: {following.length}</p>
                            <p>Seguidores: {followers.length}</p>
                        </div>
                    </Col>
                    <Col lg={9}>

                        <article className="filmmakerProjects-col">
                            <h3>Proyectos de {name}</h3>
                            <div className="ampliate">
                                <div className="projectsDisplay">
                                    {(projects && projects.length > 0) ? projects.map((elm, idx) => <Link key={idx} className="buttonList" to={`/projects/details/${elm._id}`}> <img src={elm.poster} alt="poster" /> <div className="profileProjectCards" ><div className="titleForCard">{elm.title}</div> <div className="dataForCard"><div>Fecha de realización: {elm.date}</div><div>Usuarios apuntados: {elm.users.length}</div></div></div></Link>) : <h5 className="noProjects">El usuario no tiene proyectos creados</h5>}
                                </div>
                            </div>
                        </article>

                    </Col>
                </Row>
            </Container>

            // <Container as="section" className="filmmaker-details">
            //     <Row className="filmDetailsFirstRow">
            //         <h2>{this.state.name} {this.state.lastname}</h2>
            //     </Row>
            //     <Row className="filmDetailsSecondRow">
            //         <Col md={{ span: 4, offset: 1 }}>
            //             <h4>Info</h4>
            //             <p>Nombre: {this.state.name} {this.state.lastname}</p>
            //             <p>Nickname: {this.state.username}</p>
            //             <p>Edad: {this.state.age}</p>
            //             <p>Ciudad: {this.state.city}</p>
            //             <h5>Equipo de {this.state.team}</h5>                       
            //         </Col>
            //         <Col md={6}>
            //             <img src={this.state.picture} alt={this.state.name}></img>
            //         </Col>
            //         <Row className="forgottenRow">
            //             <Col>
            //                 <h4>Sobre mi</h4>
            //                 <p>{this.state.aboutMe}</p>
            //             </Col>
            //         </Row>
            //     </Row>
            //     <Row className="filmDetailsThirdRow">
            //         <Button className="filmmakerButton" onClick={this.goBack}>Volver</Button>
            //     </Row>
            // </Container>
        )
        // }
    }
}

export default FilmmakerDetails