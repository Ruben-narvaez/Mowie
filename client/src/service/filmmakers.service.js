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
}