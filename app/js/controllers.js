(function() {
  'use strict';

  angular.module('Fit')

  .controller('HomeController', function ($scope, PARSE, $http) {


    $http.get(PARSE.URL + 'classes/entry', PARSE.CONFIG)
      .success( function (res) {
        $scope.data = res.results;
      });


  });



}());
