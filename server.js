var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
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
  console.log('req: ', req.body);
  res.redirect('/submit');
})