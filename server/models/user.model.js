const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        // required: true,
        // unique: true
    },
    username: {
        type: String,
        // required: true,
        // unique: true
    },
    city: {
        type: String,
        // required: true,
        // unique: true
    },
    aboutMe: {
        type: String,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
        // unique: true,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    picture: {
        type: String,
        // required: true
    },
    age: Number,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    team: {
        type: String,
        // required: true,
        enum: ['Dirección', 'Fotografía', 'Cámara', 'Producción', 'Sonido', 'Guión', 'Arte']
    },

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema) 
module.exports = User