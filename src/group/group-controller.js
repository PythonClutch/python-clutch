app.controller('GroupCtrl', ['projects', 'group', function (projects, group) {
	var self = this;

	self.projects = projects;

	self.group = group;
	
}]);