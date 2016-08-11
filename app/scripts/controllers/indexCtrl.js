'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService, $interval) {
  timerService.getTime(function(h, m, s) {
    timerService.convertTime(h,m,s, function(res) {
      var timerTimeToDisplay = res;
      timerService.fifteenSprint(timerTimeToDisplay, function(m, s) {
        timerService.playTimer(m,s, function(res) {
          $scope.countDownTimerDisplayNumber = res;
        })
      })
    });
  });
});
