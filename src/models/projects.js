var mongoose =  require('mongoose');
var projects = {
    title: String
};
var projectSchema = new mongoose.Schema(projects);
var model = mongoose.model('Projects', projectSchema);
module.exports = model;
module.exports.Projects = projectSchema;
