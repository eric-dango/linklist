var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var stylus = require('stylus');

var mongoose = require('mongoose');

var routes = require('./routes.js');
var config = require('./config');

var User = require('./models/userModel');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware({
  src: path.join(__dirname, 'app'),
  dest:  path.join(__dirname, 'app')
}));
app.use(express.static(path.join(__dirname, 'app')));

app.use(expressSession({secret: 'vsi7b1qkdy0'}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// set route
app.use('/api', routes(app, passport).getApiRoutes(express.Router()));
app.use('/', routes(app, passport).getViewRoutes(express.Router()));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use('/api', function(err, req, res, next) {
    console.trace(err.message);

    res.status(err.status || 500).send({
      error: err,
      message: err.message,
      stack: err.stack
    });
  });

  app.use(function(err, req, res, next) {
    console.trace(err.message);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use('/api', function(err, req, res, next) {
  res.status(err.status || 500).send({ 
    error: err,
    message: err.message 
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// mongodb connection
var mongoConn = config[process.env.NODE_ENV || 'development'].db.mongodb;
if(mongoConn) {
  mongoose.connect(mongoConn, function(err) {
    if(err) {
      throw err;
    } else {
      console.log('MongoDb connected!!');
    }
 });
} else {
  throw new Error("Invalid config setting");
}

module.exports = app;
