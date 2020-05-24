const express = require("express")
const router = express.Router()
const User = require("../models/user.model")
const ensureLogin = require('connect-ensure-login')

router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {

    User.findById(req.params.id)
        .populate('projects')       
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router