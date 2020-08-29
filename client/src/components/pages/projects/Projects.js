import React, { Component } from 'react'
import Projects from '../../../service/projects.service'
import ProjectCard from './ProjectCard'
import NewProject from './new/NewProject'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import Modal from 'react-bootstrap/Modal'

import './Projects.css'

class ProjectsList extends Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            projects: [],
        }
        this.projectsService = new Projects()
    }

    handleModal = visible => this.setState({ modalShow: visible })
    
    getAllProjects = () => {
        this.projectsService.getProjects()
            .then(response => this.setState({ projects: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAllProjects()
    }

    finishNewProject = () => {
        this.componentDidMount()
        // this.getAllProjects()
        this.handleModal(false)  
    }

    render() {
        return (
            <Container fluid={true} as="section" className="projectsContainer">
                <h2>Proyectos de la comunidad</h2>
                <Button onClick={() => this.handleModal(true)} className="editButton">Crear proyecto</Button>
                <Row className="projectsRow">
                        {this.state.projects.map(elm => <ProjectCard key={elm._id} {...elm} />)}                                      
                </Row>

                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <NewProject loggedInUser={this.state.loggedInUser} finishNewProject={this.finishNewProject} closeModal={() => this.handleModal(false)}/>
                    </Modal.Body>
                </Modal>
            </Container>
        )

    }

}

export default ProjectsList