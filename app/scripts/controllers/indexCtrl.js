'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService) {
  var totalTimeForActivity = 0;




  $scope.goal = {"sprint": {"reality": 0, "goal": "#"}};
  $scope.saveContent = function() {

  }
  $scope.resetContent = function() {

  }
  $scope.enableSprint = function() {

  }

  $scope.recordOrPauseFunction = function() {
    if ($scope.recordOrPause) {
      timerService.getTime(function(h, m, s) {
        timerService.convertTime(h,m,s, function(res) {
          var timerTimeToDisplay = res;
          timerService.fifteenSprint(timerTimeToDisplay, function(m, s) {
            timerService.playTimer(m,s, function(res) {
              $scope.countDownTimerDisplayNumber = res;
              totalTimeForActivity += 1;
            })
          })
        });
      });

    }
    else {
      timerService.stop()
      timerService.calculateTime(totalTimeForActivity, function(formatedTotalTimeElapsed, totalTimeInSecondsElapsed) {
        $scope.totalElapsedTimeDisplay = formatedTotalTimeElapsed;
        $scope.totalElapsedTimeInSeconds = totalTimeInSecondsElapsed;
        console.log($scope.goal);
      })
    }
  }
  $scope.$on('$destroy', function() {
    timerService.stop();
    });
});
