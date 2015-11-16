'use strict';

angular.module('linklistApp')
  .controller('LoginCtrl', function ($scope, $location, Auth) {

  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    Auth.login({
      username: $scope.user.username,
      password: $scope.user.password,
      rememberme: $scope.user.remember
    }, function(res){
      $location.path('/');
    }, function(err){
      $scope.message = 'Authentication failed.';
    });
  };

});


