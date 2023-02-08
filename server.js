const express = require('express')
var bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')

const app = express()

var config = require('./config')

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')
const projects = require('./routes/projects.routes')


var exphbs = require('express-handlebars'); // Import express-handlebars
// app.engine('.hbs', engine({extname: ".hbs"})); // Create an instance of the handlebars engine to process templates

app.engine('.hbs', engine({ 
  extname: ".hbs", defaultLayout: "main"}));  
app.set('view engine', 'hbs')
// app.set('views', './views');


app.use(express.static(path.join(__dirname + '/public')));


// Home Page 
app.get('/', (req, res) => {
  res.render('index');
});

// Users Page
app.get('/users', (req, res) => {
  res.render('users');
});

// Projects Page
// app.use('/projects', projects)
app.get('/projects', (req, res) => {
  res.render('projects');
});


// app.use(express.static(__dirname + '/public'));

app.listen(config.app.port, () => {
  console.log(`Launching ${config.app.name}. Server listening on port ${config.app.port}`)
})