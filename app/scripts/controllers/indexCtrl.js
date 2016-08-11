'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService, $interval) {
  timerService.getTime(function(h, m, s) {
    var timerTimeToDisplay = timerService.convertTime(h,m,s);
    timerService.fifteenSprint(timerTimeToDisplay, function(m, s) {
      timerService.playTimer(m,s, function(res) {
        console.log(res);
        $scope.countDownTimerDisplayNumber = res;
      })
    })
  });
});
