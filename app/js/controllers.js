(function() {
  'use strict';

  angular.module('Fit')

  .controller('HomeController', function ($scope, PARSE, $http) {


    $http.get(PARSE.URL + 'classes/entry?include=excercise', PARSE.CONFIG)
      .success( function (res) {

        // Store our Data
        var entries = res.results;

        // Pluck out all of the Excercise Names
        var excercises = _.uniq(_.map(entries, function (d) {
          return d.excercise.name;
        }));

        // Filter our items to group together similiar excercises
        var filteredEntries = _.map(excercises, function (exName) {
          return _.filter(entries, function (obj) {
            return obj.excercise.name === exName;
          });
        });

        // Create an array of our sorted entires by name
        // Bind to $scope
        $scope.sortedEntries = _.sortBy(filteredEntries, function (e) {
          return e[0].excercise.order;
        });

      });


  });



}());
