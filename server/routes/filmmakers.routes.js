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
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router