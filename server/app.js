require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Base URLS
app.use('/api', require('./routes/auth.routes'))
app.use('/api/home', require('./routes/home.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/filmmakers', require('./routes/filmmakers.routes'))
app.use('/api/projects', require('./routes/projects.routes'))
app.use('/api/comments', require('./routes/comment.routes'))

//app.use("/api", require("/routes"))
app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

module.exports = app
