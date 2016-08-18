'use strict';
angular.module("drTimeWatchmen")
.service("googleCalendarBoilerPlateService", function($http) {
  var CLIENT_ID = '1066454954800-ueker70gf3n1u619p81livtk1g9mkuls.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar"];



this.checkAuth = function(cb) {
  gapi.auth.authorize({
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, function(response) {
    handleAuthResult(response, function(res) {
      cb(res)
    });
  });
}

function handleAuthResult(authResult, cb) {
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    // $scope.calendarLinked = true;
    cb(true)
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    // $scope.calendarLinked = false;
    cb(false)
  }
}

this.handleAuthClick = function(cb) {
  gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    }, function(response) {
      handleAuthResult(response, function(res) {
        cb(res)
      });
    });
  return false;
}



//Google Caledar Data Input
function uploadCalendarApi() {
  gapi.client.load('calendar', 'v3', addEvent);
}

function addEvent() {
  var event = {
    'summary': eventSummary,
    'description': 'Task: ' + eventTask + '. Goal of Task: ' + eventGoal + '. Target time length in 15 minute blocks :' + eventGoalPer + '. Notes: ' + eventNotes + '. Started on: ' + startTime + '. Block ' + counterCur + ' out of ' + eventGoalPer + '. Block Start ' + blockStart + ' - ' + blockStop + '.',
    'start': {
      'dateTime': yearZ + '-05-28T' + blockStart + '-07:00',
      'timeZone': timeZone
    },
    'end': {
      'dateTime': yearZ + '-05-28T' + blockStop + '-07:00',
      'timeZone': timeZone
    }
  };



  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
  });
}
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
});
