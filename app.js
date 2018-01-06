const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/status', function (req, res) {
    http.get('http://localhost:3001/status', (res) => {
        res.status(200).json(res);
      })
      .catch(err => {
          res.status(500).send('There was a problem with your request.', err);
      });
});

app.listen(3000, () => {
    console.log('Web universal remote application listening on port 3000!');
});
