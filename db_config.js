"user strict";

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "goodreads_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
