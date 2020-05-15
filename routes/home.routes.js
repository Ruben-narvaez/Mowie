const express = require("express")
const router = express.Router()

const Project = require('./../models/project.model')

//Para mostrar 3 proyectos de la web

router.get('/', (req, res, next) => {
    Project.find()
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


















module.exports = router