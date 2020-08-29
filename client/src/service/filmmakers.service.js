import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getFilmmakers = () => this.service.get('/filmmakers');
    getFilmmaker = filmmakerId => this.service.get(`/filmmakers/${filmmakerId}`)
    addFollower = (id, user) => this.service.post(`/filmmakers/addFollower/${id}`, user)
    addFollowing = (user, id) => this.service.post(`/filmmakers/addFollowing/${user}`, id)
    deleteFollower = (id, user) => this.service.post(`/filmmakers/deleteFollower/${id}`, user)
    deleteFollowing = (user, id) => this.service.post(`/filmmakers/deleteFollowing/${user}`, id)
}