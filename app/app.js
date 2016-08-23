'use strict';
var angular = require('angular');
angular.module("drTimeWatchmen", ['ngAnimate']);
//STATE CONFIG
require('./scripts/config/main.js');
//CONTROLLERS
require('./scripts/controllers/indexCtrl.js');
require('./scripts/controllers/profileCtrl.js');
//SERVICE
require('./scripts/services/timerService.js');
require('./scripts/services/sprintModeService.js');
require('./scripts/services/googleCalendarBoilerPlateService.js');
require('./scripts/services/dataService.js');
