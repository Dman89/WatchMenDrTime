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
  $scope.addNewProject = function() {
    console.log(1);
    if ($scope.user.data.projects != null) {
      $scope.user.data.projects.push("New Project")
      console.log(2);
    }
    else {
      $scope.user.data.projects = ["NEW Project"]
      console.log(3);
    }
  }
});
