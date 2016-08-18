'use strict';
angular.module("drTimeWatchmen")
.controller("indexCtrl", function($scope, timerService, sprintModeService, dataService, googleCalendarBoilerPlateService, $timeout) {
                                                          //Get User
                                                          dataService.getUser(function(response) {
                                                            $scope.user = response.data.user;
                                                          });



                        // Functions
                        var clearGoalVariables = function() {
                          $scope.goal = {"title": "", "task" : "", "goal":"","notes": "", "sprint": {"active": false, "reality": 0, "goal": 1}}
                        }
                        var clearSprintVariables = function() {
                          $scope.goal.sprint.reality = 0;
                          $scope.goal.sprint.goal = "N/A";
                          $scope.goal.sprint.active = false;
                          $scope.sprintModeCompleted = false;
                        }
                        var stopTimer = function() {
                          timerService.stop()
                          $scope.recordOrPause = false;
                        }
                        var timerResetVariables = function() {
                          $scope.totalElapsedTimeInSeconds = 0; // Timer Reset
                          $scope.countDownTimerDisplayNumber = ""; // Timer Reset
                          stopTimer();
                          $scope.disableSprintMode = true; // Sprint Mode off
                          $scope.sprintModeCompleted = false;
                        }
                        var removeSprintModeAndKeepData = function () {
                            var confirmBox = confirm("ATTENTION: Do you want to turn off 'Sprint Mode'? Cannot be undone but data will remain.");
                            confirmBox;
                            if (confirmBox == true) {
                              $scope.disableSprintMode = true; // Disable Sprint Mode
                              $scope.recordActivePowerOn = false; // Not Recording
                              clearSprintVariables(); // Goal Reset
                            }
                        }


            //Base Set Variables
            $scope.calendarLinked = false;
            $scope.sprintModeCompleted = false;
            var totalTimeForActivity = 0;
            $scope.disableSprintMode = true; // Sprint Mode off
            $scope.recordActivePowerOn = false; // Recording Off
            timerResetVariables(); // Reset Timer Elapsed Time
            clearGoalVariables();


//CODE
  $scope.resetContent = function() {
    if ($scope.recordActivePowerOn == false) {
      var confirmBox = confirm("Reset?");
      confirmBox;
      if (confirmBox == true) {
        clearGoalVariables(); //RESET
        timerResetVariables(); // Reset Timer Elapsed Time
      }
    }
    else {
      alert("Stop recording and reset to continue.");
    }
  }
  $scope.enableSprint = function() {
    if ($scope.recordActivePowerOn == false && $scope.totalElapsedTimeInSeconds == 0) {
      if ($scope.disableSprintMode == true) {
          $scope.disableSprintMode = false; //Sprint Mode Enabled
      }
      else {
        var confirmBox = confirm("Stop Sprint Mode?");
        confirmBox;
        if (confirmBox == true) {
          $scope.disableSprintMode = true; // Disables Sprint Mode Upon "OK"
        }
      }
    }
    else if ($scope.recordActivePowerOn == false
    && $scope.disableSprintMode == true) {
      var confirmBox = confirm("ATTENTION: Do you want to RESET data to start 'Sprint Mode'? Cannot be undone.");
      confirmBox;
      if (confirmBox == true) {
        timerResetVariables(); // Timer Reset
        clearGoalVariables(); // Goal Reset
        $scope.disableSprintMode = false; // Will Show
      }
    }
    else if ($scope.totalElapsedTimeInSeconds >= 1 && $scope.disableSprintMode == false) {
      removeSprintModeAndKeepData();
    }
    else if ($scope.recordActivePowerOn == true
    && $scope.disableSprintMode == false) {
      removeSprintModeAndKeepData();
    }
    else {
      var confirmBox = confirm("ATTENTION: Do you want to STOP and RESET data to begin 'Sprint Mode'? Cannot be undone.");
      confirmBox;
      if (confirmBox == true) {
        timerResetVariables(); // Timer Reset
        clearGoalVariables(); // Goal Reset
        $scope.disableSprintMode = false; // Will Show
      }
    }
  }
  $scope.recordOrPauseFunction = function(sprintModeDisabled) {
    $scope.recordActivePowerOn = true; // Recording
    if ($scope.recordOrPause) {
      timerService.getTime(function(h, m, s) {
        timerService.convertTime(h,m,s, function(res) {
          var timerTimeToDisplay = res;
          timerService.fifteenSprint(timerTimeToDisplay, function(m, s) {
            timerService.playTimer(m,s, function(res) {
              var maxSprintForSprintMode = $scope.goal.sprint.goal;
              var sprintModeDisabled = $scope.disableSprintMode;
              $scope.countDownTimerDisplayNumber = res;
              totalTimeForActivity += 1;
              sprintModeService.checkForSprintModeDisabled(sprintModeDisabled, totalTimeForActivity, maxSprintForSprintMode, function(res) {
                if (res) {
                  if (res === true) {
                    stopTimer();
                    timerService.endTimer(function(time) {
                      $scope.currentGoalTime = time;
                      $scope.sprintModeCompleted = true; // Change the View
                      $scope.openMenu = true;
                      alert("Completed Sprint Mode! Add some notes and SAVE your File");
                    })
                  }
                  else {
                    $scope.goal.sprint.reality = res;
                  }
                }
                // Do nothing if no "res" (response)
              })
            })
          })
        });
      });

    }
    else {
      timerService.stop()
      $scope.recordActivePowerOn = false; // Stop Recording
      timerService.calculateTime(totalTimeForActivity, function(formatedTotalTimeElapsed, totalTimeInSecondsElapsed) {
        //Save to Scope
        timerService.endTimer(function(time) {
          console.log(time);
          $scope.currentGoalTime = time;
          $scope.totalElapsedTimeDisplay = formatedTotalTimeElapsed;
          $scope.totalElapsedTimeInSeconds = totalTimeInSecondsElapsed;
        })
      })
    }
  }
//Login function
$scope.login = function() {
googleCalendarBoilerPlateService.checkAuth(function(res) {
  $scope.calendarLinked = res;
  window.location.href = "/auth/facebook/callback";
});
}

//Google Calendar Connection CODE
  $scope.authorizeCalendar = function() {
    googleCalendarBoilerPlateService.handleAuthClick(function(res) {
      $scope.calendarLinked = res;
    });
  }




  //Destroy $interval
  $scope.$on('$destroy', function() {
    timerService.stop();
    });
});
