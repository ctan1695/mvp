var promise = require('promise-mysql');
var mysql = require('mysql');

// console.log('promise: ', promise)

const dbConnection = promise.createConnection({
  user: 'root',
  password: '',
  database: 'vault'
})
  .catch((err) => {
    console.log('err connecting to db: ', err);
  })

module.exports = dbConnection;