'use strict';
angular.module("drTimeWatchmen")
.controller("profileCtrl", function($scope, timerService, sprintModeService, dataService, googleCalendarBoilerPlateService, $timeout) {
                                                          //Get User
                                                          dataService.getUser(function(response) {
                                                            $scope.user = response.data.user;
                                                            console.log($scope.user);
                                                          });
                                                          //Login function
                                                          $scope.login = function() {
                                                            window.location.href = "/auth/facebook/callback";
                                                          };
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
        $scope.user = response.data.user.data;
      }
    });
  }
});
