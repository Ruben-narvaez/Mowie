const express = require("express")
const router = express.Router()
const ensureLogin = require('connect-ensure-login')
const Project = require('./../models/project.model')
const User = require('./../models/user.model')

router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.find()
        // .populate('creator')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {

    const {title, format, genre, needed, location, date, poster, description, users} = req.body
    
    Project.create({
        title,
        format,
        genre,
        needed,
        location,
        date,
        poster,
        description,
        creator: req.user,
        users
    })
    .then((projectCreated) => User.findByIdAndUpdate(req.user._id, { $push: { projects: projectCreated._id } }))
    .then(data => res.json(data))
    .catch(err => next(new Error(err)))
})

router.get('/details/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.findById(req.params.id)
        .populate('creator')
        .populate('users')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/deleteProject/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/editProject/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


router.post('/addUser/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, { $push: { users: req.user._id } })    
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/removeUser/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, { $pull: { users: req.user._id } })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router