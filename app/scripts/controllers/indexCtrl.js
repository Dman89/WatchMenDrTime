'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService) {
  var totalTimeForActivity = 0;
  $scope.enableSprintBoolean = true;
  $scope.recordActivePowerOn = false;
  $scope.totalElapsedTimeInSeconds = 0;
  $scope.goal = {"sprint": {"reality": 0, "goal": "#"}};



  $scope.saveContent = function() {
    if ($scope.recordActivePowerOn == false) {
      var confirmBox = confirm("Save?");
      confirmBox;
      if (confirmBox == true) {
        $scope.saveGoalDataToMongoDB = $scope.goal;
        $scope.goal = {};
      }
    }
    else {
      alert("Stop recording to save.");
    }
  }
  $scope.resetContent = function() {
    if ($scope.recordActivePowerOn == false) {
      var confirmBox = confirm("Reset?");
      confirmBox;
      if (confirmBox == true) {
        $scope.goal = {}; //RESET
        $scope.totalElapsedTimeInSeconds = 0;
        $scope.countDownTimerDisplayNumber = "";
      }
    }
    else {
      alert("Stop recording and reset to continue.");
    }
  }
  $scope.enableSprint = function() {
    if ($scope.recordActivePowerOn == false && $scope.totalElapsedTimeInSeconds == 0) {
      if ($scope.enableSprintBoolean == true) {
          $scope.enableSprintBoolean = false; //Will SHOW
      }
      else {
        var confirmBox = confirm("Stop Sprint Mode?");
        confirmBox;
        if (confirmBox == true) {
          $scope.enableSprintBoolean = true; // Will NOT show
        }
      }
    }
    else if ($scope.recordActivePowerOn == false
    && $scope.enableSprintBoolean == true) {
      var confirmBox = confirm("ATTENTION: Do you want to RESET data to start 'Sprint Mode'? Cannot be undone.");
      confirmBox;
      if (confirmBox == true) {
        $scope.goal = {}; //RESET
        $scope.enableSprintBoolean = false; // Will Show
        $scope.recordActivePowerOn = false; // Not Recording
        $scope.totalElapsedTimeInSeconds = 0;
        $scope.countDownTimerDisplayNumber = "";
        $scope.goal = {}; //RESET
      }
    }
    else if ($scope.totalElapsedTimeInSeconds > 0 && $scope.enableSprintBoolean == false) {
      var confirmBox = confirm("ATTENTION: Do you want to turn off 'Sprint Mode'? Cannot be undone but data will remain.");
      confirmBox;
      if (confirmBox == true) {
        // $scope.enableSprintBoolean = false; // Will NOT show
        $scope.goal += {"sprint": {"reality": 0, "goal": "#"}};
      }

    }
    else {
      alert("Stop recording and reset to continue.");
    }
  }

  $scope.recordOrPauseFunction = function() {
    $scope.recordActivePowerOn = true;
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
      $scope.recordActivePowerOn = false;
      timerService.calculateTime(totalTimeForActivity, function(formatedTotalTimeElapsed, totalTimeInSecondsElapsed) {
        $scope.totalElapsedTimeDisplay = formatedTotalTimeElapsed;
        $scope.totalElapsedTimeInSeconds = totalTimeInSecondsElapsed;
      })
    }
  }
  $scope.$on('$destroy', function() {
    timerService.stop();
    });
});
