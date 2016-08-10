'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService) {
  timerService.getTime(function(res) {
    $scope.countDownTimerDisplayNumber = res;
  });
});
