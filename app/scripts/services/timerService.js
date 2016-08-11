'use strict';
angular.module("drTimeWatchmen")
.service("timerService", function($interval) {
var startTime = "";
//SAVE START TIME AND PASS IT INTO CONTROLLER!!!! TODO TODO TODO


  this.getTime = function(cb) {

    var hereAndNow = new Date();
    var hour = hereAndNow.getHours();
    var min = hereAndNow.getMinutes();
    var sec = hereAndNow.getSeconds();
    cb(hour, min, sec);
  }
      var playTimer = function(m,s,cb) {
        $interval(function(m,s) {
            //RESET MINUTES UPON REACHING ZERO
          if (m == 0 && s == 0) {
            m = 14;
            s = 60;
          }
          //RESET SECONDS UPON REACHING ZERO
          else if (s == 0) {
            s = 60;
            m -= 1;
            m = addZero(m);
          }
          s -= 1;
          s = addZero(s);
          var countDownTimerDisplayNumber = m+":"+s;
          cb(countDownTimerDisplayNumber);
        }, 1000)
      }




      var convertTime = function(h, m, s) {
        //Converts time to
        return m + ":" + s;
      }

      var addZero = function(y) {
        //ADDS A ZERO TO ANY INPUT IF IT IS UNDER 10
        if (y < 10) {
          y = "0" + y;
        }
        return(y)
      }

      var fifteenSprint = function(timeToConvert, callback) {
        //TAKE TIME AND CONVERTS TO A COUNTDOWN TIMER
        var timeToConvert = timeToConvert;
        var conversionArray = timeToConvert.split(":");
        var checkSeconds = conversionArray[1];
        var checkMinute = conversionArray[0];
        //CHANGE MINUTE TO CORRECT COUNTDOWN TIMER
        if (checkMinute >= 0 && checkMinute <= 14) {
          checkMinute = 15 - checkMinute;
        }
        else if (checkMinute >= 15 && checkMinute <=29) {
          checkMinute -= 15;
          checkMinute = 15 - checkMinute;
        }
        else if (checkMinute >= 30 && checkMinute <= 44) {
          checkMinute -= 30;
          checkMinute = 15 - checkMinute;
        }
        else if (checkMinute >= 45 && checkMinute <= 59) {
          checkMinute -= 45;
          checkMinute = 15 - checkMinute;
        }
        //CHANGE SECONDS TO CORRECT COUNTDOWN TIMER
        if (checkSeconds == 0) {
          checkSeconds = 60;
        }
        else {
          checkSeconds = 60 - checkSeconds;
        }
        conversionArray[0] = checkMinute;
        conversionArray[1] = checkSeconds;
        callback(conversionArray[0], conversionArray[1]);
      }

});
