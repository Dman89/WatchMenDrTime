var mongoose =  require('mongoose');
var userSchema = {
  data: {
    oauth: String,
    socialLogin: String,
    customerNumber: String,
    firstName: String,
    lastName: String,
    email: [String],
    url: String,
    picture: String,
    displayName: String,
    currentGoals: {
      title: {type: String},
      task: {type: String},
      goal: {type: String},
      notes: {type: String},
      sprint: {
        active: String,
        reality: String,
        goal: String
      },
      time: {
        start: {
          month: String,
          date: Number,
          time: {
            fullTime: String,
            hour: Number,
            minutes: Number,
            seconds: Number,
            timestamp: String
          }
        },
        end: {
          month: String,
          date: Number,
          time: {
            fullTime: String,
            hour: Number,
            minutes: Number,
            seconds: Number,
            timestamp: String
          }
        },
        elapsedTimeFormated: String,
        elapsedTimeInSeconds: Number
      }
    },
    goalHistory: {
      title: {type: String},
      task: {type: String},
      goal: {type: String},
      notes: {type: String},
      sprint: {
        active: String,
        reality: String,
        goal: String
      },
      time: {
        start: {
          month: String,
          date: Number,
          time: {
            fullTime: String,
            hour: Number,
            minutes: Number,
            seconds: Number,
            timestamp: String
          }
        },
        end: {
          month: String,
          date: Number,
          time: {
            fullTime: String,
            hour: Number,
            minutes: Number,
            seconds: Number,
            timestamp: String
          }
        },
        elapsedTimeFormated: String,
        elapsedTimeInSeconds: Number
      }
    }
  }
};
var model = mongoose.model('User', userSchema);
module.exports = model;
