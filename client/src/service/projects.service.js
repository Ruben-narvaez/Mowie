import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getProjects = () => this.service.get('/projects');
    getProject = projectId => this.service.get(`/projects/details/${projectId}`)
    saveProject = theProject => this.service.post('/projects/new', theProject)
    deleteProject = id => this.service.get(`/projects/deleteProject/${id}`)
    editProject = (id, project) => this.service.post(`/projects/editProject/${id}`, project)
    addUser = (id, project) => this.service.post(`/projects/addUser/${id}`, project)
    removeUser = (id, project) => this.service.post(`/projects/removeUser/${id}`, project)  
        
} 