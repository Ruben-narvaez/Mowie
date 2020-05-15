const express = require("express")
const router = express.Router()

const Project = require('./../models/project.model')

router.get('/', (req, res, next) => {
    Project.find()
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/details/:id', (req, res, next) => {
    Project.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Project.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


module.exports = router