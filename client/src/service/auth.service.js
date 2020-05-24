import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    signup = ({ username, password, email, aboutMe, age, name, lastname, team, city, picture }) => this.service.post('/signup', { username, password, email, aboutMe, age, name, lastname, team, city, picture })   
    login = ({ username, password }) => this.service.post('/login', { username, password })
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')
    userProfile = (id) => this.service.get(`/profile/${id}`)
}