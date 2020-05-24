const express = require("express")
const router = express.Router()

const Project = require('./../models/project.model')

//Not implemented

router.get('/', (req, res, next) => {
    Project.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router