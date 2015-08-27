(function() {
  'use strict';

  angular.module('Fit')

  .service('DateService', function () {

    this.allDates = function () {
      var start = new Date("August 24,2015");
      var end = new Date("December 24,2015");
      var list = [];

      while(start < end) {
          list.push({
            pretty: moment(start).format('MMMM Do YYYY'),
            iso: moment(start).format()
          });
          start = new Date(start.setDate(
              start.getDate() + 1
          ))
      }

      return list;
    };

  })

  .service('UserService', function ($cookies, PARSE, $http, $state) {

    this.checkStatus = function () {
      var token = $cookies.get('session-token');
      if(token) {
        PARSE.CONFIG.headers['X-Parse-Session-Token'] = token;
        $state.go('home');
      } else {
        $state.go('login');
      }
    };

    this.login = function (user) {

      var self = this;

      $http({
        method: 'GET',
        url: PARSE.URL + 'login',
        headers: PARSE.CONFIG.headers,
        params: user
      }).success( function (data) {
        console.log(data);
        $cookies.put('session-token', data.sessionToken);
        self.checkStatus();
      });

    };

    this.logout = function () {
      PARSE.CONFIG.headers['X-Parse-Session-Token'] = null;
      $cookies.remove('session-token');
      $state.go('login');
    };


  });

}());
