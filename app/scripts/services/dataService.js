'use strict';
angular.module("drTimeWatchmen")
.service("dataService", function($http) {
  this.getUser = function(callback) {
    $http.get("/api/profile")
      .then(callback)
  };
  this.saveUser = function(user, callback) {
    $http.put('/api/profile', user)
      .then(callback)
  };
});
