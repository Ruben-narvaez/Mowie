import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    addComment = comment => this.service.post('/comments/new', comment)
    getCommentsbyProject = (id) => this.service.get(`/comments/getcommentsbyproject/${id}`)
    deleteComment = id => this.service.get(`/comments/deleteComment/${id}`)
}