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
        let key = process.env.REACT_APP_GOOGLE_KEY
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

    removeUserFromProject() {
        this.projectsService.removeUser(this.props.match.params.id)
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
        // this.componentDidMount()
        this.getProjectInfo()
        this.handleModal(false)
    }

    componentDidMount = () => {
        this.checkUserOnProject()
        this.getProjectInfo()
    }

    render() {
        if (this.state) {
            const { location, date, needed, creator, genre, _id, poster, title, description, users, comments} = this.state
            return (
                <Container className="detailsContainer" as="section">
                    <div className="titleDetails">
                        <h2>{this.state.title}</h2><h3>{this.state.format}</h3>
                    </div>
                    <Row className="detailsRow">
                        <Col className="centerCol" lg="3">
                            <article className="usersDiv">
                                <div><h4>{(users && users.length > 0) ? <h4>{users.length} Usuarios apuntados</h4> : <h4>Aún no hay colaboradores</h4>}</h4></div>
                                                               
                                <div className="justMargin">
                                    {users && users.map(elm => <Link key={elm.id}to={`/filmmakers/${elm._id}`}><img src={elm.picture} alt="users apuntados" /></Link>)}
                                </div>   
                                
                                <div>
                                    {(creator._id === this.props.loggedInUser._id) ? null : this.state.userOnProject === true ? <Button className="redButton" onClick={() => this.removeUserFromProject()}>Salir</Button> : <Button className="editButton" onClick={() => this.addUserToProject()}>Unirse al proyecto</Button>}
                                </div>

                            </article>
                            {creator.name === undefined ? <article className="profileDiv"><h5>No hay creador, es un proyecto de testeo</h5></article> :
                                <Link to={`/filmmakers/${creator._id}`}>
                                    <article className="profileDiv">
                                        <h4>Creador</h4>
                                        <img src={creator.picture} alt="Foto perfil creador" />
                                        <h5>{creator.name} {creator.lastname}</h5>
                                        <h5>Especialista en {creator.team}</h5>
                                        <q>{creator.aboutMe}</q>
                                    </article>
                                </Link>}
                            {(creator._id === this.props.loggedInUser._id) && <Button className="redButton" onClick={() => this.handleDelete(_id)} variant="danger" size="md">Borrar proyecto</Button>}
                            <Button className="editButton" onClick={this.goBack} >Volver</Button>
                        </Col>
                        <Col className="" lg="9">
                            <article className="descriptionDiv">
                                <div className="descriptionWithImg">
                                    <div>
                                        <h4>{genre}</h4>
                                        {<h4>Fecha de rodaje: {date}</h4>}
                                        {<h4>Necesitamos: {needed}</h4>}
                                        {<h4>Localización: {location}</h4>}
                                    </div>
                                    <div>
                                        <img src={poster} alt={title}></img>
                                    </div>
                                </div>
                                <div className="centerCol">
                                    <p>{description}</p>
                                    {(creator._id === this.props.loggedInUser._id) && <Button className="editButton" onClick={() => this.handleModal(true, "editProject")}>Editar</Button>}
                                </div>
                            </article>
                            <article id="myMap" className="mapDiv">
                                <h4>Localización</h4>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyC29nPtAOUTrCqRJPRmCYcrd-amYUtPeUU' }}
                                    center={this.state.center}
                                    defaultZoom={13}>
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
                            </article>
                            <article className="commentsDiv">
                                <h4>Comentarios</h4>
                                {comments.map((elm) => (
                                     <Comment key={elm._id} {...elm} history={this.props.history} componentDidMount={this.componentDidMount} loggedInUser={this.props.loggedInUser} />
                                 ))}
                                <Button className="editButton" onClick={() => this.handleModal(true, "createComment")}>Escribir comentario</Button>
                            </article>
                        
                        </Col>
                    </Row>
                    <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                             {this.displayModal(this.state.modalName)}
                    </Modal>
                </Container>
            )
                // <Container className="detailsContainer" as="section" >
                //     <Row className="detailsFirstRow">                  
                //     <h2>{this.state.title} <br /> {this.state.format}</h2>
                //     </Row>
                //     <Row className="detailsSecondRow">
    
                //         <Col className="projectInfo" md={6}>
                //             <h4>Género: {genre}</h4>
                //             {<Link to={`/filmmakers/${creator._id}`}>{creator.name} </Link>}
                //             {<h4>Localización: {location}</h4>}
                //             {<h4>Fecha de rodaje: {date}</h4>}
                //             {<h4>Necesitamos: {needed}</h4>}
                            
                //             {(creator._id === this.props.loggedInUser._id) && <Button className="editButton" onClick={() => this.handleModal(true, "editProject")}>Editar</Button>}
                //             {(creator._id === this.props.loggedInUser._id) && <Button className="redButton" onClick={() => this.handleDelete(_id)} variant="danger" size="md">Borrar</Button>}
                //         </Col>
    
                //         <Col md={6}>
                //             <img src={poster} alt={title}></img>
                //         </Col>
                //     </Row>
    
                //     <Row className="detailsThirdRow">
                //         <Col >
                //             <h4>Detalles</h4>
                //             <p>{description}</p>
                //             <div id="myMap">
                //                 <GoogleMapReact
                //                     bootstrapURLKeys={{ key: 'AIzaSyC29nPtAOUTrCqRJPRmCYcrd-amYUtPeUU' }}
                //                     center={this.state.center}
                //                     defaultZoom={16}>
                //                     <div
                //                         style={{
                //                             backgroundImage: `url(${Icon})`,
                //                             width: '64px',
                //                             height: '64px',
                //                             backgroundRepeat: 'no-repeat',
                //                         }}
                //                         lat={this.state.center.lat}
                //                         lng={this.state.center.lng}
                //                     />
                //                 </GoogleMapReact>
                //             </div>
                //         </Col>
                //     </Row>
    
                //     <Row className="detailsFourthRow">
                //         <Col className="projectDetailButtons">
                            
                //             {creator._id === this.props.loggedInUser._id || this.state.userOnProject === true ? <Button className="projectButton" onClick={() => this.removeUserFromProject()} variant="dark" size="md">Salir del proyecto</Button> : <Button className="projectButton" onClick={() => this.addUserToProject()} variant="dark" size="md">Unirse al proyecto</Button>}
                //             <Button className="projectButton" onClick={() => this.handleModal(true, "createComment")}>Escribir comentario</Button>
                //             <Button className="projectButton" onClick={this.goBack} >Volver</Button>
                //         </Col>
                //     </Row>
    
                //     <Row className="detailsFourthRow">
                //         <Col className="usersList" md={4}>
                //             {(users && users.length > 0)? <h4>{users.length} Usuarios apuntados</h4> : <h4>Aún no hay colaboradores</h4>}
                //             <ul >
                //                 {users && users.map(elm => <li key={elm._id}><h5><Link to={`/filmmakers/${elm._id}`}> {elm.name}</Link> </h5></li>)}
                //             </ul>
                //         </Col>
                //         <Col md={8} >
                //             {comments.map((elm) => (
                //                     <Comment key={elm._id} {...elm} history={this.props.history} componentDidMount={this.componentDidMount} loggedInUser={this.props.loggedInUser} />
                //                 ))}
                //         </Col>
                //     </Row>
                   
                //         
                    
                // </Container>
            
        }
        else {
            return <p>Cargando...</p>
        }
    }
} 

export default ProjectDetails