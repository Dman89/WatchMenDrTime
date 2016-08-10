var mongoose =  require('mongoose');
var sprintTimerGoalsSchema = {
title: {type: String},
task: {type: String}.
goal: {type: String},
notes: {type: String}
};
var model = mongoose.model('SprintTimerGoals', sprintTimerGoalsSchema);
module.exports = model;
