const express = require('express')
const exphbs = require('express-handlebars');
const path = require('path')
const app = express()

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')
const projectEntries= require('./routes/project-entries.routes')
// const login = require('./routes/login.routes')

const { auth } = require('express-openid-connect')

login = express.Router()
var config = require('./config')
require('dotenv').config();
app.use(auth(config.auth));

// handlebars setup
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', 'hbs')
//location of your views folder
app.set('views', __dirname + '/views');

//bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// express.static(path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname + '/public')));

// Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/login', login)

// Home Page 
app.get('/', (req, res) => {
  logged_in = req.oidc.isAuthenticated() ? true : false
  app.locals.user = req.oidc.user
  console.log(req.oidc.user)
  res.render('index', {
    userProfile: app.locals.user
  });
});


// Users Page
app.use('/users', users)

// Projects Page
app.use('/projects', projects)

// ProjectEntries Page
app.use('/project-entries', projectEntries)


app.use(function (req, res, next) {
  app.locals.user = req.oidc.user;
  // const userProfile = req.oidc.user
  next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${PORT}`)
})