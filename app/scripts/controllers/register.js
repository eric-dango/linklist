'use strict';

angular.module('linklistApp')
  .controller('RegisterCtrl', function ($scope, $location, Auth) {
    $scope.register = function() {
      Auth.register({
          username: $scope.username,
          password: $scope.password
      },
      function(res) {
        $location.path('/');
      },
      function(err) {
        $scope.message = err;
      });
    };
});


