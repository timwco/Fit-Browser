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


  });

}());
