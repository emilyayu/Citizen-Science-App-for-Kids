//Sources
//https://github.com/mysqljs/mysql


var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'secret',
  database        : 'my_db'
});


//WHERE DO WE NEED TO ADD THIS?
// pool.end(function (err) {
//     // all connections in the pool have ended
//   });

module.exports = pool