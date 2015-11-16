'use strict';

angular.module('linklistApp')
  .controller('NavCtrl', function ($scope, $location, Auth) {

  // Register the login() function
  $scope.logout = function(){
    Auth.logout(function(res){
      $location.path('/login');
    }, function(err){
      $scope.message = 'Logout failed.';
    });
  };

});

