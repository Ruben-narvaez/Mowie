import React, { Component } from 'react'
import ProjectsService from '../../../../service/projects.service'
import CommentService from '../../../../service/comment.service'
import EditProject from '../edit/EditProject'
import CommentForm from '../../comments/CommentForm'
import Comment from '../../comments/Comment'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Icon from '../../../ui/imageForMap/camera.png'

import './ProjectDetails.css'

import { Link } from 'react-router-dom'

class ProjectDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: props.lat,
                lng: props.lng
            },
            projectInfo: {},
            modalShow: false,
            comments: [],
            creator: {},
            userOnProject: false,
            modalName: '',
        }
        this.projectsService = new ProjectsService()
        this.commentService = new CommentService()
        this.goBack = this.goBack.bind(this)
    }

    static defaultProps = {
        center: {
            lat: 40.420524,
            lng: -3.705128
        },
        zoom: 16
    }

    getProjectInfo() {
        const id = this.props.match.params.id
        this.projectsService.getProject(id)
            .then(response => {
                this.getCommentsByProject(id)
                this.setState(response.data, () => {
                    this.checkUserOnProject()
                    this.getGoogleMap()
                })
            })
            .catch(err => console.log(err))
            
    }

    handleModal = (visible, modalName) => this.setState({ modalShow: visible, modalName: modalName })

    handleDelete = (id) => {
        this.projectsService.deleteProject(id)
            .then(() => {
                this.props.history.push('/projects')
            })
            .catch(err => console.log(err))
    }

    checkUserOnProject() {   
        let isUserOnProject = this.state.users && this.state.users.some(elm => elm._id === this.props.loggedInUser._id)
        this.setState({
            userOnProject: isUserOnProject
        })
    }

    getGoogleMap() {
        let location = this.state.location
        let key = "AIzaSyC29nPtAOUTrCqRJPRmCYcrd-amYUtPeUU"
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`).then(geores => {
            let latitude = geores.data.results[0].geometry.location.lat
            let longitude = geores.data.results[0].geometry.location.lng
            this.setState({
                center: {
                    lat: latitude,
                    lng: longitude
                }
            })
        })
    }

    addUserToProject() {
        this.projectsService.addUser(this.props.match.params.id)
            .then(response => this.setState({
                projectInfo: response.data
            }))
            .catch(err => console.log(err))
        this.getProjectInfo()
    }

    getCommentsByProject = (eventId) => {
        this.commentService
            .getCommentsbyProject(eventId)
            .then((response) => this.setState({ comments: response.data }))
            .catch((err) => console.log(err))
    }

    goBack() {
        this.props.history.goBack();
    }

    displayModal = (modalName) => {
        if (this.state.modalShow) {
            switch (modalName) {
                case "createComment":
                    return (
                        <CommentForm
                            {...this.props}
                            finishProject={this.finishProject}
                            loggedInUser={this.props.loggedInUser}
                            closeModal={() => this.handleModal(false)}
                        />
                    )
                case "editProject":
                    return (
                        <EditProject
                            {...this.state}
                            loggedInUser={this.state.loggedInUser}
                            finishProject={this.finishProject}
                            closeModal={() => this.handleModal(false)}
                        />
                    )
                default:
                    return null
            }
        }
    }

    finishProject = () => {
        this.getProjectInfo()
        this.handleModal(false)
    }

    componentDidMount = () => {
        this.checkUserOnProject()
        this.getProjectInfo()
    }

    render() {
        return (
            <Container className="detailsContainer" as="section" >
                <Row className="detailsFirstRow">                  
                <h2>{this.state.title} <br /> {this.state.format}</h2>
                </Row>
                <Row className="detailsSecondRow">

                    <Col className="projectInfo" md={6}>
                        <h4>Género: {this.state.genre}</h4>
                        {this.state.creator && <h4>Creador: <Link to={`/filmmakers/${this.state.creator._id}`}>{this.state.creator.name}</Link></h4>}
                        {this.state.location && <h4>Localización: {this.state.location}</h4>}
                        {this.state.date && <h4>Fecha de rodaje: {this.state.date}</h4>}
                        {this.state.needed && <h4>Necesitamos: {this.state.needed}</h4>}
                        
                        {this.state.creator && this.state.creator._id === this.props.loggedInUser._id && <Button className="editButton" onClick={() => this.handleModal(true, "editProject")}>Editar</Button>}
                        {this.state.creator && this.state.creator._id === this.props.loggedInUser._id && <Button className="redButton" onClick={() => this.handleDelete(this.state._id)} variant="danger" size="md">Borrar</Button>}
                    </Col>

                    <Col md={6}>
                        <img src={this.state.poster} alt={this.state.title}></img>
                    </Col>
                </Row>

                <Row className="detailsThirdRow">
                    <Col >
                        <h4>Detalles</h4>
                        <p>{this.state.description}</p>
                        <div id="myMap">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyC29nPtAOUTrCqRJPRmCYcrd-amYUtPeUU' }}
                                center={this.state.center}
                                defaultZoom={this.props.zoom}>
                                <div
                                    style={{
                                        backgroundImage: `url(${Icon})`,
                                        width: '64px',
                                        height: '64px',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                    lat={this.state.center.lat}
                                    lng={this.state.center.lng}
                                />
                            </GoogleMapReact>
                        </div>
                    </Col>
                </Row>

                <Row className="detailsFourthRow">
                    <Col className="projectDetailButtons">
                        {this.state.creator && this.state.creator._id === this.props.loggedInUser._id || this.state.userOnProject === true ? null : <Button className="projectButton" onClick={() => this.addUserToProject()} variant="dark" size="md">Unirse al proyecto</Button>}
                        <Button className="projectButton" onClick={() => this.handleModal(true, "createComment")}>Escribir comentario</Button>
                        <Button className="projectButton" onClick={this.goBack} >Volver</Button>
                    </Col>
                </Row>

                <Row className="detailsFourthRow">
                    <Col className="usersList" md={4}>
                        {this.state.users && this.state.users.length > 0 ? <h4>{this.state.users.length} Usuarios apuntados</h4> : <h4>Aún no hay colaboradores</h4>}
                        <ul >
                            {this.state.users && this.state.users.map(elm => <li key={elm._id}><h5><Link to={`/filmmakers/${elm._id}`}> {elm.name}</Link> </h5></li>)}
                        </ul>
                    </Col>
                    <Col md={8} >
                        {this.state.comments &&
                            this.state.comments.map((elm) => (
                                <Comment key={elm._id} {...elm} loggedInUser={this.props.loggedInUser} />
                            ))}
                    </Col>
                </Row>
               
                    <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                        {this.displayModal(this.state.modalName)}
                    </Modal>
                
            </Container>
        )
    }
}

export default ProjectDetails