'use strict';
angular.module("drTimeWatchmen")
.controller("profileCtrl", function($scope, timerService, sprintModeService, dataService, googleCalendarBoilerPlateService, $timeout) {
                                                          //Get User
                                                          dataService.getUser(function(response) {
                                                            $scope.user = response.data.user;
                                                            calculateTotalElapsedTimeInSeconds();
                                                          });
                                                          //Login function
                                                          $scope.login = function() {
                                                            window.location.href = "/auth/facebook/callback";
                                                          };
                                      //Variables
                                      $scope.saveTitle = "";
                                      $scope.deleteModalGoalIndex = "";
                                      $scope.deleteModalGoal = "";
                                      $scope.deleteModalProject = "";
                                      $scope.deleteModalProjectIndex = "";
                                      $scope.modal = {"goal": "", "project": "", "title": "", "body": ""}
//save totalElapsedTimeInSeconds to projects
  function calculateTotalElapsedTimeInSeconds() {
    var loop = $scope.user.data.projects;
    var loop2 = $scope.user.data.goalHistory;
    for (var x = 0; x < loop.length; x++) {
      var time = 0;
      if ($scope.user.data.projects[x].title != null) {
        var searchTermNow = $scope.user.data.projects[x].title;
        for (var y = 0; y < loop2.length; y++) {
          if (loop2[y].title != undefined) {
            //TODO
            if (loop2[y].title.search(searchTermNow) >= 0) {
              time += $scope.user.data.goalHistory[y].time.total.seconds;
            }
            if (y == loop2.length - 1) {
              timerService.calculateTime(time, function(data) {
              $scope.user.data.projects[x].convertedTime = data;
              $scope.user.data.projects[x].totalElapsedTimeInSeconds = time;
              if (x == loop.length - 1) {
                dataService.saveUser($scope.user, function(res) {})
              }
              })
            }
          }
        }
      }
    }
  }
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
      $scope.user = response.data.user;
    });
  }
  $scope.convertGoalTitles = function(title, index) {
    var lookUpTerm = $scope.saveTitle;
    var userWithGoalHistory = $scope.user.data.goalHistory;
    var tempLength = userWithGoalHistory.length;
    if (tempLength == 0) {
      dataService.saveUser($scope.user, function(res) {})
    } else {
      for (var x = 0; x < tempLength; x++) {
        var tempSearchVar = userWithGoalHistory[x].title;
        if (tempSearchVar != null && !userWithGoalHistory[x].title === undefined) {
          if (tempSearchVar.search(lookUpTerm) > -1) {
            $scope.user.data.goalHistory[x].title = title;
          }
        }
        if (x == tempLength - 1) {
          dataService.saveUser($scope.user, function(res) {})
        }
      }
    }
  }
  $scope.saveTitleFunction = function(input) {
    $scope.saveTitle = input;
  }
  $scope.deleteModalProjects = function(title, index) {
      $scope.modal = {"goal": false, "project": true, "title": "Delete Project?", "body": "Do you want to delete the project '" + title + "'?"}
      $scope.deleteModalProjectIndex = index;
      $scope.deleteModalProject = title;
      $("#deleteModalProfile").modal("toggle");
  }
  $scope.removeProject = function() {
    $("#deleteModalProfile").modal("toggle");
    var title = $scope.deleteModalProject;
    var index = $scope.deleteModalProjectIndex;
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
          dataService.saveUser($scope.user, function(res) {})
          calculateTotalElapsedTimeInSeconds();
        }
      }
  }
  $scope.deleteModalGoals = function(goal, index) {
    $scope.modal = {"goal": true, "project": false, "title": "Delete Goal?", "body": "Do you want to delete " + goal.task + " in " + goal.title + "?"}
    $scope.deleteModalGoalIndex = index;
    $scope.deleteModalGoal = goal;
    $("#deleteModalProfile").modal("toggle");
  }
  $scope.removeGoal = function() {
    $("#deleteModalProfile").modal("toggle");
      var goal = $scope.deleteModalGoal;
      var index = $scope.deleteModalGoalIndex;
      var lookUpTerm = goal._id;
      var userWithGoalHistory = $scope.user.data.goalHistory;
      var tempLength = userWithGoalHistory.length;
      for (var x = 0; x < tempLength; x++) {
        var tempSearchVar = userWithGoalHistory[x]._id;
        if (tempSearchVar.search(lookUpTerm) > -1) {
          $scope.user.data.goalHistory.splice(x, 1);
        }
        if (x == tempLength - 1) {
          dataService.saveUser($scope.user, function(res) {})
          calculateTotalElapsedTimeInSeconds();
        }
      }
  }
  $scope.saveNow = function() {
    dataService.saveUser($scope.user, function(res) {})
  }
});
