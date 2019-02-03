const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Inventory = require('./inventory');
const Order = require('./order');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("A point of sale rest api");
});

app.post('/scan', function (req, res) {
  Order.add(req.body.upc, 1, req.body.weight);
  res.send({total: Order.total(), order: Order.items});
});

app.delete('/scan', function (req, res) {
  Order.remove(req.body.upc, 1, req.body.weight);
  res.send({total: Order.total(), order: Order.items});
});

app.post('/inventory', function (req, res) {
  Inventory.add(req.body);
  res.send({success: true, inventory: Inventory.items});
});

app.delete('/inventory', function (req, res) {
  Inventory.remove(req.body.upc);
  res.send({success: true, inventory: Inventory.items});
});

module.exports = app;
