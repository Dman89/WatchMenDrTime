'use strict';
var drTimeWatchmen = angular.module("drTimeWatchmen", [require('angular-ui-router')])
drTimeWatchmen.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/index.html',
      controller: 'indexCtrl'
    })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
}])
drTimeWatchmen.run(['$state', function($state){}]);
