'use strict';
var angular = require('angular');
angular.module("drTimeWatchmen", ['ngAnimate']);
require('./scripts/config/main.js');
require('./scripts/controllers/indexCtrl.js');







require('./scripts/services/timerService.js');
require('./scripts/services/sprintModeService.js');
require('./scripts/services/googleCalendarBoilerPlateService.js');
require('./scripts/services/dataService.js');
