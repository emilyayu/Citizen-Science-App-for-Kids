const express = require('express')
var bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')

const app = express()

var config = require('./config')

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')

// handlebars setup
app.engine('.hbs', engine({ 
  extname: ".hbs", defaultLayout: "main"}));  
app.set('view engine', 'hbs')

//location of your views folder
app.set('views', __dirname + '/views');


app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Home Page 
app.get('/', (req, res) => {
  res.render('index');
});

// Users Page
app.use('/users', users);

// Projects Page
app.get('/projects', (req, res) => {
  app.use('/projects', projects)
});


app.listen(config.app.port, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${config.app.port}`)
})