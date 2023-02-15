const express = require('express')
var bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')

const app = express()

var config = require('./config')

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')
const projectEntries= require('./routes/project-entries.routes')

// handlebars setup
app.engine('.hbs', engine({ 
  extname: ".hbs", defaultLayout: "main"}));  
app.set('view engine', 'hbs')


app.use(express.static(path.join(__dirname + '/public')));


// Home Page 
app.get('/', (req, res) => {
  res.render('index');
});

// Users Page
app.use('/users', users)
app.use('/projects', projects)
app.use('/project-entries', projectEntries)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${PORT}`)
})