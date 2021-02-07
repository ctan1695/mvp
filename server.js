var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var database = require('./db');
var query = '';
var queryArgs = [];
var app = express();
var port = 5500;

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log('App is listening on port: ', port);
});

/* Route Handlers */

app.get('/retrieve', (req, res) => {

  return new Promise((resolve, reject) => {
    resolve('Success - GET');
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      query = 'select ID from USERS where NAME = ?;';
      queryArgs = [req.query.user];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          console.log('err: ', err);
          reject(err);
        } else {
          if (results[0] && results[0].ID) {
            userID = results[0].ID;
          } else {
            userID = '';
          }

          resolve(userID);
        }
      })
    })
  })
  .catch((error) => {
    console.log('Error during GET request: ', error);
  })
  .then((user_id) => {
    return new Promise((resolve, reject) => {
      query = 'select RECIPE_NAME, RECIPE_URL from recipes where USER_ID = ?;';
      queryArgs = [user_id];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  })
  .then((results) => {
    var resultHeading = '';
    var username = req.query.user;
    var recipes = [];

    for (var i = 0; i < results.length; i++) {
      var singleRecipe = {};
      singleRecipe.recipe_name = results[i].RECIPE_NAME;
      singleRecipe.recipe_url = results[i].RECIPE_URL;
      recipes.push(singleRecipe);
    }
    if (username === '' || recipes.length === 0) {
      resultHeading = 'No recipes found for this user!';
    } else {
      resultHeading = 'Here are the recipes for ' + username + ': ';
    }
    // res.render('pages/recipeResults', {resultHeading, recipes})
    res.send(results);
  })
})

app.post('/submit', (req, res) => {
  return new Promise((resolve, reject) => {
    resolve('Success - POST');
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
          resolve(userID);
        }
      })
    })
  })
  .then((user_id) => {
    return new Promise((resolve, reject) => {
      query = 'insert into RECIPES (recipe_name, recipe_url, user_id) values (?, ?, ?);'
      queryArgs = [req.body.recipe_name, req.body.recipe, user_id];

      database.query(query, queryArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  })
  .then(() => {
    res.render('pages/addedRecipe');
  })
});