(function() {
  'use strict';

  angular.module('Fit', ['md.data.table', 'ngMaterial', 'ui.router'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
       'X-Parse-Application-Id' : 'h3WW0SVCjalXilChtmALBDPXsoiDESLqs1RjX6vp',
       'X-Parse-REST-API-Key'  : 'YZggZy5EGS7fSeaLHyV5FGjRsmk9UjQTamk0zBZ5'
      }
    }
  })

  .config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      });



    $urlRouterProvider.otherwise('/');

  })




}());
