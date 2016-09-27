'use strict';
angular.module("drTimeWatchmen")
.service("googleCalendarBoilerPlateService", function($http) {
  var CLIENT_ID = '1066454954800-ueker70gf3n1u619p81livtk1g9mkuls.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar"];
  var SECRET = "KwTH06wdrAdl3QrL54lfVW76";
  var APIKEY = "AIzaSyBKNnazoT-KfDKFBr0ekkOEYnZwxLFScVU";

this.checkAuth = function(cb) {
  gapi.client.setApiKey(APIKEY);
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
    cb(true)
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    cb(false)
  }
}

this.handleAuthClick = function(cb) {
  gapi.client.setApiKey(APIKEY);
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

this.uploadCalendarApi = function() {
  loadCalendarApi();
};
this.createEventForGoogleCalendar = function(data) {
  event = {
    'summary': data.data.currentGoals.title,
    'description': 'Task: ' + data.data.currentGoals.task + '. Goal of Task: ' + data.data.currentGoals.goal +
    '. Target time length in 15 minute blocks: ' + data.data.currentGoals.sprint.goal + '. Notes: '
    + data.data.currentGoals.notes + '. Started on: ' + data.data.currentGoals.time.start.time.hour + ':'
    + data.data.currentGoals.time.start.time.minutes + '.',
    'start': {
      'dateTime': data.data.currentGoals.time.start.time.timestamp
    },
    'end': {
      'dateTime': data.data.currentGoals.time.end.time.timestamp
    }
  };
}
function sendEventToGoogle() {
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
    request.execute(function(event) {
      appendPre('Event created: ' + event.htmlLink);
    });
}

  function loadCalendarApi() {
          gapi.client.load('calendar', 'v3', sendEventToGoogle);
  }

// Uncomment to check for Google Errors
  function appendPre(message) {

    // var pre = document.getElementById('output');
    // var textContent = document.createTextNode(message + '\n');
    // pre.appendChild(textContent);
  }
});
