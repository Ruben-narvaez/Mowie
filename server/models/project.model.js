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
    needed: String,
    date: String,
    poster: String,
    location: String,  
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project