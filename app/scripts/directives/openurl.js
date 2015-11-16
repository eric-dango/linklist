'use strict';

angular.module('linklistApp')
  .directive('openurl', function () {
    return {
      template: function(elem, attrs) {
        if(attrs.remove) {
          return '<a ng-click="remove(site)"></a>'
        } else {
          return '<a></a>';
        }
      },
      restrict: 'AE',
      replace: true,
      scope: {
        site: '=site',
        remove: '&'
      },
      link: function postLink(scope, element, attrs) {
        if (attrs.open && attrs.remove) {
          element.attr('href', 'http://' + scope.site.url);
          element.attr('target', '_BLANK');
          element.text('Open and Remove');
        } else if (attrs.open) {
          element.attr('href', 'http://' + scope.site.url);
          element.attr('target', '_BLANK');
          element.text('Open');
        } else if (attrs.remove) {
          element.text('Remove');
        }
      }
    };
  });
