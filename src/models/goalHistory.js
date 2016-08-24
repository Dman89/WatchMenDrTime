var mongoose =  require('mongoose');
var goalHistory = {
  title: {type: String},
  task: {type: String},
  goal: {type: String},
  notes: {type: String},
  sprint: {
    active: Boolean,
    reality: Number,
    goal: Object
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
    total: {
      formated: String,
      seconds: Number
    }
  }
};
var goalHistorySchema = new mongoose.Schema(goalHistory);
var model = mongoose.model('GoalHistory', goalHistorySchema);
module.exports = model;
module.exports.GoalHistory = goalHistorySchema;
