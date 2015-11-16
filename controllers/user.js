// Load required packages
var User = require('../models/userModel');
var passport = require('passport');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });


  User.register(new User(
    {
      username : req.body.username 
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.json({
          err: err,
          user : user
        });
      }

      passport.authenticate('local')(req, res, function () {
        res.json(200, { role: user.role, username: user.username });
      });
    }
  );
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.status(200).json(users);
  });
};