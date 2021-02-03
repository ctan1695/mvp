var express = require('express');
var app = express();
var port = 5500;

app.use(express.static('public'));
app.listen(port);