'use strict';

angular.module('linklistApp')
  .factory('ListRest', ['$http', function ($http) {
    // Public API here
    return {
      queryAll: function () {
        return $http({
          method: 'GET', 
          url: '/api/list'
        });
      },
      queryShort: function () {
        return $http({
          method: 'GET', 
          url: '/api/list'
        });
      },
      create: function (form) {
        return $http({
          method: 'POST',
          data: form,
          url: '/api/list'
        });
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          data: id,
          url: '/api/list/' + id
        });
      },
      update: function () {
        return $http({
          method: 'PUT',
          data: form,
          url: '/api/list/' + id
        }); 
      }
    };
  }]);
