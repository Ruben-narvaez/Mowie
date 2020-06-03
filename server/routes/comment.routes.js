const express = require("express")
const router = express.Router()
const ensureLogin = require('connect-ensure-login')
const Comment = require('./../models/comment.model')

router.post("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Comment.create(req.body)
        .then((data) => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get("/getcommentsbyproject/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Comment.find({ project: req.params.id })
        .populate("creator")
        .then((data) => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/deleteComment/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router