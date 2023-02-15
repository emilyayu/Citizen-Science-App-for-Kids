const express = require('express')
const exphbs = require('express-handlebars');
const path = require('path')

const app = express()

var config = require('./config')
require('dotenv').config();


const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')
const projectEntries= require('./routes/project-entries.routes')

// handlebars setup
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', 'hbs')

//location of your views folder
app.set('views', __dirname + '/views');


// express.static(path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static('public'));


// Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home Page 
app.get('/', (req, res) => {
  res.render('index');
});

// Users Page
app.use('/users', users)

// Projects Page
app.use('/projects', projects)
app.use('/project-entries', projectEntries)


const PORT = process.env.PORT || 8080;
app.listen(config.app.port, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${config.app.port}`)
})