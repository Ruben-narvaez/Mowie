const express = require("express")
const router = express.Router()

const User = require('./../models/user.model')

router.get('/', (req, res, next) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router