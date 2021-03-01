var mysql = require("mysql");
var parseUrl = require("../misc/parseUrl");

var host;
var username;
var password;
var database;
var prod  = process.env.CLEARDB_DATABASE_URL;

if (prod) {
  //prod
  var url = parseUrl(prod);
  host = url.host;
  username = url.username;
  password = url.password;
  database = url.database;
} else {
  //dev
  host = process.env.HOST;
  username = process.env.USER;
  password = process.env.PASSWORD;
  database = process.env.DB;
}

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: host,
  //port: "3306",
  user: username,
  password: password,
  database: database
});

module.exports = pool;