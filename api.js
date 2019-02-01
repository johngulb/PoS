const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send("A point of sale rest api");
});

module.exports = app;
