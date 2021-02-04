var mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'vault'
});

dbConnection.connect();

module.exports = dbConnection;