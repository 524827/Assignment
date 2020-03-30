const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'namdev',
  database: 'db_demo',
});

module.exports = con;