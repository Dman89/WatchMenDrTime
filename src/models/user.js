var mongoose =  require('mongoose');
var userSchema = {
title: {type: String},
task: {type: String},
goal: {type: String},
notes: {type: String}
};
var model = mongoose.model('User', userSchema);
module.exports = model;
