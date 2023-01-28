const express = require('express')
const app = express()
const port = 3000

const index = require('./routes/index.routes')
const users = require('./routes/users.routes')

app.use('/', index)
app.use('/users', users)

// app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})