'use strict';
var lionHeart = angular.module("drTimeWatchmen", [require('angular-ui-router')])
drTimeWatchmen.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/index.html',
      controller: 'indexHomeCtrl'
    })
}])
lionHeart.run(['$state', function($state){}]);
