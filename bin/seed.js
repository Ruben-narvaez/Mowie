require('dotenv').config()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Project = require('../models/project.model')
const dbName = 'Plugged-In'

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

const users = [
    {
        name: 'Ruben',
        lastname: 'Narr',
        username: 'Rubnarr',
        email: 'r@r.com',
        password: bcrypt.hashSync('ruben', salt),
        picture: 'no-pic',
        age: 30,
        team: 'Sonido'
    },
    {
        name: 'Tipo',
        lastname: 'Man',
        username: 'Tipoman',
        email: 't@t.com',
        password: bcrypt.hashSync('tipoman', salt),
        picture: 'no-pic',
        age: 48,
        team: 'Cámara'
    },
    {
        name: 'Kike',
        lastname: 'Mont',
        username: 'Kike',
        email: 'k@k.com',
        password: bcrypt.hashSync('kike', salt),
        picture: 'no-pic',
        age: 30,
        team: 'Producción'
    },
    {
        name: 'John',
        lastname: 'Marr',
        username: 'Johnny',
        email: 'j@j.com',
        password: bcrypt.hashSync('john', salt),
        picture: 'no-pic',
        age: 50,
        team: 'Arte'
    },
    {
        name: 'Anton',
        lastname: 'Helsing',
        username: 'Antuan',
        email: 'a@a.com',
        password: bcrypt.hashSync('anton', salt),
        picture: 'no-pic',
        age: 30,
        team: 'Dirección'
    },
    {
        name: 'Fran',
        lastname: 'Naranjo',
        username: 'Fran',
        email: 'f@f.com',
        password: bcrypt.hashSync('fran', salt),
        picture: 'no-pic',
        age: 19,
        team: 'Dirección'
    }
]

User.create(users)
    .then(allUsers => {
        console.log(`${allUsers} created`)
    })
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))


const projects = [
    {
        title: 'Las dunas de Marruecos',
        format: 'Largometraje',
        genre: 'Documental',
        description: 'Viaje a través de las dunas y las gentes del sur de Marruecos',
        poster: '',
        location: {
            type: 'Point',
            coordinates: [40.409881, -3.701069]
        },
    },
    {
        title: 'Kárate a muerte en Algete',
        format: 'Web Serie',
        genre: 'Artes Marciales',
        description: 'Web serie que narra las aventuras de Esteban Saigón',
        poster: '',
        location: {
            type: 'Point',
            coordinates: [40.401081, -3.701069]
        },
    },
    {
        title: 'Buenamente',
        format: 'Videoclip',
        genre: 'Otros',
        description: 'Videoclip para la Rosalía, se especifica en el guión',
        poster: '',
        location: {
            type: 'Point',
            coordinates: [50.409881, -3.701069]
        },
    },
    {
        title: 'Ayer, hoy y mañana',
        format: 'Cortometraje',
        genre: 'Drama',
        description: 'Una familia se ve obligada a quedarse en cuarentena, saldrán a flote todas sus emociones e inquietudes',
        poster: '',
        location: {
            type: 'Point',
            coordinates: [40.509881, -3.701069]
        },
    }
]

Project.create(projects)
    .then(allProjects => {
        console.log(`${allProjects} created`)
    })
    .catch(error => console.log(`Ha ocurrido un error: ${err}`))