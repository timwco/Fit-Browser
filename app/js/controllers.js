(function() {
  'use strict';

  angular.module('Fit')

  .controller('HomeController', function ($scope, PARSE, $http) {


    $http.get(PARSE.URL + 'classes/entry?include=excercise', PARSE.CONFIG)
      .success( function (res) {
        var data = res.results;

        var excercises = _.uniq(_.map(data, function (d) {
          return d.excercise.name;
        }));

        console.log(excercises);

      });


  });



}());
