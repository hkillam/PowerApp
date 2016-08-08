var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.port || 63342;

var app = express();
app.use(bodyParser());
app.use(express.static('.'));

app.get('/', function (request, response) {
    response.sendfile("index.html");
});


module.exports = app;