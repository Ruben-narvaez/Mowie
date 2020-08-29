import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Home from './pages/home/Home'
import Navigation from './ui/navbar/Navbar'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Filmmakers from './pages/filmmakers/Filmmakers'
import FilmmakersDetails from './pages/filmmakers/details/FilmmakersDetails'
import Profile from './pages/profile/Profile'
import Projects from './pages/projects/Projects'
import NewProject from './pages/projects/new/NewProject'
import EditProject from './pages/projects/edit/EditProject'
import ProjectsDetails from './pages/projects/details/ProjectDetails'

import AuthService from '../service/auth.service'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      dataFromFilmmakers: null
    }
    this.authService = new AuthService()
  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => this.state)

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authService.isLoggedIn()
        .then(response => this.setTheUser(response.data))
        .catch(() => this.setTheUser(false))
    }
  }

  getFilmmakersData = (data) => {

    this.setState({ dataFromFilmmakers: data });
  }

  componentDidMount() {
    this.getFilmmakersData()
  }

  render() {

    this.fetchUser()
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <main className="viewPort">

          <Switch>
            <Route path="/" exact render={() => <Home loggedInUser={this.state.loggedInUser}/>} />
            <Route path="/filmmakers" exact render={() => this.state.loggedInUser ? <Filmmakers filmmakersData={this.getFilmmakersData} loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" /> } />
            <Route path="/projects" exact render={() => this.state.loggedInUser ? <Projects loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/projects/details/:id" exact render={props => this.state.loggedInUser ? <ProjectsDetails loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to="/" />} />
            <Route path="/projects/details/:id/edit" render={() => this.state.loggedInUser ? <EditProject user={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/projects/new" render={() => this.state.loggedInUser ? <NewProject loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/filmmakers/:id" render={props => this.state.loggedInUser ? <FilmmakersDetails loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to="/" />} />
            <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
          </Switch>

        </main>

        <div className="homeFooter">
          <p>Made by Rub</p>
        </div>

      </>
    )
  }
}

export default App
