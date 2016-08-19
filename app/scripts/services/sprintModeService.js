'use strict';
angular.module("drTimeWatchmen")
.service("sprintModeService", function($http) {
  var totalSprintInterval = 0;
  this.checkForSprintModeDisabled = function(disable, time, max, cb) {
    if (max == totalSprintInterval) {
      //MAX MET
      cb(true)
    }
    // Minutes FIFTEEN MINUTES INTERVALS THAT HAVE PASSED
    var time  = time - (900 * totalSprintInterval);
    if (disable == false) {
      if (time == 900) {
        //FIFTEEN MINUTES HAVE PASSED
        totalSprintInterval += 1;
        cb(totalSprintInterval);
      }
    }
  }
});
