var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tngf',
    password: 'sesame',
    database: 'tngf'
});

connection.connect();

var analyticalConnection = mysql.createConnection({
    host: 'localhost',
    user: 'tngf',
    password: 'sesame',
    database: 'tngf-dimensional'
});

module.exports = {
    connection: connection,
    analyticalConnection: analyticalConnection
}