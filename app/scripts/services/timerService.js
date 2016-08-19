'use strict';
angular.module("drTimeWatchmen")
.service("timerService", function($interval) {
var startTime = "";
var stopTime = "";
      this.endTimer = function (cb) {
        var hereAndNow = new Date();
        stopTime = hereAndNow;
        var timestamp = hereAndNow.toISOString();
        var year = hereAndNow.getFullYear();
        var date = hereAndNow.getDate();
        var hour = hereAndNow.getHours();
        var min = hereAndNow.getMinutes();
        var sec = hereAndNow.getSeconds();
        var month = hereAndNow.getMonth();
        var time = {
          "start": startTime,
          "end": {
            "month": month,
            "date": date,
            "time": {
              "fullTime": hereAndNow,
              "hour": hour,
              "minutes": min,
              "seconds": sec,
              "timestamp": timestamp
            }
          }
        }
        cb(time);
      }

      this.getTime = function(cb) {
        var hereAndNow = new Date();
        var timestamp = hereAndNow.toISOString();
        var year = hereAndNow.getFullYear();
        var date = hereAndNow.getDate();
        var hour = hereAndNow.getHours();
        var min = hereAndNow.getMinutes();
        var sec = hereAndNow.getSeconds();
        var month = hereAndNow.getMonth();
        startTime = {
            "month": month,
            "date": date,
            "time": {
              "fullTime": hereAndNow,
              "hour": hour,
              "minutes": min,
              "seconds": sec,
              "timestamp": timestamp
            }
          }
        cb(hour, min, sec);
      }

      var stopTimer;

      this.playTimer = function(m,s,cb) {
            var s = s;
            var m = m;
            m = addZero(m);
            stopTimer = $interval(function() {
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
            stopTimer;
          }
          this.stop = function() {
          $interval.cancel(stopTimer);
      };



      this.convertTime = function(h, m, s, cb) {
        //Converts time to
        cb(m + ":" + s);
      }

      var addZero = function(y) {
        //ADDS A ZERO TO ANY INPUT IF IT IS UNDER 10
        if (y < 10) {
          y = "0" + y;
        }
        if (y.length > 2) {
          y.splice(0,1);
        }
        return(y)
      }

      this.fifteenSprint = function(timeToConvert, callback) {
        //TAKE TIME AND CONVERTS TO A COUNTDOWN TIMER
        var timeToConvert = timeToConvert;
        var conversionArray = timeToConvert.split(":");
        var checkSeconds = conversionArray[1];
        var checkMinute = conversionArray[0];
        //CHANGE MINUTE TO CORRECT COUNTDOWN TIMER
        if (checkMinute >= 0 && checkMinute <= 15) {
          if (checkMinute == 0) {
            checkMinute = 14;
          }
          else {
          checkMinute = 15 - checkMinute;
          }
        }
        else if (checkMinute >= 16 && checkMinute <=30) {
          checkMinute -= 15;
          checkMinute = 15 - checkMinute;
        }
        else if (checkMinute >= 31 && checkMinute <= 45) {
          checkMinute -= 30;
          checkMinute = 15 - checkMinute;
        }
        else if (checkMinute >= 46 && checkMinute <= 60) {
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

      this.calculateTime = function(time, cb) {
        var m = 0,h = 0,s = 0;
        var checkIfLongerThenAnMinute = time / 60;
        var checkIfLongerThenAnHour = ((time / 60) / 60);
        if (checkIfLongerThenAnHour > 1) {
          var floorOfHourCheck = Math.floor(checkIfLongerThenAnHour)
          var hoursTotalToMinus = (floorOfHourCheck * 3600);
          h = (hoursTotalToMinus / 3600);
          m = time - hoursTotalToMinus;
          m = m / 60;
          m = Math.floor(m)
          var minutesTotalTooMinus = (m * 60)
          s = time - minutesTotalTooMinus - hoursTotalToMinus;
        }
        else if (checkIfLongerThenAnMinute > 1) {
          var minutesTotalToMinus = Math.floor(checkIfLongerThenAnMinute);
          m = minutesTotalToMinus;
          s = (time - (minutesTotalToMinus * 60));
        }
        else {
          s = time;
        }
        //DAY ADDED TO LONGER THAN 24 HOURS AND WEEK IF MORE THAN 168 HOURS + YEAR
        if (h >= 8736) {
          var year = Math.floor(h/8736);
          h -= (year*8736);
          var week = Math.floor(h/168);
          h -= (week*168);
          var day = Math.floor(h/24)
          h -= (day*24);
          cb(year+" year(s), "+week+" week(s), "+day+" day(s), "+h+" hour(s), "+m+" minute(s), "+s+" second(s).", time);
        }
        else if (h >= 168) {
          var week = Math.floor(h / 168);
          var day = Math.floor((h - (week * 168)) / 24)
          h = h - (24 * day) - (168 * week);
          cb(week+" week(s), "+day+" day(s), "+h+" hour(s), "+m+" minute(s), "+s+" second(s).", time);
        }
        else if (h >= 24) {
          var day = Math.floor(h / 24)
          h -= (24 * day);
          cb(day+" day(s), "+h+" hour(s), "+m+" minute(s), "+s+" second(s).", time);
        }
        else if (h >= 1) {
          var day = Math.floor(h / 24)
          h -= (24 * day);
          cb(h+" hour(s), "+m+" minute(s), "+s+" second(s).", time);
        }
        else if (m >= 1) {
          cb(m+" minute(s), "+s+" second(s).", time);
        } else {
          cb(s+" second(s).", time);
        }
      }
});
