//Sources
//https://github.com/mysqljs/mysql

var config = require('./config')
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : config.db.host,
  user            : config.db.user,
  password        : config.db.password,
  database        : config.db.name
});

module.exports = pool