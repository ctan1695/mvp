const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client'));

 app.get('/', (req, res) => {
  // res.sendFile('index.html');
 })

app.get('/retrieve', (req, res) => {
  console.log('Server received GET retrieve request from client');
})

app.listen(port, () => {
  console.log(`App is listening on port: ${port} `);
})