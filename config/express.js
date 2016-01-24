var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
require('dotenv').load();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var config = require('./config');
var routes = require('../app/routes/');
var db = require('./db');
var path = require('path');


routes(router);

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(session({
  saveUninitialized: false,
  secret: 'rosco',
  resave: false
}));

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../public')); 

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Access-Control-Allow-Headers, x-access-token, x_access_admin, Authorization, X-Requested-With");
  res.header('Access-Control-Allow-Methods', "POST, PUT, DELETE, GET");
  next();
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname +'../public/index.html')); 
});

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cookieParser());

app.use('/api', router);

module.exports = app;
