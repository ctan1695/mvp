var express = require('express');
var app = express();
var port = 5500;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port);

/* Route Handlers */

//Home page
app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/retrieve', (req, res) => {
  console.log('req: ', req);
  res.render('pages/recipeResults.ejs');
})