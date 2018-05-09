var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tngf',
    password: 'sesame',
    database: 'tngf'
});

connection.connect();

module.exports = {
    connection: connection
}