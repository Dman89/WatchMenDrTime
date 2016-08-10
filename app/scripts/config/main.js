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
}])
drTimeWatchmen.run(['$state', function($state){}]);
