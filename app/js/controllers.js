(function() {
  'use strict';

  angular.module('Fit')

  .controller('HomeController', function ($scope, PARSE, $http, DateService) {

    $scope.sortedEntries = null;
    $scope.dates = DateService.allDates();

    $scope.queryDate = function (date) {

      var begin = date,
          end = moment(begin).add(1, 'days').format(),
          dateQuery;

      // Build Query
      dateQuery = '&where={"createdAt":{"$gt":{"__type":"Date", "iso":"' + begin + '"}';
      dateQuery += ', "$lt":{"__type":"Date", "iso":"' + end + '"}}}';

      $http({
        method: 'GET',
        url: PARSE.URL + 'classes/entry?include=excercise' + dateQuery,
        headers: PARSE.CONFIG.headers,
        cache: true
      }).success( function (res) {

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
    };



  });



}());
