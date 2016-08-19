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
var event = {};

this.uploadCalendarApi = function(data) {
  event = {
    'summary': data.data.currentGoals.title,
    'description': 'Task: ' + data.data.currentGoals.task + '. Goal of Task: ' + data.data.currentGoals,goal + '. Target time length in 15 minute blocks: ' + data.data.currentGoals.sprint.goal + '. Notes: ' + data.data.currentGoals.notes + '. Started on: ' + data.data.currentGoals.time.start.hour + ':' + data.data.currentGoals.time.start.minutes + '.',
    'start': {
      'dateTime': data.data.currentGoals.time.start.timestamp
    },
    'end': {
      'dateTime': data.data.currentGoals.time.end.timestamp
    }
  };
  gapi.client.load('calendar', 'v3', function(event) {
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    request.execute(function(event) {
      appendPre('Event created: ' + event.htmlLink);
    });
  });
}

function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
});
