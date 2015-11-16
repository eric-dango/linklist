'use strict';

angular.module('linklistApp')
  .factory('Auth', function ($rootScope, $http, $cookies) {
    var currentUser = $cookies.get('user') || { username: '', role: -1 };
    $cookies.remove('user');

    function changeUser(user) {
      angular.extend(currentUser, user);
      $rootScope.currentUser = currentUser;
    };

    return {
      isLoggedIn: function(success, error) {
        $http.get('/api/loggedin').success(function(res) {
            success();
        }).error(error);
      },
      register: function(user, success, error) {
          $http.post('/api/users', user).success(function(user) {
              changeUser(user);
              success(user);
          }).error(error);
      },
      login: function(user, success, error) {
          $http.post('/api/login', user).success(function(user){
              changeUser(user);
              success(user);
          }).error(error);
      },
      logout: function(success, error) {
          $http.post('/api/logout').success(function(){
              changeUser({
                  username: '',
                  role: -1
              });
              $rootScope.currentUser = null;
              success();
          }).error(error);
      },
      user: currentUser
    };

  });
