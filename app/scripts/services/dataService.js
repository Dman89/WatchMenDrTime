'use strict';
angular.module("drTimeWatchmen")
.service("dataService", function($http) {
  this.getUser = function(callback) {
    $http.get("/api/profile")
      .then(callback)
  };
});
