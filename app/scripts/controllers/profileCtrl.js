'use strict';
angular.module("drTimeWatchmen")
.controller("profileCtrl", function($scope, timerService, sprintModeService, dataService, googleCalendarBoilerPlateService, $timeout) {
                                                          //Get User
                                                          dataService.getUser(function(response) {
                                                            $scope.user = response.data.user;
                                                          });
                                                          //Login function
                                                          $scope.login = function() {
                                                            window.location.href = "/auth/facebook/callback";
                                                          };
                                      //Variables
                                      $scope.saveTitle = "";

  $scope.addNewProject = function() {
    if ($scope.user.data.projects != null) {
      var temp = $scope.user.data.projects;
      temp.push({"title": "New Project"});
      temp = $scope.user.data.projects
    }
    else {
      $scope.user.data.projects = [{"title": "NEW Project"}];
    }
    dataService.saveUser($scope.user, function(response) {
      if (response.status == 200) {
        $scope.user = response.data.user;
      }
    });
  }

  $scope.convertGoalTitles = function(title, index) {
    var lookUpTerm = $scope.saveTitle;
    var userWithGoalHistory = $scope.user.data.goalHistory;
    var tempLength = userWithGoalHistory.length;
    for (var x = 0; x < tempLength; x++) {
      var tempSearchVar = userWithGoalHistory[x].title;
      if (tempSearchVar != null && !userWithGoalHistory[x].title === undefined) {
        if (tempSearchVar.search(lookUpTerm) > -1) {
          $scope.user.data.goalHistory[x].title = title;
        }
      }
      if (x == tempLength - 1) {
        dataService.saveUser($scope.user, function(res) {
          if (res.status == 200) {
            $scope.user = res.data.user;
          }
        })
      }
    }
  }
  $scope.saveTitleFunction = function(input) {
    $scope.saveTitle = input;
  }

  $scope.removeProject = function(title, index) {
    $scope.user.data.projects.splice(index, 1);
      var lookUpTerm = title;
      var userWithGoalHistory = $scope.user.data.goalHistory;
      var tempLength = userWithGoalHistory.length;
      for (var x = 0; x < tempLength; x++) {
        if (userWithGoalHistory[x].title != null && !userWithGoalHistory[x].title === undefined) {
          var tempSearchVar = userWithGoalHistory[x].title;
          if (tempSearchVar.search(lookUpTerm) > -1) {
            $scope.user.data.goalHistory.splice(x, 1);
          }
        }
        if (x == tempLength - 1) {
          dataService.saveUser($scope.user, function(res) {
            if (res.status == 200) {
              $scope.user = res.data.user;
            }
          })
        }
      }

  }
  $scope.removeGoal = function(goal, index) {
      var lookUpTerm = goal._id;
      var userWithGoalHistory = $scope.user.data.goalHistory;
      var tempLength = userWithGoalHistory.length;
      for (var x = 0; x < tempLength; x++) {
        var tempSearchVar = userWithGoalHistory[x]._id;
        if (tempSearchVar.search(lookUpTerm) > -1) {
          $scope.user.data.goalHistory.splice(x, 1);
        }
        if (x == tempLength - 1) {
          dataService.saveUser($scope.user, function(res) {
            if (res.status == 200) {
              $scope.user = res.data.user;
            }
          })
        }
      }
  }

});
