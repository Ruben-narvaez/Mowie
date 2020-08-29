const express = require("express")
const router = express.Router()
const ensureLogin = require('connect-ensure-login')
const User = require('./../models/user.model')


router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findById(req.params.id)
        .populate('projects')
        .populate('followers')
        .populate('following')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/addFollower/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user._id } })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/addFollowing/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $push: { following: req.params.id } })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/deleteFollower/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/deleteFollowing/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params.id } })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router