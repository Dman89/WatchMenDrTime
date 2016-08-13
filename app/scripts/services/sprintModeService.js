'use strict';
angular.module("drTimeWatchmen")
.service("sprintModeService", function($http) {
  var totalSprintInterval = 0;
  this.checkForSprintModeDisabled = function(disable, time, max, cb) {
    if (max == totalSprintInterval) {
      //Enabled
      console.log("Max");
      cb(true)
    }
    var time  = time - (900 * totalSprintInterval);
    if (disable == false) {
      console.log(time);
      if (time == 900) {
        console.log(time + ", " + totalSprintInterval + ", " + max + ", " + disable);
        totalSprintInterval += 1;
        cb(totalSprintInterval);
      }
    }
  cb()

  }
});
