'use strict';

angular.module('linklistApp')
  .controller('MainCtrl', function ($scope, ListRest) {
    
    ListRest.queryShort().then(function (response) {
      $scope.linklist = response.data;
    }, function(response) {
      console.warn('Error');
    });

    $scope.addLink = function() {
      var newLink = $scope.linkListForm;
      ListRest.create(newLink).then(function (response){
        newLink.date = new Date();
        newLink._id = response.data.site._id;
        $scope.linklist.push(newLink);
        $scope.linkListForm = null;
      }, function (response) {
        console.warn('Error in creating link');
      });
    }

    $scope.deleteLinkList = function(site) {
      ListRest.delete(site._id).then(function (response) {
        var arr = $scope.linklist;
        arr.splice(arr.indexOf(site),1);
        $scope.linklist = arr;
      }, function (response) {
        console.warn('Error in deleting link');
      });
    }
    $scope.loggedIn = true;
});


