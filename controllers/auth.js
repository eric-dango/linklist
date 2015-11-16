// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/userModel');

module.exports = {
  login: function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if(err) {
       return next(err); 
      }
      if(!user) { 
        return res.send(401);
      }

      req.logIn(user, function(err) {
        if(err) {
          return next(err);
        }

        if(req.body.rememberme) {
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
        }
        res.json(200, { role: user.role, username: user.username });
      });
    })(req, res, next);
  },

  logout: function(req, res) {
      req.logout();
      res.send(200);
  },

  isLoggedIn: function (req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.send(401);
    }
  }
};

