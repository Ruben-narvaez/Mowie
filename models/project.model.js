const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    format: {
        type: [String],
        enum: ['Largometraje', 'Cortometraje', 'Web Serie', 'Publicidad', 'Videoclip', 'Otro formato']
    },
    genre: {
        type: [String],
        enum: ['Documental', 'Acción', 'Drama', 'Comedia', 'Ciencia-ficción', 'Comedia romántica', 'Video-arte', 'Video-ensayo', 'Musical', 'Fantasía', 'Artes Marciales', 'Otros'],
    },
    description: String,
    poster: String,
    location: {
        type: {
        type: String
    },  coordinates: [Number]
    },
    // missing-roles: {
    //     type: [String],
    //     enum: ['Dirección', 'Fotografía', 'Cámara', 'Producción', 'Sonido', 'Guión', 'Arte']
    // },
    creatorID: {type: Schema.Types.ObjectId, ref: 'User'},
    }, {
    timestamps: true
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project