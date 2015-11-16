var linkList = require('./controllers/linkList.js');
var user     = require('./controllers/user.js');
var respond  = require('./lib/respond.js');
var auth     = require('./controllers/auth');
var index    = require('./controllers/index');

var ctrls = {
  index: index,
  user: user,
  auth: auth,
  linkList: linkList
}

module.exports = function (app, passport) {
  return {
    getApiRoutes: function (route) {
      route.get('/', ctrls.index);

      route.post('/users', ctrls.user.postUsers);
      route.get('/users', ctrls.auth.isLoggedIn, ctrls.user.getUsers);
      route.get('/loggedin', ctrls.auth.isLoggedIn, function (req, res) {
        return res.send(200);
      });

      route.post('/login', ctrls.auth.login);
      route.post('/logout', ctrls.auth.logout);

      route.get('/list', ctrls.linkList.index);
      route.get('/list/:list_id', ctrls.auth.isLoggedIn, ctrls.linkList.show);
      route.post('/list', ctrls.auth.isLoggedIn, ctrls.linkList.create);
      route.put('/list/:list_id', ctrls.auth.isLoggedIn, ctrls.linkList.update);
      route.delete('/list/:list_id', ctrls.auth.isLoggedIn, ctrls.linkList.delete);

      return route;
    },
    getViewRoutes: function (route) {
      // default view
      route.get('/', function(req, res) {
        res.render('index', { title: 'List for your links'});
      });

      return route;
    },
    getPartialRoutes: function (route) {
      // get partial view
      route.get('*', function (req, res) {
        var requestedView = path.join('./', req.url);
        res.render(requestedView);
      })
    }
  }
}