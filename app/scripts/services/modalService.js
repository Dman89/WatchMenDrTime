'use strict';
angular.module("drTimeWatchmen")
.service("modalService", function() {
  //http://stackoverflow.com/questions/14873109/twitter-bootstrap-modal-multiple-event-firing
  this.createModal = function (cb) {
             var randomNum = guid();
             var elementName = '#' + randomNum.toString();
             $('body').append("<div id=" + randomNum + " class='modal fade' role='dialog'></div>");
             cb(elementName);
  }

  //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function s4() {
             return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
  };

  function guid() {
     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
  }
});
