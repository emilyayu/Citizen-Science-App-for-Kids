const express = require('express')
const app = express()

var config = require('./config')

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')

app.use('/', index)
app.use('/users', users)
app.use('/projects', projects)

// app.use(express.static(__dirname + '/public'));

app.listen(config.app.port, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${config.app.port}`)
})