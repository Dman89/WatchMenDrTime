var mongoose =  require('mongoose');
var projects = {
    title: String,
    totalElapsedTimeInSeconds: Number
};
var projectSchema = new mongoose.Schema(projects);
var model = mongoose.model('Projects', projectSchema);
module.exports = model;
module.exports.Projects = projectSchema;
