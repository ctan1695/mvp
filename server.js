var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var database = require('./db');
var query = '';
var queryArgs = [];
var app = express();
var port = 5500;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log('App is listening on port: ', port);
});

/* Route Handlers */

//Home page
app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/retrieve', (req, res) => {
  res.render('pages/recipeResults');
})

app.get('/submit', (req, res) => {
  res.render('pages/addedRecipe');
})

app.post('/submit', (req, res) => {
  return new Promise((resolve, reject) => {
    console.log('First Promise Reached!');
    resolve('Success!');
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      //Insert user into the database
      query = 'insert into USERS (name) select ? where not exists (select NAME from USERS where NAME = ?);'
      queryArgs = [req.body.user, req.body.user];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        };
      });
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      //Find our user's ID for next insert
      query = 'select ID from USERS where NAME = ?;'
      queryArgs = [req.body.user];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          userID = results[0].ID;
          console.log('userID: ', userID);
          resolve(userID);
        }
      })
    })
  })
  .then((user_id) => {
    return new Promise((resolve, reject) => {
      console.log('user_id: ', user_id);
      //Insert recipe into the database for our user
      query = 'insert into RECIPES (recipe_url, user_id) values (?, ?);'
      queryArgs = [req.body.recipe, user_id];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log('Successfully inserted user and recipe into database');
          resolve(results);
        }
      })
    })
  })
});